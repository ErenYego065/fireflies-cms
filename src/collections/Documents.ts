import { CollectionConfig } from "payload/types";

export const Document: CollectionConfig = {
  slug: "documents",
  access: {
    read: () => true,
  },
  upload: {
    staticURL: "/documents",
    staticDir: "documents",
    mimeTypes: ["application/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
