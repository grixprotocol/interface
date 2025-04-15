import { DefaultError, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { fetchTradeboard, SupportedAsset } from '@/api';
import { TradeboardResponse } from '@/api/tradeboard/types';

export const useFetchOptions = <TData>(
  { asset, protocols }: { asset: SupportedAsset; protocols: string[] },
  queryParams?: Partial<UseQueryOptions<TradeboardResponse, DefaultError, TData>>
) =>
  useQuery({
    enabled: !!asset && protocols.length > 0,
    queryKey: ['optionsMatrix', asset, protocols],
    queryFn: () =>
      fetchTradeboard({
        shouldFilterExecutionProtocols: false,
        protocols,
        asset,
      }),
    ...queryParams,
  });
