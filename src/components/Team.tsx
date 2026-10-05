import Reveal from './Reveal'
import SmartImage from './SmartImage'
import ParallaxImage from './ParallaxImage'
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

        <Reveal direction="scale" delay={0.05} className="mt-8">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-ink-200/70 shadow-soft dark:border-white/10 sm:aspect-[2/1] lg:aspect-[16/7]">
            <ParallaxImage image={TEAM_GROUP} strength={5} className="h-full w-full" />
          </div>
        </Reveal>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.photo?.url ?? member.role ?? i} as="li" direction="scale" className="flex" delay={(i % 4) * 0.05}>
              <figure className="flex w-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white dark:border-white/10 dark:bg-ink-900">
                <div className="aspect-[4/5] overflow-hidden">
                  {member.photo ? (
                    <SmartImage image={member.photo} className="h-full w-full" />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${member.role ?? 'Team member'} — photo coming soon`}
                      className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-700 via-violet-600 to-amber-500"
                    >
                      <span className="font-display text-5xl font-bold tracking-tight text-white/90">&lt;/&gt;</span>
                    </div>
                  )}
                </div>
                <figcaption className="flex-1 p-4">
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
