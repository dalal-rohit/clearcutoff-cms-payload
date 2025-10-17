import { GlobalConfig } from 'payload'

export const Reviews: GlobalConfig = {
  slug: 'reviews',
  label: 'Reviews',
  access: {
    read: () => true,
  },
  fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'reviews',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', localized: true },
            { name: 'profile', type: 'upload', relationTo: 'media' },
            { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female'] },
            { name: 'field', type: 'text', localized: true },
            { name: 'review', type: 'textarea', localized: true },
            { name: 'rating', type: 'number', min: 1, max: 5 },
          ],
        },
      ],
}
