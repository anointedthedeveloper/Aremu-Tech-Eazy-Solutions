import { useState } from 'react'
import type { SiteImage } from '../lib/images'

interface SmartImageProps {
  image: SiteImage
  className?: string
  loading?: 'lazy' | 'eager'
  variant?: 'light' | 'dark'
  showLabel?: boolean
}

export default function SmartImage({
  image,
  className = '',
  loading = 'lazy',
  variant = 'light',
  showLabel = true,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const tone =
      variant === 'dark'
        ? 'bg-gradient-to-br from-ink-800 to-ink-950 text-ink-500'
        : 'bg-gradient-to-br from-ink-100 to-ink-200 text-ink-400'

    return (
      <div role="img" aria-label={image.alt} className={`flex items-center justify-center ${tone} ${className}`}>
        {showLabel && <span className="text-[13px] font-medium">Aremu Tech Eazy Solutions</span>}
      </div>
    )
  }

  return (
    <img
      src={image.url}
      alt={image.alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={`bg-ink-100 object-cover ${className}`}
    />
  )
}
