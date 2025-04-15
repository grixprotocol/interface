import React from 'react';

import { useAnalytics } from '@/services/analytics';

export type Route = {
  to?: string;
  shortLabel: string;
  longLabel: string;
  isExternal?: boolean;
  onClick?: () => void;
  type?: 'dropdown';
  items?: Array<{
    to: string;
    shortLabel: string;
    longLabel: string;
    isExternal?: boolean;
    onClick?: () => void;
  }>;
};

export const useNavbarRoutes = () => {
  const { track } = useAnalytics();

  const API_URL = 'https://github.com/grixprotocol/defi-options-hub/tree/main/api';

  const routes: Route[] = React.useMemo(
    () => [
      {
        to: '/trade',
        shortLabel: 'Options',
        longLabel: 'Options',
        isExternal: false,
        onClick: () => track('page_trade_click'),
      },
      { to: '/Calypso', shortLabel: 'AI Playground', longLabel: 'AI Playground', isExternal: false },
      {
        to: '/token',
        shortLabel: '$GRIX Token',
        longLabel: '$GRIX Token',
        isExternal: false,
        onClick: () => track('page_token_click'),
      },
      {
        type: 'dropdown',
        shortLabel: 'Devs (Github)',
        longLabel: 'Devs (Github)',
        items: [
          {
            to: API_URL,
            shortLabel: 'API',
            longLabel: 'API',
            isExternal: true,
            onClick: () => track('page_api_click'),
          },
          {
            to: 'https://github.com/grixprotocol/derivatives-adapters?tab=readme-ov-file#protocols-integration-table',
            shortLabel: 'Integrations Map',
            longLabel: 'Integrations Map',
            isExternal: true,
            onClick: () => track('page_integrations_map_click'),
          },
          {
            to: 'https://github.com/grixprotocol/calypso-framework',
            shortLabel: 'AI Framework Architecture',
            longLabel: 'AI Framework Architecture',
            isExternal: true,
            onClick: () => track('page_calypso_framework_click'),
          },
        ],
      },
    ],
    [track]
  );
  return routes;
};
