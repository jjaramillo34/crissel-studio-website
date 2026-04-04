import ProductsPage from '@/components/ProductsPage'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Productos y Servicios | Crissel Studio',
  description: 'Descubre nuestros servicios de extensiones de pestañas, diseño de cejas, maquillaje profesional y más en Ambato.',
})

export default function ProductosPage() {
  return <ProductsPage />
}

