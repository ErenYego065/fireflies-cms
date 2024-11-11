import { BeforeList } from "../views/transactions/beforeList";
import { CollectionConfig } from "payload/types";

export const Transactions: CollectionConfig = {
  slug: "transactions",
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
      name: "transaction",
      type: "text",
      label: "Transaction",
      required: true,
    },
    {
      name: "billingUserAddress",
      type: "text",
      label: "Billing User Address",
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
