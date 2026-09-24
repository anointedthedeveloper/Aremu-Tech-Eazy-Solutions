import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SmartImage from './SmartImage'
import { IconArrowRight } from './icons'
import type { SiteImage } from '../lib/images'

interface HeroSlideshowProps {
  slides: SiteImage[]
  intervalMs?: number
}

export default function HeroSlideshow({ slides, intervalMs = 6000 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const count = slides.length

  useEffect(() => {
    if (reduceMotion || paused || count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs)
    return () => clearInterval(id)
  }, [reduceMotion, paused, count, intervalMs])

  const goTo = (i: number) => setIndex(((i % count) + count) % count)

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <motion.div
          key={slide.url}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={i !== index}
        >
          <motion.div
            className="h-full w-full"
            animate={reduceMotion ? undefined : { scale: i === index ? 1.06 : 1 }}
            transition={{ duration: intervalMs / 1000 + 1, ease: 'linear' }}
          >
            <SmartImage
              image={slide}
              loading={i === 0 ? 'eager' : 'lazy'}
              variant="dark"
              showLabel={false}
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-ink-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/20" />

      {count > 1 && (
        <div className="absolute right-6 bottom-6 z-10 flex items-center gap-4 sm:right-10 sm:bottom-10">
          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.url}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-7 bg-amber-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <IconArrowRight className="h-3.5 w-3.5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next slide"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <IconArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
