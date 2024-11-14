import express from "express";
import payload from "payload";
import dotenv from "dotenv";
import { contract, createRaffle } from "./lib/contract/contract";

dotenv.config();
const app = express();

app.use(express.json());

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// Sample route to update service fee in the smart contract
app.post("/create-raffle-contract", async (req, res) => {
  const { raffle } = req.body;

  const trx = await createRaffle(raffle);

  res.send(trx.toString());
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
