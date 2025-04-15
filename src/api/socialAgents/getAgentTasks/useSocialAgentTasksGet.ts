import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { SocialAgentTask, SocialAgentTaskResponse } from './types';

export const useSocialAgentTasksGet = ({ userAddress }: { userAddress: string }) => {
  const refetchInterval = 30 * 1000;

  const { data, isLoading, isError, error, isFetching } = useQuery<SocialAgentTask[]>({
    queryKey: ['socialAgentTasks', userAddress],
    queryFn: () => fetchSocialAgentTasks({ userAddress }),
    enabled: !!userAddress,
    refetchInterval,
  });

  return { data, isLoading, isError, error, isFetching };
};

export const fetchSocialAgentTasks = async ({ userAddress }: { userAddress: string }): Promise<SocialAgentTask[]> => {
  const response = await apiClient.get<SocialAgentTaskResponse>('/social_agent_tasks', {
    params: {
      user_account: userAddress,
    },
  });

  return response.data.tasks;
};
