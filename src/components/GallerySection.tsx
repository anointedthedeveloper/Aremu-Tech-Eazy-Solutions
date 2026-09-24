import Reveal from './Reveal'
import Carousel from './Carousel'
import { IMAGES } from '../lib/images'

const SLIDES = [
  {
    image: IMAGES.gallery[0],
    title: 'Everyday workspaces',
    description: 'From a single home office to a full team setup — we work where you work.',
  },
  {
    image: IMAGES.gallery[1],
    title: 'Working things through together',
    description: 'We talk you through what’s happening before we start changing anything.',
  },
  {
    image: IMAGES.gallery[2],
    title: 'Hands-on when it matters',
    description: 'Some problems need a proper look, not just a remote guess.',
  },
  {
    image: IMAGES.gallery[3],
    title: 'Down to the hardware',
    description: 'When the issue is physical, we go as deep as the problem requires.',
  },
  {
    image: IMAGES.gallery[4],
    title: 'Networks that stay up',
    description: 'Reliable connectivity, whether it’s one router or a small office setup.',
  },
]

export default function GallerySection() {
  return (
    <section className="border-t border-ink-100 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600">
            A Closer Look
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-ink-950 sm:text-[2.25rem]">
            What the work actually looks like.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <Carousel slides={SLIDES} />
        </Reveal>
      </div>
    </section>
  )
}
