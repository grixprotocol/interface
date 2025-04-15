import { VStack } from '@chakra-ui/react';

import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';

import { SocialAgentStats } from '../types';
import { AgentsList } from './AgentsList';
import { StatsCards } from './StatsCards';

type DashboardProps = {
  stats: SocialAgentStats;
  agents: SocialAgentTask[] | undefined;
  onSelectAgent: (agent: SocialAgentTask) => void;
};

export const Dashboard = ({ stats, agents, onSelectAgent }: DashboardProps) => (
  <VStack spacing={6} align="stretch">
    <StatsCards stats={stats} />
    <AgentsList agents={agents} onSelectAgent={onSelectAgent} />
  </VStack>
);
