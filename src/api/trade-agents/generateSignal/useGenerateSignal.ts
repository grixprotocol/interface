import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { GenerateSignalParams, GenerateSignalResponse } from './types';

export const useGenerateSignal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ agentId }: GenerateSignalParams) => {
      const response = await apiClient.post<GenerateSignalResponse>(`/trade-agents/generate-signal`, {
        signalRequestId: agentId,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['trade-agents'] });
    },
  });
};
