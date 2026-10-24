import type { Metadata } from 'next'
import classNames from 'classnames'
import '@once-ui-system/core/css/styles.css'
import '@once-ui-system/core/css/tokens.css'
import '@/resources/custom.css'
import { Column } from '@once-ui-system/core'
import { Providers } from '@/components/Providers'
import { fonts, style } from '@/resources/once-ui.config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Crissel Studio | Pestañas, cejas, maquillaje y uñas en Ambato',
  description:
    'Somos especialistas en extensiones de pestañas, diseño de cejas, maquillaje profesional y uñas (manicure, pedicure, semipermanente, acrílicas y nail art) en Ambato.',
}

/** Root layout for the public site (Payload admin has its own in (payload)). */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      // Once UI sets `scroll-behavior: smooth`; this lets Next turn it off during route changes
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      // Server-render the theme attributes ThemeProvider would otherwise set after hydration
      data-theme={style.theme}
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      data-scaling={style.scaling}
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <body>
        <Providers>
          <Column fillWidth minHeight="100vh" background="page" className={fonts.body.className}>
            <ErrorBoundary>
              <Navigation />
              {children}
              <Footer />
              <FloatingWhatsApp />
              <Analytics />
            </ErrorBoundary>
          </Column>
        </Providers>
      </body>
    </html>
  )
}
