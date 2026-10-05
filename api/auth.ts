import { ObjectId } from 'mongodb'
import { col, type UserDoc } from './_lib/db.js'
import { allow, clientIp, handler, HttpError, query, readJson, send } from './_lib/http.js'
import { checkAdmin, checkPassword, clearCookie, clearRateLimit, getSession, hashPassword, rateLimit, requireSession, sameOrigin, sessionCookie } from './_lib/security.js'
import { clean, EMAIL_RE } from './_lib/schema.js'

export default handler(async (req, res) => {
  sameOrigin(req)
  const action = query(req).get('action')

  if (action === 'me') {
    allow(req, 'GET')
    const s = await getSession(req)
    if (!s) return send(res, 200, { user: null })
    let mustChangePassword = false
    if (s.role === 'applicant' && s.uid) {
      const u = await (await col<UserDoc>('users')).findOne({ _id: new ObjectId(s.uid) })
      if (!u) return send(res, 200, { user: null }, { 'Set-Cookie': clearCookie() })
      mustChangePassword = u.mustChangePassword
    }
    return send(res, 200, { user: { role: s.role, email: s.email, name: s.name, mustChangePassword } })
  }

  if (action === 'logout') {
    allow(req, 'POST')
    return send(res, 200, { ok: true }, { 'Set-Cookie': clearCookie() })
  }

  if (action === 'login') {
    allow(req, 'POST')
    const body = await readJson(req)
    const email = clean(body.email, 200).toLowerCase()
    const password = typeof body.password === 'string' ? body.password.slice(0, 200) : ''
    if (!EMAIL_RE.test(email) || !password) throw new HttpError(400, 'Enter your email and password.')

    const key = `login:${clientIp(req)}:${email}`
    await rateLimit(key, 8, 15 * 60)
    const user = await (await col<UserDoc>('users')).findOne({ email })
    // always run bcrypt so timing doesn't reveal whether the account exists
    const ok = await checkPassword(password, user?.passwordHash ?? '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidi')
    if (!user || !ok) throw new HttpError(401, 'Incorrect email or password.')
    await clearRateLimit(key)

    const cookie = await sessionCookie({ role: 'applicant', email: user.email, name: user.name, uid: String(user._id) })
    return send(res, 200, { user: { role: 'applicant', email: user.email, name: user.name, mustChangePassword: user.mustChangePassword } }, { 'Set-Cookie': cookie })
  }

  if (action === 'admin-login') {
    allow(req, 'POST')
    const body = await readJson(req)
    const email = clean(body.email, 200)
    const password = typeof body.password === 'string' ? body.password.slice(0, 200) : ''
    const key = `admin:${clientIp(req)}`
    await rateLimit(key, 5, 15 * 60)
    if (!(await checkAdmin(email, password))) throw new HttpError(401, 'Incorrect email or password.')
    await clearRateLimit(key)
    const cookie = await sessionCookie({ role: 'admin', email: email.toLowerCase(), name: 'Admin' })
    return send(res, 200, { user: { role: 'admin', email: email.toLowerCase(), name: 'Admin', mustChangePassword: false } }, { 'Set-Cookie': cookie })
  }

  if (action === 'change-password') {
    allow(req, 'POST')
    const s = await requireSession(req, 'applicant')
    const body = await readJson(req)
    const current = typeof body.current === 'string' ? body.current : ''
    const next = typeof body.next === 'string' ? body.next : ''
    if (next.length < 8 || next.length > 100) throw new HttpError(400, 'Choose a password of at least 8 characters.')
    if (next === current) throw new HttpError(400, 'Choose a different password from the current one.')
    const users = await col<UserDoc>('users')
    const user = await users.findOne({ _id: new ObjectId(s.uid) })
    if (!user || !(await checkPassword(current, user.passwordHash))) throw new HttpError(400, 'Your current password is incorrect.')
    await users.updateOne({ _id: user._id }, { $set: { passwordHash: await hashPassword(next), mustChangePassword: false } })
    return send(res, 200, { ok: true })
  }

  throw new HttpError(404, 'Not found.')
})
