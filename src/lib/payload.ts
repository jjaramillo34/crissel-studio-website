/**
 * Utility functions for fetching data from Payload CMS API
 */

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  pagingCounter?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prevPage?: number | null
  nextPage?: number | null
}

export interface Media {
  id: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  focalX?: number
  focalY?: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Fetch data from Payload CMS API
 * Works in both server and client components
 */
export async function fetchPayload<T = any>(
  collection: string,
  options: {
    limit?: number
    page?: number
    where?: Record<string, any>
    sort?: string
    depth?: number
  } = {}
): Promise<PayloadResponse<T>> {
  // Default depth to 0 for better performance - we'll fetch media separately if needed
  const { limit = 100, page = 1, where, sort, depth = 0 } = options

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    depth: depth.toString(),
  })

  if (sort) {
    params.append('sort', sort)
  }

  if (where) {
    // Payload uses nested query params for where clauses
    Object.entries(where).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([op, val]) => {
          params.append(`where[${key}][${op}]`, String(val))
        })
      } else {
        params.append(`where[${key}][equals]`, String(value))
      }
    })
  }

  const url = `${API_URL}/api/${collection}?${params.toString()}`
  const isServer = typeof window === 'undefined'

  try {
    // Use caching for better performance
    // For server components: cache with revalidation
    // For client components: use no-store to ensure fresh data
    // Add timeout for client-side requests to prevent hanging
    const fetchOptions: RequestInit = {
      ...(isServer 
        ? { next: { revalidate: 300 } } // 5 minutes cache for server components
        : { cache: 'no-store' } // No cache for client components to avoid stale data
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // For client-side, add AbortController for timeout
    let controller: AbortController | null = null
    if (!isServer) {
      controller = new AbortController()
      fetchOptions.signal = controller.signal
      // Set timeout to 10 seconds
      setTimeout(() => controller?.abort(), 10000)
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Failed to fetch ${collection}:`, response.status, errorText)
      throw new Error(`Failed to fetch ${collection}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`Request timeout for ${collection} after 10 seconds`)
    } else {
      console.error(`Error fetching ${collection}:`, error)
    }
    // Return empty response instead of throwing to prevent crashes
    return {
      docs: [],
      totalDocs: 0,
      limit: 0,
      totalPages: 0,
      page: 1,
    } as PayloadResponse<T>
  }
}

/**
 * Fetch a single document by ID
 */
export async function fetchPayloadDoc<T = any>(
  collection: string,
  id: string,
  options: { depth?: number } = {}
): Promise<T> {
  const { depth = 1 } = options
  const url = `${API_URL}/api/${collection}/${id}?depth=${depth}`

  const response = await fetch(url, {
    next: { revalidate: 60 },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collection}/${id}: ${response.statusText}`)
  }

  const data = await response.json()
  return data.doc || data
}

/**
 * Get media URL from Payload media object
 * Payload returns media URLs in different formats depending on configuration
 */
export function getMediaUrl(media: Media | string | null | undefined): string | null {
  if (!media) return null
  
  // Safety check: if it's an object but not a Media object, return null
  if (typeof media === 'object' && !('url' in media || 'filename' in media)) {
    console.warn('getMediaUrl: Received invalid media object', media)
    return null
  }
  
  // If it's already a string (ID or URL)
  if (typeof media === 'string') {
    // If it's already a full URL, return it
    if (media.startsWith('http://') || media.startsWith('https://')) {
      return media
    }
    // If it's a relative path starting with /, prepend API URL
    if (media.startsWith('/')) {
      return `${API_URL}${media}`
    }
    // If it's just an ID (MongoDB ObjectId format), construct media URL
    // Payload media IDs can be used to fetch the media file
    if (/^[0-9a-fA-F]{24}$/.test(media)) {
      return `${API_URL}/api/media/${media}`
    }
    // Otherwise, assume it's a relative path
    return `${API_URL}/${media}`
  }
  
  // If it's a media object with url property
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    const url = String(media.url)
    // If it's already a full URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    // If it's a relative path, prepend API URL
    // Payload typically returns paths like /media/filename.jpg
    return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Fallback: try to construct URL from filename
  if (media && typeof media === 'object' && 'filename' in media && media.filename) {
    return `${API_URL}/media/${String(media.filename)}`
  }
  
  return null
}

/**
 * Collection-specific fetch functions
 */
export const payload = {
  // Team
  async getTeam(options?: Parameters<typeof fetchPayload>[1]) {
    return fetchPayload<{
      id: string
      name: string
      role: string
      bio?: string
      photo: Media | string
      specialties?: Array<{ specialty: string }>
      order?: number
      createdAt?: string
      updatedAt?: string
    }>('team', { sort: 'order', depth: 1, ...options })
  },

  // Blog Posts
  async getBlogs(options?: Parameters<typeof fetchPayload>[1]) {
    return fetchPayload<{
      id: string
      title: string
      slug: string
      excerpt: string
      category: string
      featuredImage: Media | string
      author: string
      publishedAt: string
      readingTime: string
      sections: any[]
      createdAt?: string
      updatedAt?: string
    }>('blogs', { sort: '-publishedAt', depth: 1, ...options })
  },

  async getBlogBySlug(slug: string, options?: Parameters<typeof fetchPayload>[1]) {
    const result = await fetchPayload('blogs', {
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1, // Need depth 1 for featuredImage
      ...options,
    })
    return result.docs[0] || null
  },

  // Services
  async getServices(options?: Parameters<typeof fetchPayload>[1]) {
    return fetchPayload<{
      id: string
      name: string
      slug: string
      description: string
      shortDescription?: string
      category: string
      price?: number
      duration?: string
      features?: Array<{ feature: string }>
      isFeatured?: boolean
      images?: Array<{ image: Media | string }>
      createdAt?: string
      updatedAt?: string
    }>('services', { depth: 0, ...options }) // No depth needed for list view
  },

  async getServiceBySlug(slug: string) {
    const result = await fetchPayload('services', {
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] || null
  },

  // Testimonials
  async getTestimonials(options?: Parameters<typeof fetchPayload>[1]) {
    return fetchPayload<{
      id: string
      name: string
      content: string
      rating: number
      service?: string
      photo?: Media | string
      isFeatured?: boolean
      order?: number
      createdAt?: string
      updatedAt?: string
    }>('testimonials', { sort: 'order', depth: 0, ...options }) // No depth needed for list view
  },

  // Gallery
  async getGallery(options?: Parameters<typeof fetchPayload>[1]) {
    return fetchPayload<{
      id: string
      title?: string
      image: Media | string
      category?: string
      order?: number
      createdAt?: string
      updatedAt?: string
    }>('gallery', { sort: 'order', ...options })
  },
}

