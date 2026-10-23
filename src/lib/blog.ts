/**
 * Server-side blog data via Payload's Local API (no HTTP round-trip to our own /api),
 * so blog pages render with their content for search engines and link previews.
 * Only import from Server Components / route files.
 */

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import type { Blog } from '../../payload-types'

export type BlogPost = Blog

export type BlogListResult = { posts: BlogPost[]; error: boolean }

export async function getBlogPosts(limit = 20): Promise<BlogListResult> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blogs',
      sort: '-publishedAt',
      limit,
      depth: 1,
      overrideAccess: false,
    })
    return { posts: result.docs, error: false }
  } catch (error) {
    console.error('[blog] Failed to load posts:', error)
    return { posts: [], error: true }
  }
}

/** Cached per request so generateMetadata and the page share one query. */
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })
  return result.docs[0] ?? null
})
