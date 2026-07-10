import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { Exams } from './collections/Exams'
import { Comparisons } from './collections/Comparisons'
import { Alternatives } from './collections/Alternatives'
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SeoDefaults } from './globals/SeoDefaults'
import { SocialLinks } from './globals/SocialLinks'
import { MarketingProof } from './globals/MarketingProof'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Posts, Exams, Comparisons, Alternatives],
  globals: [SiteSettings, Header, Footer, SeoDefaults, SocialLinks, MarketingProof],
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'hi', label: 'Hindi' },
    ],
    defaultLocale: 'en',
    // Fall back to the default locale when a field has no value in the requested locale.
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
