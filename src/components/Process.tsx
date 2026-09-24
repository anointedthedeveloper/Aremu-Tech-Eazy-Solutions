import Reveal from './Reveal'
import { PROCESS_STEPS } from '../lib/constants'

export default function Process() {
  return (
    <section id="process" className="border-t border-ink-100 bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">
            How It Works
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">
            From enquiry to resolved — a straightforward process.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute top-5 right-0 left-0 hidden h-px bg-ink-700 lg:block"
          />
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08} className="relative">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-950 font-display text-[13px] font-semibold text-amber-400">
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
