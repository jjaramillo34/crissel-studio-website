# Payload CMS Setup Guide

This project has been configured with Payload CMS for content management.

## Quick Start

1. **Install MongoDB** (if not already installed)
   - Local: Install MongoDB locally or use MongoDB Atlas (cloud)
   - Update `DATABASE_URI` in `.env` file

2. **Create `.env` file** in the root directory:
   ```env
   PAYLOAD_SECRET=your-secret-key-here
   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
   DATABASE_URI=mongodb://localhost:27017/crissel-studio
   PORT=3000
   ```

3. **Generate a secure secret**:
   ```bash
   openssl rand -base64 32
   ```

4. **Start the Payload server**:
   ```bash
   pnpm dev:payload
   ```

5. **Access the admin panel**:
   - Open `http://localhost:3000/admin`
   - Create your first admin user
   - Start managing content!

## Collections Available

- **Blogs** - Manage blog posts with rich content sections
- **Services** - Manage service offerings, pricing, and features
- **Gallery** - Upload and organize gallery images by category
- **Team** - Manage team member profiles
- **Testimonials** - Manage client testimonials
- **Media** - File uploads for images and assets
- **Users** - Admin user accounts

## Development Workflow

### Run Frontend and Payload Together
```bash
pnpm dev:all
```

This runs both:
- Frontend (Vite) on `http://localhost:5173`
- Payload CMS on `http://localhost:3000`

### Run Separately
```bash
# Terminal 1: Frontend
pnpm dev

# Terminal 2: Payload CMS
pnpm dev:payload
```

## API Access

Payload CMS provides REST and GraphQL APIs automatically:

- **REST API**: `http://localhost:3000/api`
- **GraphQL**: `http://localhost:3000/api/graphql`

### Example: Fetch Blogs
```typescript
const response = await fetch('http://localhost:3000/api/blogs')
const blogs = await response.json()
```

## Notes

- Payload 3.x requires React 19, but the project currently uses React 18. The admin panel may show peer dependency warnings, but should still function.
- For production, ensure MongoDB connection string is properly configured
- Set a strong `PAYLOAD_SECRET` in production
- File uploads are limited to 5MB by default (configurable in `payload.config.ts`)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Update `DATABASE_URI` to point to your MongoDB Atlas cluster

### Port Already in Use
- Change `PORT` in `.env` file
- Update `PAYLOAD_PUBLIC_SERVER_URL` accordingly

### Admin Panel Not Loading
- Check that Payload server is running
- Verify `PAYLOAD_SECRET` is set in `.env`
- Check browser console for errors

