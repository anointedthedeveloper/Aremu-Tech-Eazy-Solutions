import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconArrowRight, IconMessageCheck } from './icons'
import BrandTriangle from './BrandTriangle'
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
      <div className="brand-glow pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/[0.04] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto grid w-full max-w-8xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:min-h-[88svh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 lg:pt-32 lg:pb-20">
        <div>
          <motion.p
            {...rise(0, 12)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            IT support, networks &amp; CBT centre setup
          </motion.p>

          <motion.h1
            {...rise(0.05, 18)}
            className="max-w-2xl text-balance text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4rem]"
          >
            We keep your technology working,{' '}
            <span className="brand-gradient-text">so you don&apos;t have to.</span>
          </motion.h1>

          <motion.p
            {...rise(0.15)}
            className="mt-6 max-w-lg text-balance text-[17px] leading-relaxed text-ink-200 sm:text-[18px]"
          >
            From a single laptop to a full exam hall, Aremu Tech Eazy Solutions
            handles the devices, cabling, software and networks that get in the
            way of your day — set up properly and explained in plain language.
          </motion.p>

          <motion.div {...rise(0.22)} className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-400"
            >
              Submit an Enquiry
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
            >
              See what we handle
            </Link>
          </motion.div>

          <motion.div
            {...rise(0.5, 14)}
            className="mt-7 hidden max-w-xs items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-md sm:flex"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/25 text-violet-400">
              <IconMessageCheck className="h-[18px] w-[18px]" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">Every enquiry gets a reply</p>
              <p className="text-[12px] text-ink-300">No jargon, no auto-responder loop</p>
            </div>
          </motion.div>
        </div>

        {/* real project footage, sped up */}
        <motion.div {...rise(0.2, 24)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <BrandTriangle
            gradientId="heroTri"
            strokeWidth={1.5}
            opacity={0.7}
            className="pointer-events-none absolute -top-10 -right-4 h-32 w-32 sm:h-40 sm:w-40"
          />
          <div className="relative grid grid-cols-2 gap-3 sm:gap-5">
            <figure className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] sm:translate-y-8">
              <VideoCard video={VIDEOS.fieldTesting} eager className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 text-[12.5px] font-semibold text-white sm:p-4 sm:text-[13px]">
                <span className="mb-1.5 block h-0.5 w-8 rounded-full bg-amber-400" />
                Readiness testing, station by station
              </figcaption>
            </figure>
            <figure className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] sm:-translate-y-4">
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
