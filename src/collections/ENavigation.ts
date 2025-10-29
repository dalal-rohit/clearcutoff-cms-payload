import { CollectionConfig } from 'payload'

export const ENavigation: CollectionConfig = {
  slug: 'e-navigation',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'ent_id', type: 'text', },
    { name: 'exam_id', type: 'text', },
    { name: 'parent_id', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'group', type: 'text' },
    { name: 'status', type: 'text' },
    { name: 'flag_course', type: 'text' },
    { name: 'flag_tests', type: 'text' },
  ],
}
