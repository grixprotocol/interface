import { SupportedAsset } from '../types';

export enum UserOrderType {
  LiveOrders = 'LiveOrders',
  Positions = 'Positions',
  InactiveOrders = 'InactiveOrders',
  Refund = 'Refund',
  History = 'History',
  OrdersHistory = 'OrdersHistory',
}

type OptionOnChainData = {
  status: string;
  optionTokenId: string;
  nftSizeOut: string;
};
export type ProcedureSteps = {
  id: string;
  name: string;
  stepNumber: string;
  description: string;
  transactionHash?: string;
  created_at: string;
  updated_at: string;
};

export type UserRequest = {
  id: string;
  nftBalance?: bigint;
  isClosePositionDisabled?: boolean;
  isExpired?: boolean;
  request_data: {
    baseAsset: SupportedAsset;
    strikePrice: string;
    expiration: string;
    isActive: boolean;
    isCall: boolean;
    tradeType: string;
    contractsAmount: number;
    signer: string;
    slippage: string;
    userSignature: string;
    selectedProtocol: string;
    isExercise: boolean;
  };
  network: string;
  isActive: boolean;
  signature_expired_datetime: string;
  tradeType: string;
  handled_in_progress: boolean;
  created_at: string;
  updated_at: string;
  transactionHash: string;
  failureReason: string;
  procedure: {
    steps: { [key: string]: ProcedureSteps }; // Update steps from array to an object keyed by stepNumber
  };
  optionOnChainData: OptionOnChainData; // Updated line
  status: string;
  refundCloseBuy?: string;
  refundCloseSell?: string;
  optionId?: number;
  refundSettleBuy?: string;
  pnl?: { pnl: string; pnlPercentage: string };
  exercisePrice?: string;
  optionData?: string;
  optionMetadata: {
    optionData?: string;
    poolAddress?: string;
    poolName?: string;
  };
};

export type PaginatedResponse<T> = {
  data: T[];
  totalCount: number;
};

export type UserOrdersParams = {
  type: UserOrderType;
  userAddress?: string;
  limit?: number;
  offset?: number;
  fetchAll?: boolean;
};

export type UserOrdersCountParams = {
  type: UserOrderType;
  userAddress?: string;
};
