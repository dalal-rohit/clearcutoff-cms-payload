// src/globals/GlobalSections.ts
import { GlobalConfig } from 'payload'

export const GlobalSections: GlobalConfig = {
  slug: 'global-sections',
  label: 'Global Sections',
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        { name: 'cta1_Text', type: 'text', localized: true },
        { name: 'cta2_Text', type: 'text', localized: true },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'course_hero',
      type: 'group',
      label: 'Course Hero Section',
      fields: [
        { name: 'course_hero_eyebrow', type: 'text', localized: true },
        { name: 'course_hero_heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'course_hero_subheading', type: 'textarea', localized: true },
        { name: 'course_hero_cta1_Text', type: 'text', localized: true },
        { name: 'course_hero_cta2_Text', type: 'text', localized: true },
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
            { name: 'heading', type: 'text', localized: true },
            { name: 'subheading', type: 'textarea', localized: true },
            { name: 'logo', type: 'upload', relationTo: 'media', localized: true },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'Features Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media', localized: true },
          ],
        },
      ],
    },
    {
      name: 'how_it_works',
      type: 'group',
      label: 'How It Works Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'how_it_works',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'subheading', type: 'textarea', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'btn_text', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'comparison_table',
      type: 'group',
      label: 'Comparison Table',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'comparison',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        {
          name: 'coaching_center',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        {
          name: 'clear_cutoff',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'Reviews Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'reviews',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', localized: true },
            { name: 'profile', type: 'upload', relationTo: 'media' },
            { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female'] },
            { name: 'field', type: 'text', localized: true },
            { name: 'review', type: 'textarea', localized: true },
            { name: 'rating', type: 'number', min: 1, max: 5 },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      label: 'FAQs Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'categories',
          type: 'array',
          fields: [{ name: 'category', type: 'text', localized: true }],
        },
        {
          name: 'faqs',
          type: 'array',
          fields: [
            { name: 'category', type: 'text', localized: true },
            { name: 'question', type: 'text', localized: true },
            { name: 'answer', type: 'textarea', localized: true },
          ],
        },
      ],
    },
    {
      name: 'faqs_yesterday',
      type: 'group',
      label: 'FAQs yesterday Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'highlight',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'subheading', type: 'textarea', localized: true },
        {
          name: 'categories',
          type: 'array',
          fields: [{ name: 'category', type: 'text', localized: true }],
        },
        {
          name: 'faqs',
          type: 'array',
          fields: [
            { name: 'category', type: 'text', localized: true },
            { name: 'question', type: 'text', localized: true },
            { name: 'answer', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  
  ],
}
