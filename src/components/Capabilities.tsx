import Reveal from './Reveal'
import {
  IconChip,
  IconClock,
  IconCompass,
  IconGlobe,
  IconLayers,
  IconShieldCheck,
  IconTools,
  IconWifi,
} from './icons'
import { CAPABILITIES } from '../lib/constants'

const TILE_ICONS = [IconChip, IconLayers, IconWifi, IconTools, IconCompass, IconShieldCheck, IconGlobe, IconClock]

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

          <Reveal delay={0.1} className="relative">
            <div className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/10 via-magenta-500/10 to-amber-300/15 blur-2xl" />
            <div className="relative rounded-2xl border border-ink-200/70 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(13,14,19,0.3)] sm:p-8">
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {TILE_ICONS.map((Icon, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-xl border border-ink-100 bg-ink-50/60 text-ink-600 transition-colors hover:border-amber-300 hover:text-amber-600"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-[12.5px] font-medium text-ink-500">
                Devices &middot; Systems &middot; Networks &middot; Software &middot; Support
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
