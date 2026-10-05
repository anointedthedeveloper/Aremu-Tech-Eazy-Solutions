import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SmartImage from './SmartImage'
import type { SiteImage } from '../lib/images'

interface ParallaxImageProps {
  image: SiteImage
  className?: string
  loading?: 'lazy' | 'eager'
  /** How far (in % of the frame) the picture drifts while scrolling past. */
  strength?: number
}

/** A photo that drifts slightly slower than the page as it scrolls through the viewport. */
export default function ParallaxImage({ image, className = '', loading = 'lazy', strength = 7 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="h-full w-full" style={reduceMotion ? undefined : { y, scale: 1 + (strength * 2.4) / 100 }}>
        <SmartImage image={image} loading={loading} className="h-full w-full" />
      </motion.div>
    </div>
  )
}
