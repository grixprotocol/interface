import { PERSONALITY_TEMPLATES, TRADING_STRATEGY_TEMPLATES } from '../constants/templates';
import { SocialAgentSummary } from '../types';
import { Platform, TradingStrategyConfig } from '../types/configuration';

// Demo data
export const mockAgents = [
  {
    id: '1',
    name: 'Market News Bot',
    platforms: ['discord', 'telegram'] as Platform[],
    status: 'active' as const,
    lastActive: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Trading Community',
    platforms: ['discord', 'telegram'] as Platform[],
    status: 'active' as const,
    lastActive: '2024-03-15T11:45:00Z',
  },
  {
    id: '3',
    name: 'Signal Provider',
    platforms: ['discord', 'telegram'] as Platform[],
    status: 'inactive' as const,
    lastActive: '2024-03-15T09:15:00Z',
  },
];

export const mockAgentsList: SocialAgentSummary[] = [
  {
    id: '1',
    name: 'Market News Bot',
    platform: 'discord',
    status: 'active',
    lastActive: '2024-03-15T10:30:00Z',
    personality: PERSONALITY_TEMPLATES[0], // Professional Analyst
    tradingStrategy: TRADING_STRATEGY_TEMPLATES.moderate as TradingStrategyConfig,
    platforms: ['discord', 'telegram'],
    profilePicture: '/assets/agents/default1.png',
  },
  {
    id: '2',
    name: 'Trading Community',
    platform: 'discord',
    status: 'active',
    lastActive: '2024-03-15T11:45:00Z',
    personality: PERSONALITY_TEMPLATES[1], // Community Mentor
    tradingStrategy: TRADING_STRATEGY_TEMPLATES.conservative as TradingStrategyConfig,
    platforms: ['discord'],
    profilePicture: '/assets/agents/default2.png',
  },
  {
    id: '3',
    name: 'Signal Provider',
    platform: 'telegram',
    status: 'inactive',
    lastActive: '2024-03-15T09:15:00Z',
    personality: PERSONALITY_TEMPLATES[2], // Technical Trader
    tradingStrategy: TRADING_STRATEGY_TEMPLATES.aggressive as TradingStrategyConfig,
    platforms: ['telegram'],
    profilePicture: '/assets/agents/default3.png',
  },
];
