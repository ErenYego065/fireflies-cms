import { CollectionConfig } from "payload/types";

export const Articles: CollectionConfig = {
  slug: "articles",
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
      name: "excerpt",
      type: "textarea",
      label: "Excerpt",
      required: false,
    },
    {
      name: "topic",
      type: "radio",
      options: [
        "getting-started",
        "travel-and-pay",
        "earn-rewards",
        "managing-your-crypto",
        "stay-secure",
        "get-support",
      ],
    },
    {
      name: "tags",
      type: "text",
      label: "Tags (separated by comma)",
      required: false,
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
    },
    {
      name: "helpfulCount",
      type: "number",
      label: "Helpful Count",
      defaultValue: 0,
    },
    {
      name: "published_at",
      type: "date",
      label: "Published At",
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: "updated_at",
      type: "date",
      label: "Updated At",
      required: true,
      defaultValue: () => new Date(),
    },
  ],
  endpoints: [
    {
      path: "/:id/feedback",
      method: "patch",
      handler: async (req, res, next) => {
        const feedback = req.body?.feedback;
        if (feedback === undefined) {
          return res.status(400).send({ message: "No feedback provided" });
        }

        const { id } = req.params;

        const article = await req.payload.findByID({
          collection: "articles",
          id: id,
        });

        if (!article) {
          return res.status(404).send({ message: "Article not found" });
        }

        await req.payload.update({
          collection: "articles",
          id: id,
          data: {
            helpfulCount:
              feedback === 1
                ? article.helpfulCount + 1
                : article.helpfulCount - 1,
          },
        });

        return res.send({ message: "Feedback updated" });
      },
    },
  ],
};
