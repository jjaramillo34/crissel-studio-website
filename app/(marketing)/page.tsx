import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Treatments from '@/components/sections/Treatments'
import Standards from '@/components/sections/Standards'
import ConsultationCta from '@/components/sections/ConsultationCta'
import FaqQuick from '@/components/sections/FaqQuick'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import Contact from '@/components/sections/Contact'
import { Column } from '@once-ui-system/core'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Crissel Studio | Pestañas, cejas, maquillaje y uñas en Ambato',
  description:
    'Somos especialistas en extensiones de pestañas, diseño de cejas, maquillaje profesional y uñas (manicure, pedicure, semipermanente, acrílicas y nail art) en Ambato.',
  url: '/',
})

export default function HomePage() {
  return (
    <Column as="main" fillWidth>
      <Hero />
      <About />
      <Treatments />
      <Standards />
      <ConsultationCta />
      <FaqQuick />
      <TestimonialsCarousel />
      <Contact />
    </Column>
  )
}
