import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import '../src/global.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'

const fontSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
})

const fontDisplay = Fraunces({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crissel Studio | Expertas en mirada, cejas y maquillaje en Ambato',
  description: 'Somos especialistas en extensiones de pestañas, diseño de cejas, maquillaje profesional y paquetes de belleza personalizada en Ambato.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className={`${fontSans.className} antialiased`}>
        <ErrorBoundary>
          <div className="min-h-screen">
            <Navigation />
            {children}
            <Footer />
            <FloatingWhatsApp />
          </div>
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  )
}

