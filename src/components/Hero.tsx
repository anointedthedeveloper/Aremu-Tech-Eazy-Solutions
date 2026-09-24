import { motion, useReducedMotion } from 'framer-motion'
import { IconArrowRight, IconMessageCheck, IconWifi } from './icons'
import { ENQUIRY_FORM_URL } from '../lib/constants'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* background texture */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 text-ink-300 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-amber-300/25 via-violet-500/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-8xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10">
        {/* copy */}
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-[13px] font-medium text-ink-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Technology solutions, handled for you
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-[2.5rem] font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.4rem]"
          >
            Tech problems solved, without the technical headache.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-ink-500 sm:text-[18px]"
          >
            Aremu Tech Eazy Solutions helps individuals and businesses deal with the
            everyday technology issues that get in the way — from devices that won&apos;t
            cooperate to software, networks and digital tools that need setting up
            properly. Tell us what&apos;s going on, and we take it from there.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <a
              href={ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Submit an Enquiry
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-6 py-3.5 text-[15px] font-semibold text-ink-800 transition-colors hover:border-ink-950 hover:text-ink-950"
            >
              See what we handle
            </a>
          </motion.div>
        </div>

        {/* visual composition */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* triangle motif — brand mark echo, sitting behind the panel */}
          <svg
            viewBox="0 0 200 180"
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 right-6 h-40 w-40 sm:right-10 sm:h-48 sm:w-48"
          >
            <defs>
              <linearGradient id="heroTri" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9a7fdb" />
                <stop offset="55%" stopColor="#c04aa8" />
                <stop offset="100%" stopColor="#ee8620" />
              </linearGradient>
            </defs>
            <path
              d="M100 8 L188 168 L12 168 Z"
              fill="none"
              stroke="url(#heroTri)"
              strokeWidth="2"
              strokeLinejoin="round"
              opacity="0.9"
            />
          </svg>

          {/* enquiry preview panel */}
          <div className="relative rounded-2xl border border-ink-200/70 bg-white shadow-[0_20px_60px_-25px_rgba(13,14,19,0.35)]">
            <div className="flex items-center gap-1.5 border-b border-ink-100 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="ml-3 text-[12px] font-medium text-ink-500">New enquiry — preview</span>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  What&apos;s going on?
                </p>
                <div className="mt-2 rounded-lg border border-ink-100 bg-ink-50/50 px-3.5 py-3">
                  <p className="text-[13.5px] text-ink-400">
                    e.g. &ldquo;Office Wi-Fi keeps dropping every afternoon&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  Category
                </p>
                <div className="mt-2 flex items-center gap-3 rounded-lg border border-amber-200/70 bg-amber-50/60 px-3.5 py-3">
                  <IconWifi className="h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-[13.5px] font-medium text-ink-800">Networking &amp; Connectivity</p>
                </div>
              </div>

              <div className="flex items-center justify-end border-t border-ink-100 pt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-[12.5px] font-semibold text-white">
                  Submit
                  <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* floating status card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3.5 shadow-[0_16px_40px_-18px_rgba(13,14,19,0.4)] sm:-left-10"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <IconMessageCheck className="h-[18px] w-[18px]" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink-900">Request received</p>
              <p className="text-[12px] text-ink-500">We&apos;ll take it from here</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
