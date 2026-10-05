import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import RouteCurtain from './components/RouteCurtain'
import { PageSkeleton } from './components/Skeleton'
import { ThemeProvider } from './lib/theme'
const Home = lazy(() => import('./pages/Home'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const InternshipPage = lazy(() => import('./pages/InternshipPage'))
const Apply = lazy(() => import('./pages/Apply'))
const Projects = lazy(() => import('./pages/Projects'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<PageSkeleton />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <PageLoader />
      <ScrollProgress />
      <RouteCurtain />
      <ScrollToTop />
      <div className="min-h-screen bg-paper dark:bg-ink-950">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
