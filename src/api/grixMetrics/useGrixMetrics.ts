import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';

import { GrixMetricsData } from '@/pages/StatsPage/types';
import { apiClient } from '@/services/apiClient';

export const useGrixMetrics = () => {
  const queryResult = useQuery<GrixMetricsData, Error>({
    queryKey: ['grixmetrics'],
    queryFn: async () => {
      const response: AxiosResponse<GrixMetricsData> = await apiClient.get('/grixmetrics');
      const data = response.data;
      return data;
    },
  });

  const memoizedData = useMemo(() => queryResult.data, [queryResult.data]);
  return { data: memoizedData };
};
