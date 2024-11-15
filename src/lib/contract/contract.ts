import { ethers } from "ethers";
import dotenv from "dotenv";
import { ContractImpl } from "./impl";

dotenv.config();

const contractAddress = (process.env.CONTRACT_ADDRESS ||
  "0x747229a2456827BC11E33b67e39c1991d664e25c") as `0x${string}`;
const privateKey = process.env.PRIVATE_KEY;

export const contractImpl = new ContractImpl(contractAddress, privateKey);
