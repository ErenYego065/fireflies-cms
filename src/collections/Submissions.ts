import { CollectionConfig } from "payload/types";

export const Submissions: CollectionConfig = {
  slug: "submissions",
  auth: false,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      name: "topic",
      type: "radio",
      options: [
        "account-issues",
        "wallet-connection",
        "transaction-problems",
        "booking-issues",
        "rewards-and-staking",
        "nft-and-exclusive-offers",
        "security-concerns",
        "technical-glitches",
        "platform-navigation",
        "other",
      ],
      label: "Topic",
      required: true,
    },
    {
      name: "priority",
      type: "radio",
      options: ["low", "medium", "high", "critical"],
      label: "Priority",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "created_at",
      type: "date",
      label: "Created At",
      required: true,
      defaultValue: () => new Date(),
    },
  ],
};
