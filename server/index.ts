/**
 * Standalone Node server: serves the built site (dist/) and the same /api handlers that Vercel runs as
 * serverless functions. Use it on Render, Railway, a VPS, or anywhere that runs Node:
 *   npm run build && npm start
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import admin from '../api/admin.js'
import applications from '../api/applications.js'
import auth from '../api/auth.js'
import enquiries from '../api/enquiries.js'
import files from '../api/files.js'
import upload from '../api/upload.js'
import type { Req, Res } from '../api/_lib/http.js'

type Handler = (req: Req, res: Res) => Promise<void> | void
const routes: Record<string, Handler> = { admin, applications, auth, enquiries, files, upload }

const DIST = resolve(process.cwd(), 'dist')
const PORT = Number(process.env.PORT || 3000)

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

async function isFile(path: string) {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

async function serveStatic(req: Req, res: Res, pathname: string) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '')
  let file = join(DIST, clean)
  if (!file.startsWith(DIST)) {
    res.statusCode = 403
    return res.end()
  }
  let spa = false
  if (!(await isFile(file))) {
    file = join(DIST, 'index.html') // single-page app: any unknown path loads the app
    spa = true
  }
  const info = await stat(file)
  const type = TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream'
  res.statusCode = 200
  res.setHeader('Content-Type', type)
  res.setHeader('Content-Length', String(info.size))
  res.setHeader('Cache-Control', spa || file.endsWith('index.html') ? 'no-cache' : file.includes(`${join(DIST, 'assets')}`) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  if (req.method === 'HEAD') return res.end()
  createReadStream(file).pipe(res)
}

createServer(async (req: Req, res: Res) => {
  const url = new URL(req.url ?? '/', 'http://local')
  try {
    if (url.pathname === '/healthz') {
      res.setHeader('Content-Type', 'text/plain')
      return res.end('ok')
    }
    const match = /^\/api\/([\w-]+)$/.exec(url.pathname)
    if (match) {
      const fn = routes[match[1]]
      if (!fn) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        return res.end('{"error":"Not found."}')
      }
      return await fn(req, res)
    }
    await serveStatic(req, res, url.pathname)
  } catch (err) {
    console.error(err)
    if (!res.headersSent) res.statusCode = 500
    res.end()
  }
}).listen(PORT, () => console.log(`Aremu Tech server listening on http://localhost:${PORT}`))
