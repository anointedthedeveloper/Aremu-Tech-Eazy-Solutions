import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { SiteVideo } from '../lib/images'

interface VideoCardProps {
  video: SiteVideo
  className?: string
  eager?: boolean
}

/** Muted looping clip that only plays while on screen (and never for reduced-motion users). */
export default function VideoCard({ video, className = '', eager = false }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster}
      aria-label={video.alt}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'metadata'}
      className={`bg-ink-900 object-cover ${className}`}
    />
  )
}
