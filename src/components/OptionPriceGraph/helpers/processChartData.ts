import { UTCTimestamp } from 'lightweight-charts';

import { ChartData, ProcessedDataPoint } from './types';

export const processChartData = (priceHistoryData: ChartData): ProcessedDataPoint[] =>
  Object.entries(priceHistoryData).map(([timestamp, { asks = [], bids = [], underlying_price }]) => ({
    time: (Number(timestamp) / 1000) as UTCTimestamp,
    highestAsk: asks.length ? Math.max(...asks.map((a) => a.price)) : undefined,
    lowestAsk: asks.length ? Math.min(...asks.map((a) => a.price)) : undefined,
    highestBid: bids.length ? Math.max(...bids.map((b) => b.price)) : undefined,
    lowestBid: bids.length ? Math.min(...bids.map((b) => b.price)) : undefined,
    underlying: underlying_price ? parseFloat(underlying_price) : undefined,
  }));
