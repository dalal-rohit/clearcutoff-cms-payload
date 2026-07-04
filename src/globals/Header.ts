import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional. Overrides the Site Settings logo in the header.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
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
            description: 'Relative path (e.g. /posts) or full URL.',
          },
        },
      ],
    },
  ],
}
