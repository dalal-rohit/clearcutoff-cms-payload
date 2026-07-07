import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { lexicalHTMLField } from '@payloadcms/richtext-lexical'

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
      // Uses the project-default lexical editor (payload.config.ts), which
      // includes H1–H6 heading nodes — the source of the article's TOC.
    },
    // Server-rendered HTML of `content`, exposed to the blog frontend so it can
    // render articles with html-react-parser (no Lexical dependency needed).
    // Virtual (storeInDB: false) so it always reflects the latest content; the
    // blog reads `content_html`. Localized output follows the requested locale.
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content',
      storeInDB: false,
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
    {
      name: 'attachments',
      type: 'array',
      admin: {
        description: 'Downloadable resources (PDF, Excel, CSV, etc.) shown on the article.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Display name, e.g. "CTET Previous Year Papers (PDF)". Defaults to the filename if left blank.',
          },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
