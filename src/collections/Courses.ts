import { CollectionConfig } from 'payload'

const Courses: CollectionConfig = {
  slug: 'courses',
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', localized: true },
        { name: 'icon', type: 'text' },
      ],
    },
  ],
}

export default Courses
