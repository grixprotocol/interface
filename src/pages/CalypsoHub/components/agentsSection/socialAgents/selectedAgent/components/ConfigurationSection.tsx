import { Badge, Box, Card, CardBody, CardHeader, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { TaskTarget } from '@/api/socialAgents/createAgent/types';

type ConfigurationSectionProps = {
  prompt: string;
  actionRate: string;
  taskTarget: TaskTarget;
};

export const ConfigurationSection = ({ prompt, actionRate, taskTarget }: ConfigurationSectionProps) => (
  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
    <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" color="white">
          Personality Configuration
        </Text>
      </CardHeader>
      <CardBody>
        <VStack align="start" spacing={4}>
          <Box>
            <Text color="gray.400" fontSize="sm">
              Template
            </Text>
            <Text color="white" fontSize="md">
              {prompt}
            </Text>
          </Box>
          <Box>
            <Text color="gray.400" fontSize="sm">
              Communication Style
            </Text>
            <Badge colorScheme="purple">{actionRate}</Badge>
          </Box>
        </VStack>
      </CardBody>
    </Card>

    <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" color="white">
          Trading Strategy
        </Text>
      </CardHeader>
      <CardBody>
        <VStack align="start" spacing={4}>
          <Box>
            <Text color="gray.400" fontSize="sm">
              Risk Level
            </Text>
            <Badge colorScheme={actionRate === 'conservative' ? 'green' : actionRate === 'moderate' ? 'yellow' : 'red'}>
              {actionRate}
            </Badge>
          </Box>
          <Box>
            <Text color="gray.400" fontSize="sm">
              Trading Pairs
            </Text>
            <HStack mt={1}>{taskTarget}</HStack>
          </Box>
          <Box>
            <Text color="gray.400" fontSize="sm">
              Time Frames
            </Text>
            <HStack mt={1}>{taskTarget}</HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  </SimpleGrid>
);
