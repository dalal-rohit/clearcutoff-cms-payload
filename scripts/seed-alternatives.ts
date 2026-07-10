/**
 * One-off seed script: creates two sample Alternatives pages (structured
 * `alternatives` collection), cross-linked via relatedAlternatives, so the
 * frontend /alternatives routes and the dynamic footer have real data.
 * Safe to delete or rerun.
 *
 * Usage: npx tsx scripts/seed-alternatives.ts
 */
import 'dotenv/config'
import sharp from 'sharp'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type LexicalNode = Record<string, unknown>

const text = (value: string): LexicalNode => ({
  type: 'text',
  text: value,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (value: string): LexicalNode => ({
  type: 'paragraph',
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const heading = (tag: 'h2', value: string): LexicalNode => ({
  type: 'heading',
  tag,
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const introBody = (competitor: string) => ({
  root: {
    type: 'root',
    children: [
      paragraph(
        `${competitor} is a solid exam-prep tool, but growing aspirants often need more structured, exam-specific prep than a generic practice app can offer.`,
      ),
      heading('h2', `Why look for a ${competitor} alternative`),
      paragraph(
        `If you're finding ${competitor} short on exam-specific PYQs, structured test series, or a refund guarantee, it may be time to explore other options.`,
      ),
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

async function placeholderLogoBuffer(hex: string): Promise<Buffer> {
  return sharp({ create: { width: 200, height: 200, channels: 4, background: hex } })
    .png()
    .toBuffer()
}

async function run() {
  const payload = await getPayload({ config })

  const ourLogoBuffer = await placeholderLogoBuffer('#0083ff')
  const ourLogo = await payload.create({
    collection: 'media',
    data: { alt: 'Clear Cutoff logo (placeholder)' },
    file: { data: ourLogoBuffer, mimetype: 'image/png', name: 'clear-cutoff-logo.png', size: ourLogoBuffer.length },
  })

  const tools = [
    {
      name: 'Clear Cutoff',
      logo: ourLogo.id,
      bestFor: 'End-to-end teaching exam prep',
      standoutFeature: 'Exam-specific PYQs organized by topic',
      description:
        'Clear Cutoff is a focused teaching-exam prep platform built around real previous year questions, structured mock tests, and a refund guarantee.',
      features: [
        { text: 'Exam-specific PYQs organized by topic and difficulty' },
        { text: 'Mini, sectional, and full-length mock tests' },
        { text: 'Free notes and study material' },
      ],
      pros: [{ text: 'Refund guarantee if you complete the course and still don’t pass' }],
      cons: [{ text: 'New users may take a little time to explore every feature' }],
      pricingSummary: 'Starts at ₹99 for full access',
      rating: { g2Score: '4.8/5', g2ReviewCount: '50+ reviews' },
    },
    {
      name: 'Generic Practice App',
      bestFor: 'Unlimited generic practice questions',
      standoutFeature: 'Large question bank',
      description: 'Generic practice apps offer unlimited questions but rarely map to your exact exam pattern.',
      features: [{ text: 'Unlimited practice questions' }, { text: 'Basic progress tracking' }],
      limitations: [
        { text: 'No structured, exam-pattern test series' },
        { text: 'No refund policy' },
      ],
      pricingSummary: 'Free, with paid upsells',
    },
  ]

  const alt1 = await payload.create({
    collection: 'alternatives',
    data: {
      competitorName: 'TestPrep Pro',
      competitorLogo: ourLogo.id,
      slug: 'testprep-pro',
      hero: {
        title: '10 Best TestPrep Pro Alternatives for Teaching Exam Prep in 2026',
        description:
          'Looking for a TestPrep Pro alternative? Here are the best exam-specific prep platforms for CTET, HTET, UPTET and more.',
      },
      introBody: introBody('TestPrep Pro'),
      summaryTableTitle: 'Best TestPrep Pro alternatives at a glance',
      tools,
      midCta: {
        title: 'Ready to prepare the smarter way?',
        description: 'Join thousands of aspirants who chose exam-focused prep over generic practice.',
      },
      promise: {
        title: 'The Clear Cutoff promise',
        body: 'TestPrep Pro works if all you need is unlimited generic practice. But when you’re ready for a course built around your exact exam, you need Clear Cutoff.',
      },
      meta: {
        metaTitle: 'Best TestPrep Pro Alternatives | Clear Cutoff',
        metaDescription:
          'Compare TestPrep Pro alternatives for CTET, HTET, UPTET prep: exam-specific PYQs, structured tests, and a refund guarantee.',
      },
      _status: 'published',
      publishedDate: new Date().toISOString(),
    },
  })

  const alt2 = await payload.create({
    collection: 'alternatives',
    data: {
      competitorName: 'QuickPrep',
      competitorLogo: ourLogo.id,
      slug: 'quickprep',
      hero: {
        title: '10 Best QuickPrep Alternatives for Teaching Exam Prep in 2026',
        description:
          'QuickPrep works for basic practice, but here are better exam-specific alternatives for serious teaching exam aspirants.',
      },
      introBody: introBody('QuickPrep'),
      summaryTableTitle: 'Best QuickPrep alternatives at a glance',
      tools,
      relatedAlternatives: [alt1.id],
      midCta: {
        title: 'Ready to prepare the smarter way?',
        description: 'Join thousands of aspirants who chose exam-focused prep over generic practice.',
      },
      promise: {
        title: 'The Clear Cutoff promise',
        body: 'QuickPrep works if all you need is unlimited generic practice. But when you’re ready for a course built around your exact exam, you need Clear Cutoff.',
      },
      meta: {
        metaTitle: 'Best QuickPrep Alternatives | Clear Cutoff',
        metaDescription:
          'Compare QuickPrep alternatives for CTET, HTET, UPTET prep: exam-specific PYQs, structured tests, and a refund guarantee.',
      },
      _status: 'published',
      publishedDate: new Date().toISOString(),
    },
  })

  await payload.update({
    collection: 'alternatives',
    id: alt1.id,
    data: { relatedAlternatives: [alt2.id] },
  })

  console.log('Seeded alternatives:', alt1.slug, alt2.slug)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
