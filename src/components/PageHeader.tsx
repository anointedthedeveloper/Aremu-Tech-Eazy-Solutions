import type { ReactNode } from 'react'
import Reveal from './Reveal'
import BrandTriangle from './BrandTriangle'
import SmartImage from './SmartImage'
import type { SiteImage } from '../lib/images'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
  image: SiteImage
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, description, image, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 text-ink-300 opacity-[0.3] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>
      <div className="mx-auto grid max-w-8xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10">
        <Reveal>
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

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <BrandTriangle
            gradientId="pageHeaderTri"
            strokeWidth={2}
            opacity={0.9}
            className="pointer-events-none absolute -top-8 right-4 h-32 w-32 sm:right-8 sm:h-40 sm:w-40"
          />
          <SmartImage
            image={image}
            className="aspect-[4/3] w-full rounded-2xl border border-ink-200/70 shadow-[0_20px_60px_-25px_rgba(13,14,19,0.35)]"
          />
        </Reveal>
      </div>
    </section>
  )
}
