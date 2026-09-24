import { useState } from 'react'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import BrandTriangle from '../components/BrandTriangle'
import { IconArrowRight, IconClock, IconMessageCheck, IconShieldCheck } from '../components/icons'
import { ENQUIRY_FORM_EMBED_URL, ENQUIRY_FORM_URL } from '../lib/constants'
import { IMAGES } from '../lib/images'

const POINTS = [
  {
    icon: IconMessageCheck,
    title: 'Just describe the problem',
    text: 'No technical jargon required — tell us what’s going on in your own words.',
  },
  {
    icon: IconClock,
    title: 'Takes about a minute',
    text: 'A handful of short questions. No account or sign-up needed.',
  },
  {
    icon: IconShieldCheck,
    title: 'No obligation',
    text: 'Submitting an enquiry doesn’t commit you to anything.',
  },
]

export default function Contact() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <section className="relative bg-ink-950 pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <SmartImage
          image={IMAGES.heroContact}
          variant="dark"
          showLabel={false}
          className="h-full w-full opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/90 to-ink-950" />
        <div className="grid-lines absolute inset-0 text-white/[0.04]" />
      </div>

      <BrandTriangle
        gradientId="contactTri"
        strokeWidth={1.5}
        opacity={0.5}
        className="pointer-events-none absolute top-16 right-8 hidden h-36 w-36 sm:block lg:right-16"
      />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* left: pitch + contact context */}
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">
              Contact
            </p>
            <h1 className="mt-4 text-balance font-display text-[2.25rem] leading-[1.08] font-bold text-white sm:text-5xl">
              Tell us what you need.
            </h1>
            <p className="mt-5 max-w-md text-balance text-[16.5px] leading-relaxed text-ink-300">
              Describe the problem below and we&apos;ll work out how to help — the
              same enquiry form, presented right here on the site.
            </p>

            <ul className="mt-10 space-y-6 border-t border-white/10 pt-8">
              {POINTS.map((point) => (
                <li key={point.title} className="flex gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                    <point.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold text-white">{point.title}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-400">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-300 transition-colors hover:text-white"
            >
              Prefer the form in its own tab? Open it directly
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          {/* right: floating form panel */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-paper shadow-[0_32px_80px_-24px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-ink-100 bg-white px-5 py-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                  Enquiry form
                </p>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="relative max-h-[640px] overflow-y-auto">
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 animate-pulse space-y-4 bg-white p-6">
                    <div className="h-4 w-1/3 rounded bg-ink-100" />
                    <div className="h-10 w-full rounded-lg bg-ink-50" />
                    <div className="h-4 w-1/4 rounded bg-ink-100" />
                    <div className="h-10 w-full rounded-lg bg-ink-50" />
                    <div className="h-4 w-1/3 rounded bg-ink-100" />
                    <div className="h-24 w-full rounded-lg bg-ink-50" />
                    <div className="h-10 w-32 rounded-full bg-ink-100" />
                  </div>
                )}
                <iframe
                  src={ENQUIRY_FORM_EMBED_URL}
                  title="Aremu Tech Eazy Solutions enquiry form"
                  className="h-[1400px] w-full"
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                >
                  Loading enquiry form…
                </iframe>
              </div>
              <p className="border-t border-ink-100 bg-white px-5 py-3 text-center text-[12px] text-ink-400">
                Scroll within the form to see every question
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
