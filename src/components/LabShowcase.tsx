import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { IMAGES } from '../lib/images'

const SHOTS = [
  { image: IMAGES.labWoodRows, label: 'Cubicles in place, laptops installed', className: 'sm:col-span-2 aspect-[4/3] sm:aspect-auto' },
  { image: IMAGES.labWoodHall, label: 'Exam-ready hall', className: 'aspect-[3/4] sm:aspect-auto sm:row-span-2' },
  { image: IMAGES.labWoodDesk, label: 'Every station tested', className: 'aspect-[3/4] sm:col-span-2 sm:aspect-auto' },
]

interface LabShowcaseProps {
  eyebrow?: string
  title?: string
  text?: string
}

export default function LabShowcase({
  eyebrow = 'Completed Labs',
  title = 'From empty room to exam-ready hall.',
  text = 'Wooden cubicles, laptops, lighting and cabling — fitted out and tested before the first candidate walks in.',
}: LabShowcaseProps) {
  return (
    <section className="border-t border-ink-100 py-20 dark:border-white/10 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">{eyebrow}</p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">{title}</h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-500 dark:text-ink-300">{text}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 sm:auto-rows-[280px] lg:auto-rows-[320px]">
          {SHOTS.map((shot, i) => (
            <Reveal key={shot.label} delay={i * 0.07} className={shot.className}>
              <figure className="group relative h-full w-full overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-900 shadow-soft dark:border-white/10">
                <SmartImage image={shot.image} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[13.5px] font-semibold text-white sm:p-5">
                  <span className="mb-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-amber-400 to-violet-400" />
                  {shot.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
