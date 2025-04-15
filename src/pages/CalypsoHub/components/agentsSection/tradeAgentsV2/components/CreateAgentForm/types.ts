import { AgentInputType } from '@/api/trade-agents/types/TradeAgent';
import { UnderlyingAsset } from '@/api/types';

export type CreateAgentFormData = {
  name: string;
  is_simulation: boolean;
  budget_usd: string;
  assets: UnderlyingAsset[];
  protocols: string[];
  context_window_ms: number;
  trade_window_ms: number;
  input_data: AgentInputType[];
  user_prompt?: string;
};

export type CreateAgentFormProps = {
  onClose: () => void;
  isOpen: boolean;
};
