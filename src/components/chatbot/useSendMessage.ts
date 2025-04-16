import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { TradeboardResponse } from '@/api/tradeboard/types';
import { apiClient } from '@/services/apiClient';

import { ChatbotResponseType, UserContextType } from './types';

type SendMessageParams = {
  userMessage: string;
  userContext: UserContextType[];
  tradeboardData?: TradeboardResponse;
  underlyingAsset: string;
  pageContext?: {
    pageName: string;
    pageDescription: string;
    data?: Record<string, unknown>;
  };
};

export const useSendMessage = () => {
  const mutationFn = async ({ userMessage, userContext, tradeboardData, underlyingAsset, pageContext }: SendMessageParams) => {
    const response: AxiosResponse<ChatbotResponseType> = await apiClient.post<ChatbotResponseType>('/grixchatbot', {
      userMessage,
      userContext,
      tradeboardData,
      underlyingAsset,
      pageContext,
    });
    return response.data;
  };

  return useMutation({ mutationFn });
};
