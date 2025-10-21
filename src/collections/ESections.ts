import { CollectionConfig } from 'payload'

export const ESections: CollectionConfig = {
  slug: 'e-sections',
  fields: [
    { name: 'section_id', type: 'text' },
    { name: 'name', type: 'text', maxLength: 355 },
    { name: 'type', type: 'text' },
    { name: 'area', type: 'textarea' },
    { name: 'description', type: 'text' },
    { name: 'total_questions', type: 'text' },
    { name: 'total_marks', type: 'text' },
    { name: 'question_weightage', type: 'text' },
    { name: 'evaluation_type', type: 'text' },
    { name: 'ai_evaluation_supported', type: 'text' },
  ],
}
