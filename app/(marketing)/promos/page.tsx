import PromosPage from '@/components/PromosPage'
import { generateMetadata } from '@/lib/metadata'
import { isPromoActive, promos } from '@/data/promos'
import { isRaffleOpen } from '@/data/raffle'

export const metadata = generateMetadata({
  title: 'Promociones | Crissel Studio Ambato',
  description:
    'Promociones, cupones y sorteos de Crissel Studio en Ambato: pestañas, cejas, maquillaje y uñas. Agenda por WhatsApp con tu cupón.',
  url: '/promos',
})

/** Re-check promo dates hourly so campaigns open and close without a redeploy */
export const revalidate = 3600

export default function PromosRoute() {
  const now = new Date()
  const activeIds = promos.filter((promo) => isPromoActive(promo, now)).map((promo) => promo.id)
  const pastIds = promos.filter((promo) => new Date(promo.endsAt) < now).map((promo) => promo.id)

  return <PromosPage activeIds={activeIds} pastIds={pastIds} raffleOpen={isRaffleOpen(now)} />
}
