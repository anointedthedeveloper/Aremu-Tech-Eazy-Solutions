import Hero from '../components/Hero'
import AboutTeaser from '../components/AboutTeaser'
import ServicesTeaser from '../components/ServicesTeaser'
import GallerySection from '../components/GallerySection'
import WhyChooseUs from '../components/WhyChooseUs'
import EnquiryCTA from '../components/EnquiryCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <GallerySection />
      <WhyChooseUs />
      <EnquiryCTA />
    </>
  )
}
