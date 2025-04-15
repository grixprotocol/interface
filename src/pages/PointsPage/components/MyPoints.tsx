import { Flex, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaQuestionCircle } from 'react-icons/fa';

import { useUserAccount } from '@/utils/web3Util';

import { useUserPoints } from '../hooks/useUserPoints';
import { PointsContainer } from '../utils';

export const MyPoints = () => {
  const { address } = useUserAccount();
  const { data } = useUserPoints({ userAddress: address as `0x${string}` });
  const amount = data?.results[0]?.total_amount ?? 'N/A';
  const rank = data?.results[0]?.rank ?? 'N/A';

  return (
    <PointsContainer h="130px">
      <HStack w="full" spacing={4}>
        <VStack alignItems="flex-start" flex={3} spacing={2}>
          <HStack spacing={4}>
            <PointsContainer.Title>My Points</PointsContainer.Title>
          </HStack>
          <Text fontSize={14} color="gray.300">
            Earn points through trading and referrals
          </Text>
        </VStack>

        <VStack alignItems="flex-start" flex={1} spacing={2}>
          <HStack spacing={2}>
            <PointsContainer.Title>Score</PointsContainer.Title>
            <Tooltip
              label="Scores and positions update hourly, points history updates in real-time"
              aria-label="Score update info"
              placement="top"
              hasArrow
            >
              <Flex>
                <Icon as={FaQuestionCircle} boxSize={4} />
              </Flex>
            </Tooltip>
          </HStack>
          <Text color="#ffab19" fontSize="3xl" style={{ textShadow: '0 0 10px #ffab19' }}>
            {amount}
          </Text>
        </VStack>

        <VStack alignItems="flex-start" flex={1} spacing={2}>
          <PointsContainer.Title>Position</PointsContainer.Title>
          <Text color="#ffab19" fontSize="3xl" style={{ textShadow: '0 0 10px #ffab19' }}>
            {rank}
          </Text>
        </VStack>
      </HStack>
    </PointsContainer>
  );
};
