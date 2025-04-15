import { Box, ChakraProvider, Flex, Text, VStack } from '@chakra-ui/react';
import { ISeriesApi, MouseEventParams, Time } from 'lightweight-charts';
import { createRoot } from 'react-dom/client';

type ChartTooltipParams = {
  container: HTMLDivElement;
  seriesRef: { [key: string]: ISeriesApi<'Line'> };
};

type TooltipContentProps = {
  series: [string, ISeriesApi<'Line'>][];
  seriesData: MouseEventParams<Time>['seriesData'];
  time: Time;
};

const TooltipContent = ({ series, seriesData, time }: TooltipContentProps) => {
  const timestamp = typeof time === 'number' ? time : Number(time);
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return (
    <VStack align="flex-start" spacing={2}>
      <Text fontSize="xs" color="whiteAlpha.800" fontWeight="medium">
        {formattedDate}
      </Text>
      <VStack align="flex-start" spacing={1.5} width="100%">
        {series.map(([name, series]) => {
          const data = seriesData.get(series);
          if (!data || !series.options().visible) return null;
          const price = 'value' in data ? data.value : undefined;
          if (price === undefined) return null;

          return (
            <Flex key={name} fontSize="xs" width="100%" justify="space-between" align="center">
              <Text color={series.options().color} fontWeight="medium" mr={3}>
                {name}
              </Text>
              <Text color="whiteAlpha.900">${price.toFixed(2)}</Text>
            </Flex>
          );
        })}
      </VStack>
    </VStack>
  );
};

const TooltipContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    p={3}
    minWidth="160px"
    bg="blackAlpha.800"
    borderRadius="xl"
    border="1px solid"
    borderColor="whiteAlpha.200"
    boxShadow="dark-lg"
  >
    {children}
  </Box>
);

export const createChartTooltip = ({ container, seriesRef }: ChartTooltipParams) => {
  const toolTip = document.createElement('div');
  const root = createRoot(toolTip);

  // Style the tooltip container
  toolTip.style.position = 'absolute';
  toolTip.style.display = 'none';
  toolTip.style.pointerEvents = 'none';
  toolTip.style.zIndex = '1000';
  toolTip.style.top = '0';
  toolTip.style.left = '0';

  container.style.position = 'relative';
  container.appendChild(toolTip);

  const updateTooltip = (param: MouseEventParams<Time>) => {
    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > container.clientWidth ||
      param.point.y < 0 ||
      param.point.y > container.clientHeight
    ) {
      toolTip.style.display = 'none';
      return;
    }

    const series = Object.entries(seriesRef);
    const hasVisibleData = series.some(([_, series]) => {
      const data = param.seriesData.get(series);
      return data && series.options().visible && 'value' in data;
    });

    if (!hasVisibleData) {
      toolTip.style.display = 'none';
      return;
    }

    // Get container bounds for relative positioning
    const containerRect = container.getBoundingClientRect();
    const point = param.point;
    const x = point.x as number;
    const y = point.y as number;

    // First render the tooltip to get its size
    root.render(
      <ChakraProvider>
        <TooltipContainer>
          <TooltipContent series={series} seriesData={param.seriesData} time={param.time} />
        </TooltipContainer>
      </ChakraProvider>
    );

    // After rendering, get tooltip size and adjust position
    const tooltipRect = toolTip.getBoundingClientRect();
    let left = x + 15;
    let top = y;

    // Adjust position if tooltip would overflow container
    if (left + tooltipRect.width > containerRect.width) {
      left = x - tooltipRect.width - 15;
    }
    if (top + tooltipRect.height > containerRect.height) {
      top = y - tooltipRect.height;
    }

    // Make sure we don't position outside the container
    left = Math.max(0, Math.min(left, containerRect.width - tooltipRect.width));
    top = Math.max(0, Math.min(top, containerRect.height - tooltipRect.height));

    // Apply the position
    toolTip.style.display = 'block';
    toolTip.style.left = `${left}px`;
    toolTip.style.top = `${top}px`;
  };

  return {
    updateTooltip,
    cleanup: () => {
      root.unmount();
      container.removeChild(toolTip);
    },
  };
};
