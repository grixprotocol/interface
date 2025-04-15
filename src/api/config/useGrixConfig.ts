import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

export type ConfigGetResponse = {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  whitelistedAddresses: string[];
  protocolsAllowQuote: string[];
  supportedProtocols: string[];
  supportedAssets: string[];
  FEE_PERCENTAGE: number;
  grixFeeUSD: number;
};

const defaultConfig: ConfigGetResponse = {
  name: '',
  version: '',
  description: '',
  author: '',
  license: '',
  whitelistedAddresses: [],
  protocolsAllowQuote: [],
  supportedProtocols: [],
  supportedAssets: [],
  FEE_PERCENTAGE: 0.1, // 1%
  grixFeeUSD: 0,
};

export const useGrixConfig = () => {
  const query = useQuery({
    queryKey: ['grix-config'],
    queryFn: async () => {
      const response = await apiClient.get<ConfigGetResponse>('/configs');

      return response.data;
    },
  });

  return {
    ...query,
    data: query.data ?? defaultConfig,
  };
};
