import Hero from '../components/Hero'
import AboutTeaser from '../components/AboutTeaser'
import ServicesTeaser from '../components/ServicesTeaser'
import FieldWork from '../components/FieldWork'
import Internship from '../components/Internship'
import WhyChooseUs from '../components/WhyChooseUs'
import EnquiryCTA from '../components/EnquiryCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <Internship />
      <FieldWork />
      <WhyChooseUs />
      <EnquiryCTA />
    </>
  )
}
