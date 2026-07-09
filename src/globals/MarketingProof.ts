import type { GlobalConfig } from 'payload'

export const MarketingProof: GlobalConfig = {
  slug: 'marketing-proof',
  label: 'Marketing Proof',
  admin: {
    group: 'Settings',
    description:
      'Shared trust logos, stats, and integration content reused across comparison pages.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'trustedBy',
      label: 'Trusted By Bar',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Trusted by 10,000+ businesses',
        },
        {
          name: 'logos',
          type: 'array',
          labels: { singular: 'Logo', plural: 'Logos' },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'integrations',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Connect everything you already use',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'linkLabel',
          type: 'text',
          localized: true,
          defaultValue: 'View all Integrations',
        },
        {
          name: 'linkUrl',
          type: 'text',
        },
        {
          name: 'logos',
          type: 'array',
          labels: { singular: 'Logo', plural: 'Logos' },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      labels: { singular: 'Stat', plural: 'Stats' },
      admin: {
        description: 'e.g. "200M+ / Conversations powered".',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'finalCta',
      label: 'Final CTA Banner',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Turn connections into conversions',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Sign up for a free trial now',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
  ],
}
