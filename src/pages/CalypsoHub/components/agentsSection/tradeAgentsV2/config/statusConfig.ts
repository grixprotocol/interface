import { AgentStatus } from '@/api/trade-agents/types/TradeAgent';

export const statusConfig: Record<
  AgentStatus,
  {
    label: string;
    colorScheme: string;
    description: string;
  }
> = {
  [AgentStatus.active]: {
    label: 'Active',
    colorScheme: 'green',
    description: 'Strategy is running normally',
  },
  [AgentStatus.paused]: {
    label: 'Paused',
    colorScheme: 'yellow',
    description: 'Strategy execution is temporarily paused',
  },
  [AgentStatus.failed]: {
    label: 'Failed',
    colorScheme: 'red',
    description: 'Strategy encountered an error',
  },
  [AgentStatus.disabled]: {
    label: 'Disabled',
    colorScheme: 'gray',
    description: 'Strategy is currently disabled',
  },
};
