import { Link } from 'react-router-dom'
import { Card, CardTitle, ErrorNote, fmtDate, StatusBadge, STATUS_LABEL, type Status } from '../../components/dashboard/ui'
import { useFetch } from '../../lib/useFetch'

interface Stats {
  byStatus: Record<Status, number>
  totalApps: number
  newEnquiries: number
  totalEnquiries: number
  applicants: number
  last7: number
  recent: { id: string; name: string; mode: string; status: Status; createdAt: string }[]
  recentEnquiries: { id: string; name: string; service: string; status: string; createdAt: string }[]
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-ink-900">
      <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-400">{label}</p>
      <p className={`mt-2 font-display text-[2.2rem] leading-none font-bold ${tone ?? 'text-ink-950 dark:text-white'}`}>{value}</p>
    </div>
  )
}

export default function Overview() {
  const { data, error, loading } = useFetch<Stats>('/api/admin?action=stats')
  if (error) return <ErrorNote message={error} />
  if (loading || !data) return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}</div>

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Applications" value={data.totalApps} />
        <Stat label="New this week" value={data.last7} tone="text-violet-600 dark:text-violet-400" />
        <Stat label="Unread enquiries" value={data.newEnquiries} tone="text-amber-600 dark:text-amber-400" />
        <Stat label="Applicant accounts" value={data.applicants} />
      </div>

      <Card>
        <CardTitle>Applications by status</CardTitle>
        <div className="grid gap-3 sm:grid-cols-5">
          {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
            <Link key={s} to={`/admin/applications?status=${s}`} className="rounded-xl border border-ink-200/70 p-4 transition-colors hover:border-violet-400 dark:border-white/10">
              <StatusBadge status={s} />
              <p className="mt-3 font-display text-2xl font-bold text-ink-950 dark:text-white">{data.byStatus[s]}</p>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle aside={<Link to="/admin/applications" className="text-[13.5px] font-semibold text-violet-700 dark:text-violet-400">View all</Link>}>Latest applications</CardTitle>
          {data.recent.length === 0 && <p className="text-[14px] text-ink-500">Nothing yet.</p>}
          <ul className="divide-y divide-ink-100 dark:divide-white/10">
            {data.recent.map((a) => (
              <li key={a.id}>
                <Link to={`/admin/applications/${a.id}`} className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-ink-900 dark:text-white">{a.name}</span>
                    <span className="block text-[12.5px] text-ink-500 dark:text-ink-400">{a.mode} · {fmtDate(a.createdAt)}</span>
                  </span>
                  <StatusBadge status={a.status} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle aside={<Link to="/admin/enquiries" className="text-[13.5px] font-semibold text-violet-700 dark:text-violet-400">View all</Link>}>Latest enquiries</CardTitle>
          {data.recentEnquiries.length === 0 && <p className="text-[14px] text-ink-500">Nothing yet.</p>}
          <ul className="divide-y divide-ink-100 dark:divide-white/10">
            {data.recentEnquiries.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-ink-900 dark:text-white">{e.name}</span>
                  <span className="block truncate text-[12.5px] text-ink-500 dark:text-ink-400">{e.service} · {fmtDate(e.createdAt)}</span>
                </span>
                {e.status === 'new' && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[12px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">New</span>}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
