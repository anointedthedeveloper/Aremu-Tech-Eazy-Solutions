import { motion, useReducedMotion } from 'framer-motion'

/** Shown over a form while its native submission is in flight. */
export default function SendingOverlay({ title, text }: { title: string; text: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-white/92 px-6 text-center backdrop-blur-sm dark:bg-ink-900/92"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative h-24 w-48 overflow-hidden">
        {/* flight trail */}
        <svg viewBox="0 0 192 96" className="absolute inset-0 h-full w-full text-violet-300 dark:text-violet-500/60" fill="none" aria-hidden="true">
          <path d="M8 78 C 56 78, 70 24, 184 18" stroke="currentColor" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" />
        </svg>
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute top-0 left-0 h-9 w-9 text-violet-600 drop-shadow-md dark:text-violet-400"
          fill="currentColor"
          aria-hidden="true"
          initial={{ x: 0, y: 62, rotate: 0, opacity: 0 }}
          animate={
            reduceMotion
              ? { x: 80, y: 30, opacity: 1 }
              : { x: [0, 60, 120, 150], y: [62, 22, 4, -6], rotate: [-8, -20, -26, -28], opacity: [0, 1, 1, 0] }
          }
          transition={reduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 }}
        >
          <path d="M21.4 2.6a1 1 0 0 0-1-.23L2.9 8.6a1 1 0 0 0-.08 1.87l6.5 2.65 2.65 6.5a1 1 0 0 0 1.87-.08l6.23-17.5a1 1 0 0 0-.23-1.46ZM10.4 12.4l-4.2-1.7 11.1-3.9-6.9 5.6Z" />
        </motion.svg>
      </div>
      <div>
        <p className="font-display text-[20px] font-bold text-ink-950 dark:text-white">{title}</p>
        <p className="mx-auto mt-1.5 max-w-xs text-[14px] leading-relaxed text-ink-500 dark:text-ink-300">{text}</p>
      </div>
      <div className="h-1.5 w-52 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-amber-500 to-violet-500"
          animate={reduceMotion ? undefined : { x: ['-100%', '300%'] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
