import { CollectionConfig } from "payload/types";

export const Raffles: CollectionConfig = {
  slug: "raffles",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user,
    update: async ({ req: { user } }) => {
      if (user.role === "admin") return true;
    },
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
      type: "text",
      label: "Description",
      required: true,
    },
    {
      name: "start_date",
      type: "date",
      label: "Start Date",
      required: true,
    },
    {
      name: "end_date",
      type: "date",
      label: "End Date",
      required: true,
    },
    {
      name: "category",
      type: "radio",
      options: ["Global Explorer", "Dream Vacation Luxury", "Car Rental"],
      label: "Category",
      required: true,
    },
    {
      name: "currency",
      type: "radio",
      options: ["FFT", "USDT", "USDC"],
      label: "Currency",
      required: true,
    },
    {
      name: "cost",
      type: "number",
      label: "cost",
      required: true,
    },
    {
      name: "total",
      type: "number",
      label: "Total Tickets",
      required: true,
    },
    {
      name: "max_per_wallet",
      type: "number",
      label: "Max Per Wallet / User",
      required: true,
    },
    {
      name: "min_revenue_threshold",
      type: "number",
      label: "Min Revenue Threshold",
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
