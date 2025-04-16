import { Grid, GridItem, Progress, Text, VStack } from '@chakra-ui/react';
import React from 'react';

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
  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
    <GridItem>
      <Text color="gray.500" fontSize="sm">
        Claimable
      </Text>
      <Text color="white" fontSize="lg">
        {vestingData?.claimable || '0'} Grix
      </Text>
    </GridItem>
    <GridItem>
      <Text color="gray.500" fontSize="sm">
        Total Vested
      </Text>
      <Text color="white" fontSize="lg">
        {vestingData?.totalVested || '0'} esGrix
      </Text>
    </GridItem>
    <GridItem>
      <Text color="gray.500" fontSize="sm">
        Available to vest{' '}
      </Text>
      <Text color="white" fontSize="lg">
        {vestingData?.esGrixBalance || '0'} esGrix
      </Text>
    </GridItem>
    <GridItem>
      <Text color="gray.500" fontSize="sm">
        Last Vesting Time
      </Text>
      <Text color="white" fontSize="sm">
        {vestingData?.lastVestingTime
          ? new Date(Number(vestingData.lastVestingTime) * 1000).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '----------'}
      </Text>
    </GridItem>
    <GridItem colSpan={2}>
      <VStack align="stretch" spacing={1}>
        <Text color="gray.500" fontSize="sm">
          Vesting Progress
        </Text>
        {vestingData?.vestingProgress?.isVesting ? (
          <>
            <Progress value={vestingData.vestingProgress.progress} size="sm" colorScheme="primary" borderRadius="full" bg="gray.700" />
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
