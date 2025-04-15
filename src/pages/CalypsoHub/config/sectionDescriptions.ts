import { Section, SectionDescription } from '../types/sections';

export const sectionDescriptions: Record<string, SectionDescription> = {
  tradeAgents: {
    title: 'Trade Agents',
    description: 'Build AI-powered agents to track trends, manage risk, and optimize your trades.',
    icon: 'FaRobot',
    color: 'blue.400',
    path: '/calypso/trade-agents',
    section: Section.TRADE_AGENTS,
    ctaText: 'Customize My Trade Agent',
  },
  marketInsights: {
    title: 'Market Insights',
    description: 'Access real-time market analysis and trading signals from our AI agents.',
    icon: 'FaChartLine',
    color: 'purple.400',
    path: '/calypso/feed',
    section: Section.PAID,
    ctaText: 'View Market Insights',
  },
  socialAgents: {
    title: 'Social Agents',
    description: 'Automate sentiment tracking and receive insights directly in Discord or Telegram.',
    icon: 'FaUsers',
    color: 'green.400',
    path: '/calypso/social-agents',
    section: Section.MY_AGENTS,
    ctaText: 'Create My Social Agent',
  },
};
