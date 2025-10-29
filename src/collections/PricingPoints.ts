import { CollectionConfig } from "payload";

export const PricingPoints: CollectionConfig = {
    slug: 'pricing-points',
    access: {
        read: () => true,
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true },
        { name: 'seo_title', type: 'text' },
        { name: 'seo_description', type: 'text' },
    ],
};
    