import Hero from '@/components/sections/Hero'
import ResultsShowcase from '@/components/sections/ResultsShowcase'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import FeaturedPackages from '@/components/sections/FeaturedPackages'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import AvailabilityWidget from '@/components/sections/AvailabilityWidget'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import FaqQuick from '@/components/sections/FaqQuick'
import TeamSpotlight from '@/components/sections/TeamSpotlight'
import BlogHighlights from '@/components/sections/BlogHighlights'
import ProductsTeaser from '@/components/sections/ProductsTeaser'
import LocationReviews from '@/components/sections/LocationReviews'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Crissel Studio | Expertas en mirada, cejas y maquillaje en Ambato',
  description: 'Somos especialistas en extensiones de pestañas, diseño de cejas, maquillaje profesional y paquetes de belleza personalizada en Ambato.',
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[hsl(330_32%_97%)]">
      <main className="relative">
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

