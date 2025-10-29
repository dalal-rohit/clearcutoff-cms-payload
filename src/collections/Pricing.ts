import { CollectionConfig } from "payload";


export const Pricing: CollectionConfig = {
    slug: 'pricing',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
    ],
}