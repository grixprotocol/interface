import { ActionType, PositionType } from '@/api';
import { BidAskSnapshot } from '@/api/optionPriceHistory/types';
import { msValues } from '@/utils/dateUtil';

type PnlValues = {
  purchasePrice: number;
  maxPnl: number;
  currentPnl: number;
  perContract: {
    purchasePrice: number;
    maxPnl: number;
    currentPnl: number;
    maxPrice: number;
    currentPrice: number;
    maxPriceChange: number;
    currentPriceChange: number;
    maxPriceChangePercent: number;
    currentPriceChangePercent: number;
    maxPnlTimestamp: number;
  };
  total: {
    purchaseValue: number;
    maxValue: number;
    currentValue: number;
    maxValueChange: number;
    currentValueChange: number;
  };
};

export type PnlResult = {
  values: PnlValues | null;
  error?: string;
};

export const calculatePnlFromHistory = (
  priceHistory: Record<string, BidAskSnapshot>,
  signalCreatedAt: string,
  size: number,
  positionType: 'long' | 'short',
  actionType: 'open' | 'close'
): PnlResult => {
  if (!priceHistory || Object.keys(priceHistory).length === 0) {
    return { values: null, error: 'No price history data available' };
  }

  const signalTimestamp = new Date(signalCreatedAt).getTime();
  const timeEntries = Object.entries(priceHistory).sort(([a], [b]) => Number(a) - Number(b));

  // Find entry price around signal creation time
  const entrySnapshot = timeEntries.find(
    ([timestamp]) => Math.abs(Number(timestamp) - signalTimestamp) < msValues.hour
  );
  if (!entrySnapshot) {
    return {
      values: null,
      error: 'No price snapshot found near signal creation time',
    };
  }

  // For shorts we sell at bid, for longs we buy at ask
  const isLong = positionType === PositionType.long;
  const [_, entryData] = entrySnapshot;

  // Check if we have valid bid/ask data
  if (!entryData.asks.length || !entryData.bids.length) {
    return {
      values: null,
      error: 'Missing bid or ask data in entry snapshot',
    };
  }

  // For shorts we sell at bid, for longs we buy at ask
  const purchasePrice = isLong
    ? Math.min(...entryData.asks.map((q) => q.price))
    : Math.max(...entryData.bids.map((q) => q.price));

  let maxPnlPerContract = 0;
  let currentPnlPerContract = 0;
  let maxPrice = purchasePrice;
  let currentPrice = purchasePrice;
  let maxPnlTimestamp = signalTimestamp;

  // Only consider snapshots after entry for open positions
  const relevantSnapshots =
    actionType === ActionType.open
      ? timeEntries.filter(([timestamp]) => Number(timestamp) >= signalTimestamp)
      : timeEntries;

  let validPriceFound = false;

  relevantSnapshots.forEach(([timestamp, snapshot]) => {
    if (!snapshot.bids.length || !snapshot.asks.length) {
      return;
    }

    // For longs we look at bid (selling price), for shorts we look at ask (buying back price)
    const price = isLong
      ? Math.max(...snapshot.bids.map((q) => q.price))
      : Math.min(...snapshot.asks.map((q) => q.price));

    // For longs: profit = sell price - buy price
    // For shorts: profit = sell price - buy back price
    const pnl = isLong ? price - purchasePrice : purchasePrice - price;

    if (pnl > maxPnlPerContract) {
      maxPnlPerContract = pnl;
      maxPrice = price;
      maxPnlTimestamp = Number(timestamp);
    }

    currentPnlPerContract = pnl;
    currentPrice = price;
    validPriceFound = true;
  });

  if (!validPriceFound) {
    return {
      values: null,
      error: 'No valid price data found in relevant snapshots',
    };
  }

  // Calculate percentage changes
  const maxPriceChange = maxPrice - purchasePrice;
  const currentPriceChange = currentPrice - purchasePrice;
  const maxPriceChangePercent = (maxPriceChange / purchasePrice) * 100;
  const currentPriceChangePercent = (currentPriceChange / purchasePrice) * 100;

  // Calculate total position values
  const totalPurchaseValue = purchasePrice * size;
  const totalMaxValue = maxPrice * size;
  const totalCurrentValue = currentPrice * size;

  const result = {
    values: {
      purchasePrice: totalPurchaseValue,
      maxPnl: maxPnlPerContract * size,
      currentPnl: currentPnlPerContract * size,
      perContract: {
        purchasePrice,
        maxPnl: maxPnlPerContract,
        currentPnl: currentPnlPerContract,
        maxPrice,
        currentPrice,
        maxPriceChange,
        currentPriceChange,
        maxPriceChangePercent,
        currentPriceChangePercent,
        maxPnlTimestamp,
      },
      total: {
        purchaseValue: totalPurchaseValue,
        maxValue: totalMaxValue,
        currentValue: totalCurrentValue,
        maxValueChange: totalMaxValue - totalPurchaseValue,
        currentValueChange: totalCurrentValue - totalPurchaseValue,
      },
    },
  };

  return result;
};
