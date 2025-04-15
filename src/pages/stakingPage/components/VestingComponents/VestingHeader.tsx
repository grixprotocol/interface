import { Flex, Heading, Text } from '@chakra-ui/react';

import { GrixLogo } from '@/components/commons/Logo';

export const VestingHeader: React.FC = () => (
  <Flex align="center" mb={5}>
    <GrixLogo boxSize={8} mr={3} />
    <div>
      <Heading size="md" color="white" mb={1} fontWeight="600">
        Vesting
      </Heading>
      <Text color="gray.400" fontSize="sm">
        Convert esGRIX tokens to GRIX Token
      </Text>
    </div>
  </Flex>
);
