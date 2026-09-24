import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CompanyIntro from './components/CompanyIntro'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import Process from './components/Process'
import Capabilities from './components/Capabilities'
import EnquiryCTA from './components/EnquiryCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">
      <Navbar />
      <main>
        <Hero />
        <CompanyIntro />
        <Services />
        <WhyChooseUs />
        <Process />
        <Capabilities />
        <EnquiryCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
