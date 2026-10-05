import { motion, useReducedMotion } from 'framer-motion'

const COLORS = ['#f7931e', '#8a3fd0', '#c04aa8', '#6c8fd6', '#10b981', '#fbae4d']
const PARTICLES = Array.from({ length: 26 }, (_, i) => {
  const angle = (i / 26) * Math.PI * 2 + (i % 2) * 0.12
  const distance = 70 + (i % 5) * 16
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 6 + (i % 3) * 3,
    color: COLORS[i % COLORS.length],
    round: i % 3 !== 0,
  }
})

/** Animated tick that draws itself, with a burst of brand-coloured confetti. */
export default function SuccessBurst() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto h-24 w-24" aria-hidden="true">
      {!reduceMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className={`absolute top-1/2 left-1/2 ${p.round ? 'rounded-full' : 'rounded-[2px]'}`}
            style={{ width: p.size, height: p.size, background: p.color, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: p.y + 24, scale: [0, 1.2, 1], opacity: [1, 1, 0], rotate: i * 40 }}
            transition={{ duration: 1.3, delay: 0.3, ease: 'easeOut' }}
          />
        ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_-8px_rgba(16,185,129,0.7)]"
        initial={reduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M5.5 12.5l4.2 4.2L18.5 8"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
