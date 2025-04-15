import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  Progress,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowsAltH, FaBolt, FaChartLine, FaExclamationTriangle, FaPlus, FaShieldAlt } from 'react-icons/fa';

import { playbooks } from '../../hardcodedContent/playbooks';
import { Playbook } from '../../types';
type PlaybookDetailsProps = {
  playbook: Playbook;
};

const PlaybookDetails = ({ playbook }: PlaybookDetailsProps) => (
  <Box p={6} bg="whiteAlpha.50" borderRadius="xl">
    {/* Header */}
    <HStack justify="space-between" mb={6}>
      <VStack align="start" spacing={2}>
        <HStack>
          <Icon as={playbook.icon} color="blue.400" boxSize={6} />
          <Heading size="lg" color="white">
            {playbook.name}
          </Heading>
        </HStack>
        <Badge
          colorScheme={
            playbook.complexity === 'Basic' ? 'green' : playbook.complexity === 'Intermediate' ? 'yellow' : 'purple'
          }
        >
          {playbook.complexity}
        </Badge>
      </VStack>
    </HStack>

    {/* Description */}
    <Text color="gray.300" fontSize="lg" mb={8}>
      {playbook.description}
    </Text>

    {/* Performance Score */}
    <Box mb={8}>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        Performance Score
      </Text>
      <HStack spacing={4} align="center">
        <Progress
          value={playbook.performanceScore}
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          bg="whiteAlpha.200"
          flex={1}
        />
        <Text color="white" fontWeight="bold" fontSize="xl">
          {playbook.performanceScore}%
        </Text>
      </HStack>
    </Box>

    {/* Implemented Strategies */}
    <Box mb={8}>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        Implemented Strategies
      </Text>
      <SimpleGrid columns={2} spacing={4}>
        {playbook.strategies.map((strategy, index) => (
          <HStack key={index} p={4} bg="whiteAlpha.100" borderRadius="lg" spacing={3}>
            <Icon as={FaChartLine} color="blue.400" />
            <Text color="gray.300">{strategy}</Text>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>

    {/* Agent Behaviors */}
    <Box mb={8}>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        Agent Behaviors
      </Text>
      <VStack align="stretch" spacing={3}>
        {playbook.behaviors.map((behavior, index) => (
          <HStack key={index} p={4} bg="whiteAlpha.100" borderRadius="lg" spacing={4}>
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
            <Text color="gray.300">{behavior}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>

    {/* Risk Management */}
    <Box mb={8}>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        Risk Management
      </Text>
      <SimpleGrid columns={2} spacing={4}>
        <Box p={4} bg="whiteAlpha.100" borderRadius="lg">
          <HStack mb={2}>
            <Icon as={FaShieldAlt} color="green.400" />
            <Text color="white" fontWeight="semibold">
              Position Sizing
            </Text>
          </HStack>
          <Text color="gray.300">Dynamic adjustment based on volatility and market conditions</Text>
        </Box>
        <Box p={4} bg="whiteAlpha.100" borderRadius="lg">
          <HStack mb={2}>
            <Icon as={FaExclamationTriangle} color="yellow.400" />
            <Text color="white" fontWeight="semibold">
              Stop Loss
            </Text>
          </HStack>
          <Text color="gray.300">Automated risk-based stop loss management</Text>
        </Box>
      </SimpleGrid>
    </Box>

    {/* Market Conditions */}
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        Optimal Market Conditions
      </Text>
      <SimpleGrid columns={2} spacing={4}>
        <Box p={4} bg="whiteAlpha.100" borderRadius="lg">
          <HStack>
            <Icon as={FaArrowsAltH} color="blue.400" />
            <Text color="white">Sideways Markets</Text>
          </HStack>
        </Box>
        <Box p={4} bg="whiteAlpha.100" borderRadius="lg">
          <HStack>
            <Icon as={FaBolt} color="yellow.400" />
            <Text color="white">Low-Medium Volatility</Text>
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  </Box>
);

export const PlaybooksMarketplace = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState<string | null>(null);

  const renderDefaultView = () => (
    <Box p={8}>
      <VStack align="stretch" spacing={8}>
        {/* Introduction Section */}
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="white" mb={4}>
            AI Trading Playbooks
          </Text>
          <Text color="gray.400" fontSize="lg">
            Select from our curated collection of AI trading agents, each configured with specific strategy combinations
            and behavioral patterns optimized for different market scenarios.
          </Text>
        </Box>

        {/* Search and Filter Section */}
        <HStack spacing={4} mb={4}>
          <Input placeholder="Search playbooks..." bg="whiteAlpha.50" borderColor="whiteAlpha.200" color="white" />
          <Select placeholder="Filter by complexity" bg="whiteAlpha.50" borderColor="whiteAlpha.200" color="white">
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Select>
        </HStack>

        {/* Playbooks Grid */}
        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={6}>
          {/* Playbooks List with Create Button */}
          <VStack align="stretch" spacing={4}>
            {/* Create Custom Playbook Button */}
            <Button
              height="auto"
              p={6}
              bg="whiteAlpha.50"
              borderWidth={2}
              borderStyle="dashed"
              borderColor="blue.400"
              borderRadius="lg"
              _hover={{ bg: 'whiteAlpha.100' }}
              onClick={() => setSelectedPlaybook(null)}
              role="group"
            >
              <VStack spacing={2}>
                <Icon
                  as={FaPlus}
                  color="blue.400"
                  boxSize={6}
                  _groupHover={{ transform: 'scale(1.1)' }}
                  transition="all 0.2s"
                />
                <Text color="white" fontWeight="bold">
                  Create Custom Playbook
                </Text>
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  Design your own AI trading agent
                </Text>
              </VStack>
            </Button>

            {/* Existing Playbooks List */}
            <Box>
              <Text color="gray.400" fontSize="sm" fontWeight="semibold" mb={2} pl={2}>
                AVAILABLE PLAYBOOKS
              </Text>
              <VStack align="stretch" spacing={2}>
                {playbooks.map((playbook) => (
                  <Box
                    key={playbook.id}
                    p={4}
                    bg="whiteAlpha.50"
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => setSelectedPlaybook(playbook.id)}
                    borderLeft="4px solid"
                    borderLeftColor={selectedPlaybook === playbook.id ? 'blue.400' : 'transparent'}
                    _hover={{ bg: 'whiteAlpha.100' }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text color="white" fontWeight="bold">
                          {playbook.name}
                        </Text>
                        <Badge
                          colorScheme={
                            playbook.complexity === 'Basic'
                              ? 'green'
                              : playbook.complexity === 'Intermediate'
                              ? 'yellow'
                              : 'purple'
                          }
                        >
                          {playbook.complexity}
                        </Badge>
                      </VStack>
                      <Icon as={playbook.icon} color="blue.400" boxSize={5} />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>

          {/* Playbook Details or Create Custom Form */}
          <Box>
            {selectedPlaybook && (
              <PlaybookDetails playbook={playbooks.find((p) => p.id === selectedPlaybook) ?? playbooks[0]} />
            )}
          </Box>
        </Grid>
      </VStack>
    </Box>
  );

  return <Box>{renderDefaultView()}</Box>;
};
