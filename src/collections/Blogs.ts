import { warn } from "console";
import { CollectionConfig } from "payload/types";

export const Blogs: CollectionConfig = {
  slug: "blogs",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user,
    update: async ({ req: { user } }) => {
      if (user.role === "admin") return true;
    },
  },
  admin: {
    defaultColumns: ["id", "title", "category", "excerpt", "status", "user"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Excerpt",
      required: true,
    },
    {
      name: "category",
      type: "text",
      label: "Category",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      defaultValue: ({ user }) => {
        return user.id;
      },
    },
    {
      name: "cover_image",
      type: "upload",
      relationTo: "media",
      label: "Cover Image",
      maxDepth: 1,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "published_at",
      type: "date",
      label: "Published At",
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: "status",
      type: "radio",
      options: ["pending", "published", "rejected"],
      required: true,
      defaultValue: "pending",
    },
    {
      name: "tags",
      type: "text",
      label: "Tags",
    },
  ],
};
