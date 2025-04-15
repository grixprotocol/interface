import { useMemo } from 'react';

import { useOptionPriceHistory } from '@/api/optionPriceHistory/useOptionPriceHistory';
import { InstrumentType } from '@/api/trade-agents/types/shared';
import { Signal } from '@/api/trade-agents/types/TradeAgent';
import { calculatePnlFromHistory } from '@/components/OptionPriceGraph/pnlCalculator';

export const usePnlCalculation = (signal: Signal, isEnabled: boolean) => {
  const { data: priceHistoryData, isLoading: isPriceHistoryLoading } = useOptionPriceHistory(
    { optionkey: signal.signal.instrument },
    signal.signal.instrument_type === InstrumentType.option && isEnabled
  );

  const priceHistory = useMemo(() => {
    if (!priceHistoryData) return null;
    return priceHistoryData[0].price_history;
  }, [priceHistoryData]);

  const pnlResult = useMemo(() => {
    if (!priceHistory) return null;
    return calculatePnlFromHistory(
      priceHistory,
      signal.created_at,
      signal.signal.size,
      signal.signal.position_type,
      signal.signal.action_type
    );
  }, [priceHistory, signal]);

  return {
    pnlResult,
    isPriceHistoryLoading,
  };
};
