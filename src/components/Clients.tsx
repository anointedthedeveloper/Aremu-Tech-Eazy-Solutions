import Reveal from './Reveal'
import SectionBackground from './SectionBackground'
import { IMAGES } from '../lib/images'
import { CLIENTS, TESTIMONIALS } from '../lib/constants'

export default function Clients() {
  return (
    <section className="relative overflow-hidden border-t border-ink-100 bg-paper-dim/60 py-16 dark:border-white/10 dark:bg-ink-900/50 sm:py-20 lg:py-24">
      <SectionBackground image={IMAGES.heroHall} tone="light" position="50% 40%" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">Trusted By</p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
            Schools, firms and government offices rely on us.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {CLIENTS.map((client) => (
              <li
                key={client}
                className="rounded-full border border-violet-100 bg-white px-4 py-2 text-[13.5px] font-medium text-violet-900 dark:border-white/10 dark:bg-white/5 dark:text-ink-200"
              >
                {client}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.by} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.06}>
              <figure className="h-full rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-white/10 dark:bg-ink-900 sm:p-7">
                <span aria-hidden="true" className="font-display text-5xl leading-none text-amber-500">&ldquo;</span>
                <blockquote className="-mt-2 text-[16px] leading-relaxed text-ink-700 dark:text-ink-200">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-ink-100 pt-4 text-[13.5px] font-semibold text-ink-950 dark:border-white/10 dark:text-white">
                  {t.by}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
