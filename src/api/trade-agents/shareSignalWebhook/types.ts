export type WebhookDestination = 'discord' | 'telegram';

export type ShareSignalWebhookParams = {
  signalId: string;
  type: WebhookDestination;
  webhookUrl: string;
  message: string;
  botToken: string;
  chatId: string;
};

export type ShareSignalWebhookResponse = {
  success: boolean;
};
