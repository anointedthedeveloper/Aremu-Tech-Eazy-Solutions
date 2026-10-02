import { CAPABILITIES } from '../lib/constants'

export default function CapabilityStrip() {
  return (
    <section aria-label="What we work with" className="border-b border-ink-100 bg-white dark:border-white/10 dark:bg-ink-900/60">
      <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5 px-5 py-5 sm:px-8 lg:justify-between lg:px-10">
        <p className="w-full text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400 lg:w-auto">
          What we work with
        </p>
        {CAPABILITIES.slice(0, 7).map((item) => (
          <span
            key={item}
            className="rounded-full border border-violet-100 bg-violet-100/50 px-3.5 py-1.5 text-[13px] font-medium text-violet-800 dark:border-white/10 dark:bg-white/5 dark:text-ink-200"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
