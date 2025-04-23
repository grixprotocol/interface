import { Container, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { getUserRewardTrackerData } from '@/web3Config/staking/hooks';

import { BoldGrix } from './components/BoldGrix';
import { RewardsCard } from './components/RewardsCard';
import { StakingCard } from './components/StakingCard';
import { VestingCard } from './components/VestingCard';

// Define a proper type for user reward data
type UserRewardData = {
  claimable: string;
  stakedAmount: string;
  cumulativeRewards: string;
  averageStaked: string;
};

export const StakingPage: React.FC = () => {
  const { address } = useAccount();
  const [userRewardData, setUserRewardData] = useState<UserRewardData | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const triggerRefresh = useCallback(() => {
    // Prevent multiple rapid refreshes
    if (!isRefreshing) {
      setIsRefreshing(true);
      setRefreshTrigger((prev) => prev + 1);

      // Reset the refresh lock after a short delay
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  }, [isRefreshing]);

  const fetchUserRewards = useCallback(async () => {
    if (!address) return;
    try {
      const data = await getUserRewardTrackerData(address);
      setUserRewardData(data as UserRewardData);
    } catch (error) {
      setUserRewardData(null);
    }
  }, [address]);

  const handleDataRefresh = useCallback(async () => {
    await fetchUserRewards();
    triggerRefresh();
  }, [fetchUserRewards, triggerRefresh]);

  useEffect(() => {
    void fetchUserRewards();
    const interval = setInterval(() => void fetchUserRewards(), 15000);
    return () => clearInterval(interval);
  }, [fetchUserRewards, refreshTrigger]);

  return (
    <Container maxW="1200px" px={{ base: 3, md: 4 }} py={6}>
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={4} mb={6}>
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <VStack align="flex-start" spacing={3} bg="gray.950" p={4} borderRadius="xl">
            <Heading size="lg" color="white" fontWeight="700" letterSpacing="-0.02em">
              Staking
            </Heading>
            <Text color="gray.400" fontSize="md" fontWeight="500">
              <BoldGrix text="Stake GRIX and esGRIX to start earning rewards" />
            </Text>
          </VStack>
        </GridItem>

        <GridItem>
          <StakingCard
            title="GRIX Token"
            description="Stake your GRIX tokens for WETH fees and esGRIX incentives."
            type="gx"
            refreshTrigger={refreshTrigger}
            onActionComplete={triggerRefresh}
          />
        </GridItem>

        <GridItem>
          <StakingCard
            title="Escrowed GRIX (esGRIX)"
            description="Stake your earned esGRIX for WETH fees and esGRIX incentives."
            type="esgx"
            refreshTrigger={refreshTrigger}
            onActionComplete={triggerRefresh}
          />
        </GridItem>

        <GridItem rowSpan={2}>
          <VStack align="stretch" spacing={4}>
            <RewardsCard data={userRewardData} refetchData={handleDataRefresh} />

            <VStack
              align="stretch"
              spacing={1}
              bg="gray.950"
              borderRadius="md"
              p={4}
              border="1px solid"
              borderColor="gray.900"
              _hover={{ borderColor: 'gray.800' }}
              as="a"
              href="https://docs.grix.finance/gitbook/tokenomics/overview"
              target="_blank"
              rel="noopener noreferrer"
              cursor="pointer"
              transition="all 0.2s"
              _active={{ transform: 'scale(0.98)' }}
            >
              <Heading size="sm" color="white" fontWeight="700" letterSpacing="-0.01em">
                Learn about Staking
              </Heading>
              <Text color="gray.400" fontSize="sm" fontWeight="500">
                Check out our staking walkthrough and guides
              </Text>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={4} mb={6}>
        <GridItem colSpan={{ base: 1, lg: 3 }} bg="gray.950" p={4} borderRadius="xl">
          <VStack align="stretch" spacing={3}>
            <Heading size="md" color="white" fontWeight="700" letterSpacing="-0.02em" mb={1}>
              Vesting
            </Heading>
            <VestingCard onActionComplete={triggerRefresh} userRewardData={userRewardData} />
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};
