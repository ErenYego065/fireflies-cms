import { CollectionConfig } from "payload/types";

export const Winners: CollectionConfig = {
  slug: "winners",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user,
    update: async ({ req: { user } }) => {
      if (user.role === "admin") return true;
    },
  },
  fields: [
    {
      name: "raffle",
      type: "relationship",
      relationTo: "raffles",
      hasMany: false,
    },
    {
      name: "wallet_address",
      type: "text",
      label: "Buyer Address",
    },
    {
      name: "tx_hash",
      type: "text",
      label: "Transaction Hash",
    },
    {
      name: "prize_amount",
      type: "number",
      label: "Prize Amount",
      required: true,
    },
    {
      name: "drawn_at",
      type: "date",
      label: "Drawn Date",
      required: true,
    },
    {
      name: "status",
      type: "radio",
      options: ["PENDING", "PAID", "FAILED"],
      required: true,
      defaultValue: "PENDING",
    },
  ],
};
