import { useCallback, useEffect } from 'react';

import { TradeboardResponse } from '@/api/tradeboard/types';
import { useTradeForm } from '@/pages/TradePage/components/TradeFormProvider';
import { findNearestUpcomingDate } from '@/utils/dateUtil';

import { useFetchOptions } from './useFetchOptions';

export const useExpirations = ({ protocols }: { protocols: string[] }) => {
  const { asset, expirationDate, onExpirationDateChange } = useTradeForm();

  const select = useCallback((tradeboard: TradeboardResponse) => tradeboard.expirationBoard.sort(), []);

  const { data: expirationDates, isLoading } = useFetchOptions({ asset, protocols }, { select });

  useEffect(() => {
    if (!expirationDate && expirationDates) {
      onExpirationDateChange(findNearestUpcomingDate(expirationDates) ?? expirationDates[0]);
    }
  }, [expirationDates, expirationDate, onExpirationDateChange]);

  return { expirationDates, isLoading };
};
