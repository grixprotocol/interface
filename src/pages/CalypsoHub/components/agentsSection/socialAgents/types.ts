import { PersonalityTemplate, Platform, TradingStrategyConfig } from './types/configuration';

export type SocialAgentStats = {
  totalAgents: number;
  activeAgents: number;
};

export type SocialAgentSummary = {
  id: string;
  name: string;
  platform: 'discord' | 'telegram';
  status: 'active' | 'inactive';
  lastActive: string;
  personality: PersonalityTemplate;
  tradingStrategy: TradingStrategyConfig;
  platforms: Platform[];
  profilePicture?: string;
};
