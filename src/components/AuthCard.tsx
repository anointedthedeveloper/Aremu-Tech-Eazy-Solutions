import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

/** Centered card layout shared by the two sign-in pages. */
export default function AuthCard({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <section className="flex min-h-[100svh] items-center justify-center bg-paper-dim/60 px-4 pt-24 pb-12 dark:bg-transparent">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-ink-200/70 bg-white p-7 shadow-lifted dark:border-white/10 dark:bg-ink-900 sm:p-9">
          <Link to="/" aria-label="Aremu Tech Eazy Solutions — home" className="inline-block">
            <span className="dark:hidden"><Logo variant="dark" /></span>
            <span className="hidden dark:block"><Logo variant="light" /></span>
          </Link>
          <h1 className="mt-6 font-display text-[1.75rem] leading-tight font-bold text-ink-950 dark:text-white">{title}</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-5 text-center text-[14px] text-ink-500 dark:text-ink-300">{footer}</div>}
      </div>
    </section>
  )
}
