import type { ReactNode } from 'react'

export type Status = 'new' | 'reviewing' | 'accepted' | 'waitlisted' | 'rejected'

export const STATUS_LABEL: Record<Status, string> = {
  new: 'Received',
  reviewing: 'Under review',
  accepted: 'Accepted',
  waitlisted: 'Waiting list',
  rejected: 'Not successful',
}

const STATUS_STYLE: Record<Status, string> = {
  new: 'bg-azure-100 text-azure-600 dark:bg-azure-500/15 dark:text-azure-400',
  reviewing: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  waitlisted: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_STYLE[status]}`}>{STATUS_LABEL[status]}</span>
}

export const fmtDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export const fmtDateTime = (d: string | Date) =>
  new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export const fmtSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-ink-900 sm:p-6 ${className}`}>{children}</section>
}

export function CardTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-display text-[18px] font-bold text-ink-950 dark:text-white">{children}</h2>
      {aside}
    </div>
  )
}

export function ErrorNote({ message }: { message: string }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
      {message}
    </p>
  )
}

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-[14px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400 disabled:opacity-60'
export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-[13.5px] font-semibold text-ink-700 transition-colors hover:bg-ink-50 disabled:opacity-60 dark:border-white/15 dark:text-ink-200 dark:hover:bg-white/10'
export const inputCls =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[14.5px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-ink-900 dark:text-white'

export function DocLink({ id, label, name, size }: { id: string; label: string; name: string; size: number }) {
  return (
    <a
      href={`/api/files?id=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 rounded-xl border border-ink-200/70 px-4 py-3 text-[14px] transition-colors hover:border-violet-400 hover:bg-violet-100/40 dark:border-white/10 dark:hover:bg-white/5"
    >
      <span className="min-w-0">
        <span className="block font-semibold text-ink-900 dark:text-white">{label}</span>
        <span className="block truncate text-[12.5px] text-ink-500 dark:text-ink-400">{name} · {fmtSize(size)}</span>
      </span>
      <span className="shrink-0 text-[13px] font-semibold text-violet-700 dark:text-violet-400">Open ↗</span>
    </a>
  )
}
