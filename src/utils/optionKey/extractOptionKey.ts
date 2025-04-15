import { OptionKey } from '@/api/trade-agents/types/shared';
import { OptionType, UnderlyingAsset } from '@/api/types';

import { parseExpiryShort } from './timeUtils';
import { ExpiryShort, OptionParams, OptionTypeShort } from './types';

export const extractOptionKey = <T extends OptionKey>(optionKey: T): OptionParams => {
  const [underlyingAsset, expiryOriginal, strikeOriginal, optionTypeShort] = optionKey.split('-') as [
    UnderlyingAsset,
    ExpiryShort,
    string,
    OptionTypeShort
  ];

  const expiry = parseExpiryShort(expiryOriginal);
  const strike = Number(strikeOriginal);
  if (!Number.isInteger(strike)) throw new Error(`Invalid strike: ${strikeOriginal}`);
  const optionType = optionTypeShort === 'C' ? OptionType.call : OptionType.put;

  return { underlyingAsset, expiry, strike, optionType };
};
