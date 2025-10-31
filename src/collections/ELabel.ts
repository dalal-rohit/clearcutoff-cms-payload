import { CollectionConfig } from 'payload'

export const ELabel: CollectionConfig = {
  slug: 'e-label',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'label_id', type: 'text' },
    { name: 'exam_instance_id', type: 'text' },
    { name: 'set_label', type: 'text' },
    { name: 'shift_label', type: 'text' },
    { name: 'date_label', type: 'text' },
    { name: 'exam_date', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'gs_created_at', type: 'text' },
    { name: 'gs_updated_at', type: 'text' },
  ],
}
