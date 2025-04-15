import { TradeAgent } from '@/api/trade-agents/types/TradeAgent';

export type TradeAgentsGetRequest = {
  address?: string;
};

export type TradeAgentsGetResponse = {
  personalAgents: TradeAgent[];
  publicAgents: TradeAgent[];
};
