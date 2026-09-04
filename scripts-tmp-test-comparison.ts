import 'dotenv/config'
import sharp from 'sharp'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  const logoBuffer = await sharp({
    create: { width: 200, height: 200, channels: 4, background: '#22c55e' },
  })
    .png()
    .toBuffer()

  const logo = await payload.create({
    collection: 'media',
    data: { alt: 'Cache Fix Test logo' },
    file: {
      data: logoBuffer,
      mimetype: 'image/png',
      name: 'cache-fix-test-logo.png',
      size: logoBuffer.length,
    },
  })

  const slug = `cache-fix-test-${Date.now()}`

  const comparison = await payload.create({
    collection: 'comparisons',
    data: {
      competitorName: 'CacheFixTest',
      competitorLogo: logo.id,
      slug,
      _status: 'published',
      hero: {
        eyebrow: 'Compare',
        title: 'Clear Cutoff vs CacheFixTest',
        description: 'Test doc created to verify the negative-cache fix.',
        ctaLabel: 'Start free trial',
        ctaUrl: '/',
      },
      comparisonSectionTitle: 'Test section',
      comparisonPoints: [],
      featureTable: [],
    },
  })

  console.log('CREATED_SLUG:' + comparison.slug)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
