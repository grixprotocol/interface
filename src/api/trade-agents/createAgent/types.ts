import { TradeAgentConfig } from '@/api/trade-agents/types/TradeAgent';

export type CreateAgentRequest = {
  config: TradeAgentConfig;
  ownerAddress: string;
};

export type CreateAgentResponse = {
  agentId: string;
};
