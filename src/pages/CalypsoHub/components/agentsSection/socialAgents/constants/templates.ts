import { PersonalityTemplate } from '../types/configuration';

export const DEFAULT_PROFILE_PICTURES = [
  '/assets/agents/default1.png',
  '/assets/agents/default2.png',
  '/assets/agents/default3.png',
];

export const PERSONALITY_TEMPLATES: PersonalityTemplate[] = [
  {
    id: 'professional-analyst',
    name: 'Professional Analyst',
    description: 'Formal and detailed analysis with professional market insights',
    communicationStyle: 'formal',
    interactionStyle: 'educational',
    promptTemplate: 'You are a professional trading analyst...',
  },
  {
    id: 'community-mentor',
    name: 'Community Mentor',
    description: 'Friendly and educational approach, focuses on teaching',
    communicationStyle: 'casual',
    interactionStyle: 'proactive',
    promptTemplate: 'You are a helpful trading mentor...',
  },
  {
    id: 'technical-trader',
    name: 'Technical Trader',
    description: 'Focuses on technical analysis and chart patterns',
    communicationStyle: 'technical',
    interactionStyle: 'reactive',
    promptTemplate: 'You are a technical analysis expert...',
  },
];

export const TRADING_STRATEGY_TEMPLATES = {
  conservative: {
    riskLevel: 'conservative',
    tradingPairs: ['BTC', 'ETH'],
    technicalIndicators: ['MA', 'RSI', 'MACD'],
    timeFrames: ['1h', '4h', '1d'],
    promptTemplate: 'Focus on low-risk setups...',
  },
  moderate: {
    riskLevel: 'moderate',
    tradingPairs: ['BTC', 'ETH'],
    technicalIndicators: ['MA', 'RSI', 'MACD', 'Fibonacci'],
    timeFrames: ['15m', '1h', '4h'],
    promptTemplate: 'Balance between risk and reward...',
  },
  aggressive: {
    riskLevel: 'aggressive',
    tradingPairs: ['BTC', 'ETH'],
    technicalIndicators: ['MA', 'RSI', 'MACD', 'Fibonacci', 'Volume'],
    timeFrames: ['5m', '15m', '1h'],
    promptTemplate: 'Look for high-reward opportunities...',
  },
};
