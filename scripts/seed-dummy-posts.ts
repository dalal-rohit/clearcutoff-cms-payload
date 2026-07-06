/**
 * Seed several dummy blog posts across different exams, for testing the
 * exam-based blog listing + article page + Contents/scroll-spy sidebar.
 *
 * Usage: pnpm tsx scripts/seed-dummy-posts.ts
 *
 * Idempotent: matches on slug and updates existing posts instead of duplicating.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

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
const paragraph = (value: string) => ({
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  type: 'paragraph' as const,
  version: 1,
  textFormat: 0,
  textStyle: '',
})
const heading = (tag: 'h2' | 'h3', value: string) => ({
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  type: 'heading' as const,
  version: 1,
})
const root = (children: any[]) => ({
  root: { children, direction: 'ltr' as const, format: '' as const, indent: 0, type: 'root' as const, version: 1 },
})

// --- Article structure -> Lexical content ---
type Sub = { h3: string; para: string }
type Section = { h2: string; paras?: string[]; subs?: Sub[] }
type Article = {
  exam_id: string
  slug: string
  title: string
  excerpt: string
  intro: string[]
  sections: Section[]
}

function buildContent(a: Article) {
  const nodes: any[] = []
  a.intro.forEach((p) => nodes.push(paragraph(p)))
  a.sections.forEach((s) => {
    nodes.push(heading('h2', s.h2))
    ;(s.paras || []).forEach((p) => nodes.push(paragraph(p)))
    ;(s.subs || []).forEach((sub) => {
      nodes.push(heading('h3', sub.h3))
      nodes.push(paragraph(sub.para))
    })
  })
  return root(nodes)
}

const ARTICLES: Article[] = [
  {
    exam_id: 'teaching_CTET',
    slug: 'ctet-exam-pattern-and-marking-scheme',
    title: 'CTET Exam Pattern & Marking Scheme Explained',
    excerpt: 'Understand the CTET paper structure, question distribution, and how marks are awarded.',
    intro: [
      'Before you memorise a single fact, you should understand how the CTET paper is built. Knowing the structure tells you where the marks are and how to spend your time.',
    ],
    sections: [
      {
        h2: 'Paper Structure at a Glance',
        paras: ['CTET has two papers. Paper 1 is for classes 1–5 and Paper 2 for classes 6–8.'],
        subs: [
          { h3: 'Number of Questions', para: 'Each paper has 150 multiple-choice questions to be solved in 150 minutes.' },
          { h3: 'Section Split', para: 'Questions are spread across child development, languages, and subject areas.' },
        ],
      },
      {
        h2: 'Marking Scheme',
        paras: ['Every correct answer earns one mark and there is no negative marking, so never leave a question blank.'],
      },
      {
        h2: 'Qualifying Criteria',
        paras: ['A score of 60% or above is considered a pass, with relaxations for reserved categories.'],
      },
    ],
  },
  {
    exam_id: 'teaching_CTET',
    slug: 'best-books-and-resources-for-ctet',
    title: 'Best Books and Resources for CTET Preparation',
    excerpt: 'A curated list of books and resources that actually move the needle on your CTET score.',
    intro: ['The right resources save you months. Here is what to keep on your desk and what to skip.'],
    sections: [
      {
        h2: 'Core Textbooks',
        subs: [
          { h3: 'Child Development & Pedagogy', para: 'Focus on one standard reference and read it deeply rather than skimming many.' },
          { h3: 'Mathematics & EVS', para: 'NCERT textbooks from classes 1–8 remain the single best source.' },
        ],
      },
      { h2: 'Practice Material', paras: ['Previous year papers and a reliable question bank matter more than any guidebook.'] },
      { h2: 'Free Online Resources', paras: ['Official notifications and NCERT PDFs cover most of what you need at zero cost.'] },
    ],
  },
  {
    exam_id: 'teaching_HTET',
    slug: 'htet-syllabus-paper-1-vs-paper-2',
    title: 'HTET Syllabus Breakdown: Paper 1 vs Paper 2',
    excerpt: 'A side-by-side look at the HTET Level 1 and Level 2 syllabus so you prepare the right one.',
    intro: ['Choosing the correct level and syllabus is the first strategic decision in your HTET journey.'],
    sections: [
      {
        h2: 'Who Should Take Which Paper',
        subs: [
          { h3: 'Primary Level (PRT)', para: 'For candidates aiming to teach classes 1–5.' },
          { h3: 'TGT and PGT Levels', para: 'For upper-primary and senior-secondary teaching roles respectively.' },
        ],
      },
      { h2: 'Common Sections', paras: ['Child development, language, and reasoning appear across all levels.'] },
      { h2: 'Level-Specific Topics', paras: ['Subject depth increases sharply from PRT to PGT — plan your revision accordingly.'] },
    ],
  },
  {
    exam_id: 'teaching_REET',
    slug: 'reet-90-day-study-plan',
    title: 'REET Time Management: A 90-Day Study Plan',
    excerpt: 'A realistic three-month schedule to cover the REET syllabus without burning out.',
    intro: ['Ninety days is enough — if every week has a clear purpose. Here is how to structure them.'],
    sections: [
      {
        h2: 'Month 1: Build Foundations',
        subs: [
          { h3: 'Weeks 1–2', para: 'Finish child development and pedagogy fundamentals.' },
          { h3: 'Weeks 3–4', para: 'Cover language paper basics and start daily current affairs.' },
        ],
      },
      { h2: 'Month 2: Deepen and Practise', paras: ['Move into subject topics and begin weekly sectional tests.'] },
      { h2: 'Month 3: Test and Revise', paras: ['Take full-length mocks and cycle through your revision notes.'] },
    ],
  },
  {
    exam_id: 'teaching_UPTET',
    slug: 'how-to-attempt-mock-tests-uptet',
    title: 'How to Attempt Mock Tests the Right Way for UPTET',
    excerpt: 'Mock tests only help if you use them correctly. Here is the method that maximises learning.',
    intro: ['A mock test is a diagnostic tool, not a scoreboard. Treat it that way and your score will climb.'],
    sections: [
      { h2: 'Before the Mock', paras: ['Simulate real conditions — fixed time, no interruptions, no notes.'] },
      {
        h2: 'During the Mock',
        subs: [
          { h3: 'Manage the Clock', para: 'Skip time-sinks early and return to them if time allows.' },
          { h3: 'Mark and Move', para: 'Never let one hard question eat into the marks you can secure elsewhere.' },
        ],
      },
      { h2: 'After the Mock', paras: ['The real learning is in the review — analyse every wrong and every guessed answer.'] },
    ],
  },
  {
    exam_id: 'teaching_HPTET',
    slug: 'common-mistakes-to-avoid-in-hptet',
    title: 'Common Mistakes to Avoid in HPTET',
    excerpt: 'Small, avoidable errors cost candidates the cut-off every year. Do not be one of them.',
    intro: ['Most HPTET failures come down to a handful of repeat mistakes. Here is how to sidestep them.'],
    sections: [
      { h2: 'Ignoring the Syllabus Weightage', paras: ['Studying everything equally wastes time on low-yield topics.'] },
      { h2: 'Skipping Previous Year Papers', paras: ['PYQs are the closest thing to seeing the real exam in advance.'] },
      {
        h2: 'Poor Exam-Day Strategy',
        subs: [
          { h3: 'Rushing the Start', para: 'A calm, steady opening prevents silly errors on easy marks.' },
          { h3: 'Neglecting Revision Time', para: 'Always leave a few minutes to review flagged questions.' },
        ],
      },
    ],
  },
]

async function run() {
  const payload = await getPayload({ config })

  // Map exam_id -> Payload doc id.
  const exams = await payload.find({ collection: 'exams', limit: 100, depth: 0 })
  const examIdByKey = new Map<string, number | string>()
  for (const e of exams.docs as any[]) examIdByKey.set(e.exam_id, e.id)

  let created = 0
  let updated = 0
  let skipped = 0

  for (const a of ARTICLES) {
    const examDocId = examIdByKey.get(a.exam_id)
    if (!examDocId) {
      payload.logger.warn(`Skipping "${a.title}" — exam ${a.exam_id} not found (run pnpm sync:exams).`)
      skipped++
      continue
    }

    const data = {
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: buildContent(a),
      exam: examDocId,
      publishedDate: new Date().toISOString(),
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: a.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
      updated++
    } else {
      await payload.create({ collection: 'posts', data })
      created++
    }
    payload.logger.info(`✓ ${a.title}  [${a.exam_id}]`)
  }

  payload.logger.info(`Dummy posts done — created: ${created}, updated: ${updated}, skipped: ${skipped}`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err?.message ?? err)
  process.exit(1)
})
