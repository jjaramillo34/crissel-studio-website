# Crissel Studio Website

Experiential beauty studio site built with **Next.js + TypeScript + Payload CMS**. The interface focuses on immersive storytelling, accessibility, and subtle motion while showcasing Crissel Studio's core services, portfolio, and educational content.

## Key Features

- **Animated Landing Experience** – Hero, services, results, testimonials, FAQ, and contact sections enhanced with Framer Motion, reduced-motion fallbacks, and consistent `SectionHeader` styling.
- **Dynamic Gallery & Lightbox** – Category filters, keyboard-accessible lightbox, and Next.js Image optimization for performant media delivery.
- **Rich Blog System** – JSON/TS data source plus `/blog` listing and `/blog/:slug` detail pages with featured images, structured sections, pull quotes, and share-ready metadata.
- **Products & Availability Widgets** – Dedicated product highlights, booking prompts, WhatsApp CTA, and embedded map with live reviews.
- **Accessibility & A11y Enhancements** – ARIA attributes, focus-visible states, keyboard interactions, and reduced-motion handling across components.
- **SEO & Open Graph Metadata** – Reusable `<Seo />` helper sets titles, descriptions, canonical links, Open Graph, and Twitter card data per route.

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB (local or cloud instance)

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Payload CMS Configuration
PAYLOAD_SECRET=your-secret-key-change-this-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
# Optional when the browser reads Payload from another host
NEXT_PUBLIC_PAYLOAD_SERVER_URL=http://localhost:3000
# Public site origin used for canonical and social metadata
NEXT_PUBLIC_SITE_URL=https://crisselstudio.com

# Database Configuration
DATABASE_URI=mongodb://localhost:27017/crissel-studio

```

**Important:** Generate a secure random string for `PAYLOAD_SECRET`. You can use:
```bash
openssl rand -base64 32
```

### Development Commands

- `pnpm dev` – Start Next.js development server with Payload CMS (single server on port 3000)
- `pnpm build` – Create a production build
- `pnpm start` – Start production server
- `pnpm lint` – Run ESLint with Next.js defaults
- `pnpm payload` – Access Payload CLI commands

## Project Structure

```
app/                 # Next.js App Router pages
  page.tsx           # Home page
  productos/         # Products page
  galeria/           # Gallery page
  blog/              # Blog pages
    page.tsx         # Blog index
    [slug]/page.tsx  # Blog post detail
src/
  components/        # React components
    sections/        # Homepage sections and reusable SectionHeader
    Seo.tsx          # SEO metadata helper
    FloatingWhatsApp # Persistent WhatsApp CTA
    Footer, Navigation, etc.
  pages/             # Page components (used by app router)
  collections/       # Payload CMS collections
  data/
    blogPosts.ts     # Source of blog content
  assets/
    images & gallery assets
public/
  data/blogs.json    # Public JSON feed for blog listings
```

## Notable Integrations

- **Next.js 15** with App Router for server-side rendering and routing
- **Payload CMS** integrated with Next.js for content management (Blog, Services, Gallery, Team, Testimonials)
- **Framer Motion** for declarative animations
- **Tailwind CSS** for design tokens, gradients, and utilities
- **Lucide Icons** to complement UI badges and metrics
- **MongoDB** via Mongoose adapter for data persistence

## Payload CMS

This project uses Payload CMS integrated with Next.js. Access the admin panel at `http://localhost:3000/admin` when the development server is running.

### Collections

- **Blogs** – Blog posts with sections (paragraphs, lists, quotes)
- **Services** – Service offerings with pricing, images, and features
- **Gallery** – Image gallery organized by category
- **Team** – Team member profiles with photos and specialties
- **Testimonials** – Client testimonials with ratings
- **Media** – File uploads for images and assets
- **Users** – Admin user accounts

### First Time Setup

1. Start MongoDB (locally or configure cloud connection)
2. Create `.env` file with required variables
3. Run `pnpm dev` to start Next.js with Payload CMS
4. Visit `http://localhost:3000/admin` and create your first admin user
5. Start adding content through the admin panel

**Note:** With Next.js integration, everything runs on a single server (port 3000). No need to run separate servers!

## Adding Nail (Uñas) Photos

The nail services launch with placeholders (a hand icon with "Nuevo en Crissel Studio" / "Fotos muy pronto"). Once you have photos, add them in three places. Each placeholder disappears as soon as its image is set.

### 1. Add the image files

Put the photos in `public/assets/gallery/`, named `unas-1.jpg`, `unas-2.jpg`, etc. (lowercase, no spaces or accents, `.jpg` or `.webp`).

- **Size:** about 1600px on the long side, under ~500 KB each. Next.js resizes them for each screen automatically.
- **Framing:** the homepage treatment crops to a **portrait 4:5**, while the Productos page and Galería crop to a **landscape 4:3**. Keep the nails near the center so both crops work.

### 2. Homepage treatment (`src/components/sections/Treatments.tsx`)

In the `04` / `Uñas` entry, replace the placeholder line (and the comment above it):

```ts
// No photos yet: drop one in /public/assets/gallery and set `image` to show it
image: undefined as string | undefined,
```

with:

```ts
image: '/assets/gallery/unas-1.jpg',
```

### 3. Productos page (`src/components/ProductsPage.tsx`)

In the `services` list, find the entry with `id: 'unas'` and add a main image. Optionally, add two smaller images below it:

```ts
{
  id: 'unas',
  title: 'Uñas',
  // ...
  mainImage: '/assets/gallery/unas-1.jpg',
  benefitsImage: '/assets/gallery/unas-2.jpg', // optional
  detailsImage: '/assets/gallery/unas-3.jpg', // optional, shown next to benefitsImage
  // ...
}
```

### 4. Galería (`src/components/GalleryPage.tsx`)

Add one line per photo to `imageCategories`. The key must match the file name in `public/assets/gallery/`:

```ts
'unas-1.jpg': { label: 'Uñas', path: 'unas' },
'unas-2.jpg': { label: 'Uñas', path: 'unas' },
```

The photos then appear under the **Uñas** filter and in **Todo**, and the "Muy pronto…" message goes away. The lightbox title is generated from the file name (`unas-1.jpg` → "Unas 1").

### 5. Check it

Run `pnpm dev` and check:

- `/` – the "04 Uñas" treatment shows the photo
- `/productos#unas` – the Uñas service shows the photo(s)
- `/galeria` – the **Uñas** filter shows the photos, and clicking one opens the lightbox

Then run `pnpm build` before committing.

## Deployment Notes

- Commit only source files—build output (`dist`) and local environment files (`.env*`) are ignored via `.gitignore`.
- For production, ensure MongoDB connection string is properly configured
- Set a strong `PAYLOAD_SECRET` in production environment
- Update blog entries through Payload CMS admin panel or by editing `src/data/blogPosts.ts` (legacy)
- Replace default OG images by updating `/public/assets/images/logo_photo.png` and the `defaultMeta` in `Seo.tsx` if branding changes.

---
Crissel Studio © 2025 – Crafted to elevate beauty experiences in Ambato.
