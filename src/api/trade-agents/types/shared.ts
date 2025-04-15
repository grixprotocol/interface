import { UnderlyingAsset } from '@/api/types';

/**
 * Option key string in format: 'ASSET-DDMMMYY-STRIKE-TYPE'
 * Example: 'ETH-11JAN25-3200-P'
 * Where:
 * - ASSET: Underlying asset (e.g. ETH, BTC)
 * - DDMMMYY: Expiry date (e.g. 11JAN25)
 * - STRIKE: Strike price
 * - TYPE: Option type (C for Call, P for Put)
 */
export type OptionKey = string;

/**
 * Type representing the instrument a trade agent can trade
 * Can be either an underlying asset (e.g. ETH, BTC) or an option contract key
 * @example
 * // Underlying asset
 * const instrument: Instrument = UnderlyingAsset.ETH
 * // Option key
 * const instrument: Instrument = "ETH-30JUN23-1750-C" // ETH $1750 Call expiring June 30, 2023
 */
export type Instrument = UnderlyingAsset | OptionKey;

export enum InstrumentType {
  asset = 'asset',
  option = 'option',
}
