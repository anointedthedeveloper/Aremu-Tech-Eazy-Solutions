import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../lib/useAuth'
import { useFetch } from '../lib/useFetch'
import { btnGhost, btnPrimary, Card, CardTitle, DocLink, ErrorNote, fmtDate, fmtDateTime, inputCls, StatusBadge, type Status } from '../components/dashboard/ui'

interface MyApplication {
  id: string
  mode: string
  status: Status
  adminNote: string
  createdAt: string
  updatedAt: string
  fields: Record<string, string>
  files: { label: string; id: string; name: string; size: number }[]
}

const STEPS: { key: Status; label: string }[] = [
  { key: 'new', label: 'Received' },
  { key: 'reviewing', label: 'Under review' },
  { key: 'accepted', label: 'Decision' },
]

function Progress({ status }: { status: Status }) {
  const at = status === 'new' ? 0 : status === 'reviewing' ? 1 : 2
  const decision = status === 'accepted' ? 'Accepted' : status === 'waitlisted' ? 'Waiting list' : status === 'rejected' ? 'Not successful' : 'Decision'
  const decisionTone = status === 'accepted' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-red-500' : status === 'waitlisted' ? 'bg-violet-500' : 'bg-violet-600'
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Application progress">
      {STEPS.map((s, i) => (
        <li key={s.key}>
          <span className={`block h-2 rounded-full ${i <= at ? (i === 2 ? decisionTone : 'bg-gradient-to-r from-amber-500 to-violet-500') : 'bg-ink-100 dark:bg-white/10'}`} />
          <span className={`mt-2 block text-[12.5px] font-semibold ${i <= at ? 'text-ink-950 dark:text-white' : 'text-ink-400'}`}>{i === 2 ? decision : s.label}</span>
        </li>
      ))}
    </ol>
  )
}

function ChangePassword({ forced, onDone }: { forced: boolean; onDone: () => void }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setOk(false)
    if (next !== confirm) return setError('The new passwords do not match.')
    setBusy(true)
    try {
      await api.post('/api/auth?action=change-password', { current, next })
      setOk(true)
      setCurrent('')
      setNext('')
      setConfirm('')
      onDone()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card className={forced ? 'border-amber-300 ring-2 ring-amber-400/40 dark:border-amber-500/40' : ''}>
      <CardTitle>{forced ? 'Choose a new password' : 'Change password'}</CardTitle>
      {forced && <p className="-mt-2 mb-4 text-[14px] text-ink-500 dark:text-ink-300">You signed in with a password we generated. Please choose your own.</p>}
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-3">
        <input type="password" required autoComplete="current-password" placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputCls} />
        <input type="password" required minLength={8} autoComplete="new-password" placeholder="New password (8+ characters)" value={next} onChange={(e) => setNext(e.target.value)} className={inputCls} />
        <input type="password" required minLength={8} autoComplete="new-password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
        <div className="sm:col-span-3 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={busy} className={btnPrimary}>{busy ? 'Saving…' : 'Update password'}</button>
          {ok && <span className="text-[14px] font-semibold text-emerald-600 dark:text-emerald-400">Password updated.</span>}
        </div>
        {error && <div className="sm:col-span-3"><ErrorNote message={error} /></div>}
      </form>
    </Card>
  )
}

export default function Dashboard() {
  const { user, logout, refresh } = useAuth()
  const { data, error, loading } = useFetch<{ applications: MyApplication[] }>('/api/applications')
  const [pwDone, setPwDone] = useState(false)
  const passwordChanged = () => {
    setPwDone(true)
    void refresh()
  }

  return (
    <section className="min-h-[100svh] bg-paper-dim/60 pt-28 pb-16 dark:bg-transparent sm:pt-32">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Your dashboard</p>
            <h1 className="mt-2 font-display text-[2rem] leading-tight font-bold text-ink-950 dark:text-white sm:text-[2.4rem]">Welcome, {user?.name.split(' ')[0]}.</h1>
            <p className="mt-1 text-[14.5px] text-ink-500 dark:text-ink-300">{user?.email}</p>
          </div>
          <div className="flex gap-2.5">
            <Link to="/apply" className={btnGhost}>New application</Link>
            <button type="button" onClick={() => void logout()} className={btnGhost}>Sign out</button>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {pwDone && (
            <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              Password updated.
            </p>
          )}
          {user?.mustChangePassword && <ChangePassword forced onDone={passwordChanged} />}

          {loading && <Card><div className="skeleton h-24 w-full" /></Card>}
          <ErrorNote message={error} />

          {data?.applications.map((a) => (
            <Card key={a.id}>
              <CardTitle aside={<StatusBadge status={a.status} />}>{a.mode} application</CardTitle>
              <p className="-mt-2 mb-5 text-[13.5px] text-ink-500 dark:text-ink-400">Submitted {fmtDateTime(a.createdAt)}</p>
              <Progress status={a.status} />

              {a.adminNote && (
                <div className="mt-6 rounded-xl border border-violet-200 bg-violet-100/50 p-4 dark:border-white/10 dark:bg-violet-500/10">
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-violet-700 dark:text-violet-400">Message from Aremu Tech</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed whitespace-pre-line text-ink-800 dark:text-ink-200">{a.adminNote}</p>
                  <p className="mt-2 text-[12px] text-ink-400">Updated {fmtDate(a.updatedAt)}</p>
                </div>
              )}

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold text-ink-900 dark:text-white">Your details</h3>
                  <dl className="divide-y divide-ink-100 rounded-xl border border-ink-200/70 text-[14px] dark:divide-white/10 dark:border-white/10">
                    {Object.entries(a.fields).filter(([, v]) => v).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[40%_1fr] gap-3 px-4 py-2.5">
                        <dt className="text-ink-500 dark:text-ink-400">{k}</dt>
                        <dd className="font-medium break-words text-ink-900 dark:text-white">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold text-ink-900 dark:text-white">Documents you uploaded</h3>
                  <div className="space-y-2">
                    {a.files.map((f) => (
                      <DocLink key={f.id} {...f} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {data && data.applications.length === 0 && (
            <Card>
              <p className="text-[15px] text-ink-600 dark:text-ink-300">You haven&apos;t submitted an application yet.</p>
              <Link to="/apply" className={`${btnPrimary} mt-4`}>Start an application</Link>
            </Card>
          )}

          {!user?.mustChangePassword && <ChangePassword forced={false} onDone={passwordChanged} />}
        </div>
      </div>
    </section>
  )
}
