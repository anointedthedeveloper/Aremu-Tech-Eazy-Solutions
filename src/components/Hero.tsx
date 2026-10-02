import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconArrowRight } from './icons'
import VideoCard from './VideoCard'
import { VIDEOS } from '../lib/images'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const rise = (delay: number, y = 16) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  return (
    <section id="top" className="relative overflow-hidden bg-deep">
      {/* ambient backdrop: blurred footage poster + brand-colour glow */}
      <img
        src={VIDEOS.fieldTesting.poster}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-10 px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:min-h-[86svh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:pt-28 lg:pb-16">
        <div>
          <motion.p
            {...rise(0, 12)}
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400"
          >
            ICT services &amp; CBT centres · Abuja, Nigeria
          </motion.p>

          <motion.h1
            {...rise(0.05, 18)}
            className="max-w-2xl text-balance text-[2.25rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            We keep your technology working,{' '}
            <span className="brand-gradient-text">so you don&apos;t have to.</span>
          </motion.h1>

          <motion.p
            {...rise(0.15)}
            className="mt-6 max-w-lg text-balance text-[17px] leading-relaxed text-ink-200 sm:text-[18px]"
          >
            An ICT services and supplies company based in Abuja, serving clients nationwide —
            from a single laptop to a full CBT exam hall. Set up properly, supported
            reliably, and explained in plain language.
          </motion.p>

          <motion.div {...rise(0.22)} className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
            >
              Contact Us
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
            >
              Our services
            </Link>
          </motion.div>

        </div>

        {/* real project footage, sped up */}
        <motion.div {...rise(0.2, 24)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative grid grid-cols-2 gap-3 sm:gap-5">
            <figure className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] sm:translate-y-6">
              <VideoCard video={VIDEOS.fieldTesting} eager className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 text-[12.5px] font-semibold text-white sm:p-4 sm:text-[13px]">
                <span className="mb-1.5 block h-0.5 w-8 rounded-full bg-amber-400" />
                Readiness testing, station by station
              </figcaption>
            </figure>
            <figure className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] sm:-translate-y-3">
              <VideoCard video={VIDEOS.labOverview} eager className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 text-[12.5px] font-semibold text-white sm:p-4 sm:text-[13px]">
                <span className="mb-1.5 block h-0.5 w-8 rounded-full bg-violet-400" />
                Full exam halls, ready to go
              </figcaption>
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
