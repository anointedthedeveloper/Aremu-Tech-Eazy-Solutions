import { useState } from 'react'
import type { SiteImage } from '../lib/images'

interface SmartImageProps {
  image: SiteImage
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function SmartImage({ image, className = '', loading = 'lazy' }: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`flex items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200 text-ink-400 ${className}`}
      >
        <span className="text-[13px] font-medium">Aremu Tech Eazy Solutions</span>
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
