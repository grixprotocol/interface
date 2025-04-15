import { useQuery } from '@tanstack/react-query';

import { SupportedAsset } from '@/api/types';
import { apiClient } from '@/services/apiClient';

export type AssetPriceGetResponse = {
  assetPrice: number;
};

export const useAssetPrice = (asset: SupportedAsset) =>
  useQuery({
    queryKey: ['asset-price', asset],
    queryFn: async () => {
      if (asset === SupportedAsset.USDC) {
        return 1;
      }

      const res = await apiClient.get<AssetPriceGetResponse>(`/assetprice?asset=${asset}`);
      return res.data.assetPrice;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    enabled: !!asset,
  });
