import { useState } from 'react';

import { SupportedToken, useOptionQuote } from '@/api';
import { OptionBoardItem } from '@/api/tradeboard/types';

export const useOrderToken = (option: OptionBoardItem) => {
  const { data: optionQuote, isLoading } = useOptionQuote({ optionId: option.optionId });
  const [token, setToken] = useState(SupportedToken.USDC);

  return { token, setToken, optionQuote, isLoading };
};
