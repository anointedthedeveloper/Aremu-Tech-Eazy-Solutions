import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { btnGhost, Card, ErrorNote, fmtDate, inputCls, StatusBadge, STATUS_LABEL, type Status } from '../../components/dashboard/ui'
import { useFetch } from '../../lib/useFetch'

interface Row {
  id: string
  name: string
  email: string
  phone: string
  mode: string
  status: Status
  createdAt: string
}

export default function Applications() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? ''
  const mode = params.get('mode') ?? ''
  const [text, setText] = useState(params.get('q') ?? '')
  const q = params.get('q') ?? ''

  const qs = new URLSearchParams({ action: 'applications' })
  if (status) qs.set('status', status)
  if (mode) qs.set('mode', mode)
  if (q) qs.set('q', q)
  const { data, error, loading } = useFetch<{ applications: Row[] }>(`/api/admin?${qs}`)

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <form
          className="flex-1 sm:max-w-sm"
          onSubmit={(e) => {
            e.preventDefault()
            set('q', text.trim())
          }}
        >
          <input type="search" placeholder="Search name, email or phone" value={text} onChange={(e) => setText(e.target.value)} className={inputCls} aria-label="Search applications" />
        </form>
        <select value={status} onChange={(e) => set('status', e.target.value)} className={`${inputCls} w-auto`} aria-label="Filter by status">
          <option value="">All statuses</option>
          {(Object.keys(STATUS_LABEL) as Status[]).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
        <select value={mode} onChange={(e) => set('mode', e.target.value)} className={`${inputCls} w-auto`} aria-label="Filter by training mode">
          <option value="">All modes</option>
          <option value="Apprenticeship">Apprenticeship</option>
          <option value="IT/SIWES/NYSC">IT/SIWES/NYSC</option>
        </select>
        <a href="/api/admin?action=export" className={btnGhost}>Export CSV</a>
      </div>

      <ErrorNote message={error} />
      <Card className="!p-0 overflow-hidden">
        {loading && <div className="skeleton m-5 h-40" />}
        {data && data.applications.length === 0 && <p className="p-6 text-[14.5px] text-ink-500 dark:text-ink-300">No applications match.</p>}
        {data && data.applications.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="border-b border-ink-100 bg-ink-50 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-400">
                <tr>
                  <th className="px-5 py-3">Applicant</th>
                  <th className="px-3 py-3">Mode</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 dark:divide-white/10">
                {data.applications.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-violet-100/30 dark:hover:bg-white/5">
                    <td className="px-5 py-3">
                      <Link to={`/admin/applications/${a.id}`} className="block font-semibold text-ink-950 hover:text-violet-700 dark:text-white">{a.name}</Link>
                      <span className="text-[12.5px] text-ink-500 dark:text-ink-400">{a.email} · {a.phone}</span>
                    </td>
                    <td className="px-3 py-3 text-ink-700 dark:text-ink-200">{a.mode}</td>
                    <td className="px-3 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-5 py-3 text-right text-ink-500 dark:text-ink-400">{fmtDate(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
