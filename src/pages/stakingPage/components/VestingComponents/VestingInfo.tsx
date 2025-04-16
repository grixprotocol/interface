import { Text, VStack } from '@chakra-ui/react';

type VestingInfoProps = {
  _vestingData?: {
    claimable: string;
    totalVested: string;
    maxVestableAmount: string;
  } | null;
};

export const VestingInfo: React.FC<VestingInfoProps> = ({ _vestingData }) => (
  <VStack align="stretch" spacing={1}>
    <Text fontSize="sm" color="gray.500" mb={1}>
      About Vesting
    </Text>
    <Text fontSize="sm" color="gray.400">
      Convert your esGRIX tokens to GRIX Token through the vesting process. Vested tokens are claimable on an ongoing basis.
    </Text>
  </VStack>
);
