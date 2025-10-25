import { CollectionConfig } from "payload";

export const EInstance: CollectionConfig = {
  slug: "e-instance",
  admin: {
    useAsTitle: "exam_instance_id",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "exam_instance_id",
      type: "text",
      required: true,
    },
    {
      name: "exam_id",
      type: "text",
      required: true,
    },
    {
      name: "exam_year",
      type: "text",
    },
    {
      name: "exam_cycle",
      type: "text",
    },
    {
      name: "mode",
      type: "text",
    },
    {
      name: "exam_pattern",
      type: "text",
    },
    {
      name: "duration_minutes",
      type: "text",
    },
    {
      name: "total_marks",
      type: "text",
    },
    {
      name: "total_questions",
      type: "text",
    },
    {
      name: "pass_criteria",
      type: "text",
    },
    {
      name: "pass_marks",
      type: "text",
    },
    {
      name: "negative_marking",
      type: "text",
    },
    {
      name: "marking_scheme",
      type: "text",
    },
  ],
};
