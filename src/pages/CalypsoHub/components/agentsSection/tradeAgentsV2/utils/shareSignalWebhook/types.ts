export type NotificationSettings = {
  type: WebhookDestination;
  webhookUrl?: string;
  botToken?: string;
  chatId?: string;
};

export type NotificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
  onSubmit: () => void;
};

export enum WebhookDestination {
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
}
