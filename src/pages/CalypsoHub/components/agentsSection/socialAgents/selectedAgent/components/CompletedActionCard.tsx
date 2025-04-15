import { Avatar, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa6';

import { SocialAgentTaskAction } from '@/api/socialAgents/getAgentTaskActions/types';
import calypsoImage from '@/pages/Calypso/Images/calypso.png';

type CompletedActionCardProps = {
  action: SocialAgentTaskAction;
};

export const CompletedActionCard = ({ action }: CompletedActionCardProps) => (
  <Box
    p={4}
    bg="whiteAlpha.50"
    borderRadius="lg"
    borderWidth={1}
    borderColor="green.400"
    _hover={{
      bg: 'whiteAlpha.200',
      transform: 'translateY(-2px)',
    }}
    transition="all 0.2s"
  >
    <VStack align="stretch" spacing={3}>
      <HStack spacing={4}>
        <Avatar size="sm" src={calypsoImage} icon={<Icon as={FaRobot} color="white" />} bg="green.500" />
        <VStack align="start" spacing={1} flex={1}>
          <HStack spacing={2} width="100%" justify="space-between">
            <Text color="green.400" fontSize="sm" fontWeight="bold">
              {action.action_type}
            </Text>
            <Text color="gray.400" fontSize="xs">
              {new Date(action.created_at).toLocaleString()}
            </Text>
          </HStack>
        </VStack>
      </HStack>

      {action.result && (
        <Text color="white" fontSize="sm">
          {action.result}
        </Text>
      )}
    </VStack>
  </Box>
);
