import { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'question_id',
      type: 'text',
    },
    {
      name: 'exam_instance_id',
      type: 'text',
    },
    {
      name: 'stage_id',
      type: 'text',
    },
    {
      name: 'label_id',
      type: 'text',
    },
    {
      name: 'section_id',
      type: 'text',
    },
    {
      name: 'question_number',
      type: 'text',
    },
    {
      name: 'language_code',
      type: 'text',
    },
    {
      name: 'question_text',
      type: 'text',
    },
    {
      name: 'question_image_url',
      type: 'text',
    },
    {
      name: 'option_1_text',
      type: 'text',
    },
    {
      name: 'option_1_image_url',
      type: 'text',
    },
    {
      name: 'option_2_text',
      type: 'text',
    },
    {
      name: 'option_2_image_url',
      type: 'text',
    },
    {
      name: 'option_3_text',
      type: 'text',
    },
    {
      name: 'option_3_image_url',
      type: 'text',
    },
    {
      name: 'option_4_text',
      type: 'text',
    },
    {
      name: 'option_4_image_url',
      type: 'text',
    },
    {
      name: 'correct_option',
      type: 'text',
    },
    {
      name: 'official_answer_key',
      type: 'text',
    },
    {
      name: 'explanation',
      type: 'textarea',
    },
    {
      name: 'chapter_id',
      type: 'text',
    },
    {
      name: 'topic_id',
      type: 'text',
    },
    {
      name: 'subtopic_id',
      type: 'text',
    },
    { name: 'ai_time_to_solve', type: 'text' },
    { name: 'ai_difficulty_level', type: 'text' },
    { name: 'ai_question_type', type: 'text' },
    { name: 'ai_chapter_name', type: 'text' },
    { name: 'ai_topic_name', type: 'text' },
    { name: 'ai_subtopic_name', type: 'text' },
    { name: 'ai_cognitive_skill', type: 'text' },
    { name: 'ai_is_pedagogy', type: 'text' },
    { name: 'ai_is_not', type: 'text' },
    { name: 'ai_question_tags', type: 'text' },
    { name: 'gs_created_at', type: 'text' },
    { name: 'gs_updated_at', type: 'text' },
  ],
}
