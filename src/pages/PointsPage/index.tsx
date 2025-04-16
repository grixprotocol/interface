import { Flex, VStack } from '@chakra-ui/react';

import { layoutConstants } from '@/configDesign';
import { useIsBigScreen } from '@/hooks/useIsBigScreen';

import { Leaderboard } from './components/Leaderboard';
import { Milestones } from './components/Milestones';
import { MyPoints } from './components/MyPoints';
import { MyPointsHistory } from './components/MyPointsHistory';
import { Referrals } from './components/Referrals';
import { TradeAndEarn } from './components/TradeAndEarn';
import background from './Images/sphere_bg.svg';

export const PointsPage = () => {
  const isBigScreen = useIsBigScreen();
  return (
    <Flex
      minHeight={layoutConstants.mainContentHeight}
      align="flex-start"
      justify="center"
      data-testid="points-page"
      pt="60px"
      backgroundImage={`url(${background})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Flex
        direction={isBigScreen ? 'row' : 'column'}
        gap={6}
        w="full"
        maxW="1440px"
        px={{ base: 4, lg: 8 }}
        pb={{ base: 24, lg: 8 }}
      >
        <VStack spacing={6} align="stretch" flex={1}>
          <MyPoints />
          <TradeAndEarn isBigScreen={isBigScreen} />
          <Referrals />
          <MyPointsHistory />
        </VStack>
        <VStack spacing={6} align="stretch" flex={1}>
          <Leaderboard />
          <Milestones />
        </VStack>
      </Flex>
    </Flex>
  );
};
