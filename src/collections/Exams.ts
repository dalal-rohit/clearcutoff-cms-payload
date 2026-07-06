import type { CollectionConfig } from 'payload'

/**
 * Exams — mirror of the main Laravel backend `exams` table.
 *
 * Rows are populated by the sync script (`pnpm sync:exams`), which pulls from
 * the main backend's `/api/blog/exam-export` endpoint and upserts by `exam_id`.
 * `exam_id` is the stable external key used to match existing rows on re-sync.
 *
 * JSON blobs (price, combo_price, translation, marking_schema, metadata) are
 * stored as objects; the sync script parses the backend's stringified JSON.
 */
export const Exams: CollectionConfig = {
  slug: 'exams',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'short_name', 'exam_id', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    // Publicly readable; writes happen through the sync script / authed admins.
    read: () => true,
  },
  indexes: [{ fields: ['exam_id'], unique: true }],
  fields: [
    {
      name: 'exam_id',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'External key from the main backend. Sync matches on this.' },
    },
    { name: 'name', type: 'text' },
    { name: 'short_name', type: 'text' },
    { name: 'state', type: 'text' },
    { name: 'conducting_body', type: 'text' },
    { name: 'logo_url', type: 'text' },
    { name: 'exam_type', type: 'text' },
    {
      name: 'exam_frequency',
      type: 'select',
      options: ['Annual', 'Biannual', 'One-Time', 'Rolling'],
    },
    {
      name: 'evaluation_type',
      type: 'select',
      options: ['MCQ', 'Descriptive', 'Hybrid'],
    },
    { name: 'ai_evaluation_supported', type: 'checkbox', defaultValue: false },
    {
      name: 'upcoming_exam',
      type: 'text',
      admin: { description: 'Source: upcoming_exam_date' },
    },
    {
      name: 'status',
      type: 'select',
      options: ['Active', 'Coming Soon', 'Archived'],
    },
    { name: 'rating', type: 'text' },
    { name: 'price', type: 'json' },
    { name: 'combo_price', type: 'json' },
    { name: 'translation', type: 'json' },
    { name: 'marking_schema', type: 'json' },
    { name: 'metadata', type: 'json' },
    {
      name: 'pyq_pdf',
      type: 'json',
      admin: {
        description:
          'Not provided by the current backend export; reserved for future PYQ PDF data.',
      },
    },
    // Provenance from the source row (handy for debugging syncs).
    {
      name: 'source',
      type: 'group',
      admin: { description: 'Provenance from the main backend row.' },
      fields: [
        { name: 'uuid', type: 'text' },
        { name: 'slug', type: 'text' },
        { name: 'synced_at', type: 'date' },
      ],
    },
  ],
}
