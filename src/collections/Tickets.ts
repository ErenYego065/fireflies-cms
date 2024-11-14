import { CollectionConfig } from "payload/types";

export const Tickets: CollectionConfig = {
  slug: "tickets",
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
      name: "ticket_number",
      type: "number",
      label: "Ticket Number",
      required: true,
    },
    {
      name: "purchased_at",
      type: "date",
      label: "Purchase Date",
      required: true,
    },
    {
      name: "status",
      type: "radio",
      options: ["PENDING", "CONFIRMED", "FAILED"],
      required: true,
      defaultValue: "PENDING",
    },
  ],
};
