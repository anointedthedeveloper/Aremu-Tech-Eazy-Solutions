import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SmartImage from './SmartImage'
import { IconArrowRight } from './icons'
import type { SiteImage } from '../lib/images'

export interface CarouselSlide {
  image: SiteImage
  title: string
  description: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  className?: string
}

export default function Carousel({ slides, className = '' }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const count = slides.length
  const liveRegionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion || paused || count <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, 5000)
    return () => clearInterval(id)
  }, [reduceMotion, paused, count])

  const goTo = (i: number) => setIndex(((i % count) + count) % count)

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-950 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="What we work on"
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${index * 100}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              className="relative h-full w-full shrink-0"
              aria-hidden={i !== index}
            >
              <SmartImage image={slide.image} loading={i === 0 ? 'eager' : 'lazy'} className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="font-display text-[18px] font-semibold text-white sm:text-[22px]">
                  {slide.title}
                </p>
                <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-ink-200 sm:text-[14.5px]">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div ref={liveRegionRef} className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}: {slides[index]?.title}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm transition-colors hover:bg-white"
          >
            <IconArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm transition-colors hover:bg-white"
          >
            <IconArrowRight className="h-4 w-4" />
          </button>

          <div className="absolute right-0 bottom-4 left-0 flex items-center justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
