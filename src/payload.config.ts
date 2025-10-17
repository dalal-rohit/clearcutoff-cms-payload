// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Courses from './collections/Courses'
import { Pages } from './collections/Pages'
import { GlobalSections } from './globals/GlobalSections'
import endpoints from './endpoints'
import { FAQs } from './globals/FAQs'
import { Reviews } from './globals/Reviews'
import { Questions } from './collections/Questions'
import { Footers } from './globals/Footers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: [
    'http://localhost:3000', // Next.js frontend
    'http://localhost:3001', // Payload admin (if needed)
    '*', // allow all for dev
  ],
  serverURL: process.env.SERVER_URL,
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'hi', label: 'हिंदी' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Courses, Pages, Questions],
  endpoints,
  globals: [
    Footers,
    FAQs,
    Reviews,
    GlobalSections, // Register the global here
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'serial',
    allowIDOnCreate: true,
    push: true,
    migrationDir: path.resolve(dirname, 'payload-migrations'),
    blocksAsJSON: true,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
