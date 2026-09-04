import type { GlobalConfig } from 'payload'

export const Faq: GlobalConfig = {
  slug: 'faq',
  label: 'FAQ Page',
  admin: {
    group: 'Settings',
    description:
      'Categories and questions shown on the public /faq page. Order of categories and questions here is the display order.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'categories',
      type: 'array',
      labels: { singular: 'Category', plural: 'Categories' },
      admin: {
        description: 'One entry per filter tab on the FAQ page.',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: {
            description:
              'Stable identifier for this category (e.g. "general"). Not shown to visitors — only used internally to track the active tab. Do not change once published, or bookmarked/shared tab links break.',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Filter tab label shown to visitors, e.g. "General".',
          },
        },
        {
          name: 'questions',
          type: 'array',
          labels: { singular: 'Question', plural: 'Questions' },
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Plain text. Use a blank line or line break for paragraphs — line breaks are preserved on the page.',
              },
            },
          ],
        },
      ],
    },
  ],
}
