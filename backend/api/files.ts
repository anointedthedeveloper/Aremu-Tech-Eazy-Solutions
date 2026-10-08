import { ObjectId } from 'mongodb'
import { bucket, col, getDb, type ApplicationDoc } from './_lib/db.js'
import { allow, cors, handler, HttpError, query } from './_lib/http.js'
import { requireSession } from './_lib/security.js'

export default handler(async (req, res) => {
  if (cors(req, res)) return
  allow(req, 'GET')
  const session = await requireSession(req)
  const id = query(req).get('id') ?? ''
  if (!ObjectId.isValid(id)) throw new HttpError(400, 'Invalid file.')
  const fileId = new ObjectId(id)

  if (session.role === 'applicant') {
    const mine = await (await col<ApplicationDoc>('applications')).findOne({ 'files.fileId': fileId, userId: new ObjectId(session.uid) })
    if (!mine) throw new HttpError(404, 'File not found.')
  }

  const meta = await (await getDb()).collection('uploads.files').findOne({ _id: fileId })
  if (!meta) throw new HttpError(404, 'File not found.')

  const type: string = meta.metadata?.type ?? 'application/octet-stream'
  const inline = type.startsWith('image/') || type === 'application/pdf'
  res.statusCode = 200
  res.setHeader('Content-Type', type)
  res.setHeader('Content-Length', String(meta.length))
  res.setHeader('Content-Disposition', `${inline && query(req).get('download') !== '1' ? 'inline' : 'attachment'}; filename="${encodeURIComponent(meta.filename)}"`)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Cache-Control', 'private, no-store')
  ;(await bucket()).openDownloadStream(fileId).pipe(res)
})
