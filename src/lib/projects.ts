import { IMAGES, type SiteImage } from './images'

export interface WebProject {
  id: string
  name: string
  url: string
  domain: string
  image: SiteImage
  summary: string
  tags: string[]
}

export const WEB_PROJECTS: WebProject[] = [
  {
    id: 'etak-travels',
    name: 'Etak Travels & Tours Expert Limited',
    url: 'https://etaktravels.com',
    domain: 'etaktravels.com',
    image: IMAGES.etakTravels,
    summary:
      'A website for an Abuja travel management company, presenting its flights, hotels, tours, visa assistance and corporate travel services to customers across Nigeria and beyond.',
    tags: ['Website design', 'Website development', 'Travel & tours'],
  },
]

export function getWebProjects(ids: string[] | undefined) {
  return WEB_PROJECTS.filter((p) => ids?.includes(p.id))
}
