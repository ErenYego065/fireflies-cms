import express from "express";
import payload from "payload";
import dotenv from "dotenv";
import { contract } from "./lib/contract/contract";

dotenv.config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// Sample route to update service fee in the smart contract
app.get("/sample-contract", async (_, res) => {
  const trx = await contract.setServiceFee(1000);

  res.send(trx.toString());
});

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

  app.listen(process.env.PORT || 3000);
};

start();
