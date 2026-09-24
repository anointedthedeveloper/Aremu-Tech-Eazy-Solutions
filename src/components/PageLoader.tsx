import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import markUrl from '../assets/brand/mark.png'

const SESSION_KEY = 'atech-loaded'

function shouldShowLoader() {
  if (typeof window === 'undefined') return false
  if (sessionStorage.getItem(SESSION_KEY)) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

export default function PageLoader() {
  const [visible, setVisible] = useState(shouldShowLoader)

  useEffect(() => {
    if (!visible) return

    document.documentElement.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
    }, 1100)

    return () => clearTimeout(timer)
  }, [visible])

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={markUrl}
            alt=""
            aria-hidden="true"
            className="h-14 w-14 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-4 font-display text-[13px] font-semibold tracking-[0.18em] text-white uppercase"
          >
            Aremu Tech <span className="text-amber-400">Eazy Solutions</span>
          </motion.p>
          <div className="mt-6 h-[2px] w-32 overflow-hidden rounded-full bg-ink-800">
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-amber-500 via-magenta-500 to-violet-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
