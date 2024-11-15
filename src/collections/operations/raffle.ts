import { ContractTransactionResponse } from "@/src/model/contract";
import { Raffle } from "payload/generated-types";
import { ethers } from "ethers";
import payload from "payload";
import { AfterOperationArg } from "payload/dist/collections/operations/utils";
import dotenv from "dotenv";

dotenv.config();

/**
 * Calls the create raffle contract endpoint to create a raffle contracts
 *   Afterwards, update the transacion hash and the raffle status to ACTIVE
 *
 **/
export const submitRaffleToContract = (args: AfterOperationArg<Raffle>) => {
  const { operation, result } = args;

  if (operation === "create") {
    const createdRaffle = result as Raffle;

    // Create raffle object for contract
    const raffle = {
      referenceId: createdRaffle.id,
      totalTickets: createdRaffle.total_tickets,
      ticketPrice: createdRaffle.price,
      currencyToken: "0x38d644e3e11E8A907c4797D9496e30F186BDA1c8",
      startTime: Math.floor(
        new Date(createdRaffle.start_time).getTime() / 1000,
      ),
      endTime: Math.floor(new Date(createdRaffle.end_time).getTime() / 1000),
      isWalletCap: createdRaffle.is_wallet_cap,
      walletCap: createdRaffle.wallet_cap,
      isMinTicketsNeededToDraw: createdRaffle.is_min_tickets_needed,
      minTicketsToDraw: createdRaffle.min_tickets_to_draw,
      drawOnLastTicket: createdRaffle.draw_on_last_ticket,
    };

    // Create raffle contract
    fetch(`${process.env.HOST}/create-raffle-contract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raffle }),
    })
      .then(async (res) => (await res.json()) as ContractTransactionResponse)
      .then((res) => {
        // Update tx_hash from the contract response
        payload
          .update({
            collection: "raffles",
            id: createdRaffle.id,
            data: {
              tx_hash: res.hash,
              status: "ACTIVE",
            },
          })
          .then(() => {
            console.log("Raffle status updpated successfully");
          });
      })
      .catch((err) => console.error(err));
  }

  return result;
};
