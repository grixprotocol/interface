import { Grid, GridItem, Progress, Text, VStack } from '@chakra-ui/react';
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
};

export const VestingStats: React.FC<VestingStatsProps> = ({ vestingData }) => (
  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
    <GridItem>
      <VStack align="stretch" spacing={1}>
        <Text color="gray.500" fontSize="sm">
          <BoldGrix text="Claimable GRIX" />
        </Text>
        <Text color="white" fontSize="xl" fontWeight="700">
          {vestingData ? formatBalance(vestingData.claimable) : '0.0000'}
        </Text>
      </VStack>
    </GridItem>

    <GridItem>
      <VStack align="stretch" spacing={1}>
        <Text color="gray.500" fontSize="sm">
          <BoldGrix text="Total Vested GRIX" />
        </Text>
        <Text color="white" fontSize="xl" fontWeight="700">
          {vestingData ? formatBalance(vestingData.totalVested) : '0.0000'}
        </Text>
      </VStack>
    </GridItem>

    <GridItem>
      <VStack align="stretch" spacing={1}>
        <Text color="gray.500" fontSize="sm">
          <BoldGrix text="Available esGRIX" />
        </Text>
        <Text color="white" fontSize="xl" fontWeight="700">
          {vestingData?.esGrixBalance ? formatBalance(vestingData.esGrixBalance) : '0.0000'}
        </Text>
      </VStack>
    </GridItem>

    <GridItem>
      <VStack align="stretch" spacing={1}>
        <Text color="gray.500" fontSize="sm">
          <BoldGrix text="Max Vestable esGRIX" />
        </Text>
        <Text color="white" fontSize="xl" fontWeight="700">
          {vestingData ? formatBalance(vestingData.maxVestableAmount) : '0.0000'}
        </Text>
      </VStack>
    </GridItem>

    <GridItem colSpan={2}>
      <VStack align="stretch" spacing={1}>
        <Text color="gray.500" fontSize="sm">
          Vesting Progress
        </Text>
        {vestingData?.vestingProgress?.isVesting ? (
          <>
            <Progress
              value={vestingData.vestingProgress.progress}
              size="sm"
              colorScheme="primary"
              borderRadius="full"
              bg="gray.700"
            />
            <Text color="white" fontSize="sm">
              {vestingData.vestingProgress.remainingDays} days remaining
            </Text>
          </>
        ) : (
          <Text color="white" fontSize="sm">
            No active vesting
          </Text>
        )}
      </VStack>
    </GridItem>
  </Grid>
);
