import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { SiteVideo } from '../lib/images'

interface VideoCardProps {
  video: SiteVideo
  className?: string
  eager?: boolean
}

/**
 * Muted looping clip. The file is only requested when it nears the viewport
 * (or immediately when `eager`), and it plays only while on screen — never for
 * reduced-motion users, who just see the poster.
 */
export default function VideoCard({ video, className = '', eager = false }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const [near, setNear] = useState(eager)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
        if (reduceMotion || !el.src) return
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25, rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion, near])

  return (
    <div className={`relative overflow-hidden bg-ink-900 ${className}`}>
      <img
        src={video.poster}
        alt=""
        aria-hidden="true"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      {!ready && <span aria-hidden="true" className="skeleton absolute inset-0 rounded-none opacity-40" />}
      <video
        ref={ref}
        src={near ? video.src : undefined}
        poster={video.poster}
        aria-label={video.alt}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
