import { AgentInputType } from '@/api/trade-agents/types/TradeAgent';
import { UnderlyingAsset } from '@/api/types';
import { protocolsArrayData } from '@/config';
import { msValues } from '@/utils/dateUtil';

import { CreateAgentFormData } from './types';

export const DEFAULT_FORM_DATA: CreateAgentFormData = {
  name: '',
  is_simulation: true,
  budget_usd: '1000',
  context_window_ms: 7 * msValues.day,
  trade_window_ms: 1 * msValues.month,
  protocols: protocolsArrayData.map((protocol) => protocol.protocolName),
  input_data: [AgentInputType.marketData, AgentInputType.assetPrices],
  assets: [UnderlyingAsset.ETH],
  user_prompt: '',
};
