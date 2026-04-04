import GalleryPage from '@/components/GalleryPage'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Galería | Crissel Studio',
  description: 'Explora nuestra galería de trabajos: extensiones de pestañas, diseño de cejas, maquillaje profesional y más.',
})

export default function GaleriaPage() {
  return <GalleryPage />
}

