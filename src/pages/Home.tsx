import Hero from '../components/Hero'
import CapabilityStrip from '../components/CapabilityStrip'
import AboutTeaser from '../components/AboutTeaser'
import ServicesTeaser from '../components/ServicesTeaser'
import FieldWork from '../components/FieldWork'
import Internship from '../components/Internship'
import Clients from '../components/Clients'
import WhyChooseUs from '../components/WhyChooseUs'
import EnquiryCTA from '../components/EnquiryCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <AboutTeaser />
      <ServicesTeaser />
      <Internship />
      <FieldWork />
      <Clients />
      <WhyChooseUs />
      <EnquiryCTA />
    </>
  )
}
