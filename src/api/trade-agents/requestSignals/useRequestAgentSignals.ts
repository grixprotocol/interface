import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { RequestSignalsParams, RequestSignalsResponse } from './types';

export const useRequestAgentSignals = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ agentId, config }: RequestSignalsParams) => {
      const response = await apiClient.post<RequestSignalsResponse>(`/trade-agents/${agentId}/signals/request`, {
        config,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['trade-agents'] });
    },
  });
};
