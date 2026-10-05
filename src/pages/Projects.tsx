import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import VideoCard from '../components/VideoCard'
import SmartImage from '../components/SmartImage'
import LabShowcase from '../components/LabShowcase'
import WebProjectCard from '../components/WebProjectCard'
import { WEB_PROJECTS } from '../lib/projects'
import CallToAction from '../components/CallToAction'
import { IMAGES, VIDEOS } from '../lib/images'

const STAGES = [
  { n: '01', title: 'Cabling & trunking', text: 'Walls marked, trunking fitted and cable runs laid before any furniture arrives.', image: IMAGES.measuringWall },
  { n: '02', title: 'Stations & laptops', text: 'Cubicles assembled, laptops installed and every station powered on.', image: IMAGES.labTechnician },
  { n: '03', title: 'Readiness testing', text: 'Each machine inspected against the exam software’s readiness checks.', image: IMAGES.jambReadiness },
  { n: '04', title: 'Exam-ready', text: 'A finished hall, tested station by station and handed over ready to use.', image: IMAGES.labWoodHall },
]

const CLIPS = [
  VIDEOS.cablingInstall,
  VIDEOS.trunkingFit,
  VIDEOS.crewWiring,
  VIDEOS.fieldTesting,
  VIDEOS.labOverview,
  VIDEOS.cubicleSetup,
  VIDEOS.laptopCheck,
]

export default function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Labs we've fitted out, start to finish."
        description="Real CBT centre installs — from the first cable run to the final readiness check. These are our own photos and footage from site."
        image={IMAGES.labWoodRows}
      />

      <section className="border-t border-ink-100 py-20 dark:border-white/10 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">How A Lab Comes Together</p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
              Four stages, one reliable result.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((stage, i) => (
              <Reveal key={stage.n} delay={i * 0.07}>
                <article className="h-full overflow-hidden rounded-2xl border border-ink-200/70 bg-white dark:border-white/10 dark:bg-ink-900">
                  <div className="aspect-[4/3] overflow-hidden">
                    <SmartImage image={stage.image} className="h-full w-full" />
                  </div>
                  <div className="p-5">
                    <span className="font-display text-[13px] font-semibold text-violet-600 dark:text-violet-400">{stage.n}</span>
                    <h3 className="mt-1.5 text-[17px] font-semibold text-ink-950 dark:text-white">{stage.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-500 dark:text-ink-300">{stage.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 py-12 dark:border-white/10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">Websites &amp; Software</p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
              Digital projects we&apos;ve delivered.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-6">
            {WEB_PROJECTS.map((project) => (
              <Reveal key={project.id}>
                <WebProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LabShowcase eyebrow="Finished Results" title="The labs, ready for exam day." text="Rows of cubicles, laptops in place, lighting and fans installed." />

      <section className="relative overflow-hidden bg-deep py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400">On Site</p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">Footage from the field.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-300">Sped-up clips from recent installs, cabling and readiness checks.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {CLIPS.map((clip, i) => (
              <Reveal key={clip.src} delay={i * 0.06}>
                <VideoCard video={clip} playOnTap className="aspect-[9/16] w-full rounded-2xl border border-white/15" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
