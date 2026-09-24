import PageHeader from '../components/PageHeader'
import Services from '../components/Services'
import Process from '../components/Process'
import EnquiryCTA from '../components/EnquiryCTA'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Practical tech support, from setup to sorted-out."
        description="These are the areas customers most often reach out about. If what you need doesn't fit neatly into a category, submit an enquiry anyway — that's what it's there for."
      />
      <Services />
      <Process />
      <EnquiryCTA />
    </>
  )
}
