import { Link } from 'react-router-dom'
import Logo from './Logo'
import SmartImage from './SmartImage'
import BrandTriangle from './BrandTriangle'
import { NAV_LINKS, SERVICES } from '../lib/constants'
import { IMAGES } from '../lib/images'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-100 bg-ink-950">
      <div className="pointer-events-none absolute inset-0">
        <SmartImage
          image={IMAGES.gallery[3]}
          variant="dark"
          showLabel={false}
          className="h-full w-full opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/95 to-ink-950/80" />
      </div>

      <BrandTriangle
        gradientId="footerTri"
        strokeWidth={1.5}
        opacity={0.4}
        className="pointer-events-none absolute -top-10 -right-6 hidden h-52 w-52 sm:block"
      />

      <div className="relative mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr] lg:gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-ink-300">
              Practical technology support for individuals and small businesses —
              devices, software, networks and digital tools, sorted properly.
            </p>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
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
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.index}>
                  <Link
                    to="/services"
                    className="text-[14px] text-ink-300 transition-colors hover:text-white"
                  >
                    {service.title.split(' & ')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              Get In Touch
            </p>
            <p className="mt-5 max-w-[16rem] text-[14px] leading-relaxed text-ink-300">
              Have something that needs sorting out? Tell us about it and we&apos;ll
              take it from there.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-amber-400 transition-colors hover:text-amber-300"
            >
              Submit an Enquiry →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-[13px] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Aremu Tech Eazy Solutions. All rights reserved.</p>
          <p>Built for people who&apos;d rather not deal with tech alone.</p>
        </div>
      </div>
    </footer>
  )
}
