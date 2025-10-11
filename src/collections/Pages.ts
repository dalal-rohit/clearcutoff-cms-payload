// src/collections/Pages.ts
import { CollectionConfig } from 'payload/'
import { heroSection } from '@/blocks/HeroSection'
import { pricingSection } from '@/blocks/PricingSection'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },

    {
      name: 'globalSections',
      label: 'Include Global Sections',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'Logo Carousel', value: 'logoCarousel' },
        { label: 'Reviews Section', value: 'reviews' },
        { label: 'Footer Section', value: 'footer' },
      ],
      admin: {
        description:
          'Select which global sections to include on this page. Their content comes from Global Sections settings.',
      },
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'hero' },
        { name: 'color', type: 'text', },
      ],
    },
    {
      name: 'logoCarousel',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'hero' },
        { name: 'color', type: 'text', },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'hero' },
        { name: 'color', type: 'text', },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'hero' },
        { name: 'color', type: 'text', },
      ],
    },
   

    {
      name: 'localSections',
      type: 'blocks',
      label: 'Page-Specific Sections',
      blocks: [heroSection, pricingSection],
    },
  ],
}
