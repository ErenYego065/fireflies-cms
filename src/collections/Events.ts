import { CollectionConfig } from "payload/types";

export const Events: CollectionConfig = {
  slug: "events",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user,
    update: ({ req: { user } }) => user,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Event Title",
      required: true,
    },
    {
      name: "overview",
      type: "textarea",
      label: "Event Overview",
      maxLength: 100,
      required: true,
    },
    {
      name: "date",
      type: "date",
      label: "Event Date",
      defaultValue: () => new Date(),
      required: true
    },
    {
      name: "type",
      type: "radio",
      options: ["Online", "Offline"],
      defaultValue: "Offline",
      required: true,
    },
    {
      name: "country",
      type: "text",
      label: "Country",
    },
    {
      name: "city1",
      type: "text",
      label: "city",
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      label: "Media",
      maxDepth: 1,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Event Description",
      required: true,
    },
    {
      name: "status",
      type: "radio",
      options: ["Pending", "Upcomping", "Edit Under Review", "Ongoing", "Completed", "Rejected"],
      defaultValue: "Pending",
      required: true,
    },
    {
      name: "organization",
      type: "relationship",
      relationTo: "organizations",
      hasMany: false,
      required: true,
      defaultValue: ({ organization }) => {
        return organization.id;
      },
    },
    {
      name: "participants",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
    }
  ],
};
