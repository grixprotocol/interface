import { Avatar, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa6';

import { ActionStatus, SocialAgentTaskAction } from '@/api/socialAgents/getAgentTaskActions/types';
import calypsoImage from '@/pages/Calypso/Images/calypso.png';

type ActionSignalCardProps = {
  action: SocialAgentTaskAction;
  variant?: 'pending' | 'completed';
};

export const ActionSignalCard = ({ action, variant = 'pending' }: ActionSignalCardProps) => {
  const getStatusColor = (status: ActionStatus) => {
    switch (status) {
      case ActionStatus.COMPLETED:
      case ActionStatus.SENT:
        return 'green.400';
      case ActionStatus.FAILED:
        return 'red.400';
      case ActionStatus.IN_PROGRESS:
        return 'yellow.400';
      case ActionStatus.PENDING:
      case ActionStatus.SCHEDULED:
      default:
        return 'gray.400';
    }
  };

  const cardStyles = {
    pending: {
      bg: 'whiteAlpha.50',
      borderColor: 'whiteAlpha.100',
      hoverBg: 'whiteAlpha.200',
    },
    completed: {
      bg: 'whiteAlpha.50',
      borderColor: 'green.400',
      hoverBg: 'whiteAlpha.200',
    },
  };

  const currentStyle = cardStyles[variant];

  return (
    <Box
      p={4}
      bg={currentStyle.bg}
      borderRadius="lg"
      borderWidth={1}
      borderColor={currentStyle.borderColor}
      _hover={{
        bg: currentStyle.hoverBg,
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={2}>
        <HStack spacing={4}>
          <VStack spacing={1} align="center">
            <Avatar
              size="md"
              src={calypsoImage}
              icon={<Icon as={FaRobot} color="white" />}
              bg="blue.500"
              name="Calypso"
            />
            <Text color="white" fontWeight="bold" fontSize="xs">
              Agent Action
            </Text>
          </VStack>
          <VStack align="start" spacing={2} flex={1}>
            <HStack spacing={2}>
              <Text color="gray.400" fontSize="xs">
                {new Date(action.created_at).toLocaleString()}
              </Text>
              <Text fontSize="xs" color={getStatusColor(action.status)} textTransform="capitalize">
                • {action.status}
              </Text>
            </HStack>

            <Text color="white" fontSize="md">
              {action.result || `Action Type: ${action.action_type}`}
            </Text>

            {action.scheduled_at && (
              <Text color="gray.400" fontSize="sm">
                Scheduled for: {new Date(action.scheduled_at).toLocaleString()}
              </Text>
            )}

            {action.failure_reason && (
              <Text color="red.400" fontSize="sm">
                Error: {action.failure_reason}
              </Text>
            )}
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
