import Reveal from './Reveal'
import {
  IconChip,
  IconCompass,
  IconGlobe,
  IconLayers,
  IconTools,
  IconWifi,
} from './icons'
import { SERVICES } from '../lib/constants'

const ICONS = [IconTools, IconChip, IconLayers, IconWifi, IconCompass, IconGlobe]

export default function Services() {
  return (
    <section id="services" className="border-t border-ink-100 bg-paper-dim/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
            What We Handle
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
            Practical tech support, from setup to sorted-out.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
            These are the areas customers most often reach out about. If what you need
            doesn&apos;t fit neatly into a category, submit an enquiry anyway — that&apos;s what it&apos;s
            there for.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-ink-200/70 border-y border-ink-200/70">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={service.index} delay={i * 0.04}>
                <div className="group grid grid-cols-[auto_1fr] items-start gap-5 py-7 transition-colors sm:grid-cols-[3.5rem_auto_1fr] sm:items-center sm:gap-8 sm:py-8">
                  <span className="font-display text-[14px] font-semibold text-ink-300 transition-colors group-hover:text-amber-600">
                    {service.index}
                  </span>
                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-200 text-ink-700 transition-colors group-hover:border-amber-400 group-hover:text-amber-600 sm:flex">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="col-span-2 sm:col-span-1">
                    <h3 className="font-display text-[19px] font-semibold text-ink-950 sm:text-[21px]">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
