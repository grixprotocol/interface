import { Badge, Flex, HStack, Icon, StackProps, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FaTrophy } from 'react-icons/fa';

import { formatNumberWithSuffix } from '@/utils/number';
import { useUserAccount } from '@/utils/web3Util';

import { useUserPoints } from '../hooks/useUserPoints';
import { PointsContainer, separatorStyle, TradeButton } from '../utils';

const milestones = [10000, 100000, 500000, 1000000, 2000000];

export const Milestones = () => {
  const { address } = useUserAccount();
  const { data: userPointsResponse } = useUserPoints({
    userAddress: address as `0x${string}`,
  });

  const userPoints = userPointsResponse?.results[0]?.total_amount
    ? Number(userPointsResponse.results[0].total_amount) * 10
    : 0;

  const data = useMemo(() => {
    const nearestMilestone = milestones.find((milestone) => milestone > userPoints) ?? 0;

    return milestones.map((milestone) => ({
      milestone,
      description:
        userPoints >= milestone
          ? `You did it! ${formatNumberWithSuffix(milestone)} milestone achieved.`
          : milestone === nearestMilestone
          ? `Almost there! Hit the ${formatNumberWithSuffix(milestone)} for the next level!`
          : `${formatNumberWithSuffix(milestone)} is a challenge, but the rewards are big!`,
      isCompleted: userPoints >= milestone,
    }));
  }, [userPoints]);

  return (
    <PointsContainer h="440px" w="full" alignItems="flex-start" spacing={0}>
      <HStack gap={4} style={separatorStyle} w="full" pb={2}>
        <Icon as={FaTrophy} boxSize={6} />
        <VStack alignItems="flex-start" spacing={0}>
          <PointsContainer.Title>Hit Milestones Bonus</PointsContainer.Title>
          <Text fontSize={14} color="gray.200">
            Unlock bonus points on volume milestones
          </Text>
        </VStack>
      </HStack>
      <VStack maxH="400px" overflowY="scroll" w="full">
        {data?.length === 0 ? (
          <Text mt={4}>No points history found</Text>
        ) : (
          data.map((row, index) => (
            <MilestoneRow
              key={index}
              columns={[
                <Badge
                  key={0}
                  variant="primaryGradient"
                  fontSize={20}
                  py={1}
                  borderRadius="800px"
                  fontStyle="italic"
                  minW="90px"
                  textAlign="center"
                >
                  ${formatNumberWithSuffix(row.milestone)}
                </Badge>,
                <Flex key={1} flex={8} alignItems="center">
                  <Text color="gray.300">{row.description}</Text>
                </Flex>,
                <Flex key={2} flex={1}>
                  <TradeButton isCompleted={row.isCompleted} />
                </Flex>,
              ]}
              fontSize={14}
            />
          ))
        )}
      </VStack>
    </PointsContainer>
  );
};

const MilestoneRow = ({ columns, ...rest }: { columns: React.ReactNode[] } & StackProps) => (
  <HStack w="full" alignItems="space-between" pb={2} pt={3} px={2} style={separatorStyle} {...rest}>
    {columns.map((column) => column)}
  </HStack>
);
