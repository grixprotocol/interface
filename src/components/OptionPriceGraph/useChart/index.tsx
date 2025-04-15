import { createChart, ISeriesApi } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

import { PositionType } from '@/api';

import { ChartData, HoverData } from '../helpers';
import { useChartInit } from './useChartInit';
import { useChartResize } from './useChartResize';
import { useHandleCrosshairMove } from './useHandleCrosshairMove';
import { useSeriesVisibility } from './useSeriesVisibility';

export const useChart = (
  containerRef: React.RefObject<HTMLDivElement>,
  priceHistoryData: ChartData | undefined,
  visibleSeries: string[],
  entryTimestamp?: number,
  onHoverData?: (data: HoverData) => void,
  positionType?: PositionType,
  instrumentKey?: string
) => {
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const seriesRef = useRef<Record<string, ISeriesApi<'Line'>>>({});
  const underlyingSeriesRef = useRef<ISeriesApi<'Line'>>();
  const markerSeriesRef = useRef<ISeriesApi<'Line'>>();
  const currentDataRef = useRef<ChartData>();

  const assetName = instrumentKey?.split('-')[0] || 'Underlying';
  const assetColor = assetName === 'ETH' ? '#627EEA' : '#FFB74D';

  useEffect(() => {
    currentDataRef.current = priceHistoryData;
  }, [priceHistoryData]);

  useChartResize(containerRef, chartRef.current);

  const handleCrosshairMove = useHandleCrosshairMove(containerRef, currentDataRef, onHoverData);

  useChartInit({
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
  });

  useSeriesVisibility({ seriesRef, visibleSeries });

  return { chartRef, seriesRef };
};
