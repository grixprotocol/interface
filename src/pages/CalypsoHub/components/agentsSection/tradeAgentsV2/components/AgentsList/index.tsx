import { Box, Spinner, Text } from '@chakra-ui/react';

import { TradeAgent } from '@/api/trade-agents/types/TradeAgent';

import { AgentCard } from './AgentCard';

type AgentsListProps = {
  agents: TradeAgent[];
  onAgentSelect: (agentId: string) => void;
  selectedAgentId?: string;
  isLoading: boolean;
};

export const AgentsList = ({ agents, isLoading, onAgentSelect, selectedAgentId }: AgentsListProps) => (
  <Box flexShrink={0}>
    <Box
      bg="whiteAlpha.50"
      borderRadius="xl"
      borderWidth={1}
      borderColor="whiteAlpha.200"
      overflow="hidden"
      height="calc(100vh - 100px)"
      position="sticky"
      top="20px"
    >
      {/* Panel Header */}
      <Box p={3} borderBottom="1px" borderColor="whiteAlpha.200" bg="whiteAlpha.50">
        <Text color="white" fontWeight="semibold" fontSize="sm">
          Signal agents
        </Text>
      </Box>

      {/* Agents List with Scrollable Area */}
      <Box
        overflowY="auto"
        height="calc(100% - 48px)"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
          },
        }}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <Spinner />
          </Box>
        ) : !agents?.length ? (
          <Box p={4} textAlign="center">
            <Text color="gray.500" fontSize="sm">
              No agents found
            </Text>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onSelect={onAgentSelect} isSelected={agent.id === selectedAgentId} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);
