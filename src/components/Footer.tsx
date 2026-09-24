import { Link } from 'react-router-dom'
import Logo from './Logo'
import SmartImage from './SmartImage'
import { NAV_LINKS } from '../lib/constants'
import { IMAGES } from '../lib/images'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-100 bg-ink-950">
      <div className="pointer-events-none absolute inset-0">
        <SmartImage image={IMAGES.gallery[3]} className="h-full w-full opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/95 to-ink-950/80" />
      </div>
      <div className="relative mx-auto max-w-8xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-ink-300">
              Empowering your tech dreams — practical technology support for the
              problems that get in the way of your day.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink-300">
                Site
              </p>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-ink-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink-300">
                Get in touch
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-[14px] text-ink-300 transition-colors hover:text-white"
                  >
                    Submit an Enquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800 pt-6 text-[13px] text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Aremu Tech Eazy Solutions. All rights reserved.</p>
          <p>Empowering Your Tech Dreams</p>
        </div>
      </div>
    </footer>
  )
}
