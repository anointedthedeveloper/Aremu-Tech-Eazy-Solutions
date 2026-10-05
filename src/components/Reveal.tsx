import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export type RevealDirection = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  /** Where the element enters from. 'left'/'right' slide in sideways, 'scale' grows in. */
  direction?: RevealDirection
  className?: string
  as?: 'div' | 'li'
}

export default function Reveal({ children, delay = 0, y = 28, direction = 'up', className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()

  const offset = reduceMotion
    ? {}
    : direction === 'left'
      ? { x: -y * 1.8 }
      : direction === 'right'
        ? { x: y * 1.8 }
        : direction === 'scale'
          ? { scale: 0.93 }
          : { y }

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
