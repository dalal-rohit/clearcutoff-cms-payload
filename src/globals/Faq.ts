import type { GlobalConfig } from 'payload'
import { faqPlainTextField, faqRichFields, hasRichText } from '../fields/faqRichText'
import { revalidateFaqPage } from '../hooks/revalidateFaqPage'

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
  hooks: {
    afterChange: [revalidateFaqPage],
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
            // New content: rich text (bold / blue / link). The legacy plain fields below
            // stay in the schema so rows saved before phase 76 keep showing; they appear
            // in the admin only while a row still has legacy text and no rich text.
            ...faqRichFields('question'),
            {
              name: 'question',
              type: 'text',
              localized: true,
              admin: {
                description:
                  'Legacy plain text. Still shown on the site until you fill the rich question above.',
                condition: (_, siblingData) =>
                  Boolean(siblingData?.question) && !hasRichText(siblingData?.questionRich),
              },
            },
            faqPlainTextField('question'),
            ...faqRichFields('answer'),
            {
              name: 'answer',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'Legacy plain text. Still shown on the site until you fill the rich answer above.',
                condition: (_, siblingData) =>
                  Boolean(siblingData?.answer) && !hasRichText(siblingData?.answerRich),
              },
            },
            faqPlainTextField('answer'),
          ],
        },
      ],
    },
  ],
}
