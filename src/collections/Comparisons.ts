  import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

const statusOptions = [
  { label: '✅ Yes', value: 'yes' },
  { label: '⚠️ Partial', value: 'warning' },
  { label: '🚫 No', value: 'no' },
]

export const Comparisons: CollectionConfig = {
  slug: 'comparisons',
  labels: {
    singular: 'Comparison Page',
    plural: 'Comparison Pages',
  },
  admin: {
    useAsTitle: 'competitorName',
    defaultColumns: ['competitorName', 'slug', '_status'],
    description: 'Competitor comparison landing pages, e.g. /compare/interakt.',
  },
  access: {
    // Public visitors only see published comparisons; logged-in users see drafts too.
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'competitorName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Interakt". Used to build default copy and the page title.',
      },
    },
    {
      name: 'competitorLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Slug is shared across locales (one URL per comparison). Drives /compare/[slug].
    slugField({ useAsSlug: 'competitorName' }),
    {
      type: 'group',
      name: 'hero',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Compare',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'e.g. "Gallabox vs Interakt – Why leading brands choose Gallabox".',
          },
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
          defaultValue: 'Start free trial',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          admin: {
            description: 'Relative path (e.g. /signup) or full URL.',
          },
        },
      ],
    },
    {
      name: 'comparisonSectionTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "How Gallabox blows Interakt out of the water".',
      },
    },
    {
      name: 'comparisonPoints',
      type: 'array',
      labels: { singular: 'Comparison Point', plural: 'Comparison Points' },
      admin: {
        description:
          'The detailed "you vs them" cards, each followed by an Impact callout.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'yourText',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'theirText',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'impactText',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'featureTable',
      type: 'array',
      labels: { singular: 'Feature Row', plural: 'Feature Rows' },
      admin: {
        description:
          'Condensed feature-by-feature comparison table. Can include more granular rows than the Comparison Points above.',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'yourStatus',
          type: 'select',
          required: true,
          defaultValue: 'yes',
          options: statusOptions,
        },
        {
          name: 'yourText',
          type: 'text',
          localized: true,
        },
        {
          name: 'theirStatus',
          type: 'select',
          required: true,
          defaultValue: 'no',
          options: statusOptions,
        },
        {
          name: 'theirText',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'midCta',
      label: 'Mid-page CTA Banner',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
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
          defaultValue: 'Book a Demo',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
    {
      type: 'group',
      name: 'promise',
      label: 'Promise Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'body',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Book a Demo',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      admin: {
        position: 'sidebar',
        description: 'Overrides SEO Defaults for this comparison page.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
