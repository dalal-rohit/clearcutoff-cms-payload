// src/collections/Pages.ts
import { CollectionConfig } from 'payload/'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },

    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'hero',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'course_hero',
      type: 'group',
      label: 'Course Hero Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'course_hero',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'logoCarousel',
      type: 'group',
      label: 'logoCarousel Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'logoCarousel',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'features Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'features',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'how_it_works',
      type: 'group',
      label: 'how_it_works Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'how_it_works',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'comparison_table',
      type: 'group',
      label: 'comparison_table Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'comparison_table',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'reviews Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'reviews',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      label: 'faqs Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'faqs',
          admin: {
            readOnly: true,
          },
        },
        { name: 'color', type: 'text' },
      ],
    },
  ],
}
