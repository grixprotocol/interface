import { Box, Container, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { getUserRewardTrackerData } from '@/web3Config/staking/hooks';

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
    const interval = setInterval(() => void fetchUserRewards(), 30000);
    return () => clearInterval(interval);
  }, [fetchUserRewards, refreshTrigger]);

  return (
    <Box bg="gray.950" minH="100vh">
      <Container maxW="1400px" px={{ base: 4, md: 6 }} py={8}>
        <VStack align="flex-start" spacing={2} mb={8}>
          <Heading size="lg" color="white" fontWeight="600">
            Staking
          </Heading>
          <Text color="gray.400" fontSize="md">
            Stake GRIX and esGRIX to start earning rewards
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr) 340px' }} gap={6} mb={8}>
          <GridItem>
            <StakingCard
              title="GRIX Token"
              description="Stake your GRIX tokens for ETH fees and esGRIX incentives."
              type="gs"
              refreshTrigger={refreshTrigger}
              onActionComplete={triggerRefresh}
            />
          </GridItem>

          <GridItem>
            <StakingCard
              title="Escrowed GRIX (esGRIX)"
              description="Stake your earned esGRIX for ETH fees and esGRIX incentives."
              type="esgs"
              refreshTrigger={refreshTrigger}
              onActionComplete={triggerRefresh}
            />
          </GridItem>

          <GridItem rowSpan={2}>
            <VStack align="stretch" spacing={6}>
              <RewardsCard data={userRewardData} refetchData={handleDataRefresh} />

              <Box bg="gray.950" borderRadius="lg" p={6} border="1px solid" borderColor="gray.900" _hover={{ borderColor: 'gray.800' }}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="sm" color="white" fontWeight="600">
                    Learn about Staking
                  </Heading>
                  <Text color="gray.400" fontSize="sm">
                    Check out our staking walkthrough and guides
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        <VStack align="stretch" spacing={4} mb={8}>
          <Heading size="md" color="white" fontWeight="600" mb={2}>
            Vesting
          </Heading>
          <VestingCard onActionComplete={triggerRefresh} />
        </VStack>
      </Container>
    </Box>
  );
};
