import { ObjectId, type Filter } from 'mongodb'
import { APPLICATION_STATUSES, bucket, col, type ApplicationDoc, type ApplicationStatus, type EnquiryDoc, type UserDoc } from './_lib/db.js'
import { allow, handler, HttpError, query, readJson, send } from './_lib/http.js'
import { sendApplicantLogin, sendStatusUpdate } from './_lib/mail.js'
import { clean } from './_lib/schema.js'
import { generatePassword, hashPassword, requireSession, sameOrigin } from './_lib/security.js'

const oid = (v: unknown) => {
  if (typeof v !== 'string' || !ObjectId.isValid(v)) throw new HttpError(400, 'Invalid id.')
  return new ObjectId(v)
}

const summary = (a: ApplicationDoc) => ({
  id: String(a._id),
  name: a.name,
  email: a.email,
  phone: a.fields['Phone Number'],
  mode: a.mode,
  status: a.status,
  createdAt: a.createdAt,
})

const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`

export default handler(async (req, res) => {
  sameOrigin(req)
  await requireSession(req, 'admin')
  const q = query(req)
  const action = q.get('action')
  const apps = await col<ApplicationDoc>('applications')
  const enquiries = await col<EnquiryDoc>('enquiries')
  const users = await col<UserDoc>('users')

  if (action === 'stats') {
    allow(req, 'GET')
    const byStatus = Object.fromEntries(APPLICATION_STATUSES.map((s) => [s, 0])) as Record<ApplicationStatus, number>
    for (const row of await apps.aggregate<{ _id: ApplicationStatus; n: number }>([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray()) byStatus[row._id] = row.n
    const week = new Date(Date.now() - 7 * 86400000)
    const [totalApps, newEnquiries, totalEnquiries, applicants, last7, recent, recentEnq] = await Promise.all([
      apps.countDocuments(),
      enquiries.countDocuments({ status: 'new' }),
      enquiries.countDocuments(),
      users.countDocuments(),
      apps.countDocuments({ createdAt: { $gte: week } }),
      apps.find().sort({ createdAt: -1 }).limit(6).toArray(),
      enquiries.find().sort({ createdAt: -1 }).limit(5).toArray(),
    ])
    return send(res, 200, {
      byStatus,
      totalApps,
      newEnquiries,
      totalEnquiries,
      applicants,
      last7,
      recent: recent.map(summary),
      recentEnquiries: recentEnq.map((e) => ({ id: String(e._id), name: e.name, service: e.service, status: e.status, createdAt: e.createdAt })),
    })
  }

  if (action === 'applications') {
    allow(req, 'GET')
    const filter: Filter<ApplicationDoc> = {}
    const status = q.get('status')
    if (status && APPLICATION_STATUSES.includes(status as ApplicationStatus)) filter.status = status as ApplicationStatus
    const mode = q.get('mode')
    if (mode) filter.mode = mode
    const text = clean(q.get('q'), 80)
    if (text) {
      const rx = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      filter.$or = [{ name: rx }, { email: rx }, { 'fields.Phone Number': rx }]
    }
    const list = await apps.find(filter).sort({ createdAt: -1 }).limit(500).toArray()
    return send(res, 200, { applications: list.map(summary) })
  }

  if (action === 'application') {
    allow(req, 'GET')
    const a = await apps.findOne({ _id: oid(q.get('id')) })
    if (!a) throw new HttpError(404, 'Application not found.')
    return send(res, 200, {
      application: { ...summary(a), fields: a.fields, adminNote: a.adminNote, updatedAt: a.updatedAt, files: a.files.map((f) => ({ label: f.label, id: String(f.fileId), name: f.name, size: f.size, type: f.type })) },
    })
  }

  if (action === 'update-application') {
    allow(req, 'POST')
    const body = await readJson(req)
    const id = oid(body.id)
    const status = clean(body.status, 20) as ApplicationStatus
    if (!APPLICATION_STATUSES.includes(status)) throw new HttpError(400, 'Invalid status.')
    const adminNote = clean(body.adminNote, 1500)
    const a = await apps.findOneAndUpdate({ _id: id }, { $set: { status, adminNote, updatedAt: new Date() } }, { returnDocument: 'before' })
    if (!a) throw new HttpError(404, 'Application not found.')
    let emailed = false
    if (body.notify === true) {
      emailed = await sendStatusUpdate({ to: a.email, name: a.fields['First name'] || a.name, status, note: adminNote }).catch(() => false)
    }
    return send(res, 200, { ok: true, emailed })
  }

  if (action === 'resend-login') {
    allow(req, 'POST')
    const body = await readJson(req)
    const a = await apps.findOne({ _id: oid(body.id) })
    if (!a) throw new HttpError(404, 'Application not found.')
    const password = generatePassword()
    await users.updateOne({ _id: a.userId }, { $set: { passwordHash: await hashPassword(password), mustChangePassword: true } })
    const sent = await sendApplicantLogin({ to: a.email, name: a.fields['First name'] || a.name, password }).catch(() => false)
    // if email isn't configured, the admin can pass the new password on by hand
    return send(res, 200, { ok: true, emailed: sent, password: sent ? undefined : password })
  }

  if (action === 'delete-application') {
    allow(req, 'POST')
    const body = await readJson(req)
    const a = await apps.findOneAndDelete({ _id: oid(body.id) })
    if (a) {
      const b = await bucket()
      for (const f of a.files) await b.delete(f.fileId).catch(() => {})
    }
    return send(res, 200, { ok: true })
  }

  if (action === 'enquiries') {
    allow(req, 'GET')
    const list = await enquiries.find().sort({ createdAt: -1 }).limit(500).toArray()
    return send(res, 200, { enquiries: list.map((e) => ({ ...e, id: String(e._id), _id: undefined })) })
  }

  if (action === 'update-enquiry') {
    allow(req, 'POST')
    const body = await readJson(req)
    const status = clean(body.status, 10)
    if (!['new', 'read', 'replied'].includes(status)) throw new HttpError(400, 'Invalid status.')
    await enquiries.updateOne({ _id: oid(body.id) }, { $set: { status: status as EnquiryDoc['status'] } })
    return send(res, 200, { ok: true })
  }

  if (action === 'delete-enquiry') {
    allow(req, 'POST')
    const body = await readJson(req)
    await enquiries.deleteOne({ _id: oid(body.id) })
    return send(res, 200, { ok: true })
  }

  if (action === 'applicants') {
    allow(req, 'GET')
    const list = await users.find().sort({ createdAt: -1 }).limit(500).toArray()
    const counts = new Map<string, number>()
    for (const row of await apps.aggregate<{ _id: ObjectId; n: number }>([{ $group: { _id: '$userId', n: { $sum: 1 } } }]).toArray()) counts.set(String(row._id), row.n)
    return send(res, 200, { applicants: list.map((u) => ({ id: String(u._id), name: u.name, email: u.email, createdAt: u.createdAt, applications: counts.get(String(u._id)) ?? 0, mustChangePassword: u.mustChangePassword })) })
  }

  if (action === 'export') {
    allow(req, 'GET')
    const list = await apps.find().sort({ createdAt: -1 }).toArray()
    const keys = ['Surname', 'First name', 'Other name', 'Sex', 'Marital Status', 'Date of Birth', 'Any health challenge? If yes what', 'Residential Address', 'Phone Number', 'Educational Background', 'Skills/Experience (if any)', 'Reason for Applying', 'Duration of Training', 'Date of resumption', 'Next of Kin Full Name', 'Next of Kin Phone', 'Mode of Training']
    const rows = [['Submitted', 'Status', 'Email', ...keys].map(csvCell).join(',')]
    for (const a of list) rows.push([a.createdAt.toISOString(), a.status, a.email, ...keys.map((k) => a.fields[k])].map(csvCell).join(','))
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="applications.csv"')
    res.setHeader('Cache-Control', 'no-store')
    res.end('﻿' + rows.join('\r\n'))
    return
  }

  throw new HttpError(404, 'Not found.')
})
