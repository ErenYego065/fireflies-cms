import { CollectionConfig } from "payload/types";

export const Glossaries: CollectionConfig = {
  slug: "glossaries",
  auth: false,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
  ],
};
