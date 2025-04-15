import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { Signal } from '@/api/trade-agents/types/TradeAgent';

import { useRequestMaxProfit } from '../hooks/useRequestMaxProfit';

export const RequestMaxProfit: React.FC<{ signals: Signal[] }> = ({ signals }) => {
  const { anyLoading, maxValueChange } = useRequestMaxProfit(signals);

  if (!signals || signals.length === 0) {
    return (
      <VStack align="center" spacing={0}>
        <Text color="gray.400" fontSize="xs">
          Max Profit
        </Text>
        <Text>N/A</Text>
      </VStack>
    );
  }

  return (
    <VStack align="center" spacing={0}>
      {anyLoading ? (
        <Flex justify="center" align="center">
          <Spinner size="sm" color="whiteAlpha.600" />
        </Flex>
      ) : (
        <Text color={maxValueChange >= 0 ? 'green.300' : 'red.300'} fontSize="lg" fontWeight="bold">
          <Text as="span" fontSize="sm" verticalAlign="middle">
            $
          </Text>{' '}
          {maxValueChange.toFixed(2)}
        </Text>
      )}
      <Text color="gray.400" fontSize="xs">
        Max Profit
      </Text>
    </VStack>
  );
};
