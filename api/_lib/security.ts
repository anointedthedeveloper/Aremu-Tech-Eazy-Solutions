import bcrypt from 'bcryptjs'
import { randomInt, timingSafeEqual } from 'node:crypto'
import { SignJWT, jwtVerify } from 'jose'
import { col } from './db.js'
import { HttpError, type Req } from './http.js'

export type Role = 'admin' | 'applicant'
export interface Session {
  role: Role
  email: string
  name: string
  /** Users collection id (applicants only). */
  uid?: string
}

const COOKIE = 'atech_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const ADMIN_MAX_AGE = 60 * 60 * 8 // admins: 8 hours

function secret() {
  const s = process.env.JWT_SECRET
  if (!s || s.length < 24) throw new Error('JWT_SECRET must be set (at least 24 characters)')
  return new TextEncoder().encode(s)
}

export async function sessionCookie(session: Session): Promise<string> {
  const age = session.role === 'admin' ? ADMIN_MAX_AGE : MAX_AGE
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${age}s`)
    .sign(secret())
  // When frontend and backend are on different domains, cookies must be
  // SameSite=None; Secure so the browser sends them cross-origin.
  const crossOrigin = Boolean(process.env.ALLOWED_ORIGIN)
  const secure = crossOrigin || process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : ''
  const sameSite = crossOrigin ? 'None' : 'Lax'
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=${sameSite}${secure}; Max-Age=${age}`
}

export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

export async function getSession(req: Req): Promise<Session | null> {
  const raw = req.headers.cookie
  if (!raw) return null
  const token = raw
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1)
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ['HS256'] })
    const { role, email, name, uid } = payload as unknown as Session
    if (role !== 'admin' && role !== 'applicant') return null
    return { role, email, name, uid }
  } catch {
    return null
  }
}

export async function requireSession(req: Req, role?: Role): Promise<Session> {
  const s = await getSession(req)
  if (!s) throw new HttpError(401, 'Please sign in.')
  if (role && s.role !== role) throw new HttpError(403, 'You do not have access to this.')
  return s
}

/** Same-origin / allowed-origin check for state-changing requests (CSRF defence on top of SameSite cookies).
 *
 * When the frontend is on a different domain (e.g. TrueHost) from the backend (Vercel),
 * set the ALLOWED_ORIGIN env var to the frontend's origin, e.g. https://aremutecheazysolutions.com.
 * Same-host requests are always allowed regardless of that setting.
 */
export function sameOrigin(req: Req) {
  if (req.method === 'GET' || req.method === 'HEAD') return
  const origin = req.headers.origin
  if (!origin) return

  // Normalize the allowed origin from env (strip trailing slash).
  const allowed = process.env.ALLOWED_ORIGIN?.replace(/\/$/, '')

  // Allow if origin matches the explicitly configured frontend domain.
  if (allowed && origin.replace(/\/$/, '') === allowed) return

  // Otherwise fall back to same-host check.
  const host = req.headers['x-forwarded-host'] ?? req.headers.host
  try {
    if (new URL(origin).host !== host) throw new HttpError(403, 'Blocked request.')
  } catch (e) {
    if (e instanceof HttpError) throw e
    throw new HttpError(403, 'Blocked request.')
  }
}

export const hashPassword = (pw: string) => bcrypt.hash(pw, 10)
export const checkPassword = (pw: string, hash: string) => bcrypt.compare(pw, hash)

const ALPHABET = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
/** Readable random password (no look-alike characters). */
export function generatePassword(length = 12): string {
  let out = ''
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)]
  return out
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  return ba.length === bb.length && timingSafeEqual(ba, bb)
}

/** Admin credentials live in environment variables, never in the database. */
export async function checkAdmin(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!adminEmail || !safeEqual(email.trim().toLowerCase(), adminEmail)) {
    // still do the work so timing doesn't reveal whether the email matched
    await bcrypt.compare(password, '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidi')
    return false
  }
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (hash) return bcrypt.compare(password, hash)
  const plain = process.env.ADMIN_PASSWORD
  return Boolean(plain) && safeEqual(password, plain as string)
}

interface LimitDoc {
  _id: string
  count: number
  expiresAt: Date
}

/** Simple counter-based limiter stored in MongoDB (works across serverless instances). */
export async function rateLimit(key: string, max: number, windowSeconds: number) {
  const limits = await col<LimitDoc>('rateLimits')
  const now = new Date()
  const doc = await limits.findOneAndUpdate(
    { _id: key },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(now.getTime() + windowSeconds * 1000) } },
    { upsert: true, returnDocument: 'after' },
  )
  if (doc && doc.count > max) throw new HttpError(429, 'Too many attempts. Please wait a while and try again.')
}

export async function clearRateLimit(key: string) {
  await (await col<LimitDoc>('rateLimits')).deleteOne({ _id: key })
}

