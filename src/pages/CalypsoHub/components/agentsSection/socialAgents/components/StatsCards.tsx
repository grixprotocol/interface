import { Card, CardBody, SimpleGrid, Text } from '@chakra-ui/react';

import { SocialAgentStats } from '../types';

type StatsCardsProps = {
  stats: SocialAgentStats;
};

export const StatsCards = ({ stats }: StatsCardsProps) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
    <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
      <CardBody>
        <Text color="gray.400" fontSize="sm">
          Total Agents
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {stats.totalAgents}
        </Text>
      </CardBody>
    </Card>

    <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
      <CardBody>
        <Text color="gray.400" fontSize="sm">
          Active Agents
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {stats.activeAgents}
        </Text>
      </CardBody>
    </Card>
  </SimpleGrid>
);
