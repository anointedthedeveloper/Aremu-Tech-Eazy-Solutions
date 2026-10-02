import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS } from '../lib/constants'

function MenuIcon({ open }: { open: boolean }) {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  const bar = 'absolute left-0 h-[1.5px] w-5 rounded-full bg-current'

  return (
    <span className="relative block h-4 w-5">
      <motion.span className={bar} animate={open ? { top: '7px', rotate: 45 } : { top: '0px', rotate: 0 }} transition={transition} />
      <motion.span className={bar} style={{ top: '7px' }} animate={{ opacity: open ? 0 : 1 }} transition={transition} />
      <motion.span className={bar} animate={open ? { top: '7px', rotate: -45 } : { top: '14px', rotate: 0 }} transition={transition} />
    </span>
  )
}

const linkClass =
  'relative py-2 text-[14.5px] font-medium text-ink-600 transition-colors hover:text-ink-950 aria-[current=page]:text-ink-950 dark:text-ink-300 dark:hover:text-white dark:aria-[current=page]:text-white'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? 'border-ink-200/70 bg-white/90 shadow-[0_8px_30px_-20px_rgba(60,30,120,0.35)] dark:border-white/10 dark:bg-ink-950/90'
          : 'border-transparent bg-white/70 dark:bg-ink-950/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link to="/" className="relative z-10 shrink-0" onClick={() => setOpen(false)} aria-label="Aremu Tech Eazy Solutions — home">
          <span className="dark:hidden"><Logo variant="dark" /></span>
          <span className="hidden dark:block"><Logo variant="light" /></span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} to={link.href} end={link.href === '/'} className={linkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-amber-500"
                      transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <ThemeToggle />
          <Link
            to="/apply"
            className="rounded-full border border-violet-300 px-5 py-2.5 text-[14px] font-semibold text-violet-700 transition-colors hover:bg-violet-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            Apply
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-[14px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
          >
            Contact Us
          </Link>
        </div>

        <div className="relative z-10 flex items-center gap-1.5 lg:hidden">
          <ThemeToggle className="h-9 w-9" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 dark:text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white dark:bg-ink-950 lg:hidden"
          >
            <nav className="flex min-h-full flex-col px-4 pt-4 pb-10 sm:px-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ink-100 py-4 font-display text-[22px] font-semibold text-ink-500 aria-[current=page]:text-ink-950 dark:border-white/10 dark:text-ink-300 dark:aria-[current=page]:text-white"
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && <span className="h-2 w-2 rounded-full bg-amber-500" />}
                    </>
                  )}
                </NavLink>
              ))}
              <div className="mt-8 grid gap-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-amber-500 px-5 py-3.5 text-center text-[16px] font-semibold text-[#1a1033]"
                >
                  Contact Us
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-violet-300 px-5 py-3.5 text-center text-[16px] font-semibold text-violet-700 dark:border-white/20 dark:text-white"
                >
                  Apply
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
