import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { MarketStatusGetResponse } from '../helpers/types';

export const useMarketsStatus = () =>
  useQuery({
    queryKey: ['marketstatus'],
    queryFn: async () => {
      const response = await apiClient.get<MarketStatusGetResponse>(`/marketstatus`);
      return response.data.marketStatus;
    },
  });
