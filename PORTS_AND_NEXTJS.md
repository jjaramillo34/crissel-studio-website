# Port Configuration

## Current Architecture

This project uses Next.js with Payload CMS integrated into the same process. During development, one server handles:

- Website pages
- Payload admin at `/admin`
- Payload REST API at `/api`
- Payload GraphQL API at `/api/graphql`
- Application API routes such as `/api/contact`

The default development port is **3000**.

```text
┌─────────────────────────────────────┐
│      Next.js + Payload (3000)       │
│  ┌──────────┐      ┌─────────────┐  │
│  │ Website  │      │ Payload CMS │  │
│  │  Pages   │      │ Admin/API   │  │
│  └──────────┘      └─────────────┘  │
└─────────────────────────────────────┘
```

Start it with:

```bash
pnpm dev
```

`pnpm dev:all` is an alias for the same command. There is no separate Vite frontend or Payload backend to start.

## Using Another Port

Pass a port directly to Next.js:

```bash
pnpm exec next dev -p 3001
```

If the application is accessed through another origin, update:

```env
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_PAYLOAD_SERVER_URL=http://localhost:3001
```

## Production

Build and start the same unified application:

```bash
pnpm build
pnpm start
```

Configure the hosting platform's port rather than running a second server. Set `PAYLOAD_PUBLIC_SERVER_URL` and `NEXT_PUBLIC_SITE_URL` to the public application URL.
