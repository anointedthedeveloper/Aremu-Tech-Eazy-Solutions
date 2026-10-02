import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ApplicationForm from '../components/ApplicationForm'
import { IconArrowRight, IconCheck } from '../components/icons'
import { CONTACT } from '../lib/contact'

export default function Apply() {
  const [params] = useSearchParams()
  const submitted = params.get('submitted') === '1'

  return (
    <section className="bg-paper-dim/60 pt-28 pb-14 dark:bg-transparent sm:pt-32 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="mb-8 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Apply</p>
          <h1 className="mt-3 text-balance font-display text-[2.1rem] leading-[1.1] font-bold text-ink-950 dark:text-white sm:text-[2.75rem]">
            Apprenticeship &amp; IT/SIWES/NYSC application
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[16px] leading-relaxed text-ink-500 dark:text-ink-300">
            Complete the three short steps below. Need ICT services instead?{' '}
            <Link to="/contact" className="font-semibold text-violet-700 underline decoration-amber-500 underline-offset-4 dark:text-violet-400">
              Contact us
            </Link>
            .
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="rounded-2xl border border-ink-200/70 bg-white p-8 text-center shadow-soft dark:border-white/10 dark:bg-ink-900 sm:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15">
                <IconCheck className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-display text-[26px] font-bold text-ink-950 dark:text-white">Application received</h2>
              <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-500 dark:text-ink-300">
                Thank you for applying. We&apos;ll review your details and contact you using the phone number or email you provided.
                Questions? Reach us on{' '}
                <a href={CONTACT.whatsapp.href} className="font-semibold text-violet-700 dark:text-violet-400">WhatsApp</a>.
              </p>
              <Link
                to="/"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
              >
                Back to home
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.06}>
            <ApplicationForm />
          </Reveal>
        )}
      </div>
    </section>
  )
}
