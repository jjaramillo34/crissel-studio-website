# Payload CMS Setup Guide

Payload CMS is integrated into the Next.js application. The website, admin panel, REST API, and GraphQL API run from the same server.

## Quick Start

1. Install MongoDB locally or use MongoDB Atlas.
2. Create a `.env` file in the repository root:

   ```env
   PAYLOAD_SECRET=your-secure-secret
   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
   DATABASE_URI=mongodb://localhost:27017/crissel-studio
   ```

   Generate a secret with:

   ```bash
   openssl rand -base64 32
   ```

3. Install dependencies and start the application:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open `http://localhost:3000/admin` and create the first admin user.

`PAYLOAD_SECRET` and `DATABASE_URI` are required in production. Local development uses the MongoDB URI above when `DATABASE_URI` is omitted.

## Collections

- **Blogs** — Blog posts and rich content
- **Services** — Service offerings, pricing, and features
- **Gallery** — Portfolio images and categories
- **Team** — Team member profiles
- **Testimonials** — Client testimonials
- **Media** — Uploaded images and assets
- **Contact submissions** — Messages sent through the public contact form
- **Raffle entries** — Promotional campaign entries
- **Users** — Admin accounts

## Development Workflow

Run the complete application:

```bash
pnpm dev
```

The `dev:all` script is retained as a compatibility alias for `pnpm dev`; there is no separate Vite or Payload server.

Available commands:

```bash
pnpm build
pnpm start
pnpm lint
pnpm generate:types
pnpm generate:importmap
```

## API Access

With the application running:

- Admin panel: `http://localhost:3000/admin`
- REST API: `http://localhost:3000/api`
- GraphQL API: `http://localhost:3000/api/graphql`
- Contact form endpoint: `POST http://localhost:3000/api/contact`

Example:

```typescript
const response = await fetch('/api/blogs')
const blogs = await response.json()
```

## Production Notes

- Set a unique, securely generated `PAYLOAD_SECRET`.
- Set `DATABASE_URI` to the production MongoDB connection string.
- Set `PAYLOAD_PUBLIC_SERVER_URL` to the public application origin.
- Set `NEXT_PUBLIC_SITE_URL` for canonical and social metadata.
- Set `NEXT_PUBLIC_PAYLOAD_SERVER_URL` only when browser requests use a separate Payload origin.
- File uploads are limited to 5 MB by default in `payload.config.ts`.

## Troubleshooting

### MongoDB connection issues

Confirm that MongoDB is running locally or update `DATABASE_URI` to your MongoDB Atlas connection string.

### Port already in use

Start Next.js on another port:

```bash
pnpm exec next dev -p 3001
```

Update `PAYLOAD_PUBLIC_SERVER_URL` if the application origin changes.

### Admin panel not loading

Check that the application is running, `PAYLOAD_SECRET` is set, and the browser console contains no configuration errors.
