export const COMPANY_NAME = 'Aremu Tech Eazy Solutions'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Internship', href: '/internship' },
  { label: 'About', href: '/about' },
]

export interface ProcessStep {
  index: string
  title: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Tell us what you need',
    description:
      'Contact us and describe the problem or request. No technical jargon required — just what’s going on.',
  },
  {
    index: '02',
    title: 'We assess the situation',
    description:
      'We review what you’ve shared and work out the most practical, cost-effective way to solve it.',
  },
  {
    index: '03',
    title: 'We get it working',
    description:
      'We carry out the fix, setup or install — clearly, carefully, and with minimal disruption to your day.',
  },
  {
    index: '04',
    title: 'We stay reachable',
    description:
      'If something related comes up afterwards, you know exactly where to reach us again.',
  },
]

export interface Differentiator {
  title: string
  description: string
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'We explain things plainly',
    description:
      'No jargon-heavy reports. We tell you what’s wrong, what we’re doing about it, and why — in language that makes sense.',
  },
  {
    title: 'Practical, not upsold',
    description:
      'We recommend what actually solves the problem in front of you, not the most expensive option available.',
  },
  {
    title: 'Built around real requests',
    description:
      'Every request starts with understanding what you’re trying to get done, not fitting you into a fixed package.',
  },
  {
    title: 'Responsive follow-through',
    description:
      'A request doesn’t end when the fix is applied — we’re reachable if something needs revisiting.',
  },
]

export const CAPABILITIES = [
  'CBT labs & exam halls',
  'Computers & laptops',
  'CCTV & surveillance',
  'Networking & cabling',
  'Software & web development',
  'ICT training',
  'Printers & peripherals',
  'Office equipment supply',
]

export const CLIENTS = [
  'ADEOLA International School',
  'Capville Schools',
  'Peter Harvard International Schools',
  'JAMB FCT Zonal Office',
  'Goshen High School',
  'Sada, Idris & Co.',
  'Amiable Academy',
]

export const TESTIMONIALS = [
  {
    quote: 'AREMU TECH EAZY SOLUTIONS currently manages our CBT Center and ensures everything runs smoothly during exams.',
    by: 'Center Admin, ADEOLA International School',
  },
  {
    quote: 'Professional and proactive service during our CBT exam sessions. Highly reliable team.',
    by: 'Director, Capville Schools',
  },
  {
    quote: 'They maintained our school’s ICT lab very professionally and timely!',
    by: 'Principal, Goshen High School',
  },
  {
    quote: 'The CCTV installation in our office has made our work environment more secure. I highly recommend.',
    by: 'CEO, Jovik Global Services',
  },
]

export const VALUES = ['Innovation', 'Integrity', 'Customer Satisfaction', 'Excellence', 'Continuous Improvement']
