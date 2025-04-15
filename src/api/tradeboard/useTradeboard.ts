import { useQuery } from '@tanstack/react-query';

import { PositionTypes, SupportedAsset, TradeOptionType } from '@/api/types';
import { protocolsArrayData } from '@/config';
import { apiClient } from '@/services/apiClient';
import { msValues } from '@/utils/dateUtil';

import { TradeboardQueryFilters, TradeboardResponse } from './types';

export const refetchInterval = 20 * msValues.second;

export const useTradeboard = ({
  shouldFilterExecutionProtocols,
  positionType,
  optionType,
  asset,
}: {
  shouldFilterExecutionProtocols?: boolean;
  positionType: PositionTypes;
  optionType: TradeOptionType;
  asset: SupportedAsset;
}) => {
  const { data, isLoading, isError, error, isFetching } = useQuery<TradeboardResponse>({
    queryKey: ['tradeboard', asset, optionType, positionType, shouldFilterExecutionProtocols],
    queryFn: () => fetchTradeboard({ shouldFilterExecutionProtocols, positionType, optionType, asset }),
    enabled: !!asset && !!optionType && !!positionType,
    refetchInterval,
  });

  return { data, isLoading, isError, error, isFetching };
};

export const fetchTradeboard = async ({
  shouldFilterExecutionProtocols,
  protocols,
  positionType,
  optionType,
  asset,
}: {
  shouldFilterExecutionProtocols?: boolean;
  protocols?: string[];
  positionType?: PositionTypes;
  optionType?: TradeOptionType;
  asset: SupportedAsset;
}) => {
  const protocolsFilter =
    protocols ??
    protocolsArrayData.filter((p) => !shouldFilterExecutionProtocols || p.isExecution).map((p) => p.protocolName);

  const filters: TradeboardQueryFilters = {
    positionType,
    optionType,
    asset,
    protocols: protocolsFilter.join(','),
  };
  const response = await apiClient.get<TradeboardResponse>(`/tradeboard`, { params: filters });
  return response.data;
};
