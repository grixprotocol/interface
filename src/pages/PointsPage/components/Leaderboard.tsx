import { HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addressShortcut, useUserAccount } from '@/utils/web3Util';

import { useUserPoints } from '../hooks/useUserPoints';
import { PointsContainer, separatorStyle } from '../utils';

export const Leaderboard = () => {
  const { address } = useUserAccount();
  const { data: userPointsResponse } = useUserPoints({ pageSize: 30 });
  const { data: userData } = useUserPoints({
    userAddress: address as `0x${string}`,
  });

  const data = useMemo(() => {
    if (!userPointsResponse || !userData) {
      return [];
    }

    return [userData.results[0], ...userPointsResponse.results]
      .filter((x) => !!x)
      .map((point) => ({
        rank: point.rank,
        wallet: point.address,
        points: Number(point.total_amount).toLocaleString(),
      }));
  }, [userPointsResponse, userData]);

  return (
    <PointsContainer h="295px" w="full" alignItems="flex-start" padding={0}>
      <PointsContainer.Title pt="20px" pb="0px" px="20px">
        Leaderboard
      </PointsContainer.Title>{' '}
      <VStack maxH="220px" w="full" gap={0}>
        <LeaderboardRow columns={['Rank', 'Wallet', 'Points']} />
        {data.length === 0 ? (
          <Text mt={4}>Error getting leaderboard</Text>
        ) : (
          <VStack w="full" overflowY="scroll">
            {data.map((row, index) => (
              <LeaderboardRow
                key={index}
                columns={[row.rank, addressShortcut(row.wallet), row.points]}
                isHighlighted={index === 0}
                fontSize={14}
              />
            ))}
          </VStack>
        )}
      </VStack>
    </PointsContainer>
  );
};

const LeaderboardRow = ({
  columns,
  isHighlighted,
  ...rest
}: { columns: React.ReactNode[]; isHighlighted?: boolean } & StackProps) => (
  <HStack w="full" alignItems="space-between" pb={2} pt={3} px="20px" style={separatorStyle} {...rest}>
    {columns.map((column, index) => (
      <Text
        key={index}
        w="full"
        textAlign={index === columns.length - 1 ? 'right' : 'left'}
        color={isHighlighted ? 'gold' : undefined}
        fontWeight={600}
      >
        {column}
      </Text>
    ))}
  </HStack>
);
