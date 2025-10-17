import { GlobalConfig } from 'payload'

export const FAQs: GlobalConfig = {
  slug: 'faqs',
  label: 'FAQs',
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
      name: 'categories',
      type: 'array',
      fields: [{ name: 'category', type: 'text', localized: true }],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', localized: true },
        { name: 'question', type: 'text', localized: true },
        { name: 'answer', type: 'textarea', localized: true },
      ],
    },
  ],
}
