import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { IconArrowRight } from './icons'
import { SERVICES, serviceHref } from '../lib/services'

export default function Services() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.06}>
              <Link
                to={serviceHref(service)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lifted dark:border-white/10 dark:bg-ink-900"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage image={service.image} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105" />
                  <span className="absolute top-3.5 left-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-violet-700 shadow-soft backdrop-blur dark:bg-ink-950/80 dark:text-violet-400">
                    <service.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="font-display text-[13px] font-semibold text-violet-600 dark:text-violet-400">{service.index}</span>
                  <h3 className="mt-1.5 text-[19px] leading-snug font-semibold text-ink-950 dark:text-white">{service.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-500 dark:text-ink-300">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-violet-700 dark:text-violet-400">
                    View details
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
