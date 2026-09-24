import Reveal from './Reveal'
import { DIFFERENTIATORS } from '../lib/constants'

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 text-ink-100 [mask-image:radial-gradient(ellipse_50%_50%_at_100%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
              Why Aremu Tech Eazy Solutions
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
              Support that treats your time and equipment with respect.
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-500">
              Plenty of places can technically fix a device. What matters more is how
              the request is handled from start to finish.
            </p>
          </Reveal>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="border-t border-ink-200 pt-5">
                <span className="font-display text-[13px] font-semibold text-amber-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-ink-950">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
