import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionBackground from './SectionBackground'
import SmartImage from './SmartImage'
import ParallaxImage from './ParallaxImage'
import { IconArrowRight } from './icons'
import { IMAGES } from '../lib/images'

const LEARNING = [
  'Cable stripping, termination and trunking on live installs',
  'Setting up and configuring laptops and workstations',
  'Running system-readiness checks before exam day',
  'Working safely on site, in the field, as part of a crew',
]

export default function Internship() {
  return (
    <section id="internship" className="relative overflow-hidden bg-deep py-16 sm:py-20 lg:py-24">
      <SectionBackground image={IMAGES.heroLabs} tone="dark" position="50% 50%" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal direction="left" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <ParallaxImage image={IMAGES.internWiring} className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-md">
                Intern on a live lab installation
              </p>
            </div>
            <div className="absolute -right-3 -bottom-8 hidden h-32 w-44 overflow-hidden rounded-xl border-4 border-ink-950 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:block lg:-right-8 lg:h-40 lg:w-56">
              <SmartImage image={IMAGES.labWoodDesk} variant="dark" showLabel={false} className="h-full w-full" />
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">
              Internship &amp; Training
            </p>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">
              Learn the trade where the work actually happens.
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-300">
              Our interns don&apos;t sit in a classroom. They join real crews on real
              projects — fitting out labs, wiring workstations and testing every
              machine — and build skills they can take anywhere in tech.
            </p>

            <ul className="mt-7 space-y-3.5">
              {LEARNING.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-ink-200">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-violet-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link
                to="/internship"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
              >
                See how the internship works
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/apply"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                Apply now
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
