/**
 * Sync exams from the main Laravel backend into the Payload `exams` collection.
 *
 * Usage:
 *   pnpm sync:exams                 # sync all exams
 *   pnpm sync:exams -- --active     # only exams with status=active
 *   pnpm sync:exams -- --exam_id=teaching_HTET   # a single exam
 *
 * Source endpoint: GET {MAIN_BACKEND_URL}/api/blog/exam-export
 * Matches existing rows on `exam_id` and updates them; otherwise creates.
 */
import 'dotenv/config'
import axios from 'axios'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const MAIN_BACKEND_URL = (
  process.env.MAIN_BACKEND_URL || 'http://clearcutoff-main-backend.test'
).replace(/\/$/, '')
const EXPORT_PATH = '/api/blog/exam-export'

/** Parse the CLI flags into query params for the export endpoint. */
function parseArgs(): Record<string, string> {
  const params: Record<string, string> = {}
  for (const arg of process.argv.slice(2)) {
    if (arg === '--active') params.status = 'active'
    else if (arg.startsWith('--exam_id=')) params.exam_id = arg.split('=')[1]
    else if (arg.startsWith('--status=')) params.status = arg.split('=')[1]
  }
  return params
}

/**
 * The backend stores some JSON columns double-encoded (a JSON string inside a
 * JSON column), so values arrive as strings. Parse them back into objects so
 * Payload's `json` fields hold real structured data. Non-JSON strings are kept.
 */
function safeJson(value: unknown): unknown {
  if (typeof value !== 'string') return value ?? null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (!/^[[{]/.test(trimmed)) return value
  try {
    return JSON.parse(trimmed)
  } catch {
    return value
  }
}

/** Map one backend exam row to the Payload `exams` field shape. */
function mapExam(row: any) {
  return {
    exam_id: String(row.exam_id),
    name: row.name ?? null,
    short_name: row.short_name ?? null,
    state: row.state ?? null,
    conducting_body: row.conducting_body ?? null,
    logo_url: row.logo_url ?? null,
    exam_type: row.exam_type ?? null,
    exam_frequency: row.exam_frequency ?? null,
    evaluation_type: row.evaluation_type ?? null,
    ai_evaluation_supported: Boolean(row.ai_evaluation_supported),
    upcoming_exam: row.upcoming_exam_date ?? null,
    status: row.status ?? null,
    rating: row.rating ?? null,
    price: safeJson(row.price),
    combo_price: safeJson(row.combo_price),
    translation: safeJson(row.translation),
    marking_schema: safeJson(row.marking_schema),
    metadata: safeJson(row.metadata),
    source: {
      uuid: row.uuid ?? null,
      slug: row.slug ?? null,
      synced_at: new Date().toISOString(),
    },
  }
}

async function run() {
  const payload = await getPayload({ config })
  const params = parseArgs()
  const url = `${MAIN_BACKEND_URL}${EXPORT_PATH}`

  payload.logger.info(`Fetching exams from ${url} ${JSON.stringify(params)}`)
  const res = await axios.get(url, {
    params,
    timeout: 30000,
    headers: { Accept: 'application/json' },
  })

  const rows: any[] = res.data?.data ?? res.data ?? []
  if (!Array.isArray(rows)) {
    throw new Error(`Unexpected response shape: ${JSON.stringify(res.data).slice(0, 200)}`)
  }
  payload.logger.info(`Received ${rows.length} exam(s) from backend.`)

  let created = 0
  let updated = 0
  let skipped = 0

  for (const row of rows) {
    if (!row?.exam_id) {
      payload.logger.warn(`Skipping row without exam_id: ${row?.name ?? 'unknown'}`)
      skipped++
      continue
    }

    const data = mapExam(row)
    const existing = await payload.find({
      collection: 'exams',
      where: { exam_id: { equals: data.exam_id } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'exams', id: existing.docs[0].id, data })
      updated++
    } else {
      await payload.create({ collection: 'exams', data })
      created++
    }
  }

  payload.logger.info(
    `Sync complete — created: ${created}, updated: ${updated}, skipped: ${skipped}`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error('Exam sync failed:', err?.response?.data ?? err?.message ?? err)
  process.exit(1)
})
