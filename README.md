# Crissel Studio Website

Experiential beauty studio site built with **React + TypeScript + Vite**. The interface focuses on immersive storytelling, accessibility, and subtle motion while showcasing Crissel Studio’s core services, portfolio, and educational content.

## Key Features

- **Animated Landing Experience** – Hero, services, results, testimonials, FAQ, and contact sections enhanced with Framer Motion, reduced-motion fallbacks, and consistent `SectionHeader` styling.
- **Dynamic Gallery & Lightbox** – Category filters, keyboard-accessible lightbox, and Vite-powered image imports for performant media delivery.
- **Rich Blog System** – JSON/TS data source plus `/blog` listing and `/blog/:slug` detail pages with featured images, structured sections, pull quotes, and share-ready metadata.
- **Products & Availability Widgets** – Dedicated product highlights, booking prompts, WhatsApp CTA, and embedded map with live reviews.
- **Accessibility & A11y Enhancements** – ARIA attributes, focus-visible states, keyboard interactions, and reduced-motion handling across components.
- **SEO & Open Graph Metadata** – Reusable `<Seo />` helper sets titles, descriptions, canonical links, Open Graph, and Twitter card data per route.

## Getting Started

```bash
pnpm install
pnpm dev
```

Commands:

- `pnpm dev` – Start local development with hot reloading.
- `pnpm build` – Create a production build (TypeScript project references + Vite bundle).
- `pnpm preview` – Preview the production build locally.
- `pnpm lint` – Run ESLint with project defaults.

## Project Structure

```
src/
  components/
    sections/        # Homepage sections and reusable SectionHeader
    Seo.tsx          # SEO metadata helper
    FloatingWhatsApp # Persistent WhatsApp CTA
    Footer, Navigation, etc.
  pages/
    BlogIndexPage.tsx
    BlogPostPage.tsx
  data/
    blogPosts.ts     # Source of blog content (mirrored in public/data/blogs.json)
  assets/
    images & gallery assets loaded via import.meta.glob
public/
  data/blogs.json    # Public JSON feed for blog listings
```

## Notable Integrations

- **Framer Motion** for declarative animations.
- **React Router v6** for client-side routing.
- **Tailwind CSS** for design tokens, gradients, and utilities.
- **Lucide Icons** to complement UI badges and metrics.

## Deployment Notes

- Commit only source files—build output (`dist`) and local environment files (`.env*`) are ignored via `.gitignore`.
- Update blog entries by editing `src/data/blogPosts.ts` (and syncing `public/data/blogs.json` if external access is required).
- Replace default OG images by updating `/src/assets/images/logo_photo.png` and the `defaultMeta` in `Seo.tsx` if branding changes.

---
Crissel Studio © 2025 – Crafted to elevate beauty experiences in Ambato.
