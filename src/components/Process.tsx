import Reveal from './Reveal'
import SectionBackground from './SectionBackground'
import { PROCESS_STEPS } from '../lib/constants'
import { IMAGES } from '../lib/images'

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-t border-ink-100 bg-deep py-16 sm:py-20 lg:py-24">
      <SectionBackground image={IMAGES.heroHall} tone="dark" position="50% 45%" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">
            How It Works
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">
            From first contact to resolved — a straightforward process.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink-800">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 font-display text-[13px] font-semibold text-amber-400">
                {step.index}
              </div>
              <h3 className="mt-5 text-[16.5px] font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-300">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
