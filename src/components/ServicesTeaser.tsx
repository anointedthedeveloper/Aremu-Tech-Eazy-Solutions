import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { IconArrowRight } from './icons'
import { SERVICES } from '../lib/constants'
import { IMAGES } from '../lib/images'

const FEATURED = [
  { service: SERVICES[0], image: IMAGES.serviceSupport },
  { service: SERVICES[3], image: IMAGES.serviceNetworking },
  { service: SERVICES[5], image: IMAGES.serviceWeb },
]

export default function ServicesTeaser() {
  return (
    <section className="border-t border-ink-100 bg-paper-dim/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
              What We Handle
            </p>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
              Practical tech support, from setup to sorted-out.
            </h2>
          </div>
          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-ink-950 transition-colors hover:text-amber-600"
          >
            View all services
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURED.map(({ service, image }, i) => (
            <Reveal key={service.index} delay={i * 0.08}>
              <Link
                to="/services"
                className="group block overflow-hidden rounded-2xl border border-ink-200/70 bg-white transition-shadow hover:shadow-[0_20px_45px_-25px_rgba(13,14,19,0.35)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <SmartImage
                    image={image}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="font-display text-[13px] font-semibold text-amber-600">
                    {service.index}
                  </span>
                  <h3 className="mt-1.5 text-[17px] font-semibold text-ink-950">
                    {service.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
