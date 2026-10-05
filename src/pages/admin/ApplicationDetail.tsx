import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../lib/api'
import { useFetch } from '../../lib/useFetch'
import { btnGhost, btnPrimary, Card, CardTitle, DocLink, ErrorNote, fmtDateTime, inputCls, StatusBadge, STATUS_LABEL, type Status } from '../../components/dashboard/ui'

interface Detail {
  application: {
    id: string
    name: string
    email: string
    phone: string
    mode: string
    status: Status
    adminNote: string
    createdAt: string
    updatedAt: string
    fields: Record<string, string>
    files: { label: string; id: string; name: string; size: number }[]
  }
}

export default function ApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, error, loading, reload } = useFetch<Detail>(`/api/admin?action=application&id=${id}`)
  const [status, setStatus] = useState<Status | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [notify, setNotify] = useState(true)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [newPw, setNewPw] = useState('')

  if (error) return <ErrorNote message={error} />
  if (loading || !data) return <div className="skeleton h-64 rounded-2xl" />
  const a = data.application
  const curStatus = status ?? a.status
  const curNote = note ?? a.adminNote

  const run = async (fn: () => Promise<void>) => {
    setBusy(true)
    setErr('')
    setMsg('')
    try {
      await fn()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/admin/applications" className="text-[14px] font-semibold text-violet-700 dark:text-violet-400">← All applications</Link>
        <StatusBadge status={a.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardTitle>{a.name}</CardTitle>
          <p className="-mt-2 mb-4 text-[13.5px] text-ink-500 dark:text-ink-400">{a.mode} · submitted {fmtDateTime(a.createdAt)}</p>
          <dl className="divide-y divide-ink-100 rounded-xl border border-ink-200/70 text-[14px] dark:divide-white/10 dark:border-white/10">
            <div className="grid grid-cols-[38%_1fr] gap-3 px-4 py-2.5"><dt className="text-ink-500 dark:text-ink-400">Email</dt><dd className="font-medium break-all text-ink-900 dark:text-white"><a href={`mailto:${a.email}`}>{a.email}</a></dd></div>
            {Object.entries(a.fields).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[38%_1fr] gap-3 px-4 py-2.5">
                <dt className="text-ink-500 dark:text-ink-400">{k}</dt>
                <dd className="font-medium break-words text-ink-900 dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardTitle>Decision</CardTitle>
            <label htmlFor="st" className="block text-[13px] font-semibold text-ink-700 dark:text-ink-200">Status</label>
            <select id="st" value={curStatus} onChange={(e) => setStatus(e.target.value as Status)} className={`${inputCls} mt-1.5`}>
              {(Object.keys(STATUS_LABEL) as Status[]).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
            <label htmlFor="nt" className="mt-4 block text-[13px] font-semibold text-ink-700 dark:text-ink-200">Message to applicant (shown on their dashboard)</label>
            <textarea id="nt" rows={4} value={curNote} onChange={(e) => setNote(e.target.value)} className={`${inputCls} mt-1.5 resize-y`} placeholder="e.g. Please come for an interview on Monday at 10am." />
            <label className="mt-3 flex items-center gap-2.5 text-[13.5px] text-ink-700 dark:text-ink-200">
              <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4 accent-violet-600" />
              Email them about this update
            </label>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                disabled={busy}
                className={btnPrimary}
                onClick={() =>
                  run(async () => {
                    const r = await api.post<{ emailed: boolean }>('/api/admin?action=update-application', { id: a.id, status: curStatus, adminNote: curNote, notify })
                    setMsg(notify ? (r.emailed ? 'Saved. Email sent.' : 'Saved. (Email could not be sent — is SMTP set up?)') : 'Saved.')
                    reload()
                  })
                }
              >
                {busy ? 'Saving…' : 'Save'}
              </button>
              {msg && <span className="text-[13.5px] font-semibold text-emerald-600 dark:text-emerald-400">{msg}</span>}
            </div>
            {err && <div className="mt-3"><ErrorNote message={err} /></div>}
          </Card>

          <Card>
            <CardTitle>Account</CardTitle>
            <p className="mb-3 text-[13.5px] text-ink-500 dark:text-ink-300">Generate a new password and email it to the applicant.</p>
            <button
              type="button"
              disabled={busy}
              className={btnGhost}
              onClick={() =>
                run(async () => {
                  const r = await api.post<{ emailed: boolean; password?: string }>('/api/admin?action=resend-login', { id: a.id })
                  if (r.emailed) setMsg('New login details emailed.')
                  else setNewPw(r.password ?? '')
                })
              }
            >
              Reset &amp; resend login
            </button>
            {newPw && (
              <p className="mt-3 rounded-xl bg-amber-100 px-4 py-3 text-[13.5px] text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
                Email isn&apos;t configured, so pass this to {a.name} yourself: <strong className="font-mono text-[15px]">{newPw}</strong>
              </p>
            )}
          </Card>
        </div>
      </div>

      <Card>
        <CardTitle>Documents ({a.files.length})</CardTitle>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {a.files.map((f) => <DocLink key={f.id} {...f} />)}
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-[13.5px] font-semibold text-red-600 hover:underline dark:text-red-400"
          onClick={() => {
            if (!window.confirm(`Permanently delete ${a.name}'s application and documents?`)) return
            void run(async () => {
              await api.post('/api/admin?action=delete-application', { id: a.id })
              navigate('/admin/applications', { replace: true })
            })
          }}
        >
          Delete application
        </button>
      </div>
    </div>
  )
}
