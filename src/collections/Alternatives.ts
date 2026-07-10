import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor, lexicalHTMLField } from '@payloadcms/richtext-lexical'

export const Alternatives: CollectionConfig = {
  slug: 'alternatives',
  labels: {
    singular: 'Alternatives Page',
    plural: 'Alternatives Pages',
  },
  admin: {
    useAsTitle: 'competitorName',
    defaultColumns: ['competitorName', 'slug', '_status'],
    description: '"Best X Alternatives" listicle pages, e.g. /alternatives/testprep-pro.',
  },
  access: {
    // Public visitors only see published pages; logged-in users see drafts too.
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
        description: 'e.g. "TestPrep Pro". Used to template the SEO title and page copy.',
      },
    },
    {
      name: 'competitorLogo',
      type: 'upload',
      relationTo: 'media',
    },
    // Slug is shared across locales (one URL per page). Drives /alternatives/[slug].
    slugField({ useAsSlug: 'competitorName' }),
    {
      type: 'group',
      name: 'hero',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Alternatives',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'e.g. "10 Best TestPrep Pro Alternatives for Teaching Exam Prep in 2026".',
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
          defaultValue: 'Try for Free',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'introBody',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
      admin: {
        description:
          'The opening narrative before the tool list (e.g. "Why look for a TestPrep Pro alternative"). Free-form rich text since this varies article to article.',
      },
    },
    // Server-rendered HTML of `introBody`, exposed to the frontend so it can
    // render the intro without a Lexical dependency. See Posts.ts for the
    // same pattern (content_html).
    lexicalHTMLField({
      htmlFieldName: 'introBody_html',
      lexicalFieldName: 'introBody',
      storeInDB: false,
    }),
    {
      name: 'summaryTableTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Best TestPrep Pro alternatives at a glance". Leave blank to hide the summary table.',
      },
    },
    {
      name: 'tools',
      type: 'array',
      labels: { singular: 'Alternative Tool', plural: 'Alternative Tools' },
      admin: {
        description: 'One entry per tool in the listicle, in display order (Clear Cutoff is usually #1).',
      },
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
        },
        {
          name: 'bestFor',
          type: 'text',
          localized: true,
          admin: {
            description: 'e.g. "End-to-end lifecycle management". Shown as a subtitle and in the summary table.',
          },
        },
        {
          name: 'standoutFeature',
          type: 'text',
          localized: true,
          admin: { description: 'Optional. Shown in the summary table only.' },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'features',
          type: 'array',
          labels: { singular: 'Feature', plural: 'Features' },
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        {
          name: 'pros',
          type: 'array',
          labels: { singular: 'Pro', plural: 'Pros' },
          admin: { description: 'Optional — use Pros/Cons OR Limitations, not necessarily both.' },
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        {
          name: 'cons',
          type: 'array',
          labels: { singular: 'Con', plural: 'Cons' },
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        {
          name: 'limitations',
          type: 'array',
          labels: { singular: 'Limitation', plural: 'Limitations' },
          admin: { description: 'Optional alternative to Pros/Cons — a single "limitations" list.' },
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        {
          name: 'pricingSummary',
          type: 'text',
          localized: true,
          admin: { description: 'Short one-liner, e.g. "Starts at $89/year". Shown in the summary table.' },
        },
        {
          name: 'pricingTiers',
          type: 'array',
          labels: { singular: 'Pricing Tier', plural: 'Pricing Tiers' },
          admin: { description: 'Optional detailed pricing breakdown shown under the tool.' },
          fields: [
            { name: 'planName', type: 'text', required: true },
            { name: 'price', type: 'text', required: true },
          ],
        },
        {
          type: 'group',
          name: 'rating',
          admin: { description: 'Optional G2/Capterra ratings.' },
          fields: [
            { name: 'g2Score', type: 'text', admin: { description: 'e.g. "4.6/5"' } },
            { name: 'g2ReviewCount', type: 'text', admin: { description: 'e.g. "150+ reviews"' } },
            { name: 'capterraScore', type: 'text' },
            { name: 'capterraReviewCount', type: 'text' },
          ],
        },
        {
          type: 'group',
          name: 'testimonial',
          admin: { description: 'Optional customer quote shown under this tool.' },
          fields: [
            { name: 'quote', type: 'textarea', localized: true },
            { name: 'authorName', type: 'text' },
            { name: 'authorRole', type: 'text' },
            { name: 'authorCompany', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'midCta',
      label: 'Mid-page CTA Banner',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Try for Free' },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'promise',
      label: 'Closing Section',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Try for Free' },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
    {
      name: 'relatedAlternatives',
      type: 'relationship',
      relationTo: 'alternatives',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Other Alternatives pages to link at the bottom of this article.',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      admin: {
        position: 'sidebar',
        description: 'Overrides SEO Defaults for this page.',
      },
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
