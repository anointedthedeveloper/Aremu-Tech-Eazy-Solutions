import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { IconCompass, IconShieldCheck, IconTarget } from './icons'
import { IMAGES } from '../lib/images'

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
    <section className="border-t border-ink-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-ink-200/70 shadow-[0_24px_70px_-30px_rgba(13,14,19,0.35)]">
              <SmartImage image={IMAGES.aboutTeam} className="h-full w-full" />
            </div>
            <div className="absolute -right-6 -bottom-10 hidden h-40 w-48 overflow-hidden rounded-xl border-4 border-paper shadow-[0_20px_50px_-20px_rgba(13,14,19,0.45)] sm:block lg:-right-10">
              <SmartImage image={IMAGES.serviceSupport} className="h-full w-full" />
            </div>
          </Reveal>

          <div className="lg:pt-4">
            <Reveal>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
                Who We Are
              </p>
              <p className="mt-4 max-w-lg text-balance font-display text-[26px] leading-snug font-semibold text-ink-950 sm:text-[30px]">
                We treat every enquiry like it&apos;s the only one that matters —
                understood properly, explained clearly, resolved without drama.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-ink-500">
                Aremu Tech Eazy Solutions exists for the moments technology gets in
                the way of what you&apos;re actually trying to do — a device that
                won&apos;t behave, software that needs setting up, a connection that
                keeps dropping. Rather than leaving you to work it out alone, we
                take the request, work out what&apos;s needed, and see it through.
              </p>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-500">
                We work with individuals and small businesses who want technology
                to simply work, without having to become experts in it themselves.
              </p>
            </Reveal>

            <ul className="mt-11 grid gap-7 border-t border-ink-200 pt-8 sm:grid-cols-3">
              {POINTS.map((point, i) => (
                <Reveal key={point.title} as="li" delay={0.14 + i * 0.06}>
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
