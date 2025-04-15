import { PositionTypes } from '../types';

export enum CalypsoTaskType {
  marketStatusBTC = 'marketStatusBTC',
  marketStatusETH = 'marketStatusETH',
  actionableRecommendation = 'actionableRecommendation',
  marketSentiment = 'marketSentiment',
  retrospect = 'retrospect',
}

export enum CalypsoTaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type CalypsoTask = {
  id: number;
  type: CalypsoTaskType;
  status: CalypsoTaskStatus;
  message?: string;
  tweet_id?: string;
  failure_reason?: string;
  scheduled_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type AgentSignal = {
  id: number;
  task: CalypsoTask;
  optionKey: string;
  positionType: PositionTypes;
  reason: string;
  content: string;
  tweet_id: string;
  failure_reason: string;
  premium: number;
  confidence?: number; // 0-100
  created_at: Date;
};

export type AgentSignalsResponse = {
  data: AgentSignal[];
  totalCount: number;
};

export type AgentSignalsParams = {
  limit?: number;
  offset?: number;
  status?: CalypsoTaskStatus;
  type?: CalypsoTaskType;
  signalId?: string;
};
