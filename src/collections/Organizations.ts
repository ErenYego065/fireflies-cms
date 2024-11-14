import { CollectionConfig } from "payload/types";

export const Organizations: CollectionConfig = {
  slug: "organizations",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user,
    update: ({ req: { user } }) => user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Organization Name",
      required: true
    },
    {
      name: "email",
      type: "email",
      label: "Organization Email",
      required: true
    },
    {
      name: "website",
      type: "text",
      label: "Organization Website",
      required: true
    },
    {
      name: "overview",
      type: "textarea",
      label: "Organization Overview",
      maxLength: 100,
      required: true,
    },
    {
      name: "creator",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],
};
