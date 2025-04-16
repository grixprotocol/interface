import { Badge, Box, Button, Collapse, HStack, Icon, SimpleGrid, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { FaArrowRight, FaBookOpen, FaCheckCircle, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

import { mockStrategies } from '../../hardcodedContent/strategies';
import { getMarketConditionColor, getMarketConditionIcon, getTypeColor, getTypeIcon } from './designGetters';
import { StrategyMetricsChart } from './metricsChart';

type StrategyGuidanceProps = {
  selectedStrategy: string | null;
  setSelectedStrategy: (strategy: string | null) => void;
};

export const StrategyGuidance = ({ selectedStrategy, setSelectedStrategy }: StrategyGuidanceProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box p={6} bg="whiteAlpha.50" borderRadius="xl" position="relative">
      {/* Close Button */}
      <Box
        position="absolute"
        top={4}
        right={4}
        cursor="pointer"
        onClick={() => setSelectedStrategy(null)}
        p={2}
        borderRadius="md"
        _hover={{ bg: 'whiteAlpha.100' }}
        transition="all 0.2s"
      >
        <Icon as={FaTimes} color="gray.400" w={5} h={5} _hover={{ color: 'white' }} />
      </Box>

      {selectedStrategy &&
        mockStrategies
          .filter((strategy) => strategy.id === selectedStrategy)
          .map((strategy) => (
            <Box key={strategy.id}>
              {/* Strategy Header */}
              <HStack justify="space-between" mb={6}>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={getTypeIcon(strategy.type)} color={`${getTypeColor(strategy.type)}.400`} boxSize={6} />
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                      {strategy.name}
                    </Text>
                  </HStack>
                  <Badge colorScheme={getTypeColor(strategy.type)} fontSize="sm">
                    {strategy.type.charAt(0).toUpperCase() + strategy.type.slice(1)} Strategy
                  </Badge>
                </VStack>
                <Badge
                  colorScheme={strategy.complexity === 'Advanced' ? 'red' : strategy.complexity === 'Intermediate' ? 'yellow' : 'green'}
                >
                  {strategy.complexity}
                </Badge>
              </HStack>

              {/* Strategy Description */}
              <Text color="gray.400" fontSize="lg" mb={8}>
                {strategy.description}
              </Text>

              {/* Use Cases Section */}
              <Box mb={8}>
                <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
                  When to Use This Strategy
                </Text>
                <VStack align="stretch" spacing={3}>
                  {strategy.useCases.map((useCase, index) => (
                    <HStack key={index} p={4} bg="whiteAlpha.50" borderRadius="lg" spacing={3}>
                      <Icon as={FaCheckCircle} color="green.400" boxSize={5} />
                      <Text color="gray.300">{useCase}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* How It Works Section */}
              <Box mb={8}>
                <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
                  How It Works
                </Text>
                <VStack align="stretch" spacing={4}>
                  {strategy.actions.map((action, index) => (
                    <HStack key={index} p={4} bg="whiteAlpha.50" borderRadius="lg" spacing={4}>
                      <Box
                        minW="32px"
                        h="32px"
                        borderRadius="full"
                        bg="whiteAlpha.200"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </Box>
                      <Text color="gray.300">{action}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Real Example Section (Collapsible) */}
              <Box mb={8}>
                <Button
                  onClick={onToggle}
                  variant="ghost"
                  width="100%"
                  justifyContent="space-between"
                  p={4}
                  bg="whiteAlpha.50"
                  _hover={{ bg: 'whiteAlpha.100' }}
                  color="white"
                  leftIcon={<Icon as={FaBookOpen} color="blue.400" />}
                  rightIcon={<Icon as={isOpen ? FaChevronUp : FaChevronDown} color="gray.400" />}
                >
                  <Text fontSize="xl" fontWeight="bold">
                    See It In Action
                  </Text>
                </Button>

                <Collapse in={isOpen} animateOpacity>
                  <Box mt={4} p={6} bg="whiteAlpha.50" borderRadius="lg">
                    <Text color="white" fontWeight="medium" mb={6}>
                      {strategy.example.scenario}
                    </Text>
                    <VStack align="stretch" spacing={4}>
                      {strategy.example.story.map((step, index) => (
                        <HStack key={index} p={4} bg="whiteAlpha.100" borderRadius="md" spacing={4}>
                          <Icon as={FaArrowRight} color="blue.400" />
                          <Text color="gray.300">{step}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </Collapse>
              </Box>

              {/* Strategy Metrics Chart */}
              <Box mt={8}>
                <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
                  Strategy Profile
                </Text>
                <StrategyMetricsChart strategy={strategy} />
              </Box>

              {/* Market Conditions */}
              <Box mt={8}>
                <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
                  Optimal Market Conditions
                </Text>
                <SimpleGrid columns={2} spacing={4}>
                  {strategy.marketConditions.map((condition, index) => (
                    <HStack
                      key={index}
                      p={4}
                      bg="whiteAlpha.50"
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderLeftColor={getMarketConditionColor(condition)}
                    >
                      <Icon as={getMarketConditionIcon(condition)} color={getMarketConditionColor(condition)} boxSize={5} />
                      <Text color="white">{condition}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          ))}
    </Box>
  );
};
