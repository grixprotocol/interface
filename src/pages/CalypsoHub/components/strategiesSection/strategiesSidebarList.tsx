import { Badge, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';

import { mockStrategies } from '../../hardcodedContent/strategies';
import { getTypeColor, getTypeIcon } from './designGetters';

type StrategiesSidebarListProps = {
  selectedStrategy: string | null;
  setSelectedStrategy: (strategy: string | null) => void;
};

export const StrategiesSidebarList = ({ selectedStrategy, setSelectedStrategy }: StrategiesSidebarListProps) => (
  <Box
    flex="1"
    overflowY="auto"
    pr={2}
    css={{
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(255, 255, 255, 0.3)',
      },
    }}
  >
    <VStack align="stretch" spacing={4}>
      {mockStrategies.map((strategy) => (
        <Box
          key={strategy.id}
          p={4}
          bg="whiteAlpha.50"
          borderRadius="xl"
          borderWidth={1}
          borderColor={selectedStrategy === strategy.id ? 'blue.400' : 'whiteAlpha.200'}
          cursor="pointer"
          onClick={() => setSelectedStrategy(strategy.id === selectedStrategy ? null : strategy.id)}
          _hover={{ bg: 'whiteAlpha.100' }}
          transition="all 0.2s"
        >
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Icon as={getTypeIcon(strategy.type)} color={`${getTypeColor(strategy.type)}.400`} />
                <Text color="white" fontWeight="medium">
                  {strategy.name}
                </Text>
              </HStack>
              <Badge colorScheme={getTypeColor(strategy.type)}>{strategy.type}</Badge>
            </HStack>

            <Text color="gray.400" fontSize="sm" noOfLines={2}>
              {strategy.description}
            </Text>
          </VStack>
        </Box>
      ))}
    </VStack>
  </Box>
);
