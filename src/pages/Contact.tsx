import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { IconArrowRight, IconCheck } from '../components/icons'
import { CONTACT } from '../lib/contact'

const row = 'flex flex-col gap-0.5 border-b border-ink-100 py-4 last:border-0 dark:border-white/10'
const rowLabel = 'text-[12px] font-semibold uppercase tracking-[0.12em] text-violet-600 dark:text-violet-400'
const rowLink = 'text-[16px] font-medium text-ink-950 transition-colors hover:text-violet-700 dark:text-white dark:hover:text-violet-400'

export default function Contact() {
  const [params] = useSearchParams()
  const sent = params.get('sent') === '1'

  return (
    <section className="bg-paper-dim/60 pt-28 pb-14 dark:bg-transparent sm:pt-32 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Contact Us</p>
            <h1 className="mt-3 text-balance font-display text-[2.25rem] leading-[1.08] font-bold text-ink-950 dark:text-white sm:text-5xl">
              Let&apos;s talk about your project.
            </h1>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-ink-500 dark:text-ink-300">
              CBT and ICT centre setup, repairs, networking, CCTV, software or supplies — send us a message or reach us directly.
            </p>

            <address className="mt-8 rounded-2xl border border-ink-200/70 bg-white px-5 py-2 not-italic dark:border-white/10 dark:bg-ink-900">
              <div className={row}>
                <span className={rowLabel}>Phone</span>
                {CONTACT.phones.map((p) => (
                  <a key={p.href} href={p.href} className={rowLink}>{p.label}</a>
                ))}
              </div>
              <div className={row}>
                <span className={rowLabel}>WhatsApp</span>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className={rowLink}>{CONTACT.whatsapp.label}</a>
              </div>
              <div className={row}>
                <span className={rowLabel}>Email</span>
                <a href={`mailto:${CONTACT.email}`} className={`${rowLink} break-all`}>{CONTACT.email}</a>
              </div>
              <div className={row}>
                <span className={rowLabel}>Offices</span>
                {CONTACT.addresses.map((a) => (
                  <span key={a} className="text-[15px] text-ink-700 dark:text-ink-200">{a}</span>
                ))}
              </div>
            </address>

            <p className="mt-6 text-[14.5px] text-ink-500 dark:text-ink-300">
              Looking to train with us instead?{' '}
              <Link to="/apply" className="font-semibold text-violet-700 underline decoration-amber-500 underline-offset-4 dark:text-violet-400">
                Apply here
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            {sent ? (
              <div className="rounded-2xl border border-ink-200/70 bg-white p-8 text-center shadow-soft dark:border-white/10 dark:bg-ink-900 sm:p-12">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15">
                  <IconCheck className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-display text-[26px] font-bold text-ink-950 dark:text-white">Message sent</h2>
                <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-500 dark:text-ink-300">
                  Thanks for reaching out. We&apos;ll get back to you shortly. For anything urgent, call or WhatsApp us.
                </p>
                <Link
                  to="/"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
                >
                  Back to home
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ) : (
              <ContactForm />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
