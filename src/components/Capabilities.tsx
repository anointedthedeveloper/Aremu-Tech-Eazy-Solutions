import Reveal from './Reveal'
import { CAPABILITIES } from '../lib/constants'

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
              What We Work With
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
              Everyday technology, across the board.
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-500 dark:text-ink-300">
              We&apos;re not tied to one brand or system. Most requests fall into one of
              these areas — if yours doesn&apos;t, tell us anyway and we&apos;ll let you know
              whether it&apos;s something we can take on.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-violet-100 dark:border-white/10 bg-violet-100/40 dark:bg-white/5 px-4 py-2 text-[13.5px] font-medium text-ink-700 dark:text-ink-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl bg-deep p-8 sm:p-10">


              <p className="relative mt-7 max-w-xs font-display text-[21px] font-semibold leading-snug text-white sm:text-[23px]">
                No brand lock-in. No platform bias.
              </p>
              <p className="relative mt-3 max-w-xs text-[14.5px] leading-relaxed text-ink-300">
                If it plugs in, connects, or runs software, there&apos;s a good chance
                we can help with it.
              </p>

              <p className="relative mt-8 border-t border-ink-800 pt-5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-amber-400">
                Devices &middot; Systems &middot; Networks &middot; Software &middot; Support
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
