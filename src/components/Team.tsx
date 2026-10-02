import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { TEAM, TEAM_GROUP } from '../lib/team'

export default function Team() {
  return (
    <section id="team" className="border-t border-ink-100 bg-paper-dim/60 py-12 dark:border-white/10 dark:bg-ink-900/50 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">The Team</p>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
            The people behind every install.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-500 dark:text-ink-300">
            Technicians and installers who show up in branded hi-vis and stay until every station works.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-ink-200/70 shadow-soft dark:border-white/10 sm:aspect-[2/1] lg:aspect-[16/7]">
            <SmartImage image={TEAM_GROUP} className="h-full w-full [&_img]:object-[50%_15%]" />
          </div>
        </Reveal>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {TEAM.map((member, i) => (
            <Reveal key={member.photo.url} as="li" delay={(i % 5) * 0.05}>
              <figure className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white dark:border-white/10 dark:bg-ink-900">
                <div className="aspect-[4/5] overflow-hidden">
                  <SmartImage image={member.photo} className="h-full w-full" />
                </div>
                <figcaption className="p-4">
                  <span className="mb-2.5 block h-0.5 w-8 rounded-full bg-gradient-to-r from-amber-500 to-violet-500" />
                  <p className="text-[15px] font-semibold text-ink-950 dark:text-white">{member.name ?? 'Team member'}</p>
                  {member.role && <p className="mt-0.5 text-[13px] text-ink-500 dark:text-ink-300">{member.role}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
