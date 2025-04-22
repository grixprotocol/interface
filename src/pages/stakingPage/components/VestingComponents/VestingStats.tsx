import { Grid, GridItem, Progress, Text, VStack, Button, HStack } from '@chakra-ui/react';
import React from 'react';

import { formatBalance } from '../../utils/formatters';
import { BoldGrix } from '../BoldGrix';

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
  needsApproval: boolean;
  onWithdraw: () => void;
  isWithdrawing: boolean;
};

export const VestingStats: React.FC<VestingStatsProps> = ({
  vestingData,
  onVestClick,
  isVesting,
  needsApproval,
  onWithdraw,
  isWithdrawing,
}) => (
  <VStack spacing={4} align="stretch">
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <GridItem>
        <VStack align="stretch" spacing={0.5}>
          <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="-0.01em">
            <BoldGrix text="Claimable GRIX" />
          </Text>
          <Text color="white" fontSize="lg" fontWeight="700" letterSpacing="-0.01em">
            {vestingData ? formatBalance(vestingData.claimable) : '0.0000'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem>
        <VStack align="stretch" spacing={0.5}>
          <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="-0.01em">
            <BoldGrix text="Total Vested esGRIX" />
          </Text>
          <Text color="white" fontSize="lg" fontWeight="700" letterSpacing="-0.01em">
            {vestingData ? formatBalance(vestingData.totalVested) : '0.0000'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem>
        <VStack align="stretch" spacing={0.5}>
          <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="-0.01em">
            <BoldGrix text="Available esGRIX to vest" />
          </Text>
          <Text color="white" fontSize="lg" fontWeight="700" letterSpacing="-0.01em">
            {vestingData?.esGrixBalance ? formatBalance(vestingData.esGrixBalance) : '0.0000'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem>
        <VStack align="stretch" spacing={0.5}>
          <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="-0.01em">
            <BoldGrix text="Max Vestable esGRIX" />
          </Text>
          <Text color="white" fontSize="lg" fontWeight="700" letterSpacing="-0.01em">
            {vestingData ? formatBalance(vestingData.maxVestableAmount) : '0.0000'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem colSpan={2}>
        <VStack align="stretch" spacing={0.5}>
          <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="-0.01em">
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
              />
              <Text color="white" fontSize="sm" fontWeight="500">
                {vestingData.vestingProgress.remainingDays} days remaining
              </Text>
            </>
          ) : (
            <Text color="white" fontSize="sm" fontWeight="500">
              No active vesting
            </Text>
          )}
        </VStack>
      </GridItem>
    </Grid>

    <HStack spacing={4}>
      <Button
        onClick={onVestClick}
        isLoading={isVesting}
        loadingText="Vesting"
        bg="teal.400"
        color="white"
        size="lg"
        width="full"
        height="40px"
        fontSize="sm"
        _hover={{ bg: 'teal.500' }}
        _active={{ bg: 'teal.600' }}
      >
        Vesting
      </Button>

      <Button
        onClick={onWithdraw}
        isLoading={isWithdrawing}
        loadingText="Withdrawing"
        variant="outline"
        size="lg"
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
