import { GlobalConfig } from 'payload'

export const Reviews: GlobalConfig = {
  slug: 'reviews',
  label: 'Reviews',
  access: {
    read: () => true,
  },
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
}
