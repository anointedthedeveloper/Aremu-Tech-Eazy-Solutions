import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(reduceMotion ? to : 0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduceMotion, to, duration])

  return <span ref={ref}>{value}</span>
}
