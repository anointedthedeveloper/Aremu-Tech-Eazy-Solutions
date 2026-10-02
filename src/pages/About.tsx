import PageHeader from '../components/PageHeader'
import Internship from '../components/Internship'
import CompanyIntro from '../components/CompanyIntro'
import WhyChooseUs from '../components/WhyChooseUs'
import Capabilities from '../components/Capabilities'
import Team from '../components/Team'
import LabShowcase from '../components/LabShowcase'
import VisionMission from '../components/VisionMission'
import EnquiryCTA from '../components/EnquiryCTA'
import { IMAGES } from '../lib/images'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A tech partner for the problems that aren't worth losing a day to."
        description="Aremu Tech Eazy Solutions exists for the moments technology gets in the way of what you're actually trying to do. Here's how we work, and what we can help with."
        image={IMAGES.siteCrew}
      />
      <CompanyIntro />
      <VisionMission />
      <LabShowcase />
      <Team />
      <Internship />
      <WhyChooseUs />
      <Capabilities />
      <EnquiryCTA />
    </>
  )
}
