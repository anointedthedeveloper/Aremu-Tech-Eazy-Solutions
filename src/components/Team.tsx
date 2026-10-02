import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { IMAGES, type SiteImage } from '../lib/images'

interface TeamGroup {
  role: string
  description: string
  image: SiteImage
  /** Add names here as they're confirmed, e.g. ['Name Surname'] */
  members?: string[]
}

const TEAM: TeamGroup[] = [
  {
    role: 'Installation Crew',
    description: 'Trunking, cabling and workstation layout — the physical groundwork that makes a lab reliable.',
    image: IMAGES.siteCrew,
  },
  {
    role: 'Lab Technicians',
    description: 'Laptop setup, configuration and station-by-station readiness testing before exam day.',
    image: IMAGES.labTechnician,
  },
  {
    role: 'Interns & Trainees',
    description: 'Learning the trade on live installs, supervised by the crew and given real responsibility.',
    image: IMAGES.internWiring,
  },
]

export default function Team() {
  return (
    <section id="team" className="border-t border-ink-100 bg-paper-dim/60 py-20 dark:border-white/10 dark:bg-ink-900/50 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">The Team</p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
            The people behind every install.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-500 dark:text-ink-300">
            A hands-on crew of installers, technicians and interns who show up in branded hi-vis
            and stay until every station works.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((group, i) => (
            <Reveal key={group.role} delay={i * 0.08}>
              <article className="group h-full overflow-hidden rounded-2xl border border-ink-200/70 bg-white dark:border-white/10 dark:bg-ink-900">
                <div className="aspect-[4/3] overflow-hidden">
                  <SmartImage image={group.image} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="mb-3 block h-0.5 w-10 rounded-full bg-gradient-to-r from-amber-500 to-violet-500" />
                  <h3 className="text-[18px] font-semibold text-ink-950 dark:text-white">{group.role}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500 dark:text-ink-300">{group.description}</p>
                  {group.members && group.members.length > 0 && (
                    <p className="mt-4 text-[13.5px] font-medium text-ink-700 dark:text-ink-200">{group.members.join(' · ')}</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
