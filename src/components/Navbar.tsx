import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { IconArrowRight } from './icons'
import { NAV_LINKS } from '../lib/constants'

const MotionLink = motion.create(Link)

function MenuIcon({ open }: { open: boolean }) {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }
  const barClass = 'absolute left-0 h-[1.5px] w-5 rounded-full bg-current'

  return (
    <span className="relative block h-4 w-5">
      <motion.span
        className={barClass}
        animate={open ? { top: '7px', rotate: 45 } : { top: '0px', rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className={barClass}
        style={{ top: '7px' }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={transition}
      />
      <motion.span
        className={barClass}
        animate={open ? { top: '7px', rotate: -45 } : { top: '14px', rotate: 0 }}
        transition={transition}
      />
    </span>
  )
}

const mobileListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-paper/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(20,22,29,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-10">
        <Link to="/" className="group relative z-10" onClick={() => setOpen(false)}>
          <motion.span
            className="block"
            whileHover={{ rotate: -6, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Logo />
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className="relative py-2 text-[14.5px] font-medium text-ink-600 transition-colors hover:text-ink-950 aria-[current=page]:text-ink-950"
            >
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

        <div className="hidden lg:block">
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Submit an Enquiry
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </MotionLink>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-100 bg-paper lg:hidden"
          >
            <motion.nav
              className="flex flex-col px-5 py-4"
              aria-label="Mobile"
              variants={mobileListVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={mobileItemVariants}>
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 border-b border-ink-100 py-3.5 text-[16px] font-medium text-ink-800 aria-[current=page]:text-amber-600"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        )}
                        {link.label}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={mobileItemVariants}>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-[15px] font-semibold text-white"
                >
                  Submit an Enquiry
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
