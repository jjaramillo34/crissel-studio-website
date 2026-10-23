import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { generateMetadata } from '@/lib/metadata'
import { getBlogPosts } from '@/lib/blog'

export const metadata = generateMetadata({
  title: 'Blog Crissel Studio | Tips de extensiones, cejas y maquillaje',
  description: 'Lee las últimas recomendaciones de nuestras especialistas en Ambato: extensiones de pestañas, skin prep profesional, tendencias en cejas y más.',
  type: 'website',
  url: '/blog',
})

// Re-render at most every 5 minutes so new posts from the CMS show up without a deploy
export const revalidate = 300

export default async function BlogPage() {
  const { posts, error } = await getBlogPosts()
  return <BlogIndexPage posts={posts} error={error} />
}
