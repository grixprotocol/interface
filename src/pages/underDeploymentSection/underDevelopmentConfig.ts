type UnderDevelopmentConfig = {
  title: string;
  description: string;
  estimatedCompletion: string;
  features: string[];
  currentlyAvailable?: {
    tool: string;
    url: string;
  }[];
};

type UnderDevelopmentPages = {
  [key: string]: UnderDevelopmentConfig;
};

export const underDevelopmentConfigs: UnderDevelopmentPages = {
  perpetuals: {
    title: 'Coming Soon: DeFi Perpetuals Aggregation',
    description: 'A DeFi perpetuals trading aggregator - combining top protocols for best rates and deepest liquidity.',
    estimatedCompletion: 'Expected Q3 2025',
    features: [
      'Multi-protocol perpetuals trading in one interface',
      'Real-time price comparison across major DeFi protocols',
      'Aggregated liquidity from multiple sources',
      'Cross-protocol funding rate analysis',
      'Advanced position management across all integrated protocols',
      'Best execution by comparing fees and rates across platforms',
    ],
    currentlyAvailable: [
      {
        tool: 'Grix MCP',
        url: 'https://grix-1.gitbook.io/grix/getting-started/editor',
      },
      {
        tool: 'Grix SDK',
        url: 'https://github.com/grixprotocol/sdk',
      },
    ],
  },
  // Add more configurations for other pages
  default: {
    title: 'Under Development',
    description: 'This section is currently under construction. We are working hard to bring you amazing new features.',
    estimatedCompletion: 'Coming Soon',
    features: [],
  },
};
