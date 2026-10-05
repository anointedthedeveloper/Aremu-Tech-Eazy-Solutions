import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Thin brand-coloured bar at the very top showing how far down the page you are. */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })
  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-amber-500 via-magenta-500 to-violet-500"
    />
  )
}
