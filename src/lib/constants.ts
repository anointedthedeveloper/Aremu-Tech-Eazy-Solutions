export const ENQUIRY_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScKwMM3OcD6H2yIfEEmFz2eTdlrljdfRiVbtXdHizm3S1BRBg/viewform'

export const ENQUIRY_FORM_EMBED_URL = `${ENQUIRY_FORM_URL}?embedded=true`

export const COMPANY_NAME = 'Aremu Tech Eazy Solutions'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Internship', href: '/internship' },
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
    title: 'ICT Centre & CBT Setup',
    description:
      'Procurement, installation and configuration of computer systems for ICT labs and JAMB-standard CBT centres — networking, cabling, CCTV and readiness checks included, so exam day runs without surprises.',
  },
  {
    index: '02',
    title: 'Hardware Maintenance & Repair',
    description:
      'Servicing, diagnostics, component replacement and upgrades for computers and office equipment — including long-term maintenance contracts for offices and schools.',
  },
  {
    index: '03',
    title: 'Software Installation & Configuration',
    description:
      'Windows and Office suites, antivirus and security tools, educational software, design tools such as AutoCAD, CorelDRAW and Adobe, and custom business software.',
  },
  {
    index: '04',
    title: 'Networking & Cabling',
    description:
      'Network infrastructure design, structured cabling and connectivity for offices, schools and homes, so teams stay online without constant disruption.',
  },
  {
    index: '05',
    title: 'CCTV Installation & Surveillance',
    description:
      'Wired and wireless CCTV for homes, offices, schools, churches and government facilities, with remote monitoring and ongoing maintenance.',
  },
  {
    index: '06',
    title: 'ICT Training & Computer Literacy',
    description:
      'Basic computer training, Microsoft Office proficiency, digital literacy for students and corporate staff training — plus apprenticeship and IT/SIWES/NYSC placements.',
  },
  {
    index: '07',
    title: 'Software & Web Development',
    description:
      'Computer-based exam software for schools, mobile and system apps, and websites built around what your organisation actually needs.',
  },
  {
    index: '08',
    title: 'Sale & Supply of Computers',
    description:
      'New and fairly used desktops, laptops and smart gadgets, plus office equipment — supplied, set up and supported at fair prices.',
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
