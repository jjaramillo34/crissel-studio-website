# Payload CMS API Usage Guide

Even though the admin UI has issues, the Payload CMS API is fully functional! You can create, read, update, and delete content using the REST API.

## Quick Test

Test if the API is working:

```bash
pnpm test-api
```

## API Endpoints

All Payload API endpoints are available at `/api/{collection}`:

### Collections Available:
- `/api/users` - User management
- `/api/media` - Media/File uploads
- `/api/blogs` - Blog posts (note: plural!)
- `/api/services` - Services (note: plural!)
- `/api/gallery` - Gallery items
- `/api/team` - Team members
- `/api/testimonials` - Testimonials (note: plural!)

### HTTP Methods:

#### GET - List documents
```bash
# Get all blog posts (note: use 'blogs' plural)
curl http://localhost:3000/api/blogs

# Get with pagination
curl http://localhost:3000/api/blogs?limit=10&page=1

# Get with filters
curl http://localhost:3000/api/blogs?where[publishedAt][exists]=true
```

#### GET - Get single document
```bash
curl http://localhost:3000/api/blogs/{id}
```

#### POST - Create document
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: JWT {token}" \
  -d '{
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "excerpt": "Short description",
    "category": "Maquillaje",
    "author": "Author Name",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "readingTime": "5 min lectura",
    "sections": [{"type": "paragraph", "content": "Content here"}]
  }'
```

#### PATCH - Update document
```bash
curl -X PATCH http://localhost:3000/api/blogs/{id} \
  -H "Content-Type: application/json" \
  -H "Authorization: JWT {token}" \
  -d '{
    "title": "Updated Title"
  }'
```

#### DELETE - Delete document
```bash
curl -X DELETE http://localhost:3000/api/blogs/{id} \
  -H "Authorization: JWT {token}"
```

## Authentication

### 1. Login to get a token:

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@crisselstudio.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### 2. Use the token in subsequent requests:

```bash
curl http://localhost:3000/api/blog \
  -H "Authorization: JWT {your-token-here}"
```

## Example Scripts

### Test API Connection
```bash
pnpm test-api
```

### Create Content Example
```bash
pnpm create-content
```

## Using API in Your Frontend

### Fetch Blog Posts (Server Component)

```typescript
// app/blog/page.tsx
async function getBlogPosts() {
  const res = await fetch('http://localhost:3000/api/blogs?limit=10', {
    cache: 'no-store', // or 'force-cache' for static
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts')
  }
  
  return res.json()
}

export default async function BlogPage() {
  const { docs } = await getBlogPosts()
  
  return (
    <div>
      {docs.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### Fetch Blog Posts (Client Component)

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs?limit=10')
      .then(res => res.json())
      .then(data => {
        setPosts(data.docs)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### Create Content (Client Component with Auth)

```typescript
'use client'

async function createBlogPost(data: any) {
  // First login
  const loginRes = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@crisselstudio.com',
      password: 'admin123',
    }),
  })
  
  const { token } = await loginRes.json()
  
  // Then create post
  const res = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
    },
    body: JSON.stringify(data),
  })
  
  return res.json()
}
```

## GraphQL API

Payload also provides a GraphQL API at `/api/graphql`:

```bash
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ Blogs { docs { id title slug } } }"
  }'
```

## Next Steps

1. **Test the API**: Run `pnpm test-api` to verify everything works
2. **Create content**: Use the API to create blog posts, services, etc.
3. **Integrate in frontend**: Fetch content from Payload API in your Next.js pages
4. **Wait for admin UI fix**: Monitor Payload CMS updates for the admin UI fix

## Troubleshooting

### API returns 404
- Make sure your Next.js server is running
- Check that the route `/api/[...slug]/route.ts` exists

### Authentication fails
- Verify user exists: `pnpm create-user`
- Check email/password are correct

### CORS issues
- Payload should handle CORS automatically
- Check `payload.config.ts` for CORS settings

## Resources

- [Payload REST API Docs](https://payloadcms.com/docs/rest-api/overview)
- [Payload GraphQL Docs](https://payloadcms.com/docs/graphql/overview)
- [Payload Authentication](https://payloadcms.com/docs/authentication/overview)

