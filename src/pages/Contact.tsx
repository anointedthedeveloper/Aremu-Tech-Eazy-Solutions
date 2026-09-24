import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
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
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you need."
        description="Fill out the enquiry form below with what's going on, and we'll work out how to help. It's the same form, right here on the site."
        image={IMAGES.heroContact}
      />

      <section className="border-t border-ink-100 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SmartImage
                image={IMAGES.contactSupport}
                className="aspect-[4/3] w-full rounded-2xl"
              />

              <ul className="mt-8 space-y-6">
                {POINTS.map((point) => (
                  <li key={point.title} className="flex gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                      <point.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[14.5px] font-semibold text-ink-900">{point.title}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-500">{point.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-[0_20px_60px_-30px_rgba(13,14,19,0.3)]">
                <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                    Enquiry form
                  </p>
                  <a
                    href={ENQUIRY_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-700 transition-colors hover:text-amber-600"
                  >
                    Open in new tab
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
                <iframe
                  src={ENQUIRY_FORM_EMBED_URL}
                  title="Aremu Tech Eazy Solutions enquiry form"
                  className="h-[1200px] w-full"
                  loading="lazy"
                >
                  Loading enquiry form…
                </iframe>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
