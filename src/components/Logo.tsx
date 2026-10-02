import markUrl from '../assets/brand/mark.png'

interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const titleColor = variant === 'dark' ? 'text-ink-900' : 'text-white'

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
        <span className="font-display text-[15px] font-bold tracking-tight">
          <span className="text-amber-500">Aremu</span>{' '}
          <span className={variant === 'dark' ? 'text-violet-600' : 'text-violet-400'}>Tech</span>
        </span>
        <span className={`font-display text-[13px] font-semibold -mt-0.5 ${titleColor}`}>
          Eazy Solutions
        </span>
      </span>
      <span className="sr-only">, practical technology support</span>
    </span>
  )
}
