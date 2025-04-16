import { Center, Text } from '@chakra-ui/react';

import { UserOrderType } from '@/api';

type NoResultsProps = {
  tab: UserOrderType;
  arrayLength: number;
  isOpenPositions?: boolean | null;
};

export const NoResults: React.FC<NoResultsProps> = ({ tab, arrayLength, isOpenPositions }) => (
  <Center top="100%" left="50%" pos="absolute">
    <Text fontSize="sm" color="gray.300">
      {tab === UserOrderType.Positions &&
        arrayLength === 0 &&
        (isOpenPositions === null
          ? 'No positions found.'
          : isOpenPositions
          ? 'No open positions.'
          : 'No closed positions.')}
      {tab === UserOrderType.LiveOrders && arrayLength === 0 && 'No live orders.'}
      {tab === UserOrderType.History && arrayLength === 0 && 'No trading history yet.'}
    </Text>
  </Center>
);
