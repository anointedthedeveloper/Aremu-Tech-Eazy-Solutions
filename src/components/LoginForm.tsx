import { useState, type FormEvent } from 'react'
import { btnPrimary, ErrorNote, inputCls } from './dashboard/ui'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  submitLabel: string
}

export default function LoginForm({ onSubmit, submitLabel }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await onSubmit(email.trim(), password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="li-email" className="block text-[14px] font-semibold text-ink-900 dark:text-white">Email</label>
        <input id="li-email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} mt-2`} />
      </div>
      <div>
        <label htmlFor="li-pw" className="block text-[14px] font-semibold text-ink-900 dark:text-white">Password</label>
        <div className="relative mt-2">
          <input id="li-pw" type={show ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputCls} pr-16`} />
          <button type="button" onClick={() => setShow((v) => !v)} className="absolute top-1/2 right-3 -translate-y-1/2 text-[12.5px] font-semibold text-violet-700 dark:text-violet-400">
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <ErrorNote message={error} />
      <button type="submit" disabled={busy} className={`${btnPrimary} w-full py-3 text-[15px]`}>
        {busy ? 'Signing in…' : submitLabel}
      </button>
    </form>
  )
}
