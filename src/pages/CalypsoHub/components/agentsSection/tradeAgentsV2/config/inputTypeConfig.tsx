import { FaChartLine, FaGlobe } from 'react-icons/fa';

import { AgentInputType } from '@/api/trade-agents/types/TradeAgent';

export const inputTypeConfig: Record<AgentInputType, { icon: React.ReactElement; label: string }> = {
  [AgentInputType.marketData]: {
    icon: <FaChartLine style={{ color: '#4CAF50' }} />,
    label: 'Option Prices',
  },
  [AgentInputType.assetPrices]: {
    icon: <FaChartLine style={{ color: '#9C27B0' }} />,
    label: 'Asset Prices',
  },
  [AgentInputType.perplexity]: {
    icon: <FaGlobe style={{ color: '#2196F3' }} />,
    label: 'Sentiment Analysis',
  },
};
