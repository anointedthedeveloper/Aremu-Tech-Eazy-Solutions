import { useState } from 'react'
import type { SiteImage } from '../lib/images'

interface SmartImageProps {
  image: SiteImage
  className?: string
  loading?: 'lazy' | 'eager'
  variant?: 'light' | 'dark'
  showLabel?: boolean
  objectPosition?: string
  /** 'auto': portrait photos are shown in full (contained over a blurred copy) instead of being cropped. */
  fit?: 'cover' | 'auto'
}

export default function SmartImage({
  image,
  className = '',
  loading = 'lazy',
  variant = 'light',
  showLabel = true,
  objectPosition,
  fit = 'cover',
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [portrait, setPortrait] = useState(false)

  const contain = fit === 'auto' && portrait

  if (failed) {
    const tone =
      variant === 'dark'
        ? 'bg-gradient-to-br from-ink-800 to-ink-950 text-ink-500'
        : 'bg-gradient-to-br from-ink-100 to-ink-200 text-ink-400 dark:from-ink-800 dark:to-ink-900'

    return (
      <div role="img" aria-label={image.alt} className={`flex items-center justify-center ${tone} ${className}`}>
        {showLabel && <span className="text-[13px] font-medium">Aremu Tech Eazy Solutions</span>}
      </div>
    )
  }

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {!loaded && <span aria-hidden="true" className="skeleton absolute inset-0 rounded-none" />}
      {contain && (
        <img
          src={image.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
        />
      )}
      <img
        src={image.url}
        alt={image.alt}
        loading={loading}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
        onLoad={(e) => {
          const { naturalWidth: w, naturalHeight: h } = e.currentTarget
          if (fit === 'auto' && h > w * 1.1) setPortrait(true)
          setLoaded(true)
        }}
        onError={() => setFailed(true)}
        className={`relative h-full w-full transition-opacity duration-500 ${contain ? 'object-contain' : 'object-cover'} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  )
}
