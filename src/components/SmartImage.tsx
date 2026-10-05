import { useState } from 'react'
import type { SiteImage } from '../lib/images'

interface SmartImageProps {
  image: SiteImage
  className?: string
  loading?: 'lazy' | 'eager'
  variant?: 'light' | 'dark'
  showLabel?: boolean
  objectPosition?: string
}

export default function SmartImage({
  image,
  className = '',
  loading = 'lazy',
  variant = 'light',
  showLabel = true,
  objectPosition,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

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
      <img
        src={image.url}
        alt={image.alt}
        loading={loading}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  )
}
