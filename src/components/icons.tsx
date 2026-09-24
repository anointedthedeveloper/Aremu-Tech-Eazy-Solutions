import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconChip(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.2" />
      <path d="M9 3.5v3M15 3.5v3M9 20.5v-3M15 20.5v-3M3.5 9h3M3.5 15h3M20.5 9h-3M20.5 15h-3" />
    </svg>
  )
}

export function IconTools(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.1L4 16.5V20h3.5l6.1-6.1a3.5 3.5 0 0 0 4.1-4.6l-2.6 2.6-2-2 2.6-2.6Z" />
    </svg>
  )
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12 12 16.5 20.5 12" />
      <path d="M3.5 16 12 20.5 20.5 16" />
    </svg>
  )
}

export function IconWifi(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8.5a12 12 0 0 1 16 0" />
      <path d="M7 12a8 8 0 0 1 10 0" />
      <path d="M10 15.5a4 4 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.5 9.5-1.8 4.2-4.2 1.8 1.8-4.2 4.2-1.8Z" />
    </svg>
  )
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </svg>
  )
}

export function IconMessageCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16v11H9.5L5 20.5v-4H4v-11Z" />
      <path d="m8.5 11 2 2 4.5-4.5" />
    </svg>
  )
}

export function IconShieldCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6v6c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}
