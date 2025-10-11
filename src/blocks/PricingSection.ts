// src/blocks/PricingSection.ts
import { Block } from 'payload';

export const pricingSection: Block = {
  slug: 'pricingSection',
  labels: { singular: 'Pricing Section', plural: 'Pricing Sections' },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'showCoursePrice',
      type: 'checkbox',
      label: 'Show Current Course Price (only for course pages)',
      defaultValue: false,
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'planName',
          type: 'text',
        },
        {
          name: 'price',
          type: 'number',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'feature', type: 'text' },
          ],
        },
      ],
    },
  ],
};
