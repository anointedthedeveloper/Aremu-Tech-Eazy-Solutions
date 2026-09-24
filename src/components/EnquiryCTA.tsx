import Reveal from './Reveal'
import { IconArrowRight } from './icons'
import { ENQUIRY_FORM_URL } from '../lib/constants'

export default function EnquiryCTA() {
  return (
    <section id="enquiry" className="border-t border-ink-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-ink-950 px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
          >
            <div className="dot-grid absolute inset-0 text-ink-700" />
          </div>

          <div className="relative">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">
              Tell Us What You Need
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">
              Describe the problem. We&apos;ll work out how to solve it.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-balance text-[16px] leading-relaxed text-ink-300">
              Every request starts with a short enquiry form — what you need, and a
              little context. No account required, no obligation.
            </p>

            <div className="mt-9 flex justify-center">
              <a
                href={ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-400"
              >
                Submit an Enquiry
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="mt-4 text-[13px] text-ink-300">Opens our enquiry form in a new tab</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
