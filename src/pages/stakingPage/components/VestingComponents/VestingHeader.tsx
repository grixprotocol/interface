import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const VestingHeader: React.FC = () => (
  <VStack align="stretch" mb={3} spacing={1}>
    <Text color="white" fontSize="sm" fontWeight="600" letterSpacing="-0.01em">
      Vesting
    </Text>
    <Text color="gray.400" fontSize="xs">
      Convert esGRIX tokens to GRIX Token
    </Text>
  </VStack>
);
