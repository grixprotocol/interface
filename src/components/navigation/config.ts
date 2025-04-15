import { FaCalculator, FaChartLine, FaLightbulb, FaRobot, FaUsers, FaWallet } from 'react-icons/fa';
import { FiDatabase, FiKey } from 'react-icons/fi';

import { NavigationConfig, NavigationItem } from './types';

export const useNavigationConfig = (): NavigationConfig => {
  const mainNav: NavigationItem[] = [
    {
      label: 'Options',
      path: '/trade',
      subItems: [
        {
          label: 'Trade',
          path: '/trade',
          icon: FaChartLine,
        },
        {
          label: 'Portfolio',
          path: '/portfolio',
          icon: FaWallet,
        },
        {
          label: 'Option Chain',
          path: '/optionsMatrix',
          icon: FaChartLine,
        },
        {
          label: 'Calculator',
          path: '/calculator',
          icon: FaCalculator,
        },
      ],
    },
    {
      label: 'Perpetuals',
      path: '/under-development',
      subItems: [
        {
          label: 'Trade',
          path: '/under-development?page=perpetuals',
          icon: FaChartLine,
        },
        {
          label: 'Portfolio',
          path: '/under-development?page=perpetuals',
          icon: FaWallet,
        },
      ],
    },
    {
      label: 'AI Playground',
      path: '/calypso',
      subItems: [
        {
          label: 'Lobby',
          path: '/calypso/lobby',
          icon: FaLightbulb,
        },
        {
          label: 'Trade Agents',
          path: '/calypso/trade-agents',
          icon: FaRobot,
        },
        {
          label: 'Social Agents',
          path: '/calypso/social-agents',
          icon: FaUsers,
        },
      ],
    },
    {
      label: 'Devs',
      path: '/api',
      subItems: [
        {
          label: 'API ',
          path: '/api',
          isExternal: false,
          icon: FiKey,
        },
        {
          label: 'Integrations Map',
          path: 'https://github.com/grixprotocol/derivatives-adapters?tab=readme-ov-file#protocols-integration-table',
          isExternal: true,
          icon: FiDatabase,
        },
        {
          label: 'AI Framework Architecture',
          path: 'https://github.com/grixprotocol/calypso-framework',
          isExternal: true,
          icon: FaRobot,
        },
      ],
    },
    {
      label: 'Staking',
      path: '/staking',
    },
    {
      label: '$GRIX',
      path: '/token',
    },
  ];

  return {
    mainNav,
  };
};
