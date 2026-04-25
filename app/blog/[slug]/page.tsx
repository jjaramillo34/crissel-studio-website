import BlogPostPage from '@/components/blog/BlogPostPage'
import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import { payload, getMediaUrl } from '@/lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const resolvedParams = await params
    const slug = resolvedParams?.slug
    
    if (!slug) {
      return generateMetadataHelper({
        title: 'Artículo no encontrado | Blog Crissel Studio',
      })
    }
    
    // Add timeout to prevent hanging
    const post = await Promise.race([
      payload.getBlogBySlug(slug, { depth: 1 }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000))
    ])
    
    if (!post) {
      return generateMetadataHelper({
        title: 'Artículo no encontrado | Blog Crissel Studio',
      })
    }

    const imageUrl = getMediaUrl(post.featuredImage)

    return generateMetadataHelper({
      title: `${post.title} | Blog Crissel Studio`,
      description: post.excerpt,
      image: imageUrl || undefined,
      type: 'article',
    })
  } catch (error) {
    console.error('Error generating metadata:', error)
    return generateMetadataHelper({
      title: 'Blog Crissel Studio',
      description: 'Lee las últimas recomendaciones de nuestras especialistas',
    })
  }
}

export default async function BlogPostPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let slug = ''
  try {
    const resolvedParams = await params
    slug = String(resolvedParams?.slug || '')
  } catch (error) {
    console.error('Error resolving params:', error)
  }
  
  return <BlogPostPage slug={slug} />
}

