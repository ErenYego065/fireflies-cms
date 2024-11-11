import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const abiFile = fs.readFileSync("src/lib/contract/abi.json", "utf8");
const abi = JSON.parse(abiFile);
const jsonRpcProvider = "https://bsc-testnet.blockpi.network/v1/rpc/public";
const websocketProvider = "wss://bsc-testnet-rpc.publicnode.com";

const provider = new ethers.JsonRpcProvider(jsonRpcProvider);
const wsProvider = new ethers.WebSocketProvider(websocketProvider);

// Setup signer and contract
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
export const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS || "0x0C97A4D639dB8B3772A33c1C5C17e7C53DF6c220",
  abi.abi,
  signer,
);

const wcontract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS || "0x0C97A4D639dB8B3772A33c1C5C17e7C53DF6c220",
  abi.abi,
  wsProvider,
);

// Listen for events
wcontract.on("ServiceFeeUpdated", (e, a) => {
  console.log("service fee updated:", e);
});

/**
 * Sample function to Create a new raffle
 */
export async function createRaffle() {
  const referenceId = "raffle_123";
  const totalTickets = 1000;
  const ticketPrice = ethers.parseUnits("0.1", 18); // Adjust decimals as needed
  const currencyToken = "0x6ce8da28e2f864420840cf74474eff5fd80e65b8"; // Address of the token (or 0x0 if ETH)
  const startTime = Math.floor(Date.now() / 1000) + 3600; // Start time (current time + 1 hour)
  const endTime = startTime + 86400; // End time (start time + 24 hours)
  const isWalletCap = true;
  const walletCap = 5; // Maximum tickets per wallet
  const isMinTicketsNeededToDraw = true;
  const minTicketsToDraw = 500; // Minimum tickets needed for drawing
  const drawOnLastTicket = false;

  try {
    // Call createRaffle function
    const tx = await contract.createRaffle(
      referenceId,
      totalTickets,
      ticketPrice,
      currencyToken,
      startTime,
      endTime,
      isWalletCap,
      walletCap,
      isMinTicketsNeededToDraw,
      minTicketsToDraw,
      drawOnLastTicket,
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Raffle created successfully:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error creating raffle:", error);
  }
}
