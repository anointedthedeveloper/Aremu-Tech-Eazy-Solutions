import internWiring from '../assets/photos/intern-wiring.jpg'
import siteCrew from '../assets/photos/site-crew.jpg'
import trunkingInstall from '../assets/photos/trunking-install.jpg'
import labTechnician from '../assets/photos/lab-technician.jpg'
import jambReadiness from '../assets/photos/jamb-readiness.jpg'
import measuringWall from '../assets/photos/measuring-wall.jpg'
import etakTravels from '../assets/photos/etak-travels.jpg'
import labWoodRows from '../assets/photos/lab-wood-rows.jpg'
import labWoodDesk from '../assets/photos/lab-wood-desk.jpg'
import labWoodHall from '../assets/photos/lab-wood-hall.jpg'

export interface SiteImage {
  url: string
  alt: string
}

export interface SiteVideo {
  src: string
  poster: string
  alt: string
}

function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`
}

/** Real project footage — sped up and trimmed, served from /public/media */
export const VIDEOS = {
  fieldTesting: {
    src: '/media/field-testing.mp4',
    poster: '/media/field-testing.jpg',
    alt: 'Technicians in branded hi-vis vests testing laptops in a computer-based test centre',
  },
  labOverview: {
    src: '/media/lab-overview.mp4',
    poster: '/media/lab-overview.jpg',
    alt: 'Walkthrough of a large exam hall with rows of blue cubicles and laptops',
  },
  cubicleSetup: {
    src: '/media/cubicle-setup.mp4',
    poster: '/media/cubicle-setup.jpg',
    alt: 'Technician setting up and powering on a laptop in a green exam cubicle',
  },
  laptopCheck: {
    src: '/media/laptop-check.mp4',
    poster: '/media/laptop-check.jpg',
    alt: 'Technician checking numbered laptop stations along an exam hall',
  },
  cablingInstall: {
    src: '/media/cabling-install.mp4',
    poster: '/media/cabling-install.jpg',
    alt: 'Branded footage of technicians running cables and fixing network points in a new computer lab',
  },
  crewWiring: {
    src: '/media/crew-wiring.mp4',
    poster: '/media/crew-wiring.jpg',
    alt: 'The crew wiring and terminating cables inside a lab under construction',
  },
  trunkingFit: {
    src: '/media/trunking-fit.mp4',
    poster: '/media/trunking-fit.jpg',
    alt: 'Two technicians fitting cable trunking and feeding cables along a wall',
  },
} satisfies Record<string, SiteVideo>

export const IMAGES = {
  internWiring: {
    url: internWiring,
    alt: 'Intern stripping and terminating cable at a workbench during a lab installation',
  },
  siteCrew: {
    url: siteCrew,
    alt: 'The installation crew fitting trunking and cabling along the walls of a new computer lab',
  },
  trunkingInstall: {
    url: trunkingInstall,
    alt: 'Technician mounting cable trunking on a wall while colleagues look on',
  },
  labTechnician: {
    url: labTechnician,
    alt: 'Technician in a hi-vis vest at a green exam cubicle with Dell laptops',
  },
  jambReadiness: {
    url: jambReadiness,
    alt: 'Laptop showing the JAMB Test system readiness inspection passing',
  },
  etakTravels: {
    url: etakTravels,
    alt: 'Etak Travels & Tours website — Your reliable travel bridge to the world',
  },
  measuringWall: {
    url: measuringWall,
    alt: 'Technician on a stool measuring a wall for trunking before installation',
  },
  labWoodRows: {
    url: labWoodRows,
    alt: 'Completed computer lab with rows of wooden cubicles and laptops under ceiling fans',
  },
  labWoodDesk: {
    url: labWoodDesk,
    alt: 'Laptop set up in a wooden exam cubicle with more cubicles stretching into the hall',
  },
  labWoodHall: {
    url: labWoodHall,
    alt: 'Large exam hall with dozens of wooden cubicles, each with a laptop installed',
  },
  serviceCctv: {
    url: unsplash('photo-1557597774-9d273605dfa9', 900),
    alt: 'Security camera mounted on a wall',
  },
  serviceWeb: {
    url: unsplash('photo-1547658719-da2b51169166', 900),
    alt: 'Website design mockups displayed on a monitor',
  },
  capabilitiesOffice: {
    url: unsplash('photo-1573164713988-8665fc963095', 1100),
    alt: 'Modern office desk with a laptop, notebook and coffee',
  },
  serviceConsulting: {
    url: unsplash('photo-1552664730-d307ca884978', 900),
    alt: 'Two people in a discussion over a laptop at a desk',
  },
  serviceDevices: {
    url: unsplash('photo-1517430816045-df4b7de11d1d', 900),
    alt: 'Smartphone and laptop side by side on a desk',
  },
} satisfies Record<string, SiteImage>
