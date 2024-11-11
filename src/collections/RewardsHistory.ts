import { BeforeList } from "../views/transactions/beforeList";
import { CollectionConfig } from "payload/types";

export const RewardsHistory: CollectionConfig = {
  slug: "rewardsHistory",
  labels: {
    plural: "Reward History",
    singular: "Reward History",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    components: {
      BeforeList: [BeforeList],
    },
  },
  fields: [
    {
      name: "claimedAt",
      type: "date",
      label: "Claimed At",
    },
    {
      name: "rewardID",
      type: "text",
      label: "Reward ID",
      required: true,
    },
    {
      name: "rewardName",
      type: "text",
      label: "Reward Name",
      required: true,
    },
    {
      name: "category",
      type: "text",
      label: "Category",
      required: true,
    },
    {
      name: "value",
      type: "number",
      label: "Value",
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
      name: "billingUserName",
      type: "text",
      label: "Billing User Name",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      required: true,
    },
    {
      name: "currency",
      type: "radio",
      options: ["USDC", "USDT"],
      label: "Currency",
      required: true,
    },
    {
      name: "item",
      type: "text",
      label: "Purchased Item",
      required: true,
    },
    {
      name: "usdt",
      type: "number",
      label: "USDT",
      required: true,
    },
    {
      name: "fft",
      type: "number",
      label: "FFT",
      required: true,
    },
    {
      name: "comments",
      type: "text",
      label: "Comments",
      required: true,
    },
    {
      name: "status",
      type: "radio",
      options: ["Pending", "Completed"],
      label: "Status",
    },
  ],
};
