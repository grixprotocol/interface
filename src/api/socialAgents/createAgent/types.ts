export enum TaskTarget {
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
}

export enum AgentMessageType {
  // Market related tasks
  marketStatusBTC = 'marketStatusBTC',
  marketStatusETH = 'marketStatusETH',
  marketSentiment = 'marketSentiment',
  actionableRecommendation = 'actionableRecommendation',
}

export type DiscordCredentials = {
  webhookUrl: string;
};

export type TelegramCredentials = {
  chatId: string;
};
export type TargetCredentials = {
  [TaskTarget.DISCORD]?: DiscordCredentials;
  [TaskTarget.TELEGRAM]?: TelegramCredentials;
};

export type CreateSocialAgentPayload = {
  name: string;
  owner: string;
  personality: string;
  prompt: string;
  action_rate: string;
  task_target: TaskTarget[];
  pictureURL?: string;
  target_credentials?: TargetCredentials;
  agentTask_actios_types?: AgentMessageType[];
};

export type CreateSocialAgentResponse = {
  id: string;
  status: 'success' | 'error';
  message?: string;
};
