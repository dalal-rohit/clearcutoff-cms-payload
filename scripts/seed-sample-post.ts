/**
 * Seed one sample blog post linked to an exam, for end-to-end testing of the
 * exam-based blog + Contents/scroll-spy sidebar (Phase 1 deliverable).
 *
 * Usage:
 *   pnpm tsx scripts/seed-sample-post.ts               # defaults to CTET
 *   pnpm tsx scripts/seed-sample-post.ts teaching_HTET # a specific exam_id
 *
 * Idempotent: matches on slug and updates if the post already exists.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const TARGET_EXAM_ID = process.argv[2] || 'teaching_CTET'

// --- Minimal Lexical node builders (editorState JSON shape) ---
const text = (value: string, format = 0) => ({
  detail: 0,
  format, // 1 = bold
  mode: 'normal',
  style: '',
  text: value,
  type: 'text',
  version: 1,
})

const paragraph = (children: any[]) => ({
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
  textFormat: 0,
  textStyle: '',
})

const heading = (tag: 'h2' | 'h3', value: string) => ({
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  type: 'heading',
  version: 1,
})

const root = (children: any[]) => ({
  root: {
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

function buildContent(examName: string, shortName: string) {
  return root([
    paragraph([
      text(
        `Preparing for the ${examName} (${shortName}) can feel overwhelming — a vast syllabus, ` +
          `limited time, and high competition. This guide breaks the preparation down into a clear, ` +
          `repeatable strategy you can start using today.`,
      ),
    ]),
    paragraph([
      text('Most candidates do not fail for lack of effort. ', 1),
      text(
        'They fail because their effort is not organised around what the exam actually rewards. ' +
          'Let us fix that.',
      ),
    ]),

    heading('h2', 'Why This Exam Matters'),
    paragraph([
      text(
        `${shortName} is an eligibility gateway for teaching roles. A strong score does more than ` +
          `clear the cut-off — it strengthens your candidature for the recruitment stages that follow.`,
      ),
    ]),

    heading('h2', 'The Top 5 Preparation Strategies'),
    paragraph([
      text('These five habits, applied consistently, account for the majority of score improvement.'),
    ]),

    heading('h3', '1. Understand the Syllabus'),
    paragraph([
      text(
        'Map every topic to its weight in the paper. Prioritise high-frequency areas before rare ones, ' +
          'and never study a topic without knowing why it matters for the exam.',
      ),
    ]),

    heading('h3', '2. Practice Previous Year Questions'),
    paragraph([
      text(
        'PYQs reveal the examiner’s patterns — recurring concepts, phrasing, and difficulty. ' +
          'Solve them under timed conditions, then review every mistake.',
      ),
    ]),

    heading('h3', '3. Master Time Management'),
    paragraph([
      text(
        'Allocate a fixed number of minutes per section and rehearse it. The goal is to finish with ' +
          'time to spare for review, not to answer every question in order.',
      ),
    ]),

    heading('h3', '4. Take Full-Length Mock Tests'),
    paragraph([
      text(
        'A weekly full mock builds stamina and exposes weak areas while there is still time to fix them. ' +
          'Treat every mock like the real exam.',
      ),
    ]),

    heading('h3', '5. Build a Revision Plan'),
    paragraph([
      text(
        'Spaced revision beats last-minute cramming. Keep concise notes and cycle through them on a ' +
          'fixed schedule so nothing you have learned slips away.',
      ),
    ]),

    heading('h2', 'Conclusion'),
    paragraph([
      text(
        'Consistency beats intensity. Follow the syllabus, practise real questions, manage your time, ' +
          `and revise on a schedule — and the ${shortName} cut-off becomes a target you can plan for, ` +
          'not a wall you hope to clear.',
      ),
    ]),
  ])
}

async function run() {
  const payload = await getPayload({ config })

  // Find the target exam to link the post to.
  const examRes = await payload.find({
    collection: 'exams',
    where: { exam_id: { equals: TARGET_EXAM_ID } },
    limit: 1,
    depth: 0,
  })
  const exam: any = examRes.docs[0]
  if (!exam) {
    throw new Error(`No exam found with exam_id="${TARGET_EXAM_ID}". Run \`pnpm sync:exams\` first.`)
  }

  const shortName = exam.short_name || exam.name || TARGET_EXAM_ID
  const examName = exam.name || shortName
  const slug = `${String(shortName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-preparation-guide`

  const data = {
    title: `${shortName} Preparation Guide: Strategy, Syllabus & Best Practices`,
    slug,
    excerpt: `A clear, repeatable strategy to prepare for the ${examName} (${shortName}) — syllabus, PYQs, time management, mocks and revision.`,
    content: buildContent(examName, shortName),
    exam: exam.id,
    publishedDate: new Date().toISOString(),
    _status: 'published' as const,
  }

  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
    payload.logger.info(`Updated sample post "${data.title}" (slug: ${slug})`)
  } else {
    await payload.create({ collection: 'posts', data })
    payload.logger.info(`Created sample post "${data.title}" (slug: ${slug})`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err?.message ?? err)
  process.exit(1)
})
