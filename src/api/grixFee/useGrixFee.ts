import { useQuery } from '@tanstack/react-query';

import { useGrixConfig } from '../config/useGrixConfig';

export type GrixFeeResponse = {
  usdFee: number;
  payWithTokenFee: number;
};

export const useGrixFee = (assetPrice: number, transactionPriceUSD?: number, percentageFee?: number) => {
  const { data: config, isLoading, error } = useGrixConfig();

  const calculateFees = (): GrixFeeResponse => {
    let usdFee = config.grixFeeUSD;

    if (
      (transactionPriceUSD !== undefined && percentageFee === undefined) ||
      (transactionPriceUSD === undefined && percentageFee !== undefined)
    ) {
      throw new Error('Both transactionPriceUSD and percentageFee must be provided together.');
    }

    if (transactionPriceUSD !== undefined && percentageFee !== undefined) {
      usdFee = transactionPriceUSD * percentageFee;
    }

    const payWithTokenFee = assetPrice ? usdFee / assetPrice : 0;

    return {
      usdFee,
      payWithTokenFee,
    };
  };

  return useQuery<GrixFeeResponse, Error>({
    queryKey: ['grixFee', assetPrice, transactionPriceUSD, percentageFee],
    queryFn: () => calculateFees(),
    enabled: !isLoading && !error,
    staleTime: Infinity,
  });
};
