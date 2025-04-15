import { Badge, Card, CardBody, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaClock, FaRobot } from 'react-icons/fa';

import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';

import { getTimeLeftUntilNextActionSchedule } from '../helpers/getTimeLeftUntilNextActionSchedule';
import { InstantActionCard } from '../instantAction';
import { AgentsListProps, platformColors, platformIcons } from '../types/configuration';

export const AgentsList = ({ agents, onSelectAgent }: AgentsListProps) => (
  <VStack spacing={4} align="stretch">
    <InstantActionCard />
    {agents?.map((agent) => (
      <Card
        key={agent.id}
        bg="whiteAlpha.50"
        borderWidth={1}
        borderColor="whiteAlpha.200"
        cursor="pointer"
        _hover={{
          bg: 'whiteAlpha.100',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={() => onSelectAgent(agent)}
        transition="all 0.2s"
      >
        <CardBody>
          {agent.number_of_scheduled_actions === 0 && agent.is_active && <TimeLeftCounter task={agent} />}
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <HStack spacing={4}>
                <Icon as={platformIcons[agent.task_target]} color={platformColors[agent.task_target]} boxSize={5} />
                <VStack align="start" spacing={1}>
                  <Text color="white" fontWeight="medium">
                    {agent.name}
                  </Text>
                  <Text color="whiteAlpha.700" fontSize="sm">
                    ID: {agent.id}
                  </Text>
                </VStack>
              </HStack>
              <HStack spacing={4}>
                <Badge colorScheme={agent.is_active ? 'green' : 'gray'} variant="subtle">
                  {agent.is_active ? 'Active' : 'Inactive'}
                </Badge>
                <Badge colorScheme="blue" variant="subtle">
                  Every {agent.action_rate.hours}h
                </Badge>
              </HStack>
            </HStack>

            <VStack align="start" spacing={2}>
              <HStack spacing={2}>
                <Text color="whiteAlpha.800" fontSize="sm" fontWeight="medium">
                  Agent Personality
                </Text>
                <Icon as={FaRobot} color="whiteAlpha.600" boxSize={3} />
              </HStack>
              <Text
                color="whiteAlpha.700"
                fontSize="sm"
                p={3}
                bg="whiteAlpha.100"
                borderRadius="md"
                borderLeft="3px solid"
                borderColor="purple.400"
              >
                {agent.prompt}
              </Text>
            </VStack>

            <HStack wrap="wrap" spacing={2}>
              {agent.agentTask_actios_types.map((type) => (
                <Badge key={type} colorScheme="purple" variant="subtle">
                  {type}
                </Badge>
              ))}
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    ))}

    {agents && agents.length === 0 && (
      <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
        <CardBody>
          <Text color="whiteAlpha.700" textAlign="center">
            No agents found
          </Text>
        </CardBody>
      </Card>
    )}
  </VStack>
);

function TimeLeftCounter({ task }: { task: SocialAgentTask }) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (task.number_of_scheduled_actions === 0) {
      const timer = setInterval(() => {
        setTimeLeft(getTimeLeftUntilNextActionSchedule());
      }, 1000);

      setTimeLeft(getTimeLeftUntilNextActionSchedule());
      return () => clearInterval(timer);
    }
  }, [task.number_of_scheduled_actions]);

  if (task.number_of_scheduled_actions > 0) return null;

  return (
    <Tooltip
      label="Your agent's actions are scheduled once per day. This timer shows when the next batch of actions will be available."
      placement="top"
      hasArrow
    >
      <HStack bg="whiteAlpha.200" px={2} py={1} borderRadius="md" spacing={2} ml={2}>
        <Icon as={FaClock} color="yellow.400" boxSize={3} />
        <Text fontSize="xs" color="whiteAlpha.800">
          Next actions schedule in: {timeLeft}
        </Text>
      </HStack>
    </Tooltip>
  );
}
