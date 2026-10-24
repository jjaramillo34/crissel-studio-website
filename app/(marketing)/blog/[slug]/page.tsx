import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/blog/BlogPostPage'
import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import { getMediaUrl } from '@/lib/payload'
import { getBlogPostBySlug } from '@/lib/blog'

type Params = { params: Promise<{ slug: string }> }

// Re-render at most every 5 minutes so CMS edits show up without a deploy
export const revalidate = 300

export async function generateMetadata({ params }: Params) {
  try {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
      return generateMetadataHelper({
        title: 'Artículo no encontrado | Blog Crissel Studio',
      })
    }

    return generateMetadataHelper({
      title: `${post.title} | Blog Crissel Studio`,
      description: post.excerpt,
      image: getMediaUrl(post.featuredImage) || undefined,
      type: 'article',
      url: `/blog/${encodeURIComponent(slug)}`,
    })
  } catch (error) {
    console.error('Error generating metadata:', error)
    return generateMetadataHelper({
      title: 'Blog Crissel Studio',
      description: 'Lee las últimas recomendaciones de nuestras especialistas',
    })
  }
}

export default async function BlogPostPageRoute({ params }: Params) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()
  return <BlogPostPage post={post} />
}
