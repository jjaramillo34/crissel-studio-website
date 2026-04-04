import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { Blog } from './src/collections/Blog'
import { Service } from './src/collections/Service'
import { Gallery } from './src/collections/Gallery'
import { Team } from './src/collections/Team'
import { Testimonial } from './src/collections/Testimonial'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const configPromise = buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Blog,
    Service,
    Gallery,
    Team,
    Testimonial,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'schema.graphql'),
  },
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/crissel-studio',
  }),
  sharp,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
})

export default configPromise

