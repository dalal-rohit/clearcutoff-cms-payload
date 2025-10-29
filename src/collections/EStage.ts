import { CollectionConfig } from 'payload'

export const EStage: CollectionConfig = {
  slug: 'e-stage',
  fields: [
    { name: 'stage_id', type: 'text' },
    { name: 'exam_id', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'stage_type', type: 'text' },
    { name: 'stage_order', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'duration_mins', type: 'text' },
    { name: 'total_marks', type: 'text' },
    { name: 'total_questions', type: 'text' },
    { name: 'ai_evaluation_supported', type: 'text' },
    { name: 'status', type: 'text' },
  ],
}
