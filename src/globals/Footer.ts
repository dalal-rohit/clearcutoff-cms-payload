import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 12,
      labels: { singular: 'Nav Item', plural: 'Nav Items' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Relative path (e.g. /about) or full URL.',
          },
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Shown at the bottom of the footer, e.g. "© 2026 My Blog".',
      },
    },
  ],
}
