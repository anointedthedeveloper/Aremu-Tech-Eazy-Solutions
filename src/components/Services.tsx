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
    <section className="border-t border-ink-100 bg-paper-dim/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="divide-y divide-ink-200/70 border-y border-ink-200/70">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={service.index} delay={i * 0.04}>
                <div className="group grid grid-cols-[auto_1fr] items-start gap-5 px-4 py-7 transition-colors -mx-4 hover:bg-white sm:grid-cols-[3.5rem_4.5rem_1fr] sm:items-center sm:gap-6 sm:py-8">
                  <span className="font-display text-[14px] font-semibold text-amber-600">
                    {service.index}
                  </span>
                  <span className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-ink-200 sm:block">
                    <SmartImage image={THUMBS[i % THUMBS.length]} className="h-full w-full" />
                    <span className="absolute right-1 bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm">
                      <Icon className="h-3 w-3" />
                    </span>
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
