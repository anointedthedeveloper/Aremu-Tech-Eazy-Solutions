import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ApplicationForm from '../components/ApplicationForm'
import BrandTriangle from '../components/BrandTriangle'
import { IconArrowRight, IconCheck } from '../components/icons'
import { CONTACT } from '../lib/contact'

export default function Apply() {
  const [params] = useSearchParams()
  const submitted = params.get('submitted') === '1'

  return (
    <section className="relative overflow-hidden bg-deep pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      <div className="brand-glow pointer-events-none absolute inset-0 opacity-80" />
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/[0.04] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <BrandTriangle gradientId="applyTri" strokeWidth={1.5} opacity={0.5} className="pointer-events-none absolute top-20 right-8 hidden h-36 w-36 sm:block lg:right-16" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="mb-8 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">Apply</p>
          <h1 className="mt-4 text-balance font-display text-[2.25rem] leading-[1.08] font-bold text-white sm:text-5xl">
            Apprenticeship &amp; IT/SIWES/NYSC application
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[16.5px] leading-relaxed text-ink-300">
            Applying to train with us? Complete the form below. Looking for ICT services instead?{' '}
            <Link to="/contact" className="font-semibold text-white underline decoration-amber-400 underline-offset-4">
              Send a business enquiry
            </Link>
            .
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="light-surface rounded-2xl border border-ink-200/70 bg-white p-8 text-center shadow-lifted dark:border-white/10 dark:bg-ink-900 sm:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15">
                <IconCheck className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-display text-[26px] font-bold text-ink-950 dark:text-white">Application received</h2>
              <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-500 dark:text-ink-300">
                Thank you for applying. We&apos;ll review your details and contact you using the phone number or email you provided.
                Questions? Reach us on{' '}
                <a href={CONTACT.whatsapp.href} className="font-semibold text-violet-700 dark:text-violet-400">
                  WhatsApp
                </a>
                .
              </p>
              <Link
                to="/"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-400"
              >
                Back to home
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.08}>
            <ApplicationForm />
          </Reveal>
        )}
      </div>
    </section>
  )
}
