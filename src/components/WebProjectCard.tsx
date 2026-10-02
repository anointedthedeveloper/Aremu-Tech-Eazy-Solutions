import SmartImage from './SmartImage'
import { IconArrowRight } from './icons'
import type { WebProject } from '../lib/projects'

export default function WebProjectCard({ project }: { project: WebProject }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft dark:border-white/10 dark:bg-ink-900">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.domain} (opens in a new tab)`}
        className="group relative block aspect-[1200/630] overflow-hidden"
      >
        <SmartImage image={project.image} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      </a>
      <div className="flex flex-col p-6 sm:p-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[12px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Completed &amp; live
        </span>
        <h3 className="mt-4 font-display text-[22px] leading-snug font-bold text-ink-950 dark:text-white sm:text-[26px]">{project.name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-violet-100 bg-violet-100/50 px-3 py-1 text-[12.5px] font-medium text-violet-900 dark:border-white/10 dark:bg-white/5 dark:text-ink-200">
              {t}
            </li>
          ))}
        </ul>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-[14.5px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
        >
          Visit {project.domain}
          <IconArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  )
}
