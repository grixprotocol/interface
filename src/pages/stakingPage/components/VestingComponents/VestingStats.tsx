import { Button, Grid, GridItem, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { formatBalance } from '../../utils/formatters';

type VestingProgress = {
  remainingDays: number;
  progress: number;
  isVesting: boolean;
};

type VestingStatsProps = {
  vestingData: {
    claimable: string;
    totalVested: string;
    maxVestableAmount: string;
    esGrixBalance?: string;
    lastVestingTime?: bigint;
    vestingProgress?: VestingProgress;
  } | null;
  onVestClick: () => void;
  isVesting: boolean;
  onWithdraw: () => void;
  isWithdrawing: boolean;
};

export const VestingStats: React.FC<VestingStatsProps> = ({
  vestingData,
  onVestClick,
  isVesting,
  onWithdraw,
  isWithdrawing,
}) => (
  <VStack spacing={3} align="stretch">
    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
      <GridItem>
        <VStack align="stretch" spacing={1}>
          <Text color="gray.500" fontSize="xs">
            Claimable GRIX
          </Text>
          <Text color="white" fontSize="sm" fontWeight="600">
            {vestingData ? formatBalance(vestingData.claimable) : '0.00'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem>
        <VStack align="stretch" spacing={1}>
          <Text color="gray.500" fontSize="xs">
            Total Vested esGRIX
          </Text>
          <Text color="white" fontSize="sm" fontWeight="600">
            {vestingData ? formatBalance(vestingData.totalVested) : '0.00'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem colSpan={2}>
        <VStack align="stretch" spacing={1}>
          <Text color="gray.500" fontSize="xs">
            Vesting Progress
          </Text>
          {vestingData?.vestingProgress?.isVesting ? (
            <>
              <Progress
                value={vestingData.vestingProgress.progress}
                size="xs"
                colorScheme="primary"
                borderRadius="full"
                bg="gray.700"
                height="6px"
              />
              <Text color="gray.400" fontSize="xs" fontWeight="500">
                {vestingData.vestingProgress.remainingDays} days remaining
              </Text>
            </>
          ) : (
            <Text color="gray.400" fontSize="xs" fontWeight="500">
              No active vesting
            </Text>
          )}
        </VStack>
      </GridItem>
    </Grid>

    <HStack spacing={3}>
      <Button
        onClick={onVestClick}
        isLoading={isVesting}
        loadingText="Vesting"
        bg="teal.400"
        color="white"
        size="md"
        width="full"
        height="40px"
        fontSize="sm"
        _hover={{ bg: 'teal.500' }}
        _active={{ bg: 'teal.600' }}
      >
        Vest
      </Button>

      <Button
        onClick={onWithdraw}
        isLoading={isWithdrawing}
        loadingText="Withdrawing"
        variant="outline"
        size="md"
        width="full"
        height="40px"
        fontSize="sm"
        color="white"
        borderColor="gray.600"
        _hover={{ bg: 'gray.800', borderColor: 'gray.500' }}
        _active={{ bg: 'gray.700', borderColor: 'teal.500' }}
        isDisabled={!vestingData || parseFloat(vestingData.claimable) <= 0}
      >
        Withdraw
      </Button>
    </HStack>
  </VStack>
);
