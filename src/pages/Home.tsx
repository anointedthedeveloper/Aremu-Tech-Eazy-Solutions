import Hero from '../components/Hero'
import FactsStrip from '../components/FactsStrip'
import AboutTeaser from '../components/AboutTeaser'
import ServicesTeaser from '../components/ServicesTeaser'
import FieldWork from '../components/FieldWork'
import Internship from '../components/Internship'
import Clients from '../components/Clients'
import WhyChooseUs from '../components/WhyChooseUs'
import CallToAction from '../components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <FactsStrip />
      <AboutTeaser />
      <ServicesTeaser />
      <Internship />
      <FieldWork />
      <Clients />
      <WhyChooseUs />
      <CallToAction />
    </>
  )
}
