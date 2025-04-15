import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { SupportedToken } from '../types';

export type OptionQuote = {
  optionId: number;
  prices: {
    token: SupportedToken;
    price: number;
    fee: number;
    totalPrice: number;
  }[];
};

export const useOptionQuote = ({ optionId }: { optionId: number }) => {
  const fetchOptionQuote = async () => {
    const params = {
      optionId,
    };
    const response = await apiClient.get<OptionQuote>(`/quote`, { params });
    return response.data;
  };

  return useQuery({
    queryKey: ['option-quote', optionId],
    queryFn: fetchOptionQuote,
  });
};
