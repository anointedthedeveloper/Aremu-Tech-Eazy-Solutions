import Reveal from './Reveal'
import { IconCompass, IconShieldCheck, IconTarget } from './icons'

const POINTS = [
  {
    icon: IconTarget,
    title: 'Focused on the actual problem',
    text: 'We start from what you’re dealing with, not a fixed service package.',
  },
  {
    icon: IconShieldCheck,
    title: 'Careful with your equipment',
    text: 'Your devices, data and accounts are handled with the same care we’d want for our own.',
  },
  {
    icon: IconCompass,
    title: 'Clear about next steps',
    text: 'You’ll always know what’s being done and why before we do it.',
  },
]

export default function CompanyIntro() {
  return (
    <section id="about" className="border-t border-ink-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
              About Us
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
              A tech partner for the problems that aren&apos;t worth losing a day to.
            </h2>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <p className="text-[17px] leading-relaxed text-ink-500">
                Aremu Tech Eazy Solutions exists for the moments technology gets in the
                way of what you’re actually trying to do — a device that won’t
                behave, software that needs setting up, a connection that keeps
                dropping. Rather than leaving you to work it out alone, or sending you
                somewhere else, we take the request, work out what’s needed, and see
                it through.
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-500">
                We work with individuals and small businesses who want technology to
                simply work, without having to become experts in it themselves. Every
                enquiry goes through the same process: understood properly, explained
                clearly, and resolved without unnecessary back-and-forth.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {POINTS.map((point, i) => (
                <Reveal key={point.title} as="li" delay={0.1 + i * 0.06}>
                  <point.icon className="h-5 w-5 text-amber-600" />
                  <p className="mt-3 text-[14.5px] font-semibold text-ink-900">{point.title}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{point.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
