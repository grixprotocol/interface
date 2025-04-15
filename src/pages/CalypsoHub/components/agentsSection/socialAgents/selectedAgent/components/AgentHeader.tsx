import { Avatar, HStack, Tag, Text, VStack } from '@chakra-ui/react';

import { TaskTarget } from '@/api/socialAgents/createAgent/types';

import { getPlatformIcon } from '../../sidebarAgentsList/helpers/getPlatformIcon';

type AgentHeaderProps = {
  name: string;
  platforms: TaskTarget[];
  status: 'active' | 'inactive';
};

export const AgentHeader = ({ name, platforms, status }: AgentHeaderProps) => (
  <HStack spacing={4} width="100%">
    <Avatar size="lg" name={name} bg="whiteAlpha.200" />
    <VStack align="start" flex={1}>
      <Text fontSize="xl" fontWeight="bold" color="white">
        {name}
      </Text>
      <HStack spacing={2}>
        {platforms.map((platform) => (
          <HStack key={platform} bg="whiteAlpha.100" p={1} px={2} borderRadius="md">
            {getPlatformIcon(platform)}
            <Text color="gray.300" fontSize="sm">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Text>
          </HStack>
        ))}
        <Tag size="sm" colorScheme={status === 'active' ? 'green' : 'gray'} variant="subtle">
          {status}
        </Tag>
      </HStack>
    </VStack>
  </HStack>
);
