import ShopPage from '@/components/ShopPage'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Tienda Nagaraku | Extensiones, parches y más | Crissel Studio',
  description:
    'Compra productos Nagaraku en Ambato: extensiones de pestañas, parches de hidrogel y accesorios profesionales. Consulta stock por WhatsApp.',
})

export default function TiendaPageRoute() {
  return <ShopPage />
}
