import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { SocialAgentTaskActionResponse } from './types';

export const useAgentTaskActionsGet = ({ socialAgentTaskId }: { socialAgentTaskId: string }) => {
  const refetchInterval = 30 * 1000;

  const { data, isLoading, isError, error, isFetching } = useQuery<SocialAgentTaskActionResponse>({
    queryKey: ['socialAgentTaskActions', socialAgentTaskId],
    queryFn: () => fetchSocialAgentTaskActions({ socialAgentTaskId }),
    enabled: !!socialAgentTaskId,
    refetchInterval,
  });

  return { data, isLoading, isError, error, isFetching };
};

export const fetchSocialAgentTaskActions = async ({ socialAgentTaskId }: { socialAgentTaskId: string }) => {
  const response = await apiClient.get<SocialAgentTaskActionResponse>('/social_agent_task_actions', {
    params: {
      agent_task_id: socialAgentTaskId,
    },
  });

  return response.data;
};
