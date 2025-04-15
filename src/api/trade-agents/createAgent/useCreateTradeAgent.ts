import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { CreateAgentRequest, CreateAgentResponse } from './types';

export const useCreateTradeAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateAgentRequest) => {
      const response = await apiClient.post<CreateAgentResponse>(`/trade-agents`, request);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['trade-agents'] });
    },
  });
};
