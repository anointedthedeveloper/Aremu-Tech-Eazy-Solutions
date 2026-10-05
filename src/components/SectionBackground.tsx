import SmartImage from './SmartImage'
import type { SiteImage } from '../lib/images'

interface SectionBackgroundProps {
  image: SiteImage
  /** 'dark' for deep/purple sections (image shows through a dark wash); 'light' for pale sections (very faint, desaturated). */
  tone: 'dark' | 'light'
  position?: string
}

/** Photographic backdrop for a section. The parent must be `relative overflow-hidden` and its content `relative`. */
export default function SectionBackground({ image, tone, position }: SectionBackgroundProps) {
  if (tone === 'dark') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <SmartImage image={image} variant="dark" showLabel={false} objectPosition={position} className="h-full w-full opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" />
      </div>
    )
  }
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
    >
      <SmartImage image={image} showLabel={false} objectPosition={position} className="h-full w-full opacity-[0.09] grayscale dark:opacity-[0.12]" />
    </div>
  )
}
