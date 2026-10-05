import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { IconArrowRight } from './icons'

export default function AboutTeaser() {
  return (
    <section className="border-t border-ink-100 dark:border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
              About Us
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
              A tech partner for the problems that aren&apos;t worth losing a day to.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-[16px] leading-relaxed text-ink-500 dark:text-ink-300">
              Registered with the CAC since October 2023, we serve schools, private firms,
              government offices and SMEs from our base in Kubwa, Abuja — setting up CBT
              centres, repairing and supplying computers, installing networks and CCTV, and
              training the next generation of ICT professionals.
            </p>
            <Link
              to="/about"
              className="group mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-ink-950 dark:text-white transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              More about how we work
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
