import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { AssetPricePredictionGetResponse, AssetPricePredictionParams } from './types';

export const useAssetPricePrediction = () =>
  useMutation({
    mutationFn: async (params: AssetPricePredictionParams) => {
      const res = await apiClient.get<AssetPricePredictionGetResponse>(
        `/assetpriceprediction?asset=${params.asset}&timeframe=${params.timeframe}`
      );
      return res.data;
    },
  });
