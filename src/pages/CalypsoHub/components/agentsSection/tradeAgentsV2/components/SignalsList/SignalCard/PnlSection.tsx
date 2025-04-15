import { Box, Flex, HStack, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { FaChartLine, FaDollarSign, FaScaleBalanced } from 'react-icons/fa6';

import { Signal } from '@/api/trade-agents/types/TradeAgent';
import { useIsBigScreen } from '@/hooks/useIsBigScreen';
import { PnlValue } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/components/PnlSection/PnlValue';
import { usePnlCalculation } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/hooks/usePnlCalculation';
const formatTimestamp = (timestamp: number) => new Date(timestamp).toLocaleString('en-GB');

type PnlSectionProps = {
  signal: Signal;
  isEnabled: boolean;
};

export const PnlSection: React.FC<PnlSectionProps> = ({ signal, isEnabled }) => {
  const isBigScreen = useIsBigScreen();
  const { pnlResult, isPriceHistoryLoading } = usePnlCalculation(signal, isEnabled);

  const hasAchievedProfit = pnlResult?.values?.total?.maxValueChange ?? 0 > 0;
  const maxAchievedTime =
    hasAchievedProfit && pnlResult?.values?.perContract.maxPnlTimestamp
      ? formatTimestamp(pnlResult.values.perContract.maxPnlTimestamp)
      : null;

  if (pnlResult?.error) {
    return (
      <Flex justify="center" align="center" w="100%" py={4}>
        <Text color="whiteAlpha.600" fontSize="sm">
          Problem calculating PNL: {pnlResult.error}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction={isBigScreen ? 'row' : 'column'} gap={3}>
      <Box p={2} bg="whiteAlpha.100" borderRadius="lg" flex={1}>
        <HStack spacing={2} mb={1}>
          <Icon as={FaDollarSign} color="yellow.400" boxSize={3} />
          <Text color="whiteAlpha.600" fontSize="xs">
            Entry Price
          </Text>
        </HStack>
        {isPriceHistoryLoading ? (
          <Flex justify="center" py={2}>
            <Spinner size="sm" color="whiteAlpha.600" />
          </Flex>
        ) : (
          <PnlValue signal={signal} type="purchase" pnlResult={pnlResult} />
        )}
      </Box>
      <Box p={2} bg="whiteAlpha.100" borderRadius="lg" flex={1}>
        <HStack spacing={2} mb={1}>
          <Icon as={FaScaleBalanced} color="purple.400" boxSize={3} />
          <Text color="whiteAlpha.600" fontSize="xs">
            Current PNL
          </Text>
        </HStack>
        {isPriceHistoryLoading ? (
          <Flex justify="center" py={2}>
            <Spinner size="sm" color="whiteAlpha.600" />
          </Flex>
        ) : (
          <PnlValue signal={signal} type="current" pnlResult={pnlResult} />
        )}
      </Box>
      {hasAchievedProfit ? (
        <Box p={2} bg="whiteAlpha.100" borderRadius="lg" flex={1}>
          <HStack spacing={2} mb={1} align="start">
            <Icon as={FaChartLine} color="green.400" boxSize={3} mt={1} />
            <VStack spacing={0} align="start">
              <Text color="whiteAlpha.600" fontSize="xs">
                Max PNL {maxAchievedTime && `(achieved ${maxAchievedTime})`}
              </Text>
            </VStack>
          </HStack>
          {isPriceHistoryLoading ? (
            <Flex justify="center" py={2}>
              <Spinner size="sm" color="whiteAlpha.600" />
            </Flex>
          ) : (
            <PnlValue signal={signal} type="max" pnlResult={pnlResult} />
          )}
        </Box>
      ) : (
        <Box p={2} bg="whiteAlpha.100" borderRadius="lg" flex={1}>
          <HStack spacing={2} mb={1} align="start">
            <Icon as={FaChartLine} color="whiteAlpha.400" boxSize={3} mt={1} />
            <VStack spacing={0} align="start">
              <Text color="whiteAlpha.600" fontSize="xs">
                Max PNL (No profit achieved yet)
              </Text>
            </VStack>
          </HStack>
          <Text color="whiteAlpha.400" fontSize="sm" mt={2}>
            -
          </Text>
        </Box>
      )}
    </Flex>
  );
};
