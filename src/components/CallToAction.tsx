import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { IconArrowRight } from './icons'

const COPY = {
  contact: {
    eyebrow: 'Contact Us',
    title: 'Need ICT services or a CBT centre set up?',
    text: 'Tell us what you need — a repair, a new lab, CCTV, a network or software — and we will work out how to help. No obligation.',
    to: '/contact',
    label: 'Contact Us',
  },
  apply: {
    eyebrow: 'Apply',
    title: 'Ready to learn on real projects?',
    text: 'Apply for an apprenticeship or an IT/SIWES/NYSC placement. It takes a few minutes and you can upload your documents online.',
    to: '/apply',
    label: 'Apply Now',
  },
} as const

export default function CallToAction({ variant = 'contact' }: { variant?: keyof typeof COPY }) {
  const c = COPY[variant]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Reveal className="bg-deep relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:py-16">
          <div className="max-w-xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">{c.eyebrow}</p>
            <h2 className="mt-3 text-balance text-[1.75rem] font-bold leading-tight text-white sm:text-[2.1rem]">{c.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-300">{c.text}</p>
          </div>
          <Link
            to={c.to}
            className="group mt-8 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400 lg:mt-0"
          >
            {c.label}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
