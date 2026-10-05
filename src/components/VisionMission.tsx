import Reveal from './Reveal'
import { VALUES } from '../lib/constants'

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-deep py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">Our Vision</p>
            <p className="mt-4 font-display text-[24px] leading-snug font-semibold text-white sm:text-[28px]">
              To become a leading force in Africa&apos;s digital transformation — delivering
              innovative, reliable and smart ICT solutions that empower individuals,
              businesses and institutions.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">Our Mission</p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-200">
              To provide cutting-edge ICT services — repair, supply and installation, CBT
              centre setup, networking, software and web development, CCTV and digital
              literacy training — that improve efficiency, security and digital inclusion
              for clients across every sector.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 border-t border-white/15 pt-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-300">Core Values</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {VALUES.map((v) => (
              <li key={v} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[14px] font-medium text-white">
                {v}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
