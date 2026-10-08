import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { bucket, getDb } from './_lib/db.js'
import { allow, clientIp, cors, handler, HttpError, readBody, send } from './_lib/http.js'
import { rateLimit, sameOrigin } from './_lib/security.js'
import { clean, MAX_FILE_BYTES } from './_lib/schema.js'

function detectType(b: Buffer): string | null {
  if (b.length < 8) return null
  if (b[0] === 0xff && b[1] === 0xd8) return 'image/jpeg'
  if (b.subarray(0, 4).toString('hex') === '89504e47') return 'image/png'
  if (b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP') return 'image/webp'
  if (b.subarray(0, 4).toString() === '%PDF') return 'application/pdf'
  if (b.subarray(0, 2).toString() === 'PK') return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  if (b.subarray(0, 4).toString('hex') === 'd0cf11e0') return 'application/msword'
  return null
}

export default handler(async (req, res) => {
  if (cors(req, res)) return
  sameOrigin(req)
  allow(req, 'POST')
  await rateLimit(`upload:${clientIp(req)}`, 40, 60 * 60)

  const body = await readBody(req, MAX_FILE_BYTES)
  if (body.length < 100) throw new HttpError(400, 'That file looks empty.')
  const type = detectType(body)
  if (!type) throw new HttpError(400, 'Unsupported file. Please upload an image (JPG, PNG) or a PDF/Word document.')

  const rawName = req.headers['x-file-name']
  const name = clean(decodeURIComponent(Array.isArray(rawName) ? rawName[0] : rawName || 'upload'), 120).replace(/[^\w.\- ()]/g, '_') || 'upload'

  const b = await bucket()
  const stream = b.openUploadStream(name, { metadata: { attached: false, type, createdAt: new Date() } })
  await pipeline(Readable.from(body), stream)

  // housekeeping: drop files that were uploaded but never attached to an application
  if (Math.random() < 0.1) {
    const db = await getDb()
    const old = await db.collection('uploads.files').find({ 'metadata.attached': false, 'metadata.createdAt': { $lt: new Date(Date.now() - 24 * 3600 * 1000) } }).limit(20).toArray()
    for (const f of old) await b.delete(f._id).catch(() => {})
  }

  send(res, 201, { id: String(stream.id), name, size: body.length, type })
})
