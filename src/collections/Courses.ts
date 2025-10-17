import { heroSection } from '@/blocks/HeroSection'
import { pricingSection } from '@/blocks/PricingSection'
import { CollectionConfig } from 'payload'

const Courses: CollectionConfig = {
  slug: 'courses',
  fields: [
    { name: 'exam_id', type: 'text', required: true },
    { name: 'name', type: 'text', localized: true, unique: true },
    { name: 'short_name', type: 'text', required: true },
    { name: 'state', type: 'text', localized: true },
    { name: 'conducting_body', type: 'text', localized: true },
    { name: 'logo_url', type: 'text', required: true },
    { name: 'exam_type', type: 'text', required: true },
    { name: 'exam_frequency', type: 'text', required: true },
    { name: 'evaluation_type', type: 'text', required: true },

    //  {
    //   name: "exam_type",
    //   type: "select",
    //   options: ["online", "offline", "hybrid"],
    //   required: true,
    // },
    // {
    //   name: "exam_frequency",
    //   type: "select",
    //   options: ["yearly", "half-yearly", "quarterly", "monthly", "on-demand"],
    //   required: true,
    // },
    // {
    //   name: "evaluation_type",
    //   type: "select",
    //   options: ["objective", "subjective", "mixed"],
    //   required: true,
    // },
    { name: 'upcoming_exam', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive', 'archived'],
      defaultValue: 'active',
      required: true,
    },
    { name: 'rating', type: 'text', required: true },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'combo_price',
      type: 'number',
    },
    {
      name: 'marking_schema',
      type: 'textarea',
    },
  ],
}

export default Courses
