import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="pt-36 pb-24 text-center">
      <div className="mx-auto max-w-xl px-4">
        <p className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink-950 dark:text-white">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-[16px] text-ink-500 dark:text-ink-300">The link may be broken or the page may have moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="rounded-full bg-amber-500 px-6 py-3.5 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400">Back to home</Link>
          <Link to="/services" className="rounded-full border border-violet-300 px-6 py-3.5 text-[15px] font-semibold text-violet-700 dark:border-white/20 dark:text-white">Our services</Link>
        </div>
      </div>
    </section>
  )
}
