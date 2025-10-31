import { CollectionConfig } from 'payload'

export const MappingInstanceStage: CollectionConfig = {
  slug: 'mapping-instance-and-stage',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'stage_id', type: 'text' },
    { name: 'instance_id', type: 'text' },
    { name: 'gs_created_at', type: 'text' },
    { name: 'gs_updated_at', type: 'text' },
  ],
}
