import { col, type EnquiryDoc } from './_lib/db.js'
import { allow, clientIp, handler, HttpError, readJson, send } from './_lib/http.js'
import { notifyAdmin } from './_lib/mail.js'
import { clean, EMAIL_RE } from './_lib/schema.js'
import { rateLimit, sameOrigin } from './_lib/security.js'

export default handler(async (req, res) => {
  sameOrigin(req)
  allow(req, 'POST')
  await rateLimit(`enquiry:${clientIp(req)}`, 8, 60 * 60)
  const body = await readJson(req, 20_000)
  if (body.website) return send(res, 200, { ok: true }) // honeypot

  const doc: EnquiryDoc = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200).toLowerCase(),
    service: clean(body.service, 120),
    organisation: clean(body.organisation, 160),
    message: clean(body.message, 3000),
    status: 'new',
    createdAt: new Date(),
  }
  if (!doc.name || !EMAIL_RE.test(doc.email) || doc.phone.replace(/\D/g, '').length < 7 || !doc.service || doc.message.length < 10) {
    throw new HttpError(400, 'Please complete all required fields.')
  }
  await (await col<EnquiryDoc>('enquiries')).insertOne(doc)
  await notifyAdmin('New business enquiry', [`${doc.name} · ${doc.phone} · ${doc.email}`, `Service: ${doc.service}`, doc.message.slice(0, 300)]).catch(() => {})
  send(res, 201, { ok: true })
})
