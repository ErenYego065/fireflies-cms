import { CollectionConfig } from "payload/types";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  auth: false,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "question",
      type: "text",
      label: "Question",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      label: "Answer",
      required: true,
    },
    {
      name: "order",
      type: "number",
      label: "Order",
      required: true,
      defaultValue: 0,
    },
  ],
};
