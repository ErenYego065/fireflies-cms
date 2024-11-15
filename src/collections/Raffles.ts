import { CollectionConfig } from "payload/types";
import { submitRaffleToContract } from "./operations/raffle";

export const Raffles: CollectionConfig = {
  slug: "raffles",
  hooks: {
    afterOperation: [submitRaffleToContract],
  },
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
      name: "reference_id",
      type: "text",
      label: "Contract Reference",
      defaultValue: "0x0C97A4D639dB8B3772A33c1C5C17e7C53DF6c220",
      hidden: true,
    },
    {
      name: "contract_address",
      type: "text",
      label: "Contract Address",
      defaultValue: "0x0C97A4D639dB8B3772A33c1C5C17e7C53DF6c220",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "tx_hash",
      type: "text",
      label: "Transaction Hash",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
      maxDepth: 1,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "slider", // required
      type: "array", // required
      label: "Image Slider",
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "sliderImage", // required
          type: "upload", // required
          relationTo: "media", // required
          required: true,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: any) => {
            return data?.title || `Image ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
    {
      name: "start_time",
      type: "date",
      label: "Start Date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      required: true,
    },
    {
      name: "end_time",
      type: "date",
      label: "End Date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      validate: (value, allValues) => {
        if (value <= allValues.start_time) {
          return "End time must be after start time";
        }
      },
    },
    {
      name: "category",
      type: "radio",
      options: ["Global Explorer", "Dream Vacation Luxury", "Car Rental"],
      label: "Category",
      required: true,
    },
    {
      name: "currency_token",
      type: "radio",
      options: ["FFT", "USDT", "USDC"],
      label: "Currency Token",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      required: true,
      validate: (value) => {
        if (value <= 0) {
          return "Price must be greater than 0";
        }
      },
    },
    {
      name: "total_tickets",
      type: "number",
      label: "Total Tickets",
      required: true,
      validate: (value) => {
        if (value <= 0) {
          return "Total tickets must be greater than 0";
        }
      },
    },
    {
      name: "is_wallet_cap",
      type: "checkbox",
      label: "Is Wallet Cap",
      required: true,
      defaultValue: false,
    },
    {
      name: "wallet_cap",
      type: "number",
      label: "Wallet Cap",
      required: true,
      admin: {
        condition: (data) => data.is_wallet_cap,
      },
      validate: (value) => {
        if (value <= 0) {
          return "Wallet cap must be greater than 0";
        }
      },
    },
    {
      name: "is_min_tickets_needed",
      type: "checkbox",
      label: "Require Minimum Tickets",
      defaultValue: false,
      required: true,
    },
    {
      name: "min_tickets_to_draw",
      type: "number",
      label: "Min Revenue Threshold",
      admin: {
        condition: (data) => data.is_min_tickets_needed,
      },
      validate: (value) => {
        if (value <= 0) {
          return "Minimum must be greater than 0";
        }
      },
      required: true,
    },
    {
      name: "draw_on_last_ticket",
      type: "checkbox",
      label: "Draw on Last Ticket",
      defaultValue: false,
      required: true,
    },
    {
      name: "status",
      type: "radio",
      options: ["DRAFT", "PENDING", "ACTIVE", "DRAWN"],
      required: true,
      defaultValue: "PENDING",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "tickets",
      type: "relationship",
      relationTo: "tickets",
      hasMany: true,
    },
  ],
};
