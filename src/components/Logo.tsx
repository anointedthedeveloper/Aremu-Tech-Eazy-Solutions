import markUrl from '../assets/brand/mark.png'

interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const titleColor = variant === 'dark' ? 'text-ink-950' : 'text-white'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={markUrl}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 object-contain"
      />
      <span className="flex flex-col leading-[1.05]">
        <span className={`font-display text-[15px] font-bold tracking-tight ${titleColor}`}>
          Aremu Tech
        </span>
        <span className="font-display text-[13px] font-semibold text-amber-600 -mt-0.5">
          Eazy Solutions
        </span>
      </span>
      <span className="sr-only">, Empowering Your Tech Dreams</span>
    </span>
  )
}
