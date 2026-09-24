import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { PROCESS_STEPS } from '../lib/constants'
import { IMAGES } from '../lib/images'

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-t border-ink-100 bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <SmartImage image={IMAGES.gallery[4]} className="h-full w-full opacity-[0.16]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/95 to-ink-950" />
      </div>
      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">
            How It Works
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">
            From enquiry to resolved — a straightforward process.
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
