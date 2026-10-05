import { CONTACT } from '../lib/contact'
import { IconFacebook, IconInstagram, IconMail, IconPhone, IconWhatsApp } from './icons'

const LINKS = [
  { label: 'WhatsApp', href: CONTACT.whatsapp.href, icon: IconWhatsApp, external: true },
  { label: 'Facebook', href: CONTACT.facebook, icon: IconFacebook, external: true },
  { label: 'Instagram', href: CONTACT.instagram, icon: IconInstagram, external: true },
  { label: 'Email', href: `mailto:${CONTACT.email}`, icon: IconMail, external: false },
  { label: 'Call', href: CONTACT.phones[0].href, icon: IconPhone, external: false },
]

/** Round icon buttons. `tone="dark"` for dark/purple backgrounds, `"light"` for pale cards. */
export default function SocialLinks({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const style =
    tone === 'dark'
      ? 'border-white/25 bg-white/10 text-white hover:border-amber-400 hover:bg-amber-500 hover:text-[#1a1033]'
      : 'border-ink-200 bg-white text-violet-700 hover:border-violet-600 hover:bg-violet-600 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-violet-300'

  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {LINKS.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 ${style}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}
