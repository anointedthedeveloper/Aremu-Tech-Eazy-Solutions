import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/** A brand-coloured curtain that sweeps across the screen on every page change (not on first load). */
export default function RouteCurtain() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        aria-hidden="true"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
        transition={{ duration: 0.95, times: [0, 0.38, 0.5, 1], ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed inset-0 z-[90] bg-gradient-to-br from-violet-800 via-violet-600 to-amber-500"
      />
    </AnimatePresence>
  )
}
