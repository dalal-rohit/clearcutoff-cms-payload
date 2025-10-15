import { heroSection } from '@/blocks/HeroSection'
import { pricingSection } from '@/blocks/PricingSection'
import { CollectionConfig } from 'payload'

const Courses: CollectionConfig = {
  slug: 'courses',
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', localized: true },
        { name: 'icon', type: 'text' },
      ],
    },
    {
      name: 'hero',
      type: 'relationship',
      relationTo: 'users',
      required: true,
     
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [heroSection, pricingSection],
    },
  ],
}

export default Courses
