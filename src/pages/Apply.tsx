import { Link, useLocation, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ApplicationForm from '../components/ApplicationForm'
import SmartImage from '../components/SmartImage'
import { IconArrowRight } from '../components/icons'
import SuccessBurst from '../components/SuccessBurst'
import { CONTACT } from '../lib/contact'
import { FORM_TITLE } from '../lib/applicationForm'
import { IMAGES } from '../lib/images'

const STEPS = ['Read & agree to the requirements', 'Tell us about yourself', 'Your training details', 'Upload your documents']

export default function Apply() {
  const [params] = useSearchParams()
  const submitted = params.get('submitted') === '1'
  const sent = (useLocation().state ?? {}) as { emailSent?: boolean; existingAccount?: boolean; email?: string }

  if (submitted) {
    return (
      <section className="flex min-h-[80svh] items-center bg-paper-dim/60 px-4 pt-24 pb-12 dark:bg-transparent">
        <Reveal className="mx-auto w-full max-w-xl">
          <div className="rounded-3xl border border-ink-200/70 bg-white p-8 text-center shadow-soft dark:border-white/10 dark:bg-ink-900 sm:p-12">
            <SuccessBurst />
            <h1 className="mt-6 font-display text-[26px] font-bold text-ink-950 dark:text-white">Application received</h1>
            <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-500 dark:text-ink-300">
              Thank you for applying. We&apos;ll review your details and be in touch.{' '}
              {sent.emailSent ? (
                <>
                  {sent.existingAccount ? 'You can sign in with your existing password' : <>We&apos;ve emailed your login details to <strong className="text-ink-900 dark:text-white">{sent.email}</strong></>} to follow your application. Check your spam folder if you don&apos;t see it.
                </>
              ) : (
                <>We&apos;ll email your login details shortly.</>
              )}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
            >
              Go to applicant login
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/" className="inline-flex items-center justify-center rounded-full border border-ink-200 px-6 py-3 text-[15px] font-semibold text-ink-700 dark:border-white/15 dark:text-ink-200">Back to home</Link>
            </div>
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <section className="bg-paper-dim/60 pt-[4.75rem] pb-3 dark:bg-transparent sm:pt-[5.5rem] sm:pb-4">
      <h1 className="sr-only">Apprenticeship and IT/SIWES/NYSC application</h1>
      {/* the whole application fits in one screen: the panels are viewport-tall and only the form body scrolls if it must */}
      <div className="mx-auto grid h-[calc(100svh-5.5rem)] min-h-[520px] max-w-[1600px] gap-4 px-3 sm:h-[calc(100svh-6.25rem)] sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-5 lg:px-10">
        {/* brand panel */}
        <aside className="relative hidden overflow-hidden rounded-3xl bg-deep text-white lg:flex lg:flex-col">
          <SmartImage image={IMAGES.internWiring} variant="dark" showLabel={false} className="absolute inset-0 h-full w-full opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-ink-950/30" />
          <div className="relative flex h-full flex-col justify-between gap-6 p-8 xl:p-10">
            <div>
              <p className="font-display text-[13px] font-bold tracking-[0.16em] text-amber-400">{FORM_TITLE}</p>
              <h2 className="mt-4 text-balance font-display text-[2.1rem] leading-[1.1] font-bold text-white xl:text-[2.5rem]">
                Learn the trade on real projects.
              </h2>
              <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-white/85">
                Apply for an apprenticeship or an IT/SIWES/NYSC placement. It takes about five minutes.
              </p>
            </div>

            <div>
              <ol className="space-y-3.5">
                {STEPS.map((label, i) => (
                  <li key={label} className="flex items-center gap-3.5 text-[14.5px] text-white/90">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 font-display text-[13px] font-semibold">
                      {i + 1}
                    </span>
                    {label}
                  </li>
                ))}
              </ol>
              <p className="mt-7 border-t border-white/20 pt-5 text-[13.5px] text-white/80">
                Need ICT services instead?{' '}
                <Link to="/contact" className="font-semibold text-white underline decoration-amber-400 underline-offset-4">Contact us</Link>
                {' · '}
                <a href={CONTACT.whatsapp.href} className="font-semibold text-white underline decoration-amber-400 underline-offset-4">WhatsApp</a>
              </p>
            </div>
          </div>
        </aside>

        <div className="min-h-0">
          <ApplicationForm />
        </div>
      </div>
    </section>
  )
}
