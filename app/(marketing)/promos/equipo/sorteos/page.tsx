import type { Metadata } from 'next'
import StaffSorteoClient from '@/components/promos/StaffSorteoClient'

export const metadata: Metadata = {
  title: 'Sorteo — equipo | Crissel Studio',
  description: 'Herramienta interna para elegir ganadora del sorteo.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function StaffSorteoPage() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-24">
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Sorteo maquillaje</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Uso interno del estudio. No enlaces esta URL desde la web pública. Configura{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">RAFFLE_STAFF_TOKEN</code> en
          el servidor (Vercel / .env).
        </p>
        <StaffSorteoClient />
      </div>
    </div>
  )
}
