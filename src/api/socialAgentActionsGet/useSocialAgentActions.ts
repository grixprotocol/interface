import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { SocialAgentActionsParams, SocialAgentActionsResponse } from './types';
export const useSocialAgentActions = (params?: SocialAgentActionsParams) =>
  useQuery({
    queryKey: ['social-agent-actions', params],
    queryFn: async () => {
      const response = await apiClient.get<SocialAgentActionsResponse>('/socialagentaction', {
        params: {
          limit: params?.limit,
          offset: params?.offset,
          status: params?.status,
          type: params?.type,
        },
      });

      return {
        data: response.data.data,
        totalCount: response.data.totalCount,
      };
    },
    staleTime: 1000 * 60, // 1 minute
  });
