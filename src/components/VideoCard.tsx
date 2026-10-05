import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLiteMode } from '../lib/network'
import type { SiteVideo } from '../lib/images'

interface VideoCardProps {
  video: SiteVideo
  className?: string
  eager?: boolean
  /** Download and play only after the visitor taps. Always on for Data Saver / 2G connections and reduced motion. */
  playOnTap?: boolean
}

/**
 * Muted looping clip that is easy on data:
 *  - the file is only requested when the clip nears the viewport (or immediately when `eager`);
 *  - it plays only while on screen;
 *  - with `playOnTap`, Data Saver, a 2G connection or reduced motion it shows the poster and
 *    downloads nothing until the visitor taps play.
 */
export default function VideoCard({ video, className = '', eager = false, playOnTap = false }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const lite = useLiteMode()
  const tapMode = playOnTap || lite || Boolean(reduceMotion)
  const [near, setNear] = useState(eager)
  const [tapped, setTapped] = useState(false)
  const [ready, setReady] = useState(false)
  const loadable = tapMode ? tapped : near

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
        if (!el.src) return
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25, rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadable])

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
      {loadable && !ready && <span aria-hidden="true" className="skeleton absolute inset-0 rounded-none opacity-40" />}
      <video
        ref={ref}
        src={loadable ? video.src : undefined}
        poster={video.poster}
        aria-label={video.alt}
        muted
        loop
        playsInline
        autoPlay={loadable}
        preload={loadable ? 'auto' : 'none'}
        onLoadedData={() => setReady(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
      {tapMode && !tapped && (
        <button
          type="button"
          onClick={() => setTapped(true)}
          aria-label={`Play video: ${video.alt}`}
          className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow-lg backdrop-blur transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-6 w-6" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
