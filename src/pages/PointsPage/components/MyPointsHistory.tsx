import { Flex, HStack, StackProps, Text, Tooltip, VStack } from '@chakra-ui/react';
import { formatDate, formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';

import { useUserAccount } from '@/utils/web3Util';

import { usePointsHistory } from '../hooks/usePointsHistory';
import { PointsContainer, separatorStyle } from '../utils';

export const MyPointsHistory = () => {
  const { address } = useUserAccount();
  const { data: userPointsRespponse } = usePointsHistory({ userAddress: address as `0x${string}` });

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const data = useMemo(() => {
    if (!userPointsRespponse) {
      return [];
    }

    return userPointsRespponse.results
      .filter((movement) => movement.total_amount !== '0') // Exclude rows with points === 0
      .map((movement) => ({
        date: movement.date,
        activity: movement.conversion_name === 'Trading Points' ? 'Trade' : movement.conversion_name,
        points: movement.total_amount,
        status: capitalizeFirstLetter(movement.payout_status),
      }));
  }, [userPointsRespponse]);

  const renderContent = () => {
    if (!address) {
      return <Text mt={4}>Connect your wallet to view your points history</Text>;
    }
    if (data?.length === 0) {
      return <Text mt={4}>No points history found</Text>;
    }

    return data.map((row, index) => (
      <HistoryRow
        key={index}
        columns={[
          <Flex flex={2} key={0}>
            <Tooltip label={formatDate(row.date, 'MM/dd/yyyy')} hasArrow placement="top">
              {capitalizeFirstLetter(formatDistanceToNow(row.date, { addSuffix: true }))}
            </Tooltip>
          </Flex>,
          row.activity,
          row.points,
          row.status,
        ]}
        fontSize={14}
      />
    ));
  };

  return (
    <PointsContainer h="275px" w="full" alignItems="flex-start" padding={0}>
      <PointsContainer.Title pt="20px" pb="0px" px="20px">
        My Points History
      </PointsContainer.Title>
      <VStack maxH="188px" w="full" gap={0}>
        <HistoryRow columns={['Date', 'Activity', 'Points', 'Status']} />
        <VStack w="full" overflowY="scroll">
          {renderContent()}
        </VStack>
      </VStack>
    </PointsContainer>
  );
};

const HistoryRow = ({ columns, ...rest }: { columns: React.ReactNode[] } & StackProps) => (
  <HStack w="full" alignItems="space-between" pb={2} pt={3} px="20px" style={separatorStyle} fontWeight={600} {...rest}>
    {columns.map((column, index) => (
      <Flex flex={1} key={index}>
        <Text textAlign={index === columns.length - 1 ? 'right' : 'left'}>{column}</Text>
      </Flex>
    ))}
  </HStack>
);
