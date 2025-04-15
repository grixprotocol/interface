import { Box, Button, Card, CardBody, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { FaChartLine, FaComments, FaRobot, FaUsers } from 'react-icons/fa';

type MainDashboardPageProps = {
  onSelectTab: (tab: 'trade' | 'social') => void;
};

export const MainDashboardPage = ({ onSelectTab }: MainDashboardPageProps) => {
  // Demo data
  const summaryData = {
    trade: {
      totalAgents: 3,
      activeAgents: 2,
      totalValue: 25420,
      dailyYield: 2.4,
    },
    social: {
      totalAgents: 2,
      activeAgents: 2,
      totalFollowers: 18100,
      engagement: 4.2,
    },
  };

  return (
    <Stack spacing={6}>
      {/* Navigation Cards */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Trade Agents Card */}
        <Card
          cursor="pointer"
          onClick={() => onSelectTab('trade')}
          _hover={{ transform: 'translateY(-2px)', transition: 'transform 0.2s' }}
          bg="whiteAlpha.50"
          borderWidth={1}
          borderColor="whiteAlpha.200"
        >
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <HStack>
                  <FaRobot color="#4299E1" />
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    Trade Agents
                  </Text>
                </HStack>
                <Button
                  size="sm"
                  rightIcon={<FaChartLine />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTab('trade');
                  }}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Manage
                </Button>
              </HStack>

              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Total Agents
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {summaryData.trade.totalAgents}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Active Agents
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {summaryData.trade.activeAgents}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Total Value
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    ${summaryData.trade.totalValue.toLocaleString()}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Daily Yield
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={summaryData.trade.dailyYield > 0 ? 'green.400' : 'red.400'}
                  >
                    {summaryData.trade.dailyYield}%
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Social Agents Card */}
        <Card
          cursor="pointer"
          onClick={() => onSelectTab('social')}
          _hover={{ transform: 'translateY(-2px)', transition: 'transform 0.2s' }}
          bg="whiteAlpha.50"
          borderWidth={1}
          borderColor="whiteAlpha.200"
        >
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <HStack>
                  <FaUsers color="#805AD5" />
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    Social Agents
                  </Text>
                </HStack>
                <Button
                  size="sm"
                  rightIcon={<FaComments />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTab('social');
                  }}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Manage
                </Button>
              </HStack>

              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Total Agents
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {summaryData.social.totalAgents}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Active Agents
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {summaryData.social.activeAgents}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Total Followers
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {summaryData.social.totalFollowers.toLocaleString()}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">
                    Avg. Engagement
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.400">
                    {summaryData.social.engagement}%
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Recent Activity */}
      <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="white">
              Recent Activity
            </Text>

            <Stack spacing={4}>
              <HStack>
                <FaChartLine color="#4299E1" />
                <Text color="gray.300">Trade Agent Alpha Bot executed a long position</Text>
                <Text color="gray.400" fontSize="sm">
                  2m ago
                </Text>
              </HStack>

              <HStack>
                <FaComments color="#805AD5" />
                <Text color="gray.300">Social Agent News Bot posted market update</Text>
                <Text color="gray.400" fontSize="sm">
                  15m ago
                </Text>
              </HStack>

              <HStack>
                <FaChartLine color="#4299E1" />
                <Text color="gray.300">Trade Agent Beta Bot closed position with +2.4%</Text>
                <Text color="gray.400" fontSize="sm">
                  1h ago
                </Text>
              </HStack>
            </Stack>
          </VStack>
        </CardBody>
      </Card>
    </Stack>
  );
};
