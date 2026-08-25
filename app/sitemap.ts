import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/metadata'

const routes = ['/', '/productos', '/galeria', '/blog', '/tienda', '/promos']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: route === '/blog' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
