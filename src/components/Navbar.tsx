import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../lib/theme'
import { NAV_LINKS } from '../lib/constants'
import { CONTACT } from '../lib/contact'
import { SERVICES, serviceHref } from '../lib/services'
import { IconArrowRight } from './icons'

/** Three floating "islands": brand · links with a sliding highlight · actions. */
const island =
  'pointer-events-auto rounded-full border backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300'
const islandTone = (solid: boolean, onDark = false) =>
  onDark
    ? 'border-white/20 bg-black/25 shadow-[0_6px_24px_-14px_rgba(0,0,0,0.5)]'
    : solid
    ? 'border-ink-200/80 bg-white/95 shadow-[0_10px_30px_-12px_rgba(70,35,130,0.35)] dark:border-white/10 dark:bg-ink-900/95'
    : 'border-white/50 bg-white/70 shadow-[0_6px_24px_-14px_rgba(70,35,130,0.3)] dark:border-white/10 dark:bg-ink-900/60'

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  const { theme } = useTheme()
  const [solid, setSolid] = useState(false)
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname // closes automatically on navigation
  const [hovered, setHovered] = useState<string | null>(null)
  const [menuFor, setMenuFor] = useState<string | null>(null) // pathname the services menu was opened on
  const [mobileServices, setMobileServices] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const active = NAV_LINKS.find((l) => isCurrent(pathname, l.href))?.href ?? null
  const pillAt = hovered ?? active
  const onDark = theme === 'dark' && pathname === '/' && !solid && !open // transparent glass over the home hero
  const servicesOpen = menuFor === pathname // closes automatically on navigation

  const openServices = () => {
    clearTimeout(closeTimer.current)
    setMenuFor(pathname)
  }
  const closeServices = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenuFor(null), 120)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuFor(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
        {/* brand island */}
        <Link
          to="/"
          aria-label="Aremu Tech Eazy Solutions — home"
          className={`${island} ${islandTone(solid || open, onDark)} flex h-12 items-center pr-5 pl-3.5 sm:h-14`}
        >
          <span className={onDark ? 'hidden' : 'dark:hidden'}><Logo variant="dark" /></span>
          <span className={onDark ? 'block' : 'hidden dark:block'}><Logo variant="light" /></span>
        </Link>

        {/* links island */}
        <nav
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
          className={`${island} ${islandTone(solid || open, onDark)} relative hidden items-center gap-1 p-1.5 lg:flex`}
        >
          {NAV_LINKS.map((link) => {
            const lit = pillAt === link.href
            const hasMenu = link.href === '/services'
            const anchor = (
              <Link
                to={link.href}
                aria-current={active === link.href ? 'page' : undefined}
                aria-haspopup={hasMenu ? 'true' : undefined}
                aria-expanded={hasMenu ? servicesOpen : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => {
                  setHovered(link.href)
                  if (hasMenu) openServices()
                }}
                onBlur={() => setHovered(null)}
                className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                  lit ? 'text-white' : onDark ? 'text-white/85' : 'text-ink-600 dark:text-ink-300'
                }`}
              >
                {lit && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-full bg-violet-600 shadow-[0_4px_14px_-4px_rgba(106,43,168,0.7)]"
                  />
                )}
                <span className="relative">{link.label}</span>
                {hasMenu && (
                  <svg viewBox="0 0 12 12" aria-hidden="true" className={`relative h-3 w-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                )}
              </Link>
            )
            if (!hasMenu) return <div key={link.href}>{anchor}</div>
            return (
              <div key={link.href} onMouseEnter={openServices} onMouseLeave={closeServices}>
                {anchor}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-1/2 w-[min(760px,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-3xl border border-ink-200/80 bg-white p-3 shadow-lifted dark:border-white/10 dark:bg-ink-900">
                        <ul className="grid grid-cols-2 gap-1">
                          {SERVICES.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                to={serviceHref(svc)}
                                onClick={() => setMenuFor(null)}
                                className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-violet-100/70 dark:hover:bg-white/5"
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/15 dark:text-violet-300">
                                  <svc.icon className="h-5 w-5" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[14.5px] leading-tight font-semibold text-ink-950 dark:text-white">{svc.title}</span>
                                  <span className="mt-1 line-clamp-1 text-[12.5px] text-ink-500 dark:text-ink-400">{svc.description}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 flex items-center justify-between rounded-2xl bg-paper-dim px-4 py-3 dark:bg-white/5">
                          <Link to="/services" onClick={() => setMenuFor(null)} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-violet-700 dark:text-violet-300">
                            View all services <IconArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          <Link to="/contact" onClick={() => setMenuFor(null)} className="text-[13.5px] font-semibold text-ink-700 hover:text-violet-700 dark:text-ink-300 dark:hover:text-white">
                            Not sure? Contact Us
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* actions island */}
        <div className={`${island} ${islandTone(solid || open, onDark)} flex items-center gap-1.5 p-1.5`}>
          <ThemeToggle className={`h-9 w-9 border-transparent bg-transparent dark:border-transparent dark:bg-transparent ${onDark ? 'text-white hover:bg-white/15' : ''}`} />
          <Link
            to="/apply"
            className={`hidden rounded-full px-4 py-2 text-[14px] font-semibold transition-colors sm:block ${onDark ? 'text-white hover:bg-white/15' : 'text-violet-700 hover:bg-violet-100 dark:text-violet-300 dark:hover:bg-white/10'}`}
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
            className={`relative flex h-9 w-9 items-center justify-center rounded-full lg:hidden ${onDark ? 'text-white hover:bg-white/15' : 'text-ink-900 hover:bg-violet-100 dark:text-white dark:hover:bg-white/10'}`}
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
                    <div className="flex items-center">
                      <Link
                        to={link.href}
                        aria-current={active === link.href ? 'page' : undefined}
                        className="flex flex-1 items-baseline gap-4 py-3.5 font-display text-[22px] font-semibold text-ink-500 aria-[current=page]:text-ink-950 dark:text-ink-300 dark:aria-[current=page]:text-white"
                      >
                        <span className="w-6 text-[12px] font-medium text-violet-600 dark:text-violet-400">{String(i + 1).padStart(2, '0')}</span>
                        {link.label}
                      </Link>
                      {link.href === '/services' && (
                        <button
                          type="button"
                          onClick={() => setMobileServices((v) => !v)}
                          aria-expanded={mobileServices}
                          aria-label="Show services"
                          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-violet-100 dark:text-ink-300 dark:hover:bg-white/10"
                        >
                          <svg viewBox="0 0 12 12" aria-hidden="true" className={`h-4 w-4 transition-transform ${mobileServices ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 4.5 6 8l3.5-3.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {link.href === '/services' && mobileServices && (
                      <ul className="mb-3 ml-10 space-y-0.5 border-l border-ink-200 pl-4 dark:border-white/10">
                        {SERVICES.map((svc) => (
                          <li key={svc.slug}>
                            <Link to={serviceHref(svc)} className="flex items-center gap-2.5 py-2 text-[15px] font-medium text-ink-700 dark:text-ink-200">
                              <svc.icon className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                              {svc.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
