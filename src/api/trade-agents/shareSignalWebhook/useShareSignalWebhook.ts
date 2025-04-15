import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { ShareSignalWebhookParams, ShareSignalWebhookResponse } from './types';

export const useShareSignalWebhook = () => {
  const { mutateAsync, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: async ({ signalId, type, webhookUrl, message, botToken, chatId }: ShareSignalWebhookParams) => {
      const response = await apiClient.post<ShareSignalWebhookResponse>(`/share-agent-signal-webhook`, {
        signalId,
        type,
        webhookUrl,
        message,
        botToken,
        chatId,
      });
      return response.data;
    },
  });

  return { mutateAsync, isError, isSuccess, data, isPending };
};
