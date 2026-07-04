import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

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
    },
    // Meta fields in the sidebar to keep the main edit view focused on content.
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
  ],
}
