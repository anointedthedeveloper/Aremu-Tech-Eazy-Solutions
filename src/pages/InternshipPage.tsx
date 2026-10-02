import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import EnquiryCTA from '../components/EnquiryCTA'
import { IconArrowRight, IconChip, IconCheck, IconLayers, IconShieldCheck, IconTools, IconWifi } from '../components/icons'
import { IMAGES } from '../lib/images'

const LEARN = [
  { icon: IconTools, title: 'Cabling & trunking', text: 'Measuring, cutting, routing and terminating cable — the physical backbone of every lab.' },
  { icon: IconChip, title: 'Laptop & workstation setup', text: 'Unboxing, configuring and preparing machines so every station behaves identically.' },
  { icon: IconLayers, title: 'Exam software & readiness checks', text: 'Running system-readiness inspections and confirming each machine meets exam requirements.' },
  { icon: IconWifi, title: 'Networking basics', text: 'How a lab is connected, and how to trace and fix a station that drops off.' },
  { icon: IconShieldCheck, title: 'Working safely on site', text: 'Site etiquette, hi-vis, tidy work and looking after the client’s space and equipment.' },
  { icon: IconArrowRight, title: 'Communication & teamwork', text: 'Reporting progress clearly and working as part of a crew to a deadline.' },
]

const STEPS = [
  { title: 'Send an enquiry', text: 'Use the enquiry form and tell us a little about yourself and what you want to learn.' },
  { title: 'We get in touch', text: 'We reply to talk through fit, availability and what the internship involves.' },
  { title: 'Join a crew', text: 'You’re paired with an experienced technician on a real project.' },
  { title: 'Take on more', text: 'As you gain confidence you’re given more responsibility on each install.' },
]

const WHO = [
  'Students and graduates curious about IT and networking',
  'Self-taught techies who want real, supervised experience',
  'Anyone changing careers into hands-on technology work',
]

const FAQ = [
  { q: 'Do I need experience?', a: 'Curiosity and a willingness to learn matter most. Tell us your background in the enquiry and we’ll take it from there.' },
  { q: 'Where does the work happen?', a: 'On live project sites — computer labs and exam halls being fitted out — so expect to travel with the crew.' },
  { q: 'Is the internship paid?', a: 'Arrangements are discussed individually. Mention what you’re looking for when you enquire.' },
  { q: 'How long does it run?', a: 'It depends on the projects running and your availability — we’ll agree this with you up front.' },
]

export default function InternshipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Internship & Training"
        title="Learn the trade where the work actually happens."
        description="Our interns join real crews on real projects — fitting out labs, wiring workstations and testing every machine — and leave with skills they can use anywhere in tech."
        image={IMAGES.internWiring}
      >
        <Link
          to="/contact"
          className="group mt-7 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-400"
        >
          Apply via enquiry
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </PageHeader>

      <section className="border-t border-ink-100 py-20 dark:border-white/10 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">What You&apos;ll Learn</p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
              Practical skills, learned on the job.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-white/10 dark:bg-ink-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold text-ink-950 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500 dark:text-ink-300">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep py-16 sm:py-20 lg:py-24">
        <div className="brand-glow pointer-events-none absolute inset-0 opacity-80" />
        <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">How It Works</p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">From enquiry to your first install.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 font-display text-[13px] font-semibold text-amber-400">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-5 text-[16.5px] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-300">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-8xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Who It&apos;s For</p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
              Built for people who learn by doing.
            </h2>
            <ul className="mt-7 space-y-4">
              {WHO.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-snug text-ink-700 dark:text-ink-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-ink-200/70 dark:border-white/10">
              <SmartImage image={IMAGES.labTechnician} className="h-full w-full" />
            </div>
            <div className="mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-ink-200/70 dark:border-white/10">
              <SmartImage image={IMAGES.siteCrew} className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-paper-dim/60 py-20 dark:border-white/10 dark:bg-ink-900/50 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">Questions</p>
            <h2 className="mt-4 text-3xl font-bold text-ink-950 dark:text-white sm:text-[2.25rem]">Before you apply.</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-ink-200 rounded-2xl border border-ink-200/70 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-ink-900">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-ink-950 dark:text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-xl leading-none text-violet-600 transition-transform group-open:rotate-45 dark:text-violet-400">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </>
  )
}
