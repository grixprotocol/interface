import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';

import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';

export type Platform = 'discord' | 'telegram';
export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
export type RiskLevel = 'conservative' | 'moderate' | 'aggressive';
export type CommunicationStyle = 'formal' | 'casual' | 'technical';
export type InteractionStyle = 'proactive' | 'reactive' | 'educational';

export type PlatformConfig = {
  platform: Platform;
  apiKey: string;
  channels: string[]; // Channel names or IDs
};

export type PersonalityTemplate = {
  id: string;
  name: string;
  description: string;
  communicationStyle: CommunicationStyle;
  interactionStyle: InteractionStyle;
  promptTemplate: string;
};

export type TradingStrategyConfig = {
  riskLevel: RiskLevel;
  tradingPairs: ('BTC' | 'ETH')[];
  technicalIndicators: string[];
  timeFrames: TimeFrame[];
  promptTemplate: string;
  updateFrequency: string;
};

export type SocialAgentConfig = {
  id: string;
  name: string;
  profilePicture?: string;
  defaultProfilePicture?: string;
  platforms: PlatformConfig[];
  personality: {
    template: PersonalityTemplate;
    customPrompt?: string;
  };
  tradingStrategy: TradingStrategyConfig;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AgentsListProps = {
  agents: SocialAgentTask[] | undefined;
  onSelectAgent: (agent: SocialAgentTask) => void;
};

export const platformIcons = {
  twitter: FaTwitter,
  discord: FaDiscord,
  telegram: FaTelegram,
};

export const platformColors = {
  twitter: '#1DA1F2',
  discord: '#5865F2',
  telegram: '#0088cc',
};
