import { Badge, Box, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaChartLine, FaPercentage, FaShieldAlt } from 'react-icons/fa';

export const renderDefaultView = () => (
  <Box p={8}>
    <VStack align="stretch" spacing={8}>
      {/* Introduction Section */}
      <Box>
        <Text fontSize="3xl" fontWeight="bold" color="white" mb={4}>
          Trading Strategies Guide
        </Text>
        <Text color="gray.400" fontSize="lg">
          Explore our comprehensive collection of trading strategies designed to help you navigate different market
          conditions and achieve your investment goals.
        </Text>
      </Box>

      {/* Strategy Categories */}
      <SimpleGrid columns={3} spacing={6} mt={4}>
        <Box>
          <HStack mb={3}>
            <Icon as={FaPercentage} color="green.400" w={5} h={5} />
            <Text fontSize="xl" fontWeight="semibold" color="white">
              Income Strategies
            </Text>
          </HStack>
          <Text color="gray.400">
            Focus on generating regular returns through premium collection and yield optimization. Ideal for investors
            seeking consistent income streams.
          </Text>
        </Box>

        <Box>
          <HStack mb={3}>
            <Icon as={FaShieldAlt} color="blue.400" w={5} h={5} />
            <Text fontSize="xl" fontWeight="semibold" color="white">
              Protection Strategies
            </Text>
          </HStack>
          <Text color="gray.400">
            Designed to protect your portfolio against market downturns and manage risk effectively. Essential for
            preserving capital.
          </Text>
        </Box>

        <Box>
          <HStack mb={3}>
            <Icon as={FaChartLine} color="purple.400" w={5} h={5} />
            <Text fontSize="xl" fontWeight="semibold" color="white">
              Growth Strategies
            </Text>
          </HStack>
          <Text color="gray.400">
            Aimed at capital appreciation through strategic market positioning and trend following. Suitable for
            long-term wealth building.
          </Text>
        </Box>
      </SimpleGrid>

      {/* Complexity Levels */}
      <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
          Understanding Complexity Levels
        </Text>
        <SimpleGrid columns={3} spacing={6}>
          <VStack align="stretch" p={4} bg="whiteAlpha.50" borderRadius="xl" spacing={3}>
            <Badge colorScheme="green" alignSelf="flex-start">
              Basic
            </Badge>
            <Text color="white" fontWeight="medium">
              Beginner Friendly
            </Text>
            <Text color="gray.400" fontSize="sm">
              • Simple execution process • Clear risk parameters • Minimal market knowledge needed
            </Text>
          </VStack>

          <VStack align="stretch" p={4} bg="whiteAlpha.50" borderRadius="xl" spacing={3}>
            <Badge colorScheme="yellow" alignSelf="flex-start">
              Intermediate
            </Badge>
            <Text color="white" fontWeight="medium">
              Some Experience Required
            </Text>
            <Text color="gray.400" fontSize="sm">
              • Multiple leg positions • Basic Greeks understanding • Market timing awareness
            </Text>
          </VStack>

          <VStack align="stretch" p={4} bg="whiteAlpha.50" borderRadius="xl" spacing={3}>
            <Badge colorScheme="red" alignSelf="flex-start">
              Advanced
            </Badge>
            <Text color="white" fontWeight="medium">
              Expert Level
            </Text>
            <Text color="gray.400" fontSize="sm">
              • Complex position management • Advanced Greeks knowledge • Sophisticated risk control
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>
    </VStack>
  </Box>
);
