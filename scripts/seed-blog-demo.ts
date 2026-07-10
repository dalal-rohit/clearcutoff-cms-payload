/**
 * One-off script: creates/updates a demo blog post with real H2/H3 headings
 * plus a dataTable block, so the new landing-new /blog/[slug] page has
 * something realistic to render (TOC, scroll-spy, table, related posts).
 * Safe to delete or rerun.
 *
 * Usage: npx tsx scripts/seed-blog-demo.ts
 */
import 'dotenv/config'
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

const heading = (tag: 'h2' | 'h3', value: string): LexicalNode => ({
  type: 'heading',
  tag,
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const dataTableBlockNode = (): LexicalNode => ({
  type: 'block',
  format: '',
  version: 2,
  fields: {
    id: 'piaget-stages-table',
    blockName: '',
    blockType: 'dataTable',
    title: 'Jean Piaget: Cognitive Development',
    description:
      'Piaget proposed that children move through four distinct stages of cognitive development, each with a different way of thinking about the world.',
    columns: [{ header: 'Stage' }, { header: 'Age Range' }, { header: 'Key Idea' }],
    rows: [
      {
        cells: [
          { value: 'Sensorimotor' },
          { value: '0-2 years' },
          { value: 'Learning through senses and motor actions; develops object permanence' },
        ],
      },
      {
        cells: [
          { value: 'Preoperational' },
          { value: '2-7 years' },
          { value: 'Symbolic thinking begins; egocentric; lacks logical reasoning (conservation)' },
        ],
      },
      {
        cells: [
          { value: 'Concrete Operational' },
          { value: '7-11 years' },
          { value: 'Logical thinking about concrete objects; understands conservation, reversibility' },
        ],
      },
      {
        cells: [
          { value: 'Formal Operational' },
          { value: '11+ years' },
          { value: 'Abstract and hypothetical reasoning develops' },
        ],
      },
    ],
  },
})

async function run() {
  const payload = await getPayload({ config })

  let category = (
    await payload.find({ collection: 'categories', where: { slug: { equals: 'child-development' } }, limit: 1 })
  ).docs[0]

  if (!category) {
    category = await payload.create({
      collection: 'categories',
      data: { name: 'Child Development', slug: 'child-development' },
    })
  }

  const content = {
    root: {
      type: 'root',
      children: [
        paragraph(
          'Cognitive development theory is a recurring topic in teaching exams like CTET and HTET. This guide breaks down the major theorists and what typically gets asked.',
        ),
        heading('h2', "Piaget's Theory of Cognitive Development"),
        paragraph(
          'Jean Piaget proposed that children move through four distinct stages of cognitive development, each with a fundamentally different way of thinking about the world.',
        ),
        dataTableBlockNode(),
        heading('h3', 'Why this matters for exams'),
        paragraph(
          'Exam questions often ask you to match age ranges to stages, or to identify which stage a described classroom behavior belongs to.',
        ),
        heading('h2', "Vygotsky's Sociocultural Theory"),
        paragraph(
          'Unlike Piaget, Vygotsky emphasized the role of social interaction and culture in cognitive development, introducing the concept of the Zone of Proximal Development (ZPD).',
        ),
        heading('h3', 'Zone of Proximal Development'),
        paragraph(
          'The ZPD is the gap between what a learner can do independently and what they can do with guidance from a more knowledgeable other.',
        ),
        heading('h2', 'Key takeaways'),
        paragraph('Understanding both theories — and how they differ — is essential for the pedagogy sections of most teaching exams.'),
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }

  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'cognitive-development-theories' } },
    limit: 1,
  })

  const data = {
    title: 'Cognitive Development Theories Every Teaching Exam Aspirant Should Know',
    slug: 'cognitive-development-theories',
    excerpt: 'A breakdown of Piaget and Vygotsky’s theories of cognitive development, with what typically gets asked in CTET, HTET, and UPTET.',
    content,
    categories: [category.id],
    _status: 'published' as const,
    publishedDate: new Date().toISOString(),
  }

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
    console.log('Updated demo post:', data.slug)
  } else {
    await payload.create({ collection: 'posts', data })
    console.log('Created demo post:', data.slug)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
