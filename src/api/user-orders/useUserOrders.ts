import { keepPreviousData, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';

import { apiClient } from '@/services/apiClient';

import { PaginatedResponse, UserOrdersCountParams, UserOrdersParams, UserOrderType, UserRequest } from './types';

const queryKey = {
  list: ({ userAddress, type, limit, offset, fetchAll }: UserOrdersParams) => [
    'user-orders',
    userAddress,
    type,
    limit,
    offset,
    fetchAll,
  ],
  totalCount: ({ userAddress, type }: UserOrdersCountParams) => ['user-orders-count', userAddress, type],
};

const queryFn = async (url: string, fetchAll: boolean, userAddress?: string, limit?: number, offset?: number) => {
  const params = fetchAll ? { limit: 50 } : { user_account: userAddress, limit, offset };

  const response = await apiClient.get<PaginatedResponse<UserRequest>>(url, { params });

  return response.data;
};

export const useUserOrders = (
  {
    type,
    userAddress,
    limit = 10,
    offset = 0,
    fetchAll = false,
  }: {
    type: UserOrderType;
    userAddress?: string;
    limit?: number;
    offset?: number;
    fetchAll?: boolean;
  },
  options?: Partial<UseQueryOptions<PaginatedResponse<UserRequest>>>
) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey: queryKey.totalCount({ userAddress, type }) });
  }, [queryClient, userAddress, type, limit, offset, fetchAll]);

  return useQuery({
    queryKey: queryKey.list({ userAddress, type, limit, offset, fetchAll }),
    queryFn: async () => queryFn(mapTypeToEndpointUrl[type], fetchAll, userAddress, limit, offset),
    placeholderData: keepPreviousData,
    enabled: !!userAddress,
    ...options,
  });
};

export const useOrdersCount = ({ type, userAddress }: { type: UserOrderType; userAddress?: string }) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKey.totalCount({ userAddress, type }),
    queryFn: () => {
      const queries = queryClient.getQueriesData<PaginatedResponse<UserRequest>>({
        queryKey: ['user-orders', userAddress, type],
      });

      const latestData = queries?.[0]?.[1];

      return latestData?.totalCount ?? null;
    },
  });
};

const mapTypeToEndpointUrl: Record<UserOrderType, string> = {
  [UserOrderType.Positions]: '/userpositions',
  [UserOrderType.LiveOrders]: '/liveorders',
  [UserOrderType.InactiveOrders]: '/inactiveorders',
  [UserOrderType.OrdersHistory]: '/failedorders',
  [UserOrderType.History]: '/historyorders',
  [UserOrderType.Refund]: '/refundorders',
};
