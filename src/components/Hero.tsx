import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconArrowRight, IconMessageCheck } from './icons'
import BrandTriangle from './BrandTriangle'
import HeroSlideshow from './HeroSlideshow'
import { IMAGES } from '../lib/images'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden sm:min-h-[88svh]">
      <HeroSlideshow slides={IMAGES.heroSlides} />

      {/* subtle technical grid over the photo */}
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/[0.05]" />

      <BrandTriangle
        gradientId="heroTri"
        strokeWidth={1.5}
        opacity={0.5}
        className="pointer-events-none absolute -top-6 right-8 hidden h-40 w-40 sm:block lg:right-16 lg:h-52 lg:w-52"
      />

      <div className="relative mx-auto w-full max-w-8xl px-5 pt-32 pb-14 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          IT support &amp; digital solutions
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="max-w-2xl text-balance text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4rem]"
        >
          We keep your technology working, so you don&apos;t have to.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-lg text-balance text-[17px] leading-relaxed text-ink-200 sm:text-[18px]"
        >
          Aremu Tech Eazy Solutions handles the devices, software, networks and
          digital tools that get in the way of your day — diagnosed clearly,
          fixed properly, and explained in plain language.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
        >
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

        {/* floating status chip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 hidden max-w-xs items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-md sm:flex"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
            <IconMessageCheck className="h-[18px] w-[18px]" />
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-white">Every enquiry gets a reply</p>
            <p className="text-[12px] text-ink-300">No jargon, no auto-responder loop</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
