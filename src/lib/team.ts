import group from '../assets/team/group.jpg'
import member1 from '../assets/team/member-1.jpg'
import member2 from '../assets/team/member-2.jpg'
import member3 from '../assets/team/member-3.jpg'
import member4 from '../assets/team/member-4.jpg'
import member5 from '../assets/team/member-5.jpg'
import type { SiteImage } from './images'

export interface TeamMember {
  /** Full name — fill in as confirmed. */
  name?: string
  /** Position or role — fill in as confirmed. */
  role?: string
  /** Optional — cards without a photo show a branded placeholder. */
  photo?: SiteImage
}

export const TEAM_GROUP: SiteImage = {
  url: group,
  alt: 'The Aremu Tech Eazy Solutions team in branded hi-vis vests inside a CBT centre',
}

const alt = (n: number) => `Aremu Tech Eazy Solutions team member ${n} in a branded hi-vis vest`

/** Order matches the photos: edit `name` and `role` below. */
export const TEAM: TeamMember[] = [
  { photo: { url: member1, alt: alt(1) } },
  { photo: { url: member2, alt: alt(2) } },
  { photo: { url: member3, alt: alt(3) } },
  { photo: { url: member4, alt: alt(4) } },
  { photo: { url: member5, alt: alt(5) } },
  // Developer slot: add `name` and `photo` (import a file from src/assets/team) when ready.
  { role: 'Lead Software Engineer' },
]
