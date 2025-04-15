import { SupportedAsset } from '../types';

export type AssetPricePredictionParams = {
  asset: SupportedAsset;
  timeframe: '5m' | '8h';
};

type RawInferenceData = {
  network_inference: string;
  network_inference_normalized: string;
  confidence_interval_percentiles: string[];
  confidence_interval_percentiles_normalized: string[];
  confidence_interval_values: string[];
  confidence_interval_values_normalized: string[];
  topic_id: string;
  timestamp: number;
  extra_data: string;
};

type RawInference = {
  signature: string;
  token_decimals: number;
  inference_data: RawInferenceData;
};

type PredictionData = {
  prediction: string;
  confidenceIntervals: string[];
  timestamp: number;
  asset: PriceInferenceToken;
  timeframe: string;
  rawInference: RawInference;
};

export type AssetPricePredictionGetResponse = {
  prediction: PredictionData;
};

export enum PriceInferenceToken {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL',
  BNB = 'BNB',
  ARB = 'ARB',
}
