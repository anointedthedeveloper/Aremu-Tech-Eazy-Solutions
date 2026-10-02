import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS } from '../lib/constants'
import { CONTACT } from '../lib/contact'

/** Three floating "islands": brand · links with a sliding highlight · actions. */
const island =
  'pointer-events-auto rounded-full border backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300'
const islandTone = (solid: boolean) =>
  solid
    ? 'border-ink-200/80 bg-white/95 shadow-[0_10px_30px_-12px_rgba(70,35,130,0.35)] dark:border-white/10 dark:bg-ink-900/95'
    : 'border-white/50 bg-white/70 shadow-[0_6px_24px_-14px_rgba(70,35,130,0.3)] dark:border-white/10 dark:bg-ink-900/60'

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  const [solid, setSolid] = useState(false)
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname // closes automatically on navigation
  const [hovered, setHovered] = useState<string | null>(null)

  const active = NAV_LINKS.find((l) => isCurrent(pathname, l.href))?.href ?? null
  const pillAt = hovered ?? active

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12)
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

  const spring = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 500, damping: 36 }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3">
        {/* brand island */}
        <Link
          to="/"
          aria-label="Aremu Tech Eazy Solutions — home"
          className={`${island} ${islandTone(solid || open)} flex h-12 items-center pr-5 pl-3.5 sm:h-14`}
        >
          <span className="dark:hidden"><Logo variant="dark" /></span>
          <span className="hidden dark:block"><Logo variant="light" /></span>
        </Link>

        {/* links island */}
        <nav
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
          className={`${island} ${islandTone(solid || open)} hidden items-center gap-1 p-1.5 lg:flex`}
        >
          {NAV_LINKS.map((link) => {
            const lit = pillAt === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active === link.href ? 'page' : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                  lit ? 'text-white' : 'text-ink-600 dark:text-ink-300'
                }`}
              >
                {lit && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-full bg-violet-600 shadow-[0_4px_14px_-4px_rgba(106,43,168,0.7)] dark:bg-violet-600"
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* actions island */}
        <div className={`${island} ${islandTone(solid || open)} flex items-center gap-1.5 p-1.5`}>
          <ThemeToggle className="h-9 w-9 border-transparent bg-transparent dark:border-transparent dark:bg-transparent" />
          <Link
            to="/apply"
            className="hidden rounded-full px-4 py-2 text-[14px] font-semibold text-violet-700 transition-colors hover:bg-violet-100 sm:block dark:text-violet-300 dark:hover:bg-white/10"
          >
            Apply
          </Link>
          <Link
            to="/contact"
            className="hidden rounded-full bg-amber-500 px-5 py-2 text-[14px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400 sm:block"
          >
            Contact Us
          </Link>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-900 hover:bg-violet-100 lg:hidden dark:text-white dark:hover:bg-white/10"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="relative block h-3.5 w-[18px]">
              <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${open ? 'top-[6px] rotate-45' : 'top-0'}`} />
              <span className={`absolute top-[6px] left-0 h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${open ? 'top-[6px] -rotate-45' : 'top-[12px]'}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto absolute inset-x-3 top-[4.5rem] max-h-[calc(100svh-5.5rem)] overflow-y-auto rounded-3xl border border-ink-200/80 bg-white p-5 shadow-lifted sm:inset-x-6 sm:top-[5.25rem] dark:border-white/10 dark:bg-ink-900 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="border-b border-ink-100 last:border-0 dark:border-white/10">
                    <Link
                      to={link.href}
                      aria-current={active === link.href ? 'page' : undefined}
                      className="flex items-baseline gap-4 py-3.5 font-display text-[22px] font-semibold text-ink-500 aria-[current=page]:text-ink-950 dark:text-ink-300 dark:aria-[current=page]:text-white"
                    >
                      <span className="w-6 text-[12px] font-medium text-violet-600 dark:text-violet-400">{String(i + 1).padStart(2, '0')}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link to="/contact" className="rounded-full bg-amber-500 px-5 py-3.5 text-center text-[15px] font-semibold text-[#1a1033]">Contact Us</Link>
              <Link to="/apply" className="rounded-full border border-violet-300 px-5 py-3.5 text-center text-[15px] font-semibold text-violet-700 dark:border-white/20 dark:text-white">Apply</Link>
            </div>
            <p className="mt-5 text-[13px] text-ink-500 dark:text-ink-400">
              <a href={CONTACT.phones[0].href} className="font-semibold text-ink-900 dark:text-white">{CONTACT.phones[0].label}</a>
              {' · '}
              <a href={CONTACT.whatsapp.href} className="font-semibold text-ink-900 dark:text-white">WhatsApp</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
