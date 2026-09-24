import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 text-ink-300 opacity-[0.3] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-[16.5px] leading-relaxed text-ink-500 sm:text-[17px]">
            {description}
          </p>
          {children}
        </Reveal>
      </div>
    </section>
  )
}
