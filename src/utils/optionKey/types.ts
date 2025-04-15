import { OptionType, UnderlyingAsset } from '@/api';

/**
 * Option key string in format: 'ASSET-DDMMMYY-STRIKE-TYPE'
 * Example: 'ETH-11JAN25-3200-P'
 * Where:
 * - ASSET: Underlying asset (e.g. ETH, BTC)
 * - DDMMMYY: Expiry date (e.g. 11JAN25)
 * - STRIKE: Strike price
 * - TYPE: Option type (C for Call, P for Put)
 */
type Month = 'JAN' | 'FEB' | 'MAR' | 'APR' | 'MAY' | 'JUN' | 'JUL' | 'AUG' | 'SEP' | 'OCT' | 'NOV' | 'DEC';
type Day = `${0 | 1 | 2 | 3}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type Year = `${2 | 3}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
export type ExpiryShort = `${Day}${Month}${Year}`;
export type OptionTypeShort = 'C' | 'P';

export type OptionKey = `${UnderlyingAsset}-${ExpiryShort}-${number}-${OptionTypeShort}`;

export type OptionParams = {
  underlyingAsset: UnderlyingAsset;
  strike: number;
  expiry: number;
  optionType: OptionType;
};
