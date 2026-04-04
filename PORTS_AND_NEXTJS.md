# Port Configuration & Next.js Migration Guide

## Why Different Ports?

Your project runs **two separate servers**:

1. **Vite Dev Server** (Frontend) - Port **5173**
   - Serves your React application
   - Handles hot module replacement (HMR)
   - Development-only server

2. **Payload CMS Server** (Backend) - Port **3000**
   - Serves the Payload admin panel (`/admin`)
   - Provides REST API (`/api/*`)
   - Provides GraphQL API (`/api/graphql`)
   - Handles content management

This is a **normal and recommended setup**. The frontend (Vite) and backend (Payload) communicate via HTTP requests:
- Frontend fetches data from `http://localhost:3000/api/*`
- Admin panel is accessed at `http://localhost:3000/admin`

### Current Setup
```
┌─────────────────┐         HTTP Requests         ┌─────────────────┐
│   Vite (5173)    │ ────────────────────────────> │ Payload (3000)   │
│   Frontend       │                                │ Backend/Admin    │
└─────────────────┘                                └─────────────────┘
```

## Migrating to Next.js

**Good news:** Migrating to Next.js would actually be **easier and better** for this project because:

1. ✅ **Payload CMS has excellent Next.js integration** - It's the recommended approach
2. ✅ **Single server** - Next.js can serve both frontend and Payload in one process
3. ✅ **Better SEO** - Server-side rendering out of the box
4. ✅ **Simpler deployment** - One application instead of two
5. ✅ **Better performance** - Server-side rendering and API routes in one framework

### Migration Difficulty: **Medium** (2-3 hours)

The migration is relatively straightforward because:
- Your components are already React components (compatible)
- Your routing can be converted to Next.js file-based routing
- Payload collections stay the same
- Most of your code will work with minimal changes

### Migration Steps

#### 1. Install Next.js and Payload Next.js adapter
```bash
pnpm add next @payloadcms/next
pnpm remove vite @vitejs/plugin-react
```

#### 2. Update `package.json` scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### 3. Create `next.config.js`
```javascript
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  // Your Next.js config
}

export default withPayload(nextConfig)
```

#### 4. Restructure files
- Move `src/App.tsx` → `app/page.tsx` (App Router) or `pages/index.tsx` (Pages Router)
- Convert routes:
  - `/productos` → `app/productos/page.tsx` or `pages/productos.tsx`
  - `/galeria` → `app/galeria/page.tsx` or `pages/galeria.tsx`
  - `/blog` → `app/blog/page.tsx` or `pages/blog.tsx`
  - `/blog/[slug]` → `app/blog/[slug]/page.tsx` or `pages/blog/[slug].tsx`

#### 5. Update imports
- Replace `import.meta.glob` with Next.js image optimization
- Update asset imports to use Next.js conventions
- Replace React Router with Next.js routing

#### 6. Update Payload config
- Remove standalone Express server (`server.ts`)
- Payload integrates directly with Next.js
- Admin panel available at `/admin` on the same port

#### 7. Benefits after migration
- **Single port** - Everything runs on port 3000 (or your chosen port)
- **Better integration** - Payload and Next.js work seamlessly together
- **Server-side rendering** - Better SEO and performance
- **API routes** - Can use Next.js API routes alongside Payload

### Example: After Migration

```
┌─────────────────────────────────────┐
│      Next.js Server (3000)          │
│  ┌──────────┐      ┌─────────────┐  │
│  │ Frontend │      │ Payload CMS │  │
│  │  Pages  │      │   Admin     │  │
│  └──────────┘      └─────────────┘  │
│       │                  │          │
│  ┌────┴──────────────────┴────┐   │
│  │     Shared API Routes       │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Would you like me to help migrate to Next.js?

I can:
1. ✅ Set up Next.js configuration
2. ✅ Convert your routing structure
3. ✅ Update Payload integration
4. ✅ Migrate components
5. ✅ Update build scripts
6. ✅ Test the migration

The migration would take about 2-3 hours and result in a cleaner, more maintainable architecture.

