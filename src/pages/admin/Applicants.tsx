import { useFetch } from '../../lib/useFetch'
import { Card, ErrorNote, fmtDate } from '../../components/dashboard/ui'

interface Applicant {
  id: string
  name: string
  email: string
  createdAt: string
  applications: number
  mustChangePassword: boolean
}

export default function Applicants() {
  const { data, error, loading } = useFetch<{ applicants: Applicant[] }>('/api/admin?action=applicants')
  return (
    <div className="space-y-4">
      <ErrorNote message={error} />
      <Card className="!p-0 overflow-hidden">
        {loading && <div className="skeleton m-5 h-40" />}
        {data && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[14px]">
              <thead className="border-b border-ink-100 bg-ink-50 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-400">
                <tr><th className="px-5 py-3">Name</th><th className="px-3 py-3">Email</th><th className="px-3 py-3">Applications</th><th className="px-3 py-3">Password</th><th className="px-5 py-3 text-right">Joined</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100 dark:divide-white/10">
                {data.applicants.map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3 font-semibold text-ink-950 dark:text-white">{u.name}</td>
                    <td className="px-3 py-3 text-ink-700 dark:text-ink-200">{u.email}</td>
                    <td className="px-3 py-3">{u.applications}</td>
                    <td className="px-3 py-3 text-[12.5px]">{u.mustChangePassword ? <span className="text-amber-700 dark:text-amber-400">Not changed yet</span> : <span className="text-emerald-600 dark:text-emerald-400">Set by applicant</span>}</td>
                    <td className="px-5 py-3 text-right text-ink-500 dark:text-ink-400">{fmtDate(u.createdAt)}</td>
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
