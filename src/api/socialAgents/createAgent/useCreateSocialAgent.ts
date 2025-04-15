import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { CreateSocialAgentPayload, CreateSocialAgentResponse } from './types';

export const useCreateSocialAgent = () =>
  useMutation<CreateSocialAgentResponse, Error, CreateSocialAgentPayload>({
    mutationFn: async (payload: CreateSocialAgentPayload) => {
      const response = await apiClient.post<CreateSocialAgentResponse>('/create_social_agent', payload);
      return response.data;
    },
    onError: (error) => {
      throw error;
    },
  });
