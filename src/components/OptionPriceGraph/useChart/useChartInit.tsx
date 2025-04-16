import { createChart, ISeriesApi, MouseEventParams, Time, UTCTimestamp } from 'lightweight-charts';
import { useEffect } from 'react';

import { PositionType } from '@/api';
import { msValues } from '@/utils/dateUtil';

import { createChartTooltip } from '../ChartTooltip';
import { chartOptions, defaultSeriesConfigs, defaultSeriesOptions } from '../config';
import { addEntryMarker, ChartData, processChartData, ProcessedDataPoint } from '../helpers';

type UseChartInitProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  priceHistoryData: ChartData | undefined;
  visibleSeries: string[];
  entryTimestamp?: number;
  handleCrosshairMove: (param: MouseEventParams<Time>) => void;
  positionType?: PositionType;
  assetName: string;
  assetColor: string;
  chartRef: React.MutableRefObject<ReturnType<typeof createChart> | undefined>;
  seriesRef: React.MutableRefObject<Record<string, ISeriesApi<'Line'>>>;
  underlyingSeriesRef: React.MutableRefObject<ISeriesApi<'Line'> | undefined>;
  markerSeriesRef: React.MutableRefObject<ISeriesApi<'Line'> | undefined>;
};

export const useChartInit = ({
  containerRef,
  priceHistoryData,
  visibleSeries,
  entryTimestamp,
  handleCrosshairMove,
  positionType,
  assetName,
  assetColor,
  chartRef,
  seriesRef,
  underlyingSeriesRef,
  markerSeriesRef,
}: UseChartInitProps) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !priceHistoryData) return;

    const chart = createChart(container, {
      ...chartOptions,
      width: container.clientWidth,
      height: 400,
      rightPriceScale: {
        visible: true,
      },
      leftPriceScale: {
        visible: visibleSeries.includes(assetName),
        borderColor: 'rgba(197, 203, 206, 0.4)',
        ticksVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });
    chartRef.current = chart;

    // Initialize series
    const series = defaultSeriesConfigs.reduce((acc, { name, color, lineStyle }) => {
      acc[name] = chart.addLineSeries({
        ...defaultSeriesOptions,
        color,
        lineStyle,
        visible: visibleSeries.includes(name),
      });
      return acc;
    }, {} as Record<string, ISeriesApi<'Line'>>);
    seriesRef.current = series;

    const underlyingSeries = chart.addLineSeries({
      ...defaultSeriesOptions,
      color: assetColor,
      lineWidth: 2,
      priceScaleId: 'left',
      visible: visibleSeries.includes(assetName),
      lineStyle: 2,
      title: '',
    });
    underlyingSeriesRef.current = underlyingSeries;

    chart.subscribeCrosshairMove(handleCrosshairMove);

    const tooltip = createChartTooltip({
      container,
      seriesRef: {
        ...series,
        ...(visibleSeries.includes(assetName) && underlyingSeriesRef.current ? { [assetName]: underlyingSeriesRef.current } : {}),
      },
    });
    chart.subscribeCrosshairMove(tooltip.updateTooltip);

    // Process and set data
    const processedData = processChartData(priceHistoryData);

    const seriesDataMap = {
      'Highest Ask': 'highestAsk',
      'Best Ask': 'lowestAsk',
      'Best Bid': 'highestBid',
      'Lowest Bid': 'lowestBid',
    } as const;

    Object.entries(seriesDataMap).forEach(([seriesName, dataKey]) => {
      const seriesData = processedData
        .filter((d) => d[dataKey] !== undefined)
        .map((d) => ({
          time: d.time,
          value: d[dataKey] as number,
        }));
      series[seriesName].setData(seriesData);
    });

    const underlyingData = processedData
      .filter((d) => d.underlying !== undefined)
      .map((d) => ({
        time: d.time,
        value: d.underlying as number,
      }));
    underlyingSeries.setData(underlyingData);

    // Add entry point marker if needed
    if (entryTimestamp && visibleSeries.includes('Entry Point')) {
      const roundedEntryTime = Math.round(entryTimestamp / msValues.hour) * msValues.hour;
      const entryTime = (roundedEntryTime / 1000) as UTCTimestamp;

      const entryDataPoint = processedData.reduce((closest, current) => {
        if (!closest) return current;
        return Math.abs(current.time - entryTime) < Math.abs(closest.time - entryTime) ? current : closest;
      }, null as ProcessedDataPoint | null);

      if (entryDataPoint) {
        const isShort = positionType === PositionType.short;
        const price = isShort ? entryDataPoint.highestBid : entryDataPoint.lowestAsk;

        if (price) {
          const mainSeries = isShort ? series['Best Bid'] : series['Best Ask'];
          if (mainSeries) {
            addEntryMarker(mainSeries, entryTime, price);
          }
        }
      }
    }

    chart.timeScale().fitContent();

    // Capture current refs that will be used in cleanup
    const currentMarkerSeries = markerSeriesRef.current;
    const currentUnderlyingSeries = underlyingSeriesRef.current;

    return () => {
      tooltip.cleanup();
      if (currentMarkerSeries) {
        chart.removeSeries(currentMarkerSeries);
      }
      if (currentUnderlyingSeries) {
        chart.removeSeries(currentUnderlyingSeries);
      }
      chart.remove();
    };
  }, [
    chartRef,
    markerSeriesRef,
    underlyingSeriesRef,
    seriesRef,
    containerRef,
    priceHistoryData,
    visibleSeries,
    entryTimestamp,
    handleCrosshairMove,
    positionType,
    assetName,
    assetColor,
  ]);
};
