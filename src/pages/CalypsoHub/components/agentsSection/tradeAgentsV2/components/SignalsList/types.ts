import { Signal, TradeAgent, TradeAgentSignalRequest } from '@/api/trade-agents/types/TradeAgent';

export type SignalsListProps = {
  signalRequests: TradeAgentSignalRequest[];
  isLoading: boolean;
  agent: TradeAgent;
};

export type SignalCardProps = {
  signal: Signal;
  agent: TradeAgent;
};

export enum WebhookDestination {
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
}
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

export type NoSignalsCardProps = {
  request: {
    id: string;
    created_at: string;
    signals?: Signal[];
  };
  agent: Record<string, unknown>;
};
