import Reveal from './Reveal'
import SmartImage from './SmartImage'
import {
  IconChip,
  IconCompass,
  IconGlobe,
  IconLayers,
  IconTools,
  IconWifi,
} from './icons'
import { SERVICES } from '../lib/constants'
import { IMAGES } from '../lib/images'

const ICONS = [IconTools, IconChip, IconLayers, IconWifi, IconCompass, IconGlobe]
const THUMBS = [
  IMAGES.serviceSupport,
  IMAGES.serviceDevices,
  IMAGES.serviceSoftware,
  IMAGES.serviceNetworking,
  IMAGES.serviceConsulting,
  IMAGES.serviceWeb,
]

export default function Services() {
  return (
    <section className="border-t border-ink-100 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-20 sm:gap-24 lg:gap-28">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            const reversed = i % 2 === 1
            return (
              <Reveal key={service.index} delay={0.04}>
                <div
                  className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    reversed ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-16 -left-3 font-display text-[7rem] leading-none font-bold text-ink-100 select-none sm:-top-20 sm:text-[9rem] lg:-top-24"
                    >
                      {service.index}
                    </span>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200/70 shadow-[0_20px_60px_-30px_rgba(13,14,19,0.3)]">
                      <SmartImage
                        image={THUMBS[i % THUMBS.length]}
                        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="font-display text-[13px] font-semibold text-amber-600">
                      Service {service.index}
                    </p>
                    <h3 className="mt-3 max-w-md text-balance font-display text-[28px] leading-[1.1] font-bold text-ink-950 sm:text-[34px]">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-500">
                      {service.description}
                    </p>
                    <div className="mt-6 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent transition-all duration-500 group-hover:w-28" />
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
