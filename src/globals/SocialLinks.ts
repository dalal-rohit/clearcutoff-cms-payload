import type { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
