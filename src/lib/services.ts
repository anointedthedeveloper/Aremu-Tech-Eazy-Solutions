import type { ComponentType, SVGProps } from 'react'
import {
  IconChip,
  IconCompass,
  IconGlobe,
  IconLayers,
  IconShieldCheck,
  IconTarget,
  IconTools,
  IconWifi,
} from '../components/icons'
import { IMAGES, VIDEOS, type SiteImage, type SiteVideo } from './images'

export interface Service {
  index: string
  slug: string
  title: string
  /** One-line summary used on cards. */
  description: string
  /** Longer intro shown on the service page. */
  intro: string
  includes: string[]
  bestFor: string[]
  image: SiteImage
  icon: ComponentType<SVGProps<SVGSVGElement>>
  gallery?: SiteImage[]
  videos?: SiteVideo[]
  /** Index into TESTIMONIALS to feature on the page. */
  testimonial?: number
  /** Training also has an application route. */
  applyCta?: boolean
}

export const SERVICES: Service[] = [
  {
    index: '01',
    slug: 'cbt-ict-centre-setup',
    title: 'ICT Centre & CBT Setup',
    description:
      'Procurement, installation and configuration of computer systems for ICT labs and JAMB-standard CBT centres — networking, cabling, CCTV and readiness checks included.',
    intro:
      'We fit out computer-based test centres and school ICT labs from an empty room to an exam-ready hall: cabling, cubicles, laptops, networking and the final readiness checks. We also manage centres after they open, so exam days run without surprises.',
    includes: [
      'Procurement, installation and configuration of computer systems',
      'JAMB CBT centre setup',
      'Network infrastructure design',
      'Structured cabling and trunking',
      'Cubicle and workstation layout',
      'CCTV and networking for the centre',
      'Station-by-station system-readiness checks',
      'Ongoing management and maintenance of the centre',
    ],
    bestFor: ['Schools', 'Private CBT centre owners', 'Training institutions', 'Government offices'],
    image: IMAGES.labWoodHall,
    icon: IconTarget,
    gallery: [IMAGES.labWoodRows, IMAGES.labWoodDesk, IMAGES.siteCrew, IMAGES.jambReadiness],
    videos: [VIDEOS.cubicleSetup, VIDEOS.labOverview, VIDEOS.fieldTesting],
    testimonial: 0,
  },
  {
    index: '02',
    slug: 'hardware-maintenance-repair',
    title: 'Hardware Maintenance & Repair',
    description:
      'Servicing, diagnostics, component replacement and upgrades for computers and office equipment — including long-term maintenance for offices and schools.',
    intro:
      'From a laptop that will not start to a whole office that needs keeping running, we diagnose properly, repair or replace what is actually faulty, and explain it in plain language. Long-term maintenance keeps downtime low.',
    includes: [
      'Repair and servicing of desktops and laptops',
      'Diagnostic services',
      'Component replacement',
      'Hardware upgrades',
      'Networking and cabling fixes',
      'Long-term maintenance for offices and school ICT labs',
      'On-site and remote support',
    ],
    bestFor: ['Offices', 'Schools', 'SMEs', 'Individuals'],
    image: IMAGES.labTechnician,
    icon: IconTools,
    testimonial: 2,
  },
  {
    index: '03',
    slug: 'software-installation',
    title: 'Software Installation & Configuration',
    description:
      'Windows and Office suites, antivirus and security tools, educational software, design tools and custom business software.',
    intro:
      'We install, update and configure the software your people actually use, so machines are ready to work from the first day and stay secure.',
    includes: [
      'Microsoft Windows and Office suites',
      'Antivirus and security tools',
      'Educational software',
      'Design tools: AutoCAD, CorelDRAW and the Adobe suite',
      'Custom business software',
    ],
    bestFor: ['Schools', 'Design and engineering firms', 'Offices', 'Individuals'],
    image: IMAGES.jambReadiness,
    icon: IconLayers,
  },
  {
    index: '04',
    slug: 'networking-cabling',
    title: 'Networking & Cabling',
    description:
      'Network infrastructure design, structured cabling and connectivity for offices, schools and homes.',
    intro:
      'Reliable connectivity starts with a well-designed network and tidy cabling. We plan, install and integrate networks, printers and systems so teams stay online.',
    includes: [
      'Network infrastructure design',
      'Structured cabling and trunking',
      'Wired and wireless connectivity',
      'Printer and peripheral integration',
      'Integration with computer systems and CCTV',
    ],
    bestFor: ['Offices', 'Schools and labs', 'Residences', 'CBT centres'],
    image: IMAGES.trunkingInstall,
    icon: IconWifi,
    videos: [VIDEOS.cablingInstall, VIDEOS.trunkingFit],
    gallery: [IMAGES.measuringWall],
  },
  {
    index: '05',
    slug: 'cctv-surveillance',
    title: 'CCTV Installation & Surveillance',
    description:
      'Wired and wireless CCTV for homes, offices, schools, churches and government facilities, with remote monitoring and maintenance.',
    intro:
      'A properly planned CCTV system makes a site safer and easier to manage. We design, install and maintain systems you can also check remotely.',
    includes: [
      'Wired and wireless CCTV installation',
      'Surveillance setup for homes, offices, schools, churches and government facilities',
      'Remote monitoring solutions',
      'Maintenance of installed systems',
    ],
    bestFor: ['Homes', 'Offices', 'Schools', 'Churches', 'Government facilities'],
    image: IMAGES.serviceCctv,
    icon: IconShieldCheck,
    testimonial: 3,
  },
  {
    index: '06',
    slug: 'ict-training',
    title: 'ICT Training & Computer Literacy',
    description:
      'Computer training, Microsoft Office, digital literacy and staff training — plus apprenticeship and IT/SIWES/NYSC placements.',
    intro:
      'We teach practical ICT skills in the classroom and on live projects. Beyond group training, we take apprentices and IT/SIWES/NYSC trainees onto real installations.',
    includes: [
      'Basic computer training',
      'Microsoft Office proficiency',
      'Digital literacy for students',
      'Corporate training for staff',
      'Apprenticeship placements',
      'IT / SIWES / NYSC placements',
    ],
    bestFor: ['Students', 'Corporate teams', 'Graduates and corps members', 'Career changers'],
    image: IMAGES.internWiring,
    icon: IconCompass,
    videos: [VIDEOS.crewWiring],
    applyCta: true,
  },
  {
    index: '07',
    slug: 'software-web-development',
    title: 'Software & Web Development',
    description:
      'Computer-based exam software for schools, mobile and system apps, and websites built around what your organisation needs.',
    intro:
      'We build the digital tools organisations depend on — from computer-based exam software for schools to mobile and system apps and business websites.',
    includes: [
      'Computer-based exam software for schools',
      'Mobile and system apps',
      'Website design and development',
      'Digital platforms and tools for businesses',
    ],
    bestFor: ['Schools', 'Businesses', 'Travel and service companies', 'Organisations going digital'],
    image: IMAGES.serviceWeb,
    icon: IconGlobe,
  },
  {
    index: '08',
    slug: 'computer-sales-supply',
    title: 'Sale & Supply of Computers',
    description:
      'New and fairly used desktops, laptops and smart gadgets, plus office equipment — supplied, set up and supported.',
    intro:
      'Need machines for yourself, your office or a whole lab? We supply quality computers and gadgets at fair prices and set them up so they are ready to use.',
    includes: [
      'Desktop computers — new and fairly used',
      'Laptops and smart gadgets — new and fairly used',
      'Office equipment',
      'Bulk supply for labs and CBT centres',
      'Set-up and after-sales support',
    ],
    bestFor: ['Individuals', 'Offices', 'Schools', 'CBT centre owners'],
    image: IMAGES.serviceDevices,
    icon: IconChip,
  },
]

export function getService(slug: string | undefined) {
  return SERVICES.find((s) => s.slug === slug)
}

export function serviceHref(service: Service) {
  return `/services/${service.slug}`
}
