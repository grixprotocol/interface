import React, { lazy } from 'react';
import { FaBookOpen, FaChartLine, FaLightbulb, FaRobot, FaUsers } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

import { TradeAgentsV2 } from '../components/agentsSection/tradeAgentsV2/TradeAgentsV2';
import { GuideSection as GuideSectionComponent } from '../components/GuideSection';
import { Section } from '../types/sections';

export type NavigationLink = {
  id: Section;
  icon: IconType;
  label: string;
  path: string;
  component: React.ComponentType;
  comingSoon?: boolean;
  hidden?: boolean;
};

const SocialAgentsSection = lazy(() =>
  import('../components/agentsSection/socialAgents').then((m) => ({ default: m.SocialAgents }))
);
const PlaybooksSection = lazy(() =>
  import('../components/playbooksSection/PlaybooksMarketplace').then((m) => ({ default: m.PlaybooksMarketplace }))
);
const StrategiesSection = lazy(() =>
  import('../components/strategiesSection/StrategiesExplorer').then((m) => ({ default: m.StrategiesExplorer }))
);
const FeatureRequestsSection = lazy(() =>
  import('../components/featureRequestsSection/featureRequestPage').then((m) => ({ default: m.FeatureRequestsSection }))
);

// Define the navigation configuration
export const navigationConfig: NavigationLink[] = [
  {
    id: Section.GUIDE,
    icon: FaLightbulb,
    label: 'Lobby',
    path: '/calypso/lobby',
    component: GuideSectionComponent,
  },
  {
    id: Section.TRADE_AGENTS,
    icon: FaRobot,
    label: 'Trade Agents',
    path: '/calypso/trade-agents',
    component: TradeAgentsV2,
  },
  {
    id: Section.MY_AGENTS,
    icon: FaUsers,
    label: 'Social Agents',
    path: '/calypso/social-agents',
    component: SocialAgentsSection,
  },
  {
    id: Section.PLAYBOOKS,
    icon: FaBookOpen,
    label: 'Playbooks',
    path: '/calypso/playbooks',
    component: PlaybooksSection,
    hidden: true,
  },
  {
    id: Section.STRATEGIES,
    icon: FaChartLine,
    label: 'Strategies',
    path: '/calypso/strategies',
    component: StrategiesSection,
    hidden: true,
  },
  {
    id: Section.FEATURE_REQUESTS,
    icon: FaLightbulb,
    label: 'Feature Requests',
    path: '/calypso/feature-requests',
    component: FeatureRequestsSection,
    hidden: true,
  },
];

// Add a helper function to get visible navigation items
export const getVisibleNavigationConfig = () => navigationConfig.filter((item) => !item.hidden);
