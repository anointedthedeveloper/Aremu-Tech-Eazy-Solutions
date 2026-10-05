import { ObjectId } from 'mongodb'
import { col, getDb, type ApplicationDoc, type StoredFile, type UserDoc } from './_lib/db.js'
import { allow, clientIp, handler, HttpError, readJson, send } from './_lib/http.js'
import { notifyAdmin, sendApplicantLogin } from './_lib/mail.js'
import { clean, EMAIL_RE, MODES, OPTIONAL_FIELDS, REQUIRED_FIELDS, REQUIRED_FILES } from './_lib/schema.js'
import { generatePassword, hashPassword, rateLimit, requireSession, sameOrigin } from './_lib/security.js'

interface FilePayload {
  label?: unknown
  id?: unknown
}

export default handler(async (req, res) => {
  sameOrigin(req)

  // An applicant's own applications
  if (req.method === 'GET') {
    const s = await requireSession(req, 'applicant')
    const apps = await (await col<ApplicationDoc>('applications')).find({ userId: new ObjectId(s.uid) }).sort({ createdAt: -1 }).toArray()
    return send(res, 200, {
      applications: apps.map((a) => ({
        id: String(a._id),
        mode: a.mode,
        status: a.status,
        adminNote: a.adminNote,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        fields: a.fields,
        files: a.files.map((f) => ({ label: f.label, id: String(f.fileId), name: f.name, size: f.size, type: f.type })),
      })),
    })
  }

  allow(req, 'POST')
  await rateLimit(`apply:${clientIp(req)}`, 6, 60 * 60)
  const body = await readJson<{ email?: unknown; agreed?: unknown; fields?: Record<string, unknown>; files?: FilePayload[]; website?: unknown }>(req, 100_000)
  if (body.website) return send(res, 200, { ok: true }) // honeypot

  const email = clean(body.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Enter a valid email address.')
  if (body.agreed !== true) throw new HttpError(400, 'You must agree to the requirements.')

  const raw = body.fields ?? {}
  const fields: Record<string, string> = {}
  for (const k of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) fields[k] = clean(raw[k])
  const missing = REQUIRED_FIELDS.filter((k) => !fields[k])
  if (missing.length) throw new HttpError(400, `Please complete: ${missing.join(', ')}.`)

  const mode = fields['Mode of Training'] as (typeof MODES)[number]
  if (!MODES.includes(mode)) throw new HttpError(400, 'Choose a valid mode of training.')

  // documents
  const payload = Array.isArray(body.files) ? body.files : []
  const db = await getDb()
  const filesColl = db.collection('uploads.files')
  const stored: StoredFile[] = []
  for (const label of REQUIRED_FILES[mode]) {
    const entry = payload.find((f) => f.label === label)
    const id = typeof entry?.id === 'string' ? entry.id : ''
    if (!ObjectId.isValid(id)) throw new HttpError(400, `Please upload: ${label}.`)
    const meta = await filesColl.findOne({ _id: new ObjectId(id), 'metadata.attached': false })
    if (!meta) throw new HttpError(400, `The upload for "${label}" expired or is invalid. Please upload it again.`)
    stored.push({ label, fileId: meta._id as ObjectId, name: String(meta.filename), size: Number(meta.length), type: String(meta.metadata?.type ?? '') })
  }

  // account: create (with a generated password) or reuse
  const name = [fields['First name'], fields.Surname].filter(Boolean).join(' ')
  const users = await col<UserDoc>('users')
  let user = await users.findOne({ email })
  let password: string | null = null
  if (!user) {
    password = generatePassword()
    const doc: UserDoc = { email, name, role: 'applicant', passwordHash: await hashPassword(password), mustChangePassword: true, createdAt: new Date() }
    const ins = await users.insertOne(doc)
    user = { ...doc, _id: ins.insertedId }
  }

  const now = new Date()
  const apps = await col<ApplicationDoc>('applications')
  const inserted = await apps.insertOne({
    userId: user._id as ObjectId,
    email,
    name,
    mode,
    fields,
    files: stored,
    status: 'new',
    adminNote: '',
    createdAt: now,
    updatedAt: now,
  })
  await filesColl.updateMany({ _id: { $in: stored.map((f) => f.fileId) } }, { $set: { 'metadata.attached': true, 'metadata.applicationId': inserted.insertedId } })

  const emailSent = await sendApplicantLogin({ to: email, name: fields['First name'] || name, password }).catch((e) => {
    console.error('[mail] applicant email failed', e)
    return false
  })
  await notifyAdmin('New application received', [`${name} (${email})`, `Mode: ${mode}`, `Phone: ${fields['Phone Number']}`]).catch(() => {})

  send(res, 201, { ok: true, emailSent, existingAccount: password === null })
})
