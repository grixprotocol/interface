import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { BoldGrix } from '../BoldGrix';

export const VestingHeader: React.FC = () => (
  <VStack align="stretch" mb={6}>
    <Heading size="md" color="white" fontWeight="600">
      Vesting
    </Heading>
    <Text color="gray.400" fontSize="sm">
      <BoldGrix text="Convert esGRIX tokens to GRIX Token" />
    </Text>
  </VStack>
);
