# Using Payload CMS Data in Frontend

This guide shows how to fetch and display Payload CMS data in your Next.js components.

## Quick Start

### 1. Import the Payload utilities

```typescript
import { payload, getMediaUrl } from '@/lib/payload'
```

### 2. Use in Client Components

For components that need interactivity (useState, useEffect, etc.):

```typescript
'use client'

import { useEffect, useState } from 'react'
import { payload, getMediaUrl } from '@/lib/payload'

export default function MyComponent() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await payload.getTeam()
        setData(response.docs)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### 3. Use in Server Components

For server components (better performance, SEO-friendly):

```typescript
import { payload, getMediaUrl } from '@/lib/payload'

export default async function MyServerComponent() {
  const { docs } = await payload.getTeam()

  return (
    <div>
      {docs.map((member) => (
        <div key={member.id}>
          <h2>{member.name}</h2>
          <p>{member.role}</p>
          {member.photo && (
            <img src={getMediaUrl(member.photo) || ''} alt={member.name} />
          )}
        </div>
      ))}
    </div>
  )
}
```

## Available Collections

### Team Members

```typescript
// Get all team members (sorted by order)
const { docs } = await payload.getTeam()

// Get team members with filters
const { docs } = await payload.getTeam({
  where: { role: { contains: 'Artist' } },
  limit: 5,
})
```

**Team Member Structure:**
```typescript
{
  id: string
  name: string
  role: string
  bio?: string
  photo: Media | string
  specialties?: Array<{ specialty: string }>
  order?: number
}
```

### Blog Posts

```typescript
// Get all blog posts (sorted by publishedAt, newest first)
const { docs } = await payload.getBlogs()

// Get featured blog posts
const { docs } = await payload.getBlogs({
  where: { category: { equals: 'Maquillaje' } },
  limit: 3,
})

// Get single blog post by slug
const post = await payload.getBlogBySlug('my-blog-post')
```

**Blog Post Structure:**
```typescript
{
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
}
```

### Services

```typescript
// Get all services
const { docs } = await payload.getServices()

// Get featured services
const { docs } = await payload.getServices({
  where: { isFeatured: { equals: true } },
})

// Get service by slug
const service = await payload.getServiceBySlug('extensiones-pestanas-clasicas')
```

**Service Structure:**
```typescript
{
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
}
```

### Testimonials

```typescript
// Get all testimonials (sorted by order)
const { docs } = await payload.getTestimonials()

// Get featured testimonials
const { docs } = await payload.getTestimonials({
  where: { isFeatured: { equals: true } },
  limit: 5,
})
```

**Testimonial Structure:**
```typescript
{
  id: string
  name: string
  content: string
  rating: number
  service?: string
  photo?: Media | string
  isFeatured?: boolean
  order?: number
}
```

### Gallery

```typescript
// Get all gallery items (sorted by order)
const { docs } = await payload.getGallery()

// Get gallery by category
const { docs } = await payload.getGallery({
  where: { category: { equals: 'before-after' } },
})
```

## Working with Media/Images

Payload returns media objects. Use `getMediaUrl()` to get the image URL:

```typescript
import { getMediaUrl } from '@/lib/payload'
import Image from 'next/image'

function TeamMember({ member }) {
  const photoUrl = getMediaUrl(member.photo)

  return (
    <div>
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={member.name}
          width={300}
          height={300}
        />
      )}
    </div>
  )
}
```

## Advanced Usage

### Custom Queries

Use `fetchPayload` directly for custom queries:

```typescript
import { fetchPayload } from '@/lib/payload'

// Custom query with complex filters
const { docs } = await fetchPayload('blogs', {
  where: {
    publishedAt: { greater_than: '2024-01-01' },
    category: { equals: 'Maquillaje' },
  },
  sort: '-publishedAt',
  limit: 10,
})
```

### Pagination

```typescript
const { docs, totalPages, page, hasNextPage } = await payload.getBlogs({
  limit: 10,
  page: 1,
})

// Load more
if (hasNextPage) {
  const nextPage = await payload.getBlogs({
    limit: 10,
    page: page + 1,
  })
}
```

### Error Handling

```typescript
try {
  const { docs } = await payload.getTeam()
  // Use docs
} catch (error) {
  console.error('Failed to fetch team:', error)
  // Show fallback UI
}
```

## Examples

### Example 1: Team Spotlight (Client Component)
See `src/components/sections/TeamSpotlight.tsx` - already updated!

### Example 2: Blog List (Server Component)

```typescript
// app/blog/page.tsx
import { payload, getMediaUrl } from '@/lib/payload'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogPage() {
  const { docs } = await payload.getBlogs({ limit: 10 })

  return (
    <div>
      {docs.map((post) => {
        const imageUrl = getMediaUrl(post.featuredImage)
        return (
          <article key={post.id}>
            {imageUrl && (
              <Image src={imageUrl} alt={post.title} width={800} height={400} />
            )}
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`}>Read more</Link>
          </article>
        )
      })}
    </div>
  )
}
```

### Example 3: Services Grid (Server Component)

```typescript
// app/productos/page.tsx
import { payload, getMediaUrl } from '@/lib/payload'

export default async function ServicesPage() {
  const { docs } = await payload.getServices()

  return (
    <div className="grid grid-cols-3 gap-4">
      {docs.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.shortDescription || service.description}</p>
          {service.images?.[0] && (
            <img
              src={getMediaUrl(service.images[0].image) || ''}
              alt={service.name}
            />
          )}
        </div>
      ))}
    </div>
  )
}
```

## Environment Variables

Make sure you have these in your `.env.local`:

```env
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
# or for production:
# PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
```

The utility will automatically use the correct API URL based on your environment.

## Tips

1. **Use Server Components when possible** - Better performance, SEO, and no loading states needed
2. **Cache appropriately** - Server components use `revalidate: 60` by default
3. **Handle loading states** - Client components need loading/error states
4. **Use TypeScript** - The payload utility includes types for better autocomplete
5. **Handle missing data** - Always check if media/images exist before rendering

