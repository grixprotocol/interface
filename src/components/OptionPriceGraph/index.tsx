import { Box, Grid, GridItem, HStack, Icon, Skeleton, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaChartArea } from 'react-icons/fa6';

import { useOptionPriceHistory } from '@/api';
import { Quote } from '@/api/optionPriceHistory/types';
import { UnderlyingAsset } from '@/api/types';
import { assetConfig } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/config/assetConfig';

import { defaultSeriesConfigs } from './config';
import { DataBox } from './DataBox';
import { SeriesToggle } from './SeriesToggle';
import { OptionPriceGraphProps } from './types';
import { useChart } from './useChart';

export const OptionPriceGraph: React.FC<OptionPriceGraphProps> = ({ instrumentKey, isEnabled, entryTimestamp, positionType }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { data: priceHistoryData, isLoading, isError } = useOptionPriceHistory({ optionkey: instrumentKey }, isEnabled);

  const assetName = instrumentKey.split('-')[0];
  const [visibleSeries, setVisibleSeries] = useState<string[]>(
    defaultSeriesConfigs.filter(({ defaultVisible }) => defaultVisible).map(({ name }) => (name === 'Underlying' ? assetName : name))
  );

  const [hoveredData, setHoveredData] = useState<{
    bestBid?: Quote;
    bestAsk?: Quote;
    underlying_price?: number;
    risk_free_rate?: string;
  }>();

  const toggleSeries = (index: number) => {
    const config = defaultSeriesConfigs[index];
    const seriesName = config.name === 'Underlying' ? assetName : config.name;
    setVisibleSeries((prev) => (prev.includes(seriesName) ? prev.filter((name) => name !== seriesName) : [...prev, seriesName]));
  };

  useChart(
    chartContainerRef,
    priceHistoryData?.[0]?.price_history,
    visibleSeries,
    entryTimestamp,
    setHoveredData,
    positionType,
    instrumentKey
  );

  return (
    <Box p={4} bg="whiteAlpha.50" borderRadius="lg" borderWidth="1px" borderColor="whiteAlpha.200" width="100%">
      <HStack spacing={2} mb={3}>
        <Icon as={FaChartArea} color="purple.400" boxSize={4} />
        <Text color="white" fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium">
          Price History
        </Text>
      </HStack>

      <SeriesToggle
        seriesConfigs={defaultSeriesConfigs.map((config) => ({
          ...config,
          name: config.name === 'Underlying' ? assetName : config.name,
          icon: config.name === 'Underlying' ? assetConfig[assetName as UnderlyingAsset]?.icon : undefined,
          color: config.name === 'Underlying' ? (assetName === 'ETH' ? '#3a58cf' : '#FFB74D') : config.color,
          visible: visibleSeries.includes(config.name === 'Underlying' ? assetName : config.name),
        }))}
        onToggle={toggleSeries}
      />

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        <GridItem>
          <DataBox
            title="Best Bid"
            hoveredData={hoveredData}
            borderColor="green.500"
            optionKey={instrumentKey}
            positionType={positionType}
          />
        </GridItem>

        <GridItem>
          <DataBox title="Best Ask" hoveredData={hoveredData} borderColor="red.500" optionKey={instrumentKey} positionType={positionType} />
        </GridItem>

        <GridItem colSpan={2}>
          {isError ? (
            <Box height="400px" width="100%" display="flex" alignItems="center" justifyContent="center">
              <Text color="red.400">Failed to load price history data</Text>
            </Box>
          ) : isLoading ? (
            <Skeleton height="400px" borderRadius="lg" width="100%" isLoaded={!isLoading} />
          ) : (
            <Box ref={chartContainerRef} height="400px" width="100%" />
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
