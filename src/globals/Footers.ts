import { GlobalConfig } from 'payload'

export const Footers: GlobalConfig = {
  slug: 'footers',
  label: 'Footers',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      required: true,
    },
    {
      name: 'pages',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'link', type: 'text', required: true },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'contacts',
      type: 'array',
      fields: [
        { name: 'contact', type: 'text', required: true },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
