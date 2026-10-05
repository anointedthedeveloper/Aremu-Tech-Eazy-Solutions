import { NavLink, Route, Routes } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { btnGhost } from '../components/dashboard/ui'
import Overview from './admin/Overview'
import Applications from './admin/Applications'
import ApplicationDetail from './admin/ApplicationDetail'
import Enquiries from './admin/Enquiries'
import Applicants from './admin/Applicants'

const TABS = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/applications', label: 'Applications' },
  { to: '/admin/enquiries', label: 'Enquiries' },
  { to: '/admin/applicants', label: 'Applicants' },
]

export default function Admin() {
  const { user, logout } = useAuth()

  return (
    <section className="min-h-[100svh] bg-paper-dim/60 pt-28 pb-16 dark:bg-transparent sm:pt-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Admin</p>
            <h1 className="mt-2 font-display text-[2rem] leading-tight font-bold text-ink-950 dark:text-white sm:text-[2.4rem]">Dashboard</h1>
            <p className="mt-1 text-[14px] text-ink-500 dark:text-ink-300">Signed in as {user?.email}</p>
          </div>
          <button type="button" onClick={() => void logout()} className={btnGhost}>Sign out</button>
        </div>

        <nav aria-label="Admin sections" className="no-scrollbar mt-7 flex gap-1 overflow-x-auto rounded-full border border-ink-200/70 bg-white p-1.5 dark:border-white/10 dark:bg-ink-900 sm:w-fit">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${isActive ? 'bg-violet-600 text-white' : 'text-ink-600 hover:bg-violet-100 dark:text-ink-300 dark:hover:bg-white/10'}`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetail />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="applicants" element={<Applicants />} />
          </Routes>
        </div>
      </div>
    </section>
  )
}
