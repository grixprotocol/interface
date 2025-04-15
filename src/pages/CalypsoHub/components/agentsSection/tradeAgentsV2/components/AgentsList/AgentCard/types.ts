import { UnderlyingAsset } from '@/api/types';

export type Agent = {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  assets: UnderlyingAsset[];
  signal_requests?: SignalRequest[];
  created_at: string;
};

export type SignalRequest = {
  id: string;
  created_at: string;
  status: 'pending' | 'completed' | 'failed';
  failure_reason: string | null;
  expected_value: number;
};

export type AgentMetrics = {
  successRate: number;
  successRateChange: number;
  totalExpectedValue: number;
  valueChange: number;
  totalSignals: number;
  activeSignals: number;
};

export type AgentCardProps = {
  agent: Agent;
  onSelect: (id: string) => void;
  isSelected: boolean;
};
