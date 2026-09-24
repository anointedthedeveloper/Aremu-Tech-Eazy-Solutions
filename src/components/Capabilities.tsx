import Reveal from './Reveal'
import { CAPABILITIES } from '../lib/constants'

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
              What We Work With
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
              Everyday technology, across the board.
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-500">
              We&apos;re not tied to one brand or system. Most requests fall into one of
              these areas — if yours doesn&apos;t, tell us anyway and we&apos;ll let you know
              whether it&apos;s something we can take on.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink-200 px-4 py-2 text-[13.5px] font-medium text-ink-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-8 sm:p-10">
              <div className="dot-grid absolute inset-0 text-ink-800 opacity-60 [mask-image:radial-gradient(ellipse_65%_65%_at_30%_20%,black,transparent)]" />

              <svg
                viewBox="0 0 200 180"
                aria-hidden="true"
                className="relative h-24 w-24 sm:h-28 sm:w-28"
              >
                <defs>
                  <linearGradient id="capTri" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9a7fdb" />
                    <stop offset="55%" stopColor="#c04aa8" />
                    <stop offset="100%" stopColor="#ee8620" />
                  </linearGradient>
                </defs>
                <path
                  d="M100 8 L188 168 L12 168 Z"
                  fill="none"
                  stroke="url(#capTri)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>

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
