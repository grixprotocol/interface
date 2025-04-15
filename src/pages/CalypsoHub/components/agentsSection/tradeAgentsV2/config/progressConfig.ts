import { IconType } from 'react-icons';
import { FaCheck, FaDatabase, FaMagnifyingGlass, FaRobot, FaWandMagicSparkles } from 'react-icons/fa6';

import { RequestProgress } from '@/api/trade-agents/types/TradeAgent';

export const progressConfig: Record<
  RequestProgress,
  {
    label: string;
    icon: IconType;
    description: string;
  }
> = {
  [RequestProgress.requestReceived]: {
    label: 'Request Received',
    icon: FaRobot,
    description: 'Agent has received the request and is being initialized',
  },
  [RequestProgress.fetchingData]: {
    label: 'Fetching Market Data',
    icon: FaDatabase,
    description: 'Retrieving latest market data, sentiment analysis, and price trends',
  },
  [RequestProgress.analyzingData]: {
    label: 'Analyzing Data',
    icon: FaMagnifyingGlass,
    description: 'Processing market conditions, sentiment indicators, and your trading preferences',
  },
  [RequestProgress.creatingSignals]: {
    label: 'Creating Signals',
    icon: FaWandMagicSparkles,
    description: 'Generating trading signals based on analysis',
  },
  [RequestProgress.completed]: {
    label: 'Created Signals',
    icon: FaCheck,
    description: 'Signals have been generated and sent to the trading agent',
  },
};
