import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor, lexicalHTMLField, BlocksFeature } from '@payloadcms/richtext-lexical'
import { ResourceTableBlock } from '../blocks/ResourceTable'
import { resourceTableHTMLConverter } from '../blocks/resourceTableHTMLConverter'
import { DataTableBlock } from '../blocks/DataTable'
import { dataTableHTMLConverter } from '../blocks/dataTableHTMLConverter'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', '_status'],
  },
  access: {
    // Public visitors only see published posts; logged-in users see drafts too.
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    // Slug is shared across locales (one URL per post). To make it
    // per-language instead, pass `localized: true` to slugField below.
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short summary shown on post cards and listings.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      // Extends the project-default lexical feature set (H1–H6 headings —
      // the source of the article's TOC — plus the rest of the defaults)
      // with BlocksFeature so authors can drop blocks INLINE anywhere in the
      // article body rather than only at the end: `resourceTable` (see
      // ../blocks/ResourceTable.ts) for "Previous Year Papers"-style lists,
      // and `dataTable` (see ../blocks/DataTable.ts) for a fully author-defined
      // table with any number of columns/rows, e.g. a comparison table.
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [ResourceTableBlock, DataTableBlock] }),
        ],
      }),
    },
    // Server-rendered HTML of `content`, exposed to the blog frontend so it can
    // render articles with html-react-parser (no Lexical dependency needed).
    // Virtual (storeInDB: false) so it always reflects the latest content; the
    // blog reads `content_html`. Localized output follows the requested locale.
    // `converters` adds the `resourceTable` block's HTML rendering so it comes
    // out inline in content_html at the exact position the author placed it.
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content',
      storeInDB: false,
      converters: ({ defaultConverters }) => ({
        ...defaultConverters,
        blocks: {
          ...(defaultConverters as { blocks?: object }).blocks,
          resourceTable: resourceTableHTMLConverter,
          dataTable: dataTableHTMLConverter,
        },
      }),
    }),
    // Meta fields in the sidebar to keep the main edit view focused on content.
    {
      name: 'exam',
      type: 'relationship',
      relationTo: 'exams',
      admin: {
        position: 'sidebar',
        description: 'The exam this blog post is about.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    // Downloadable resources shown in a "Resources" section on the blog
    // article (PDFs, Excel/CSV sheets, etc). The `media` collection accepts
    // any file type (no mimeTypes restriction), so no CMS-side upload change
    // was needed beyond this field.
    // {
    //   name: 'attachments',
    //   type: 'array',
    //   admin: {
    //     description: 'Downloadable resources (PDF, Excel, CSV, etc.) shown on the article.',
    //   },
    //   fields: [
    //     {
    //       name: 'label',
    //       type: 'text',
    //       admin: {
    //         description: 'Display name, e.g. "CTET Previous Year Papers (PDF)". Defaults to the filename if left blank.',
    //       },
    //     },
    //     {
    //       name: 'file',
    //       type: 'upload',
    //       relationTo: 'media',
    //       required: true,
    //     },
    //   ],
    // },
  ],
}
