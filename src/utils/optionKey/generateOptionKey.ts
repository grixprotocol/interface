import { OptionType } from '@/api';

import { ExpiryShort, OptionKey, OptionParams, OptionTypeShort } from './types';

export const generateOptionKey = (params: OptionParams): OptionKey => {
  const { underlyingAsset, expiry, strike, optionType } = params;

  const date = new Date(expiry);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][
    date.getUTCMonth()
  ];
  const year = date.getUTCFullYear().toString().slice(-2);
  const expiryShort = `${day}${month}${year}` as ExpiryShort;

  const optionTypeShort: OptionTypeShort = optionType === OptionType.call ? 'C' : 'P';

  return `${underlyingAsset}-${expiryShort}-${strike}-${optionTypeShort}`;
};
