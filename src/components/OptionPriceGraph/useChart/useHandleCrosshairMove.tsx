import { MouseEventParams, Time } from 'lightweight-charts';
import { MutableRefObject, useCallback } from 'react';

import { Quote } from '@/api/optionPriceHistory/types';

import { ChartData, HoverData } from '../helpers';

export const useHandleCrosshairMove = (
  containerRef: React.RefObject<HTMLDivElement>,
  currentDataRef: MutableRefObject<ChartData | undefined>,
  onHoverData?: (data: HoverData) => void
) =>
  useCallback(
    (param: MouseEventParams<Time>) => {
      const container = containerRef.current;
      if (
        !container ||
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        onHoverData?.({
          bestBid: undefined,
          bestAsk: undefined,
          underlying_price: undefined,
          risk_free_rate: undefined,
        });
        return;
      }

      const timestamp = (Number(param.time) * 1000).toString();
      const currentData = currentDataRef.current?.[timestamp];

      if (currentData) {
        const bestBid = currentData.bids.reduce(
          (best, current) => (!best || current.price > best.price ? current : best),
          undefined as Quote | undefined
        );

        const bestAsk = currentData.asks.reduce(
          (best, current) => (!best || current.price < best.price ? current : best),
          undefined as Quote | undefined
        );

        onHoverData?.({
          bestBid,
          bestAsk,
          underlying_price: currentData.underlying_price ? parseFloat(currentData.underlying_price) : undefined,
          risk_free_rate: currentData.risk_free_rate,
        });
      } else {
        onHoverData?.({
          bestBid: undefined,
          bestAsk: undefined,
          underlying_price: undefined,
          risk_free_rate: undefined,
        });
      }
    },
    [containerRef, currentDataRef, onHoverData]
  );
