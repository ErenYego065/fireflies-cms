export type Raffle = {
  referenceId: string;
  totalTickets: number;
  ticketPrice: number;
  currencyToken: string;
  startTime: number;
  endTime: number;
  isWalletCap: boolean;
  walletCap: number;
  isMinTicketsNeededToDraw: boolean;
  minTicketsToDraw: number;
  drawOnLastTicket: boolean;
};

type EventLog = {
  provider: any;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  removed: any;
  address: string;
  data: string;
  topics: string[];
  index: number;
  transactionIndex: number;
  interface: any;
  fragment: any;
  args: any;
};

export type ContractTransactionResponse = {
  _type: "TransactionReceipt";
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gasPrice: string;
  blobGasUsed: string;
  blobGasPrice: string;
  gasUsed: string;
  hash: string;
  index: number;
  logs: EventLog[];
  logsBloom: string;
  root: string;
  status: number;
  to: string;
};
