import type { IncomingMessage, ServerResponse } from 'node:http'

export type Req = IncomingMessage & { body?: unknown; query?: Record<string, string | string[] | undefined> }
export type Res = ServerResponse

export class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function send(res: Res, status: number, body: unknown, headers: Record<string, string | string[]> = {}) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v)
  res.end(JSON.stringify(body))
}

export function query(req: Req): URLSearchParams {
  return new URL(req.url ?? '/', 'http://local').searchParams
}

export function clientIp(req: Req): string {
  const fwd = req.headers['x-forwarded-for']
  const first = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim()
  return first || req.socket.remoteAddress || 'unknown'
}

/** Reads the raw request body (works whether or not the platform already buffered it). */
export async function readBody(req: Req, limitBytes: number): Promise<Buffer> {
  if (Buffer.isBuffer(req.body)) {
    if (req.body.length > limitBytes) throw new HttpError(413, 'File too large.')
    return req.body
  }
  if (typeof req.body === 'string') return Buffer.from(req.body)
  if (req.body && typeof req.body === 'object') return Buffer.from(JSON.stringify(req.body))

  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buf.length
    if (size > limitBytes) throw new HttpError(413, 'File too large.')
    chunks.push(buf)
  }
  return Buffer.concat(chunks)
}

export async function readJson<T = Record<string, unknown>>(req: Req, limitBytes = 200_000): Promise<T> {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body as T
  const raw = await readBody(req, limitBytes)
  try {
    return JSON.parse(raw.toString('utf8') || '{}') as T
  } catch {
    throw new HttpError(400, 'Invalid request.')
  }
}

type Handler = (req: Req, res: Res) => Promise<void> | void

/** Wraps a handler so thrown HttpErrors become JSON responses and anything else becomes a 500. */
export function handler(fn: Handler): Handler {
  return async (req, res) => {
    try {
      await fn(req, res)
    } catch (err) {
      if (err instanceof HttpError) return send(res, err.status, { error: err.message }, err.status === 413 ? { Connection: 'close' } : {})
      console.error(err)
      send(res, 500, { error: 'Something went wrong. Please try again.' })
    }
  }
}

export function allow(req: Req, ...methods: string[]) {
  if (!methods.includes(req.method ?? 'GET')) throw new HttpError(405, 'Method not allowed.')
}

/** Sets CORS headers and handles the OPTIONS preflight for cross-origin requests.
 *  Call this at the very top of every handler, before anything else.
 *  Returns true if the request was a preflight (OPTIONS) — the handler should return immediately in that case.
 */
export function cors(req: Req, res: Res): boolean {
  // Use ALLOWED_ORIGIN env var, fall back to the known TrueHost domain.
  const origin = (process.env.ALLOWED_ORIGIN?.replace(/\/$/, '')) || 'https://aremutecheazysolutions.com'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-File-Name')
  res.setHeader('Access-Control-Max-Age', '86400')
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return true
  }
  return false
}
