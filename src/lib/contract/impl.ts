import { ContractTransactionResponse, ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
import { Raffle } from "../../model/contract";
import { DecodedError, ErrorDecoder } from "ethers-decode-error";

interface ContractInterface {
  createRaffle(raffle: Raffle): Promise<ContractTransactionResponse>;
  calculateServiceFee(referenceId: string, quantity: number): Promise<any>;
  setOperator(address: ethers.Addressable, status: string): Promise<void>;
}

dotenv.config();

const JSON_RPC_PROVIDER =
  process.env.JSON_RPC_PROVIDER ||
  "https://bsc-testnet.blockpi.network/v1/rpc/public";
const WS_PROVIDER =
  process.env.WS_PROVIDER || "wss://bsc-testnet-rpc.publicnode.com";

export class ContractImpl implements ContractInterface {
  abiFile = fs.readFileSync("src/lib/contract/abi.json", "utf8");
  abi = JSON.parse(this.abiFile);

  contractAddress: `0x${string}`;
  jsonRpcProvider: ethers.JsonRpcProvider;
  wsProvider: ethers.WebSocketProvider;

  contractInstance: ethers.Contract;
  wsContractInstance: ethers.Contract;
  signer: ethers.Wallet;

  constructor(contractAddress: `0x${string}`, privateKey: string) {
    this.contractAddress = contractAddress;

    this.jsonRpcProvider = new ethers.JsonRpcProvider(JSON_RPC_PROVIDER);
    this.wsProvider = new ethers.WebSocketProvider(WS_PROVIDER);
    this.signer = new ethers.Wallet(privateKey, this.jsonRpcProvider);

    this.contractInstance = new ethers.Contract(
      contractAddress,
      this.abi,
      this.signer,
    );

    this.contractInstance = new ethers.Contract(
      contractAddress,
      this.abi,
      this.signer,
    );

    this.wsContractInstance = new ethers.Contract(
      contractAddress,
      this.abi,
      this.wsProvider,
    );
  }

  // Events
  // event RaffleCreated(string indexed referenceId, uint256 totalTickets, uint256 ticketPrice);
  // event TicketsPurchased(string indexed referenceId, address indexed buyer, uint256 quantity);
  // event WinnerSelected(string indexed referenceId, address indexed winner);
  // event ServiceFeeUpdated(uint256 newFee);
  // event OperatorUpdated(address operator, bool status);
  // event FeeCollected(uint256 amount);
  // event NativeWithdrawn(uint256 amount);
  // event ERC20Withdrawn(address token, uint256 amount);

  // Function Implementations

  async createRaffle(raffle: Raffle): Promise<ContractTransactionResponse> {
    // Call createRaffle function
    const tx = await this.contractInstance.createRaffle(
      raffle.referenceId,
      raffle.totalTickets,
      ethers.parseUnits(raffle.ticketPrice.toString(), 12),
      raffle.currencyToken,
      raffle.startTime,
      raffle.endTime,
      raffle.isWalletCap,
      raffle.walletCap || 0,
      raffle.isMinTicketsNeededToDraw,
      raffle.minTicketsToDraw || 0,
      raffle.drawOnLastTicket,
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    const jsonReceipt = receipt.toJSON() as ContractTransactionResponse;
    return jsonReceipt;
  }

  async setOperator(address: any, status: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async setServiceFee(fee: number): Promise<ContractTransactionResponse> {
    try {
      const tx = await this.contractInstance.setServiceFee(fee);
      const receipt = await tx.wait();
      const jsonReceipt = receipt.toJSON() as ContractTransactionResponse;
      return jsonReceipt;
    } catch (error) {
      const errorDecoder = ErrorDecoder.create([this.abi]);
      const decodedError: DecodedError = await errorDecoder.decode(error);
      console.error(decodedError);
      throw new Error(decodedError.reason);
    }
  }

  async calculateServiceFee(
    referenceId: string,
    quantity: number,
  ): Promise<any> {
    const tx = await this.contractInstance.calculateServiceFee(
      referenceId,
      quantity,
    );
    return tx;
  }

  async purchaseTickets(
    referenceId: string,
    quantity: number,
    amount: number,
  ): Promise<ContractTransactionResponse> {
    try {
      const tx = await this.contractInstance.purchaseTickets(
        referenceId,
        quantity,
        { value: ethers.parseUnits(amount.toString(), 12) },
      );
      const receipt = await tx.wait();
      const jsonReceipt = receipt.toJSON() as ContractTransactionResponse;

      return jsonReceipt;
    } catch (error) {
      console.error(error);
      const errorDecoder = ErrorDecoder.create([this.abi]);
      const decodedError: DecodedError = await errorDecoder.decode(error);
      console.error(decodedError);
      throw new Error(decodedError.reason);
    }
  }

  async getWbnbAddress(): Promise<string> {
    return this.contractInstance.WBNB();
  }

  async getRaffleConfig(address: string): Promise<any> {
    return this.contractInstance.raffleConfigs(address);
  }

  async getRaffleDetails(referenceId: string): Promise<any> {
    try {
      return await this.contractInstance.getRaffleDetails(referenceId);
    } catch (error) {
      const errorDecoder = ErrorDecoder.create([this.abi]);
      const decodedError: DecodedError = await errorDecoder.decode(error);
      console.error(decodedError);
      throw new Error(decodedError.reason);
    }
  }
}
