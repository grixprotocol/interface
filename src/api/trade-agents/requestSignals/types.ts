import { SignalRequestConfig } from '../types/TradeAgent';

export type RequestSignalsParams = {
  agentId: string;
  config: SignalRequestConfig;
};

export type RequestSignalsResponse = {
  result: string;
};
