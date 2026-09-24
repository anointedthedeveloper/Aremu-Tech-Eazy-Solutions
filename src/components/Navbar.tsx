import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { IconArrowRight, IconClose, IconMenu } from './icons'
import { NAV_LINKS } from '../lib/constants'

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
        <Link to="/" className="relative z-10" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                `text-[14.5px] font-medium transition-colors hover:text-ink-950 ${
                  isActive ? 'text-ink-950' : 'text-ink-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Submit an Enquiry
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
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
            <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-ink-100 py-3.5 text-[16px] font-medium last:border-none ${
                      isActive ? 'text-amber-600' : 'text-ink-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-[15px] font-semibold text-white"
              >
                Submit an Enquiry
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
