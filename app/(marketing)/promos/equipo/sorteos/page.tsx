import type { Metadata } from 'next'
import { Column, Heading, InlineCode, Text } from '@once-ui-system/core'
import StaffSorteoClient from '@/components/promos/StaffSorteoClient'

export const metadata: Metadata = {
  title: 'Sorteo — equipo | Crissel Studio',
  description: 'Herramienta interna para elegir ganadora del sorteo.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function StaffSorteoPage() {
  return (
    <Column as="main" fillWidth horizontal="center" paddingX="24" paddingTop="104" paddingBottom="104">
      <Column fillWidth maxWidth="xs" gap="32">
        <Column gap="8">
          <Heading as="h1" variant="heading-strong-xl">
            Sorteo maquillaje
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-medium">
            Uso interno del estudio. No enlaces esta URL desde la web pública. Configura{' '}
            <InlineCode>RAFFLE_STAFF_TOKEN</InlineCode> en el servidor (Vercel / .env).
          </Text>
        </Column>
        <StaffSorteoClient />
      </Column>
    </Column>
  )
}
