import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { SocialAgentInstantActionResponse } from './types';

export const useSocialAgentInstantActionGet = ({
  actionType,
  personalPrompt,
  asset,
}: {
  actionType: string;
  personalPrompt: string;
  asset: 'ETH' | 'BTC';
}) => {
  const refetchInterval = 30 * 1000;

  const { data, isLoading, isError, error, isFetching } = useQuery<SocialAgentInstantActionResponse>({
    queryKey: ['socialAgentInstantAction', actionType, personalPrompt, asset],
    queryFn: () => fetchSocialAgentInstantAction({ actionType, personalPrompt, asset }),
    enabled: !!actionType && !!personalPrompt && !!asset,
    refetchInterval,
  });

  return { data, isLoading, isError, error, isFetching };
};

export const fetchSocialAgentInstantAction = async ({
  actionType,
  personalPrompt,
  asset,
}: {
  actionType: string;
  personalPrompt: string;
  asset: 'ETH' | 'BTC';
}): Promise<SocialAgentInstantActionResponse> => {
  const response = await apiClient.get<SocialAgentInstantActionResponse>('/social_agent_instant_action', {
    params: {
      action_type: actionType,
      personal_prompt: personalPrompt,
      asset,
    },
  });

  return response.data;
};
