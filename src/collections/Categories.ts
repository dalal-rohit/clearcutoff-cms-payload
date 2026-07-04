import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    // Anyone can read categories; only authenticated users can manage them.
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    // Slug is shared across locales (one URL per category). To make it
    // per-language instead, pass `localized: true` to slugField below.
    slugField({ useAsSlug: 'name' }),
  ],
}
