import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '@/services/apiClient';
import { msValues } from '@/utils/dateUtil';

import { OptionPriceHistoryParams, OptionPriceHistoryResponse } from './types';

export const useOptionPriceHistory = (params: OptionPriceHistoryParams, isEnabled: boolean) => {
  const { optionkey } = params;

  return useQuery({
    queryKey: ['option-price-history', optionkey],
    queryFn: async () => {
      const response = await apiClient.get<OptionPriceHistoryResponse>('/option-price-history', {
        params: {
          optionkey,
        },
      });
      return response.data?.results ?? [];
    },
    enabled: Boolean(optionkey && isEnabled),
    retry(failureCount, error) {
      if (failureCount >= 3 || (error instanceof AxiosError && error.response?.status === 404)) {
        return false;
      }
      return true;
    },
    staleTime: msValues.hour,
    gcTime: msValues.hour,
  });
};
