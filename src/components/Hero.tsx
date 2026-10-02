import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import VideoCard from './VideoCard'
import SmartImage from './SmartImage'
import { IconArrowRight } from './icons'
import { IMAGES, VIDEOS, type SiteImage, type SiteVideo } from '../lib/images'

interface Cta {
  to: string
  label: string
}

interface BaseSlide {
  kicker: string
  title: string
  text: string
  primary: Cta
  secondary: Cta
}
interface PhotoSlide extends BaseSlide {
  kind: 'photo'
  image: SiteImage
  position?: string
}
interface VideoSlide extends BaseSlide {
  kind: 'video'
  video: SiteVideo
}
type Slide = PhotoSlide | VideoSlide

const SLIDES: Slide[] = [
  {
    kind: 'photo',
    image: IMAGES.heroTeam,
    position: '50% 30%',
    kicker: 'ICT services & CBT centres · Abuja, Nigeria',
    title: 'We keep your technology working, so you don’t have to.',
    text: 'An ICT services and supplies company serving clients nationwide — from a single laptop to a full CBT exam hall.',
    primary: { to: '/contact', label: 'Contact Us' },
    secondary: { to: '/services', label: 'Our services' },
  },
  {
    kind: 'video',
    video: VIDEOS.fieldTesting,
    kicker: 'CBT centre setup',
    title: 'Every station tested before exam day.',
    text: 'We set up, configure and check each machine — so candidates sit down to a system that just works.',
    primary: { to: '/services/cbt-ict-centre-setup', label: 'See CBT setup' },
    secondary: { to: '/projects', label: 'Our projects' },
  },
  {
    kind: 'photo',
    image: IMAGES.labWoodRows,
    position: '50% 60%',
    kicker: 'Completed labs',
    title: 'From an empty room to an exam-ready hall.',
    text: 'Cubicles, laptops, lighting and cabling — fitted out and handed over ready to use.',
    primary: { to: '/projects', label: 'See our work' },
    secondary: { to: '/contact', label: 'Contact Us' },
  },
  {
    kind: 'video',
    video: VIDEOS.cablingInstall,
    kicker: 'Networking, cabling & CCTV',
    title: 'Cabling and networks, done properly.',
    text: 'Structured cabling, trunking, CCTV and connectivity for offices, schools and homes.',
    primary: { to: '/services/networking-cabling', label: 'Networking & cabling' },
    secondary: { to: '/services/cctv-surveillance', label: 'CCTV' },
  },
  {
    kind: 'photo',
    image: IMAGES.internWiring,
    position: '50% 40%',
    kicker: 'Internship & training',
    title: 'Learn the trade on real projects.',
    text: 'Apprenticeships and IT/SIWES/NYSC placements working alongside our crews on live installations.',
    primary: { to: '/apply', label: 'Apply Now' },
    secondary: { to: '/internship', label: 'How it works' },
  },
]

const INTERVAL = 7000
const btn =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = SLIDES.length
  const slide = SLIDES[index]

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (reduceMotion || paused) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => clearTimeout(id)
  }, [index, paused, reduceMotion, count])

  const onTouchEnd = (x: number) => {
    if (touchX.current === null) return
    const dx = x - touchX.current
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative h-[100svh] max-h-[1000px] min-h-[600px] overflow-hidden bg-ink-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
    >
      {/* backgrounds */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9 }}
        >
          {slide.kind === 'photo' ? (
            <motion.div
              className="h-full w-full"
              initial={{ scale: 1 }}
              animate={{ scale: reduceMotion ? 1 : 1.07 }}
              transition={{ duration: (INTERVAL + 900) / 1000, ease: 'linear' }}
            >
              <SmartImage
                image={slide.image}
                loading="eager"
                variant="dark"
                showLabel={false}
                objectPosition={slide.position}
                className="h-full w-full"
              />
            </motion.div>
          ) : (
            <>
              {/* phones: full-bleed portrait footage */}
              <VideoCard video={slide.video} eager className="h-full w-full lg:hidden" />
              {/* desktop: blurred backdrop + large framed clip on the right */}
              <img
                src={slide.video.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 hidden h-full w-full scale-125 object-cover blur-3xl lg:block"
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-ink-950/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/55 via-transparent to-transparent" />

      {/* large framed video (desktop) */}
      <AnimatePresence initial={false}>
        {slide.kind === 'video' && (
          <motion.div
            key={`v-${index}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
            className="absolute top-1/2 right-[9%] z-10 hidden -translate-y-[46%] lg:block"
          >
            <VideoCard
              video={slide.video}
              eager
              className="aspect-[9/16] h-[min(76svh,780px)] rounded-3xl border border-white/20 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* copy */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pt-28 pb-24 sm:px-6 sm:pb-28 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="max-w-2xl"
            aria-live="polite"
          >
            <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-amber-400 sm:text-[13px]">{slide.kicker}</p>
            <h1 className="text-balance text-[2.1rem] leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/85 sm:text-[17.5px]">{slide.text}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to={slide.primary.to} className={`${btn} group bg-amber-500 text-[#1a1033] hover:bg-amber-400`}>
                {slide.primary.label}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to={slide.secondary.to} className={`${btn} border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`}>
                {slide.secondary.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 pb-6 sm:px-6 lg:px-10">
          <ol className="flex flex-1 items-center gap-2 sm:max-w-md" aria-label="Slides">
            {SLIDES.map((s, i) => (
              <li key={s.title} className="flex-1">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${s.kicker}`}
                  aria-current={i === index}
                  className="group block h-5 w-full"
                >
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/30">
                    {i < index && <span className="absolute inset-0 bg-white" />}
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-amber-400"
                        initial={{ width: reduceMotion || paused ? '100%' : '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: reduceMotion || paused ? 0 : INTERVAL / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25">
              <IconArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25">
              <IconArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
