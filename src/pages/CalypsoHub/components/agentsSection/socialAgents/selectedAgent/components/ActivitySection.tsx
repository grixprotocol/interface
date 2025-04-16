import { Box, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ActionStatus, SocialAgentTaskAction } from '@/api/socialAgents/getAgentTaskActions/types';
import { useAgentTaskActionsGet } from '@/api/socialAgents/getAgentTaskActions/useAgentTaskActionsGet';
import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';

import { CompletedActionCard } from './CompletedActionCard';
import { PendingActionCard } from './PendingActionCard';

type ActivitySectionProps = {
  agent: SocialAgentTask;
};

type GroupedActions = {
  pending: SocialAgentTaskAction[];
  completed: SocialAgentTaskAction[];
};

export const ActivitySection = ({ agent }: ActivitySectionProps) => {
  const { data: agentActions, isLoading: isAgentActionsLoading } = useAgentTaskActionsGet({
    socialAgentTaskId: agent.id.toString(),
  });

  const [groupedActions, setGroupedActions] = useState<GroupedActions>({
    pending: [],
    completed: [],
  });

  useEffect(() => {
    if (agentActions) {
      const sorted = agentActions.taskActions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      const grouped = sorted.reduce<GroupedActions>(
        (acc, action) => {
          if (action.status === ActionStatus.COMPLETED || action.status === ActionStatus.SENT) {
            acc.completed.push(action);
          } else {
            acc.pending.push(action);
          }
          return acc;
        },
        { pending: [], completed: [] }
      );

      setGroupedActions(grouped);
    }
  }, [agentActions]);

  if (isAgentActionsLoading)
    return (
      <HStack justify="center" align="center" h="100%">
        <Spinner />
        <Text fontSize="lg" fontWeight="bold" color="white">
          Loading...
        </Text>
      </HStack>
    );

  return (
    <HStack align="start" spacing={6}>
      <Box flex={1} bg="whiteAlpha.50" p={4} borderRadius="xl" minH="400px">
        <VStack spacing={4} align="stretch">
          <Heading size="sm" color="yellow.400">
            Upcoming Actions ({groupedActions.pending.length})
          </Heading>
          {groupedActions.pending.length > 0 ? (
            <VStack spacing={4} align="stretch" maxH="600px" overflowY="auto">
              {groupedActions.pending.map((action) => (
                <PendingActionCard key={action.id} action={action} />
              ))}
            </VStack>
          ) : (
            <Text color="gray.400" fontSize="sm">
              No upcoming actions
            </Text>
          )}
        </VStack>
      </Box>

      <Box flex={1} bg="whiteAlpha.50" p={4} borderRadius="xl" minH="400px">
        <VStack spacing={4} align="stretch">
          <Heading size="sm" color="green.400">
            Completed Actions ({groupedActions.completed.length})
          </Heading>
          {groupedActions.completed.length > 0 ? (
            <VStack spacing={4} align="stretch" maxH="600px" overflowY="auto">
              {groupedActions.completed.map((action) => (
                <CompletedActionCard key={action.id} action={action} />
              ))}
            </VStack>
          ) : (
            <Text color="gray.400" fontSize="sm">
              No completed actions
            </Text>
          )}
        </VStack>
      </Box>
    </HStack>
  );
};
