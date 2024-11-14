import { ethers } from "ethers";
import payload from "payload";
import { Raffle } from "payload/generated-types";
import { CollectionConfig } from "payload/types";

export const Raffles: CollectionConfig = {
  slug: "raffles",
  hooks: {
    afterOperation: [
      async ({ operation, result }) => {
        if (operation === "create") {
          const createdRaffle = result as Raffle;

          // Create raffle object for contract
          const raffle = {
            referenceId: createdRaffle.id,
            totalTickets: createdRaffle.total_tickets,
            ticketPrice: ethers
              .parseUnits(createdRaffle.price.toString(), 18)
              .toString(),
            currencyToken: "0x6ce8da28e2f864420840cf74474eff5fd80e65b8",
            startTime: Math.floor(
              new Date(createdRaffle.start_time).getTime() / 1000,
            ),
            endTime: Math.floor(
              new Date(createdRaffle.end_time).getTime() / 1000,
            ),
            isWalletCap: createdRaffle.is_wallet_cap,
            walletCap: createdRaffle.wallet_cap,
            isMinTicketsNeededToDraw: createdRaffle.is_min_tickets_needed,
            minTicketsToDraw: createdRaffle.min_tickets_to_draw,
            drawOnLastTicket: createdRaffle.draw_on_last_ticket,
          };

          // Create raffle contract
          const contractResponse = await fetch(
            "http://localhost:3002/create-raffle-contract",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ raffle }),
            },
          );

          const response = await contractResponse.json();

          // Update tx_hash from the contract response
          await payload.update({
            collection: "raffles",
            id: createdRaffle.id,
            data: {
              tx_hash: response.hash,
            },
          });
        }

        return result;
      },
    ],
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
    },
    {
      name: "contract_address",
      type: "text",
      label: "Contract Address",
    },
    {
      name: "tx_hash",
      type: "text",
      label: "Transaction Hash",
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
      name: "start_time",
      type: "date",
      label: "Start Date",
      required: true,
    },
    {
      name: "end_time",
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
    },
    {
      name: "total_tickets",
      type: "number",
      label: "Total Tickets",
      required: true,
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
      defaultValue: "DRAFT",
    },
    {
      name: "tickets",
      type: "relationship",
      relationTo: "tickets",
      hasMany: true,
    },
  ],
};
