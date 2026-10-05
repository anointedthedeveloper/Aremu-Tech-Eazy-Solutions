import group from '../assets/team/group.jpg'
import member1 from '../assets/team/member-1.jpg'
import member2 from '../assets/team/member-2.jpg'
import member3 from '../assets/team/member-3.jpg'
import member4 from '../assets/team/member-4.jpg'
import member5 from '../assets/team/member-5.jpg'
import memberLady from '../assets/team/member-lady.jpg'
import type { SiteImage } from './images'

export interface TeamMember {
  name?: string
  role?: string
  /** Optional — cards without a photo show a branded placeholder. */
  photo?: SiteImage
}

export const TEAM_GROUP: SiteImage = {
  url: group,
  alt: 'The Aremu Tech Eazy Solutions team in branded hi-vis vests inside a CBT centre',
}

const photo = (url: string, name: string): SiteImage => ({
  url,
  alt: `${name} in an Aremu Tech Eazy Solutions hi-vis vest`,
})

const MEMBER = 'Team Member'

/** Display order: general manager, department heads, lead software engineer, then the team. */
export const TEAM: TeamMember[] = [
  {
    name: 'Engr Ahmed Olamilekan Ajao',
    role: 'General Manager',
    photo: photo(member1, 'Engr Ahmed Olamilekan Ajao'),
  },
  {
    name: 'Engr Abdullateef Ayomipo Aliyu',
    role: 'Head of Networking & CCTV Department',
    photo: photo(member4, 'Engr Abdullateef Ayomipo Aliyu'),
  },
  {
    name: 'Engr Joseph Idoko',
    role: 'Head of Engineering Department',
    photo: photo(member2, 'Engr Joseph Idoko'),
  },
  {
    // Add `photo: photo(<imported file>, name)` here once a photo is available.
    name: 'Engr Anointed Agunloye',
    role: 'Lead Software Engineer',
  },
  {
    name: 'Engr Oladeyinde Ayomide',
    role: MEMBER,
    photo: photo(member3, 'Engr Oladeyinde Ayomide'),
  },
  {
    name: 'Engr Josephine Okechukwu Jombo',
    role: MEMBER,
    photo: photo(memberLady, 'Engr Josephine Okechukwu Jombo'),
  },
  {
    name: 'Engr Augustine Ebokeh Friday',
    role: MEMBER,
    photo: photo(member5, 'Engr Augustine Ebokeh Friday'),
  },
]
