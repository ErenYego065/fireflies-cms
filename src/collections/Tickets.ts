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
      admin: {
        readOnly: true,
      },
      validate: (value) => {
        if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
          return "Please enter a valid wallet address";
        }
      },
    },
    {
      name: "tx_hash",
      type: "text",
      admin: {
        readOnly: true,
      },
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
      admin: {
        readOnly: true,
      },
      required: true,
      defaultValue: "PENDING",
    },
  ],
};
