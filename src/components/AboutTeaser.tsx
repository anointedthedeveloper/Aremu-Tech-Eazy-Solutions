import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { IconArrowRight } from './icons'

export default function AboutTeaser() {
  return (
    <section className="border-t border-ink-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
              About Us
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
              A tech partner for the problems that aren&apos;t worth losing a day to.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-[16px] leading-relaxed text-ink-500">
              We work with individuals and small businesses who want technology to
              simply work, without having to become experts in it themselves. Every
              enquiry is understood properly, explained clearly, and resolved without
              unnecessary back-and-forth.
            </p>
            <Link
              to="/about"
              className="group mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-ink-950 transition-colors hover:text-amber-600"
            >
              More about how we work
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
