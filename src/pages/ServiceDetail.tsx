import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import VideoCard from '../components/VideoCard'
import CallToAction from '../components/CallToAction'
import { IconArrowRight, IconCheck } from '../components/icons'
import { PROCESS_STEPS, TESTIMONIALS } from '../lib/constants'
import { CONTACT } from '../lib/contact'
import WebProjectCard from '../components/WebProjectCard'
import { getRelated, getService, serviceHref } from '../lib/services'
import { getWebProjects } from '../lib/projects'
import NotFound from './NotFound'

const FAQ = [
  { q: 'How do I get started?', a: 'Contact us with a short description of what you need. We will reply, ask any questions and agree the next step with you.' },
  { q: 'Do you work outside Abuja?', a: 'Our offices are in Kubwa, Abuja, and our operations cover the whole country. We provide on-site and remote support as needed.' },
  { q: 'How much will it cost?', a: 'It depends on the scope. Tell us what you need and we will give you a clear, affordable quote before any work starts.' },
]

const primaryBtn =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400'
const secondaryBtn =
  'inline-flex items-center justify-center rounded-full border border-violet-300 px-6 py-3.5 text-[15px] font-semibold text-violet-700 transition-colors hover:bg-violet-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />

  const related = getRelated(service)
  const webProjects = getWebProjects(service.projectIds)
  const testimonial = service.testimonial !== undefined ? TESTIMONIALS[service.testimonial] : undefined

  return (
    <>
      {/* header */}
      <section className="bg-paper-dim/60 pt-28 pb-12 dark:bg-transparent sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink-500 dark:text-ink-400">
              <Link to="/services" className="font-medium text-violet-700 hover:underline dark:text-violet-400">Services</Link>
              <span className="mx-2">/</span>
              <span>{service.title}</span>
            </nav>
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Service {service.index}</p>
            <h1 className="mt-3 text-balance font-display text-[2.1rem] leading-[1.08] font-bold text-ink-950 dark:text-white sm:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-ink-500 dark:text-ink-300">{service.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className={primaryBtn}>
                Contact Us
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              {service.applyCta && (
                <Link to="/apply" className={secondaryBtn}>Apply</Link>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200/70 shadow-lifted dark:border-white/10">
              <SmartImage image={service.image} loading="eager" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* what's included */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white sm:text-[1.9rem]">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-ink-200/70 bg-white p-4 text-[15px] leading-snug text-ink-700 dark:border-white/10 dark:bg-ink-900 dark:text-ink-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-[17px] font-semibold text-ink-950 dark:text-white">Best for</h3>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {service.bestFor.map((b) => (
                <li key={b} className="rounded-full border border-violet-100 bg-violet-100/50 px-4 py-2 text-[13.5px] font-medium text-violet-900 dark:border-white/10 dark:bg-white/5 dark:text-ink-200">{b}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-white/10 dark:bg-ink-900 lg:sticky lg:top-28">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-violet-600 dark:text-violet-400">Talk to us</p>
              <p className="mt-3 font-display text-[19px] leading-snug font-semibold text-ink-950 dark:text-white">Ready to get started?</p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-ink-700 dark:text-ink-200">
                {CONTACT.phones.map((p) => (
                  <li key={p.href}><a href={p.href} className="hover:text-violet-700 dark:hover:text-violet-400">{p.label}</a></li>
                ))}
                <li><a href={CONTACT.whatsapp.href} className="hover:text-violet-700 dark:hover:text-violet-400">WhatsApp {CONTACT.whatsapp.label}</a></li>
              </ul>
              <Link to="/contact" className={`${primaryBtn} mt-5 w-full`}>Contact Us</Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* proof */}
      {testimonial && (
        <section className="border-y border-ink-100 bg-paper-dim/60 py-12 dark:border-white/10 dark:bg-ink-900/50 sm:py-16">
          <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span aria-hidden="true" className="font-display text-6xl leading-none text-amber-500">&ldquo;</span>
            <blockquote className="-mt-3 text-balance font-display text-[21px] leading-snug font-semibold text-ink-950 dark:text-white sm:text-[26px]">{testimonial.quote}</blockquote>
            <p className="mt-5 text-[14px] font-semibold text-violet-700 dark:text-violet-400">{testimonial.by}</p>
          </Reveal>
        </section>
      )}

      {/* media */}
      {(service.videos?.length || service.gallery?.length) && (
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink-950 dark:text-white sm:text-[1.9rem]">From the field</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {service.videos?.map((v) => (
                <Reveal key={v.src}>
                  <VideoCard video={v} playOnTap className="aspect-[9/16] w-full rounded-2xl border border-ink-200/70 dark:border-white/10" />
                </Reveal>
              ))}
              {service.gallery?.map((img) => (
                <Reveal key={img.url}>
                  <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-ink-200/70 dark:border-white/10">
                    <SmartImage image={img} className="h-full w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {webProjects.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink-950 dark:text-white sm:text-[1.9rem]">Completed project</h2>
            </Reveal>
            <div className="mt-6 space-y-6">
              {webProjects.map((project) => (
                <Reveal key={project.id}>
                  <WebProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* how it works */}
      <section className="border-t border-ink-100 bg-paper-dim/60 py-12 dark:border-white/10 dark:bg-ink-900/50 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white sm:text-[1.9rem]">How it works</h2>
          </Reveal>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.index} as="li" delay={i * 0.06}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-display text-[13px] font-semibold text-white">{step.index}</span>
                <h3 className="mt-4 text-[16.5px] font-semibold text-ink-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500 dark:text-ink-300">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* faq */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white sm:text-[1.9rem]">Common questions</h2>
          </Reveal>
          <div className="mt-6 divide-y divide-ink-200 rounded-2xl border border-ink-200/70 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-ink-900">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-5 py-4 sm:px-6 sm:py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-ink-950 dark:text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-xl leading-none text-violet-600 transition-transform group-open:rotate-45 dark:text-violet-400">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* see also */}
      <section className="border-t border-ink-100 py-12 dark:border-white/10 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white sm:text-[1.9rem]">See also</h2>
            <Link to="/services" className="text-[14.5px] font-semibold text-violet-700 hover:underline dark:text-violet-400">All services</Link>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((o) => (
              <Link
                key={o.slug}
                to={serviceHref(o)}
                className="group flex flex-col rounded-2xl border border-ink-200/70 bg-white p-5 transition-shadow hover:shadow-lifted dark:border-white/10 dark:bg-ink-900"
              >
                <o.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                <h3 className="mt-4 text-[16.5px] font-semibold text-ink-950 dark:text-white">{o.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-500 dark:text-ink-300">{o.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-violet-700 dark:text-violet-400">
                  View details <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] font-semibold">
            <Link to="/projects" className="text-violet-700 hover:underline dark:text-violet-400">See our projects →</Link>
            {service.applyCta && (
              <Link to="/internship" className="text-violet-700 hover:underline dark:text-violet-400">How the internship works →</Link>
            )}
          </p>
        </div>
      </section>

      <CallToAction variant={service.applyCta ? 'apply' : 'contact'} />
    </>
  )
}
