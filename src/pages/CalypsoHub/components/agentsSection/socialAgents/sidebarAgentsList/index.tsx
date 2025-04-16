import { CloseIcon } from '@chakra-ui/icons';
import { Badge, Box, Card, CardBody, HStack, IconButton, Spinner, Switch, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';

import { NewAgentCard } from '../addNewAgentCard';
import { getPlatformIcon } from './helpers/getPlatformIcon';
//import { formatLastActive } from './helpers/dateFormating';

type SidebarAgentsListProps = {
  onClose: () => void;
  agents: SocialAgentTask[] | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedAgent: SocialAgentTask | null;
  setSelectedAgent: (agent: SocialAgentTask) => void;
};

export const SidebarAgentsList = ({ onClose, agents, isLoading, isError, selectedAgent, setSelectedAgent }: SidebarAgentsListProps) => {
  const [isIncludeInactive, setIsIncludeInactive] = useState(false);

  if (isLoading) {
    return (
      <HStack justify="center" align="center" h="100%">
        <Text fontSize="lg" fontWeight="bold" color="white">
          Fetching agents...
        </Text>
        <Spinner />
      </HStack>
    );
  }

  if (isError) {
    return <Text>Error loading agents</Text>;
  }

  return (
    <VStack align="stretch" spacing={4}>
      <NewAgentCard />

      <HStack justify="space-between" align="center">
        <Text color="gray.400" fontSize="lg" fontWeight="bold">
          My Agents
        </Text>
        <HStack spacing={2}>
          <Box
            bg="blackAlpha.400"
            border="1px solid"
            borderColor="gray.800"
            borderRadius="8px"
            px={3}
            h="32px"
            display="flex"
            alignItems="center"
          >
            <HStack spacing={2} justifyContent="space-between">
              <HStack spacing={2}>
                <Text fontSize="70%" fontWeight="medium" color="gray.300" whiteSpace="nowrap">
                  {isIncludeInactive ? 'Show all agents' : 'Hide inactive agents'}
                </Text>
              </HStack>
              <Switch isChecked={isIncludeInactive} onChange={(e) => setIsIncludeInactive(e.target.checked)} size="md" />
            </HStack>
          </Box>
          <IconButton aria-label="Close" icon={<CloseIcon />} size="sm" variant="ghost" onClick={() => onClose()} />
        </HStack>
      </HStack>

      {agents?.map((agent) =>
        !isIncludeInactive && agent.is_active === false ? null : (
          <Card
            key={agent.id}
            bg="whiteAlpha.50"
            borderWidth={1}
            borderColor={selectedAgent?.id === agent.id ? 'blue.400' : 'whiteAlpha.200'}
            cursor="pointer"
            _hover={{
              bg: 'whiteAlpha.100',
              transform: 'translateY(-1px)',
              boxShadow: 'sm',
            }}
            onClick={() => setSelectedAgent(agent)}
            transition="all 0.2s"
          >
            <CardBody py={2}>
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <HStack spacing={2}>
                    {getPlatformIcon(agent.task_target)}
                    <Text fontWeight="medium" color={selectedAgent?.id === agent.id ? 'white' : 'gray.400'} fontSize="sm">
                      {agent.name}
                    </Text>
                  </HStack>
                  <Badge colorScheme={agent.is_active ? 'green' : 'gray'} variant="subtle" fontSize="xs">
                    {agent.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </HStack>

                <HStack spacing={1} wrap="wrap">
                  {agent.agentTask_actios_types.slice(0, 2).map((type) => (
                    <Badge key={type} colorScheme="purple" variant="subtle" fontSize="2xs">
                      {type}
                    </Badge>
                  ))}
                  {agent.agentTask_actios_types.length > 2 && (
                    <Badge colorScheme="purple" variant="subtle" fontSize="2xs">
                      +{agent.agentTask_actios_types.length - 2}
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )
      )}
    </VStack>
  );
};
