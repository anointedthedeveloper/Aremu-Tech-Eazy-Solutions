export const ENQUIRY_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScKwMM3OcD6H2yIfEEmFz2eTdlrljdfRiVbtXdHizm3S1BRBg/viewform'

export const ENQUIRY_FORM_EMBED_URL = `${ENQUIRY_FORM_URL}?embedded=true`

export const COMPANY_NAME = 'Aremu Tech Eazy Solutions'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export interface Service {
  index: string
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    index: '01',
    title: 'IT Support & Troubleshooting',
    description:
      'Day-to-day technical problems sorted out — slow devices, error messages, account access issues, and the small breakdowns that stop work getting done.',
  },
  {
    index: '02',
    title: 'Device Setup & Repair Guidance',
    description:
      'Help getting computers, phones and office equipment set up correctly, configured, and running reliably, with guidance when something needs fixing.',
  },
  {
    index: '03',
    title: 'Software Installation & Configuration',
    description:
      'Installing, updating and configuring the software and systems a person or business actually needs — set up properly the first time.',
  },
  {
    index: '04',
    title: 'Networking & Connectivity',
    description:
      'Getting internet, Wi-Fi and office networks connected and working smoothly, so teams and households stay online without constant disruption.',
  },
  {
    index: '05',
    title: 'Tech Guidance & Consultation',
    description:
      'Plain-language advice on tech decisions — what to buy, what to fix, and what to change — from someone who explains it without the jargon.',
  },
  {
    index: '06',
    title: 'Digital & Web Solutions',
    description:
      'Support for the digital side of a business — from getting online to keeping everyday digital tools and platforms running as they should.',
  },
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
      'Submit an enquiry describing the problem or request. No technical jargon required — just what’s going on.',
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
      'Every enquiry starts with understanding what you’re trying to get done, not fitting you into a fixed package.',
  },
  {
    title: 'Responsive follow-through',
    description:
      'A request doesn’t end when the fix is applied — we’re reachable if something needs revisiting.',
  },
]

export const CAPABILITIES = [
  'Computers & laptops',
  'Mobile devices',
  'Office & home networks',
  'Everyday business software',
  'Operating systems',
  'Printers & peripherals',
  'Internet & connectivity',
  'Basic web & digital platforms',
]
