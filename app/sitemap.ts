import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/metadata'
import { payload } from '@/lib/payload'

const routes = ['/', '/productos', '/galeria', '/blog', '/tienda', '/promos']

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((route) => {
    const changeFrequency: 'daily' | 'weekly' = route === '/blog' ? 'daily' : 'weekly'

    return {
      url: new URL(route, siteUrl).toString(),
      changeFrequency,
      priority: route === '/' ? 1 : 0.7,
    }
  })

  const { docs: blogPosts } = await payload.getBlogs({ limit: 1000 })
  const blogRoutes = blogPosts
    .filter((post) => post.slug && typeof post.slug === 'string')
    .map((post) => ({
      url: new URL(`/blog/${encodeURIComponent(post.slug)}`, siteUrl).toString(),
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...blogRoutes]
}
