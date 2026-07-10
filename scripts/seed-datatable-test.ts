/**
 * One-off script to create/update a test post containing a `dataTable` block
 * (Piaget's cognitive development stages, matching the reference screenshot),
 * to verify the block's schema, validation, and content_html rendering.
 * Safe to delete or rerun.
 *
 * Usage: npx tsx scripts/seed-datatable-test.ts
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

const dataTableBlockNode = (): LexicalNode => ({
  type: 'block',
  format: '',
  version: 2,
  fields: {
    id: 'test-data-table-1',
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

  const content = {
    root: {
      type: 'root',
      children: [
        paragraph('This is a test post to verify the dynamic Data Table block.'),
        dataTableBlockNode(),
        paragraph(
          'What gets asked: matching age ranges to stages, identifying which stage a described classroom behavior belongs to, and the concept of "conservation".',
        ),
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }

  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'data-table-block-test' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'posts',
      id: existing.docs[0].id,
      data: { content },
    })
    console.log('Updated test post: data-table-block-test')
  } else {
    await payload.create({
      collection: 'posts',
      data: {
        title: 'Data Table Block Test',
        slug: 'data-table-block-test',
        content,
        _status: 'published',
      },
    })
    console.log('Created test post: data-table-block-test')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
