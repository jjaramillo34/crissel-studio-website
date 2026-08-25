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
import { RaffleEntry } from './src/collections/RaffleEntry'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { ContactSubmission } from './src/collections/ContactSubmission'
import raffleDedupeKey from './src/migrations/20260825000000-raffle-dedupe-key'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadSecret =
  process.env.PAYLOAD_SECRET ||
  (process.env.NODE_ENV === 'production' ? undefined : 'development-only-secret')
const databaseUri =
  process.env.DATABASE_URI ||
  (process.env.NODE_ENV === 'production' ? undefined : 'mongodb://localhost:27017/crissel-studio')

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET must be set in production.')
}

if (!databaseUri) {
  throw new Error('DATABASE_URI must be set in production.')
}

const configPromise = buildConfig({
  secret: payloadSecret,
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
    RaffleEntry,
    ContactSubmission,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'schema.graphql'),
  },
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: databaseUri,
    prodMigrations: [raffleDedupeKey],
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
