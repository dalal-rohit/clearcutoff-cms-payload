import type { Block } from 'payload'

/**
 * Inline Lexical block for the Posts `content` editor — lets an author drop a
 * "Previous Year Papers"-style resource table anywhere in the article body
 * (not just at the end). Each row links to an external "View Solved Paper"
 * page and/or a downloadable PDF/file. Rendered to HTML via a custom
 * converter (see Posts.ts `content_html` field) so it appears inline in
 * `content_html` at the exact position the author placed it.
 */
export const ResourceTableBlock: Block = {
  slug: 'resourceTable',
  labels: { singular: 'Resource Table', plural: 'Resource Tables' },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Previous Year Question Papers',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'rows',
      type: 'array',
      labels: { singular: 'Row', plural: 'Rows' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "SSC CGL 2024 Tier-II Official Paper-I (Held On: 18 Jan, 2025)"' },
        },
        {
          name: 'questionCount',
          type: 'text',
          admin: { description: 'e.g. "100 Question"' },
        },
        {
          name: 'marks',
          type: 'text',
          admin: { description: 'e.g. "120 Marks"' },
        },
        {
          name: 'duration',
          type: 'text',
          admin: { description: 'e.g. "120 Min"' },
        },
        {
          name: 'viewLink',
          type: 'text',
          admin: { description: 'URL for the "View Solved Paper" button. Leave blank to hide it.' },
        },
        {
          name: 'downloadFile',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'File for the "Download PDF" button. Leave blank to hide it.' },
        },
      ],
    },
  ],
}
