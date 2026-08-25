import type { Metadata } from 'next'
import classNames from 'classnames'
import '@once-ui-system/core/css/styles.css'
import '@once-ui-system/core/css/tokens.css'
import '@/resources/custom.css'
import { Column } from '@once-ui-system/core'
import { Providers } from '@/components/Providers'
import { fonts } from '@/resources/once-ui.config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Crissel Studio | Expertas en mirada, cejas y maquillaje en Ambato',
  description:
    'Somos especialistas en extensiones de pestañas, diseño de cejas, maquillaje profesional y paquetes de belleza personalizada en Ambato.',
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Column
        fillWidth
        minHeight="100vh"
        background="page"
        className={classNames(
          fonts.heading.variable,
          fonts.body.variable,
          fonts.label.variable,
          fonts.code.variable,
          fonts.body.className,
        )}
      >
        <ErrorBoundary>
          <Navigation />
          {children}
          <Footer />
          <FloatingWhatsApp />
          <Analytics />
        </ErrorBoundary>
      </Column>
    </Providers>
  )
}
