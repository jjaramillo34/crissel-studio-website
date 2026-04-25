import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Blog Crissel Studio | Tips de extensiones, cejas y maquillaje',
  description: 'Lee las últimas recomendaciones de nuestras especialistas en Ambato: extensiones de pestañas, skin prep profesional, tendencias en cejas y más.',
  type: 'article',
})

export default function BlogPage() {
  return <BlogIndexPage />
}

