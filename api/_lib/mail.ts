import nodemailer from 'nodemailer'

const SITE = () => process.env.SITE_URL?.replace(/\/$/, '') || 'https://aremu-tech-eazy-solutions.vercel.app'

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function transport() {
  const port = Number(process.env.SMTP_PORT || 465)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f1fb;font-family:Inter,Arial,sans-serif;color:#1a1033">
  <div style="max-width:560px;margin:0 auto;padding:28px 16px">
    <div style="background:linear-gradient(135deg,#52269f,#7b4ad1);border-radius:16px 16px 0 0;padding:26px 28px;color:#fff">
      <div style="font-size:13px;letter-spacing:.14em;font-weight:700;color:#fbae4d">AREMU TECH EAZY SOLUTIONS</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px">${esc(title)}</div>
    </div>
    <div style="background:#fff;border-radius:0 0 16px 16px;padding:28px;line-height:1.6;font-size:15px">${body}</div>
    <p style="text-align:center;color:#7b7699;font-size:12px;margin-top:18px">Aremu Tech Eazy Solutions · Kubwa, Abuja · Empowering Your Tech Dreams</p>
  </div></body></html>`
}

async function deliver(to: string, subject: string, html: string, text: string) {
  if (!mailConfigured()) {
    console.warn(`[mail] SMTP not configured — email to ${to} not sent: ${subject}`)
    return false
  }
  await transport().sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject, html, text })
  return true
}

export async function sendApplicantLogin(opts: { to: string; name: string; password: string | null }) {
  const loginUrl = `${SITE()}/login`
  const creds = opts.password
    ? `<table style="background:#f4f1fb;border-radius:12px;padding:16px 18px;width:100%;margin:16px 0"><tr><td style="color:#5c5780;padding:3px 0">Email</td><td style="font-weight:600">${esc(opts.to)}</td></tr><tr><td style="color:#5c5780;padding:3px 0">Password</td><td style="font-weight:700;font-family:monospace;font-size:17px">${esc(opts.password)}</td></tr></table>
       <p>For your security, you'll be asked to choose a new password the first time you sign in.</p>`
    : `<p>You already have an account with this email, so you can sign in with your existing password.</p>`
  const html = layout(
    'We received your application',
    `<p>Hi ${esc(opts.name)},</p>
     <p>Thank you for applying. We've received your application and will review it shortly. You can sign in at any time to follow its progress and see messages from us.</p>
     ${creds}
     <p style="margin:22px 0"><a href="${loginUrl}" style="background:#f7931e;color:#1a1033;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;display:inline-block">Sign in to your dashboard</a></p>
     <p style="color:#5c5780;font-size:13px">Didn't apply? You can ignore this email.</p>`,
  )
  const text = `Hi ${opts.name},\n\nWe received your application.\n\n${
    opts.password ? `Sign in: ${loginUrl}\nEmail: ${opts.to}\nPassword: ${opts.password}\n(You'll be asked to choose a new password.)` : `Sign in with your existing password: ${loginUrl}`
  }\n\nAremu Tech Eazy Solutions`
  return deliver(opts.to, 'Your Aremu Tech application — login details', html, text)
}

export async function sendStatusUpdate(opts: { to: string; name: string; status: string; note: string }) {
  const nice: Record<string, string> = {
    reviewing: 'is now under review',
    accepted: 'has been accepted — congratulations!',
    waitlisted: 'has been placed on the waiting list',
    rejected: 'was not successful this time',
  }
  const line = nice[opts.status]
  if (!line) return false
  const html = layout(
    'Update on your application',
    `<p>Hi ${esc(opts.name)},</p><p>Your application ${line}</p>${
      opts.note ? `<p style="background:#f4f1fb;border-radius:12px;padding:14px 16px"><strong>Message from us:</strong><br>${esc(opts.note).replace(/\n/g, '<br>')}</p>` : ''
    }<p style="margin:22px 0"><a href="${SITE()}/login" style="background:#f7931e;color:#1a1033;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;display:inline-block">View your dashboard</a></p>`,
  )
  return deliver(opts.to, 'Update on your Aremu Tech application', html, `Hi ${opts.name}, your application ${line}${opts.note ? `\n\nMessage: ${opts.note}` : ''}\n${SITE()}/login`)
}

export async function notifyAdmin(subject: string, lines: string[]) {
  const to = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL
  if (!to) return false
  const html = layout(subject, `<ul style="padding-left:18px">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul><p><a href="${SITE()}/lgad">Open the admin dashboard</a></p>`)
  return deliver(to, subject, html, `${subject}\n\n${lines.join('\n')}\n\n${SITE()}/lgad`)
}
