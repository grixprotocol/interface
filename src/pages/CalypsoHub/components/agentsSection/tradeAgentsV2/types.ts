import { TradeAgent } from '@/api/trade-agents/types/TradeAgent';

export type AgentCardProps = {
  agent: TradeAgent;
  onSelect: (id: string) => void;
  isSelected?: boolean;
};
