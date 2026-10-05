import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { SERVICES } from '../lib/services'
import SendingOverlay from './SendingOverlay'
import { EMAIL_RE, inputClass } from '../lib/formStyles'

const OTHER = 'Something else'
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), OTHER]

type Errors = Partial<Record<'Name' | 'Email' | 'Phone' | 'Service' | 'Message', string>>

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()
  const [sendError, setSendError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()
    const found: Errors = {}
    if (!get('Name')) found.Name = 'Please enter your name.'
    if (!EMAIL_RE.test(get('Email'))) found.Email = 'Enter a valid email address.'
    if (get('Phone').replace(/\D/g, '').length < 7) found.Phone = 'Enter a phone number we can reach you on.'
    if (!get('Service')) found.Service = 'Choose what you need help with.'
    if (get('Message').length < 10) found.Message = 'Tell us a little more about what you need.'
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`c-${first}`)?.focus()
      return
    }
    setSending(true)
    setSendError('')
    try {
      await api.post('/api/enquiries', {
        name: get('Name'),
        phone: get('Phone'),
        email: get('Email'),
        service: get('Service'),
        organisation: get('Organisation'),
        message: get('Message'),
        website: get('website'),
      })
      navigate('/contact?sent=1')
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSending(false)
    }
  }

  const field = (name: keyof Errors) => ({
    id: `c-${name}`,
    name,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `c-${name}-err` : undefined,
    onChange: () => errors[name] && setErrors((e) => ({ ...e, [name]: undefined })),
  })
  const border = (name: keyof Errors) => (errors[name] ? 'border-red-500' : 'border-ink-200 dark:border-white/15')
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`c-${name}-err`} role="alert" className="mt-1.5 text-[13px] font-medium text-red-600 dark:text-red-400">
        {errors[name]}
      </p>
    ) : null
  const label = 'block text-[14px] font-semibold text-ink-900 dark:text-white'

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-ink-900 sm:p-8"
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {sending && <SendingOverlay title="Sending your message…" text="This only takes a moment." />}

      <h2 className="font-display text-[22px] font-bold text-ink-950 dark:text-white">Tell us what you need</h2>
      <p className="mt-1.5 text-[14.5px] text-ink-500 dark:text-ink-300">We reply to every message, usually within one working day.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-Name" className={label}>Full name</label>
          <input {...field('Name')} type="text" autoComplete="name" className={`${inputClass} mt-2 ${border('Name')}`} />
          {err('Name')}
        </div>
        <div>
          <label htmlFor="c-Phone" className={label}>Phone / WhatsApp</label>
          <input {...field('Phone')} type="tel" autoComplete="tel" className={`${inputClass} mt-2 ${border('Phone')}`} />
          {err('Phone')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-Email" className={label}>Email</label>
          <input {...field('Email')} type="email" autoComplete="email" className={`${inputClass} mt-2 ${border('Email')}`} />
          {err('Email')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-Service" className={label}>What do you need help with?</label>
          <select {...field('Service')} defaultValue="" className={`${inputClass} mt-2 ${border('Service')}`}>
            <option value="">Choose a service</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err('Service')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-Organisation" className={label}>
            Organisation / school <span className="ml-1 text-[12px] font-medium text-ink-400">(optional)</span>
          </label>
          <input id="c-Organisation" name="Organisation" type="text" className={`${inputClass} mt-2 border-ink-200 dark:border-white/15`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-Message" className={label}>Message</label>
          <textarea {...field('Message')} rows={5} className={`${inputClass} mt-2 resize-y ${border('Message')}`} />
          {err('Message')}
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-amber-500 px-7 py-3.5 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400 disabled:opacity-70 sm:w-auto"
      >
        {sending && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />}
        {sending ? 'Sending…' : 'Send message'}
      </button>
      {sendError && (
        <p role="alert" className="mt-4 text-[13.5px] font-medium text-red-600 dark:text-red-400">
          {sendError}
        </p>
      )}
    </form>
  )
}
