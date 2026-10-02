import { Link } from 'react-router-dom'
import Logo from './Logo'
import SmartImage from './SmartImage'
import { NAV_LINKS, SERVICES } from '../lib/constants'
import { CONTACT } from '../lib/contact'
import { IMAGES } from '../lib/images'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-100 bg-deep">
      <div className="pointer-events-none absolute inset-0">
        <SmartImage
          image={IMAGES.trunkingInstall}
          variant="dark"
          showLabel={false}
          className="h-full w-full opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/95 to-ink-950/80" />
      </div>


      <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr] lg:gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-ink-300">
              Abuja-based ICT services and supplies — CBT centres, repairs, networking, CCTV, software and training. Empowering Your Tech Dreams.
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
            <ul className="mt-5 space-y-2.5 text-[14px] leading-relaxed text-ink-300">
              {CONTACT.phones.map((p) => (
                <li key={p.href}><a href={p.href} className="transition-colors hover:text-white">{p.label}</a></li>
              ))}
              <li><a href={CONTACT.whatsapp.href} className="transition-colors hover:text-white">WhatsApp: {CONTACT.whatsapp.label}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-white">{CONTACT.email}</a></li>
              <li>{CONTACT.addresses[0]}</li>
              <li>Facebook &amp; Instagram: {CONTACT.social}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full bg-amber-500 px-4 py-2 text-[13.5px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400">
                Contact Us
              </Link>
              <Link to="/apply" className="rounded-full border border-white/25 px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/10">
                Apply
              </Link>
            </div>
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
