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

type Raffle = {
  referenceId: string;
  totalTickets: number;
  ticketPrice: string;
  currencyToken: string;
  startTime: number;
  endTime: number;
  isWalletCap: boolean;
  walletCap: number;
  isMinTicketsNeededToDraw: boolean;
  minTicketsToDraw: number;
  drawOnLastTicket: boolean;
};

export async function createRaffle(raffle: Raffle) {
  try {
    // Call createRaffle function
    const tx = await contract.createRaffle(
      raffle.referenceId,
      raffle.totalTickets,
      ethers.parseUnits(raffle.ticketPrice, 18),
      raffle.currencyToken,
      raffle.startTime,
      raffle.endTime,
      raffle.isWalletCap,
      raffle.walletCap,
      raffle.isMinTicketsNeededToDraw,
      raffle.minTicketsToDraw,
      raffle.drawOnLastTicket,
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Raffle created successfully:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error creating raffle:", error);
  }
}
