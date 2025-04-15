import { Avatar, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa6';

import { ActionStatus, SocialAgentTaskAction } from '@/api/socialAgents/getAgentTaskActions/types';
import calypsoImage from '@/pages/Calypso/Images/calypso.png';

type PendingActionCardProps = {
  action: SocialAgentTaskAction;
};

export const PendingActionCard = ({ action }: PendingActionCardProps) => {
  if (action.status !== ActionStatus.PENDING && action.status !== ActionStatus.SCHEDULED) return null;
  const formatScheduledTime = (date: Date) => {
    const now = new Date();
    const scheduled = new Date(date);
    const diffInHours = Math.round((scheduled.getTime() - now.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `In ${diffInHours} hours`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `In ${days} days`;
    }
  };

  return (
    <Box
      p={4}
      bg="whiteAlpha.50"
      borderRadius="lg"
      borderWidth={1}
      borderColor="yellow.400"
      _hover={{
        bg: 'whiteAlpha.200',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={2}>
        <HStack spacing={4}>
          <Avatar size="sm" src={calypsoImage} icon={<Icon as={FaRobot} color="white" />} bg="yellow.500" />
          <VStack align="start" spacing={1} flex={1}>
            <HStack spacing={2} width="100%" justify="space-between">
              <Text color="yellow.400" fontSize="sm" fontWeight="bold">
                {action.action_type}
              </Text>
            </HStack>
            <HStack spacing={2} color="gray.400" fontSize="xs">
              <Icon as={FaClock} />
              <Text>{formatScheduledTime(action.scheduled_at)}</Text>
              <Text>({new Date(action.scheduled_at).toLocaleString()})</Text>
            </HStack>
            <Text color="gray.300" fontSize="sm">
              Status: {action.status}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
