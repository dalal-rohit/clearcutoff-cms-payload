import { heroSection } from '@/blocks/HeroSection'
import { pricingSection } from '@/blocks/PricingSection'
import { CollectionConfig } from 'payload'

const Courses: CollectionConfig = {
  slug: 'courses',
  fields: [
    { name: 'exam_id', type: 'text' },
    { name: 'name', type: 'text', maxLength: 355, unique: true },
    { name: 'short_name', type: 'text', maxLength: 355 },
    { name: 'state', type: 'text', maxLength: 355 },
    { name: 'conducting_body', type: 'text', maxLength: 355 },
    { name: 'logo_url', type: 'text', maxLength: 355 },
    { name: 'exam_type', type: 'text', maxLength: 355 },
    { name: 'exam_frequency', type: 'text' },
    { name: 'evaluation_type', type: 'text' },

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
    { name: 'upcoming_exam', type: 'text' },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive', 'archived'],
      defaultValue: 'active',
      required: true,
    },
    { name: 'rating', type: 'text' },
    {
      name: 'price',
      type: 'number',
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
