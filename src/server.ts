import express from "express";
import payload from "payload";
import dotenv from "dotenv";
import { contractImpl } from "./lib/contract/contract";

dotenv.config();

contractImpl.wsContractInstance.on(
  "RaffleCreated",
  (referenceId: string, totalTickets: number, ticketPrice: number) => {
    console.log(`Raffle created with id: ${referenceId}`);
  },
);

contractImpl.wsContractInstance.on(
  "TicketsPurchased",
  async (referenceId: string, buyer: string, quantity: number) => {
    const newTicket = await payload.create({
      collection: "tickets",
      data: {
        raffle: referenceId,
        wallet_address: buyer,
        ticket_number: quantity,
        purchased_at: new Date().toISOString(),
        status: "CONFIRMED",
      },
    });

    console.log(`Ticket purchased with id: ${newTicket.id}`);
  },
);

const app = express();

app.use(express.json());

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// Redirect root to Admin panel
app.get("/test", async (_, res) => {
  // const out = await contractImpl.getRaffleDetails("6736a6372a94cb9794e1a053");
  const out = await contractImpl.calculateServiceFee(
    "6736bd2807562825500ffd54",
    1,
  );
  // const out = await contractImpl.setServiceFee(100);
  // const out = await contractImpl.getRaffleConfig("6736bd2807562825500ffd54");

  console.log(out);

  res.send(out.toString());
});

// Sample route to update service fee in the smart contract
app.post("/create-raffle-contract", async (req, res) => {
  const { raffle } = req.body;

  try {
    const trx = await contractImpl.createRaffle(raffle);
    res.send(trx);
  } catch (e) {
    console.log(e);
    res.send({
      error: e.message,
    });
  }
});

// Sample route to update service fee in the smart contract
app.post("/create-ticket-contract", async (req, res) => {
  const { referenceId, quantity, amount } = req.body;

  try {
    const trx = await contractImpl.purchaseTickets(
      referenceId,
      quantity,
      amount,
    );
    res.send(trx);
  } catch (e) {
    console.log(e);
    res.send({
      error: e.message,
    });
  }
});

// Sample route to update service fee in the smart contract
const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || "",
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(process.env.PORT || 3002);
};

start();
