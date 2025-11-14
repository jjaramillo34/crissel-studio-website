import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import ProductsPage from './components/ProductsPage'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import GalleryPage from './components/GalleryPage'
import ResultsShowcase from './components/sections/ResultsShowcase'
import TestimonialsCarousel from './components/sections/TestimonialsCarousel'
import FeaturedPackages from './components/sections/FeaturedPackages'
import ProcessTimeline from './components/sections/ProcessTimeline'
import FaqQuick from './components/sections/FaqQuick'
import TeamSpotlight from './components/sections/TeamSpotlight'
import BlogHighlights from './components/sections/BlogHighlights'
import AvailabilityWidget from './components/sections/AvailabilityWidget'
import LocationReviews from './components/sections/LocationReviews'
import ProductsTeaser from './components/sections/ProductsTeaser'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import { Seo } from './components/Seo'
import logoImage from './assets/images/logo_photo.png'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="relative mb-6">
          <img 
            src={logoImage} 
            alt="Crissel Studio Logo" 
            className="w-32 h-32 mx-auto object-contain"
          />
        </div>
        <h1 className="text-5xl font-bold text-[#E57373] mb-2">Crissel Studio</h1>
        <p className="text-lg text-gray-600 mb-4">¡Realza el poder de tu mirada!</p>
        <div className="w-16 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] mx-auto rounded-full animate-pulse" />
      </motion.div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Seo
        title="Crissel Studio | Expertas en mirada, cejas y maquillaje en Ambato"
        description="Somos especialistas en extensiones de pestañas, diseño de cejas, maquillaje profesional y paquetes de belleza personalizada en Ambato."
      />
      <main>
        <Hero />
        <ResultsShowcase />
        <About />
        <Services />
        <FeaturedPackages />
        <ProcessTimeline />
        <AvailabilityWidget />
        <TestimonialsCarousel />
        <FaqQuick />
        <TeamSpotlight />
        <BlogHighlights />
        <ProductsTeaser />
        <LocationReviews />
        <Gallery />
        <Contact />
      </main>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  )
}

export default App
