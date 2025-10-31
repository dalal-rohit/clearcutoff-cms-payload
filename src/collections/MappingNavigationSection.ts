import { CollectionConfig } from "payload";

export const MappingNavigationSection: CollectionConfig = {
  slug: 'mapping-navigation-section',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'entity_id', type: 'text' },
    { name: 'section_id', type: 'text' },
    { name: 'gs_created_at', type: 'text' },
    { name: 'gs_updated_at', type: 'text' },
  ],
}
