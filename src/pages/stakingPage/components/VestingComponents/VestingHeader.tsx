import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { BoldGrix } from '../BoldGrix';

export const VestingHeader: React.FC = () => (
  <VStack align="stretch" mb={4}>
    <Heading size="sm" color="white" fontWeight="700" letterSpacing="-0.01em">
      Vesting
    </Heading>
    <Text color="gray.400" fontSize="sm" fontWeight="500">
      <BoldGrix text="Convert esGRIX tokens to GRIX Token" />
    </Text>
  </VStack>
);
