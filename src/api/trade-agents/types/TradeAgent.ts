import { UnderlyingAsset } from '@/api/types';

import { InstrumentType } from './shared';

export enum AgentStatus {
  active = 'active',
  paused = 'paused',
  disabled = 'disabled',
  failed = 'failed',
}

type Web3Account = {
  address: string;
  infrastructure: string;
};

export type SignalRequestConfig = {
  assets: UnderlyingAsset[];
  protocols: string[];
  budget_usd: string;
  trade_window_ms: number;
  context_window_ms: number;
  user_prompt?: string;
  input_data: AgentInputType[];
};

export type TradeAgentConfig = {
  agent_name: string;
  is_simulation: boolean;
  signal_request_config: SignalRequestConfig;
};

export type TradeAgent = {
  id: string;
  config: TradeAgentConfig;
  status: AgentStatus;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
  web3account?: Web3Account;
  signal_requests: TradeAgentSignalRequest[];
};

export type Signal = {
  id: string;
  signal: {
    size: number;
    reason: string;
    instrument: string;
    action_type: 'open' | 'close';
    position_type: 'long' | 'short';
    instrument_type: InstrumentType;
    target_position_id: string | null;
    expected_total_price_usd: number;
    expected_instrument_price_usd: number;
    confidence?: number;
    time_frame?: string;
    risk_level?: string;
  };
  created_at: string;
  updated_at: string;
};

export type TradeAgentSignalRequest = {
  id: string;
  config: SignalRequestConfig;
  progress: RequestProgress;
  signals: Signal[];
  failure_reason?: string;
  created_at: string;
  updated_at: string;
};

export enum RequestProgress {
  requestReceived = 'requestReceived',
  fetchingData = 'fetchingData',
  analyzingData = 'analyzingData',
  creatingSignals = 'creatingSignals',
  completed = 'completed',
}

export enum AgentInputType {
  marketData = 'marketData',
  assetPrices = 'assetPrices',
  perplexity = 'perplexity',
}
