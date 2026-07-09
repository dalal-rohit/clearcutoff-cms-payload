/**
 * One-off seed script to create a sample Comparison document + populate the
 * MarketingProof global, purely so the new /compare/[slug] frontend page has
 * something real to render end-to-end. Safe to delete once real content exists.
 *
 * Usage: npx tsx scripts/seed-sample-comparison.ts
 */
import 'dotenv/config'
import sharp from 'sharp'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function placeholderLogoBuffer(hex: string): Promise<Buffer> {
  return sharp({
    create: {
      width: 200,
      height: 200,
      channels: 4,
      background: hex,
    },
  })
    .png()
    .toBuffer()
}

async function run() {
  const payload = await getPayload({ config })

  const logoBuffer = await placeholderLogoBuffer('#7c3aed')

  const logo = await payload.create({
    collection: 'media',
    data: { alt: 'TestPrep Pro logo (placeholder)' },
    file: {
      data: logoBuffer,
      mimetype: 'image/png',
      name: 'testprep-pro-logo.png',
      size: logoBuffer.length,
    },
  })

  const comparison = await payload.create({
    collection: 'comparisons',
    data: {
      competitorName: 'TestPrep Pro',
      competitorLogo: logo.id,
      slug: 'testprep-pro',
      _status: 'published',
      hero: {
        eyebrow: 'Compare',
        title: 'Clear Cutoff vs TestPrep Pro – Why serious aspirants choose Clear Cutoff',
        description:
          'TestPrep Pro gets you generic practice questions. Clear Cutoff gets you exam-specific PYQs, structured courses, and a refund guarantee if you complete the course and still don’t pass.',
        ctaLabel: 'Start free trial',
        ctaUrl: '/',
      },
      comparisonSectionTitle: 'How Clear Cutoff blows TestPrep Pro out of the water',
      comparisonPoints: [
        {
          title: 'Exam-specific previous year questions',
          yourText:
            'Every course is built around real PYQs for your exact exam (CTET, HTET, UPTET, REET, HPTET), organized by topic and difficulty.',
          theirText: 'Generic question bank not tailored to any specific teaching exam.',
          impactText: 'You practice exactly what shows up on exam day, not generic filler questions.',
        },
        {
          title: 'Refund guarantee',
          yourText:
            'Complete the course and still don’t pass? Get a full refund. We’re confident enough in the content to back it.',
          theirText: 'No refund policy once you’ve purchased a plan.',
          impactText: 'Zero financial risk in trying a focused, exam-ready course.',
        },
        {
          title: 'Structured test series',
          yourText:
            'Mini tests, sectional tests, and full-length mock exams that mirror the real exam pattern and timing.',
          theirText: 'Unlimited practice questions but no structured, exam-pattern test series.',
          impactText: 'You walk into the real exam having already simulated it multiple times.',
        },
      ],
      featureTable: [
        {
          feature: 'Exam-specific PYQs',
          yourStatus: 'yes',
          yourText: 'Organized by topic and exam',
          theirStatus: 'warning',
          theirText: 'Generic question bank',
        },
        {
          feature: 'Refund guarantee',
          yourStatus: 'yes',
          yourText: 'Full refund if you complete the course and don’t pass',
          theirStatus: 'no',
          theirText: 'No refund policy',
        },
        {
          feature: 'Structured test series',
          yourStatus: 'yes',
          yourText: 'Mini, sectional, and full-length mocks',
          theirStatus: 'no',
          theirText: 'No structured mock exams',
        },
        {
          feature: 'All subjects included',
          yourStatus: 'yes',
          yourText: 'One subscription, every subject',
          theirStatus: 'warning',
          theirText: 'Limited subject options',
        },
      ],
      midCta: {
        title: 'Ready to prepare the smarter way?',
        description: 'Join thousands of aspirants who chose exam-focused prep over generic practice.',
        ctaLabel: 'Book a Demo',
        ctaUrl: '/',
      },
      promise: {
        title: 'The Clear Cutoff promise',
        body: 'TestPrep Pro works if all you need is unlimited generic practice. But when you’re ready for a course built around your exact exam, with real PYQs, structured tests, and a refund guarantee, you need Clear Cutoff.',
        ctaLabel: 'Book a Demo',
        ctaUrl: '/',
      },
      meta: {
        metaTitle: 'Clear Cutoff vs TestPrep Pro — Compare Teaching Exam Prep Platforms',
        metaDescription:
          'See why Clear Cutoff beats TestPrep Pro for CTET, HTET, UPTET and REET preparation: exam-specific PYQs, structured tests, and a refund guarantee.',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'marketing-proof',
    data: {
      trustedBy: {
        label: 'Trusted by 10,000+ aspirants',
        logos: [],
      },
      integrations: {
        title: 'Everything you need in one place',
        description: 'Notes, PYQs, video lectures, and test series — no need to juggle multiple apps.',
        linkLabel: 'Explore courses',
        linkUrl: '/',
        logos: [],
      },
      stats: [
        { value: '10,000+', label: 'Students trained' },
        { value: '50,000+', label: 'PYQs solved' },
        { value: '4.9/5', label: 'Average rating' },
      ],
      finalCta: {
        title: 'Turn practice into passing',
        description: 'Start your free trial today — no card required.',
        ctaLabel: 'Start free trial',
        ctaUrl: '/',
      },
    },
  })

  console.log('Seeded comparison:', comparison.slug)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
