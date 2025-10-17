import { CollectionConfig } from "payload";


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
            type: 'number',
        },
        {
            name: 'explanation',
            type: 'number',
        },
    ],
}