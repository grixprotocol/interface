import { UTCTimestamp } from 'lightweight-charts';

import { Quote } from '@/api/optionPriceHistory/types';

export type PriceData = {
  asks: Quote[];
  bids: Quote[];
  underlying_price?: string;
  risk_free_rate?: string;
};

export type ChartData = Record<string, PriceData>;

export type ProcessedDataPoint = {
  time: UTCTimestamp;
  highestAsk?: number;
  lowestAsk?: number;
  highestBid?: number;
  lowestBid?: number;
  underlying?: number;
};

export type HoverData = {
  bestBid?: Quote;
  bestAsk?: Quote;
  underlying_price?: number;
  risk_free_rate?: string;
};
