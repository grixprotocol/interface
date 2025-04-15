import { FaBolt, FaChartLine } from 'react-icons/fa';

import { Playbook } from '../types';

export const playbooks: Playbook[] = [
  {
    id: 'yield-optimizer',
    name: 'Yield Optimizer',
    description: 'Maximizes yield through dynamic covered call strategies while maintaining downside protection',
    performanceScore: 92,
    complexity: 'Intermediate',
    icon: FaChartLine,
    behaviors: [
      'Adjusts strike prices based on market volatility',
      'Rolls positions before expiration when profitable',
      'Maintains minimum liquidity threshold',
      'Increases hedge ratio in high volatility periods',
    ],
    strategies: ['Covered Call', 'Protective Put', 'Roll Forward'],
  },
  {
    id: 'volatility-harvester',
    name: 'Volatility Harvester',
    description: 'Capitalizes on market volatility while maintaining strict risk parameters',
    performanceScore: 88,
    complexity: 'Advanced',
    icon: FaBolt,
    behaviors: [
      'Scales position size with volatility',
      'Implements dynamic delta hedging',
      'Adjusts strategy based on term structure',
      'Uses volatility mean reversion signals',
    ],
    strategies: ['Straddle', 'Iron Condor', 'Volatility Spread'],
  },
  // Add more playbooks as needed
];
