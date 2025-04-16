import { Signal } from '@/api/trade-agents/types/TradeAgent';

import { usePnlCalculation } from '../../../hooks/usePnlCalculation';

export const useRequestMaxProfit = (signals: Signal[]) => {
  if (!signals || signals.length === 0) {
    return { anyLoading: false, maxValueChange: 0 };
  }

  // Call each hook individually at the top level
  const pnlResults = [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  for (let i = 0; i < signals.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pnlResults.push(usePnlCalculation(signals[i], true));
  }

  const anyLoading = pnlResults.some((result) => result.isPriceHistoryLoading);
  const maxValueChange = pnlResults.reduce((max, result) => Math.max(max, result.pnlResult?.values?.total?.maxValueChange ?? 0), 0);

  return { anyLoading, maxValueChange };
};
