// src/globals/GlobalSections.ts
import { GlobalConfig } from 'payload'

export const GlobalSections: GlobalConfig = {
  slug: 'global-sections',
  label: 'Global Sections',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text' },
        { name: 'subheading', type: 'textarea' },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'logoCarousel',
      type: 'group',
      label: 'Logo Carousel',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'logos',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'textarea' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'Reviews Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'reviews',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'text', type: 'textarea' },
            { name: 'rating', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'copyright', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}
