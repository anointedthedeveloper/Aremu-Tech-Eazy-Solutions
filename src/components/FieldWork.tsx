import Reveal from './Reveal'
import VideoCard from './VideoCard'
import SmartImage from './SmartImage'
import { IMAGES, VIDEOS } from '../lib/images'
import type { SiteImage, SiteVideo } from '../lib/images'

interface Tile {
  media: { kind: 'video'; video: SiteVideo } | { kind: 'image'; image: SiteImage }
  title: string
  text: string
  className: string
}

const TILES: Tile[] = [
  {
    media: { kind: 'video', video: VIDEOS.cubicleSetup },
    title: 'Powered on, ready to test',
    text: 'Every cubicle checked before candidates arrive.',
    className: 'col-span-1 aspect-[9/16] lg:row-span-2 lg:aspect-auto',
  },
  {
    media: { kind: 'image', image: IMAGES.siteCrew },
    title: 'Fitting out a new lab',
    text: 'Trunking, cabling and workstation layout done on site.',
    className: 'col-span-1 aspect-[9/16] sm:col-span-2 sm:aspect-[16/9] lg:aspect-auto',
  },
  {
    media: { kind: 'video', video: VIDEOS.laptopCheck },
    title: 'Station-by-station checks',
    text: 'Numbered stations verified one at a time.',
    className: 'col-span-1 aspect-[9/16] lg:row-span-2 lg:aspect-auto',
  },
  {
    media: { kind: 'image', image: IMAGES.trunkingInstall },
    title: 'Clean cable runs',
    text: 'Neat trunking that stays tidy and serviceable.',
    className: 'col-span-1 aspect-[4/5] lg:aspect-auto',
  },
  {
    media: { kind: 'image', image: IMAGES.jambReadiness },
    title: 'System readiness passed',
    text: 'Each machine inspected against exam requirements.',
    className: 'col-span-1 aspect-[4/5] lg:aspect-auto',
  },
]

export default function FieldWork() {
  return (
    <section className="relative overflow-hidden border-t border-ink-100 dark:border-white/10 bg-paper-dim/60 dark:bg-ink-900/50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
            In The Field
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 dark:text-white sm:text-[2.25rem]">
            What the work actually looks like.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-500 dark:text-ink-300">
            Real installs and checks from our recent CBT centre projects — not stock photos.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[250px] lg:grid-cols-4 lg:gap-5">
          {TILES.map((tile, i) => (
            <Reveal key={tile.title} delay={i * 0.05} className={tile.className}>
              <figure className="group relative h-full w-full overflow-hidden rounded-2xl border border-ink-200/70 dark:border-white/10 bg-ink-900 shadow-soft">
                {tile.media.kind === 'video' ? (
                  <VideoCard video={tile.media.video} className="h-full w-full" />
                ) : (
                  <SmartImage
                    image={tile.media.image}
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="mb-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-amber-400 to-violet-400" />
                  <p className="font-display text-[15px] font-semibold text-white sm:text-[17px]">{tile.title}</p>
                  <p className="mt-1 hidden text-[13px] leading-snug text-ink-200 sm:block">{tile.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
