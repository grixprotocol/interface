import { useTradeAgents } from '@/api/trade-agents/getAgents/useTradeAgents';
import { TradeAgent } from '@/api/trade-agents/types/TradeAgent';

export const useAgentsV2 = (address?: string) => {
  const { data: rawData, isLoading, error, refetch } = useTradeAgents({ address });

  const agents: { personalAgents: TradeAgent[]; publicAgents: TradeAgent[] } | undefined = rawData;

  return {
    agents,
    isLoading,
    error,
    refetch,
  };
};
