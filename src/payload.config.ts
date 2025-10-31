// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import endpoints from './endpoints'

import * as Collections from './collections'
import * as Globals from './globals'
import process from 'process'

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
    user: Collections.Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: Object.values(Collections),
  endpoints,
  globals: Object.values(Globals),
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
    push: process.env.PAYLOAD_PUSH === 'true',
    migrationDir: path.resolve(dirname, 'payload-migrations'),
    blocksAsJSON: true,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
