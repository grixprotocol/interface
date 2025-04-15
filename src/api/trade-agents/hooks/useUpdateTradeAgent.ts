import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { TradeAgent } from '../types/TradeAgent';

type UpdateAgentRequest = {
  agentId: string;
  name: string;
  ownerAddress: string;
};

const updateAgentName = async (request: UpdateAgentRequest): Promise<TradeAgent> => {
  const { agentId, ...body } = request;
  const response = await apiClient.put<TradeAgent>(`/trade-agents/${agentId}`, body);
  return response.data;
};

export const useUpdateTradeAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAgentName,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['trade-agents'] });
    },
  });
};
