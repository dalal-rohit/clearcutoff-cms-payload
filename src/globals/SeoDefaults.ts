import type { GlobalConfig } from 'payload'

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Default page title used when a page/post has no title of its own.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Default meta description for search engines and link previews.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Default image used for social sharing (Open Graph / Twitter).',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      localized: true,
      admin: {
        description: 'Comma-separated default keywords.',
      },
    },
  ],
}
