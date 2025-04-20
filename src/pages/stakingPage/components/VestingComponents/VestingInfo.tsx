import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { BoldGrix } from '../BoldGrix';

export const VestingInfo: React.FC = () => (
  <VStack align="stretch" spacing={2}>
    <Text color="gray.500" fontSize="sm">
      About Vesting
    </Text>
    <Text color="gray.400" fontSize="sm">
      <BoldGrix text="Convert your esGRIX tokens to GRIX Token through the vesting process. Vested tokens are claimable on an ongoing basis." />
    </Text>
  </VStack>
);
