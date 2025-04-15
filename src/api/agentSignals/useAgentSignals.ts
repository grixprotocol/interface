import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { AgentSignalsParams, AgentSignalsResponse } from './types';

export const useAgentSignals = (params?: AgentSignalsParams) =>
  useQuery({
    queryKey: ['agent-signals', params],
    queryFn: async () => {
      const response = await apiClient.get<AgentSignalsResponse>('/agentsignal', {
        params: {
          limit: params?.limit,
          offset: params?.offset,
          status: params?.status,
          type: params?.type,
          signalId: params?.signalId,
        },
      });

      return {
        data: response.data.data,
        totalCount: response.data.totalCount,
      };
    },
    staleTime: 1000 * 60, // 1 minute
  });
