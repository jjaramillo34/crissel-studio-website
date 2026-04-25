import PromosPage from '@/components/PromosPage'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Promociones y cupón MADRE | Crissel Studio Ambato',
  description:
    'Promo Día de la Mamita, 20 cupones orden de llegada, sorteo de maquillaje y cupón MADRE (5%) por WhatsApp. Del 5 al 15 de mayo de 2026.',
  url: 'https://crisselstudio.com/promos',
})

export default function PromosRoute() {
  return <PromosPage />
}
