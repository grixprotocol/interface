import { useQuery } from '@tanstack/react-query';

import { AgentStatus, RequestProgress } from '@/api/trade-agents/types/TradeAgent';
import { apiClient } from '@/services/apiClient';
import { msValues } from '@/utils/dateUtil';

import { TradeAgentsGetRequest, TradeAgentsGetResponse } from './types';

export const useTradeAgents = ({ address }: TradeAgentsGetRequest) =>
  useQuery<TradeAgentsGetResponse>({
    queryKey: ['trade-agents', address],
    queryFn: () => fetchTradeAgents(address),
    refetchInterval: (query) => {
      const agents = query.state.data;
      if (!agents || agents.personalAgents.length === 0) {
        return msValues.second * 10;
      }
      const hasRunningRequests = agents.personalAgents.some(
        (agent) =>
          agent.signal_requests.some((request) => request.progress !== RequestProgress.completed) &&
          agent.status === AgentStatus.active
      );
      return hasRunningRequests ? msValues.second * 2 : msValues.second * 10;
    },
  });

export const fetchTradeAgents = async (address?: string) => {
  const response = await apiClient.get<TradeAgentsGetResponse>(`/trade-agents`, {
    params: { address },
  });
  return response.data;
};
