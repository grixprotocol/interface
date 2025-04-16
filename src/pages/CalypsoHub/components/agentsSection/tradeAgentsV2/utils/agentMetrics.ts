import { InstrumentType } from '@/api/trade-agents/types/shared';
import { TradeAgent } from '@/api/trade-agents/types/TradeAgent';
export type AgentMetrics = {
  // Activity Metrics (directly from signals array)
  totalSignals: number;
  activeSignals: number;
  lastSignalDate: string | null;

  // Type Distribution (from signal properties)
  instrumentTypeDistribution: {
    asset: number;
    option: number;
  };
  positionTypeDistribution: {
    long: number;
    short: number;
  };

  // Basic Position Analysis (from signal properties)
  totalExpectedValue: number;
  averagePositionSize: number;
};

export const calculateAgentMetrics = (agent: TradeAgent): AgentMetrics => {
  const signals = agent.signal_requests.flatMap((request) => request.signals);

  // Activity metrics
  const activeSignals = signals.filter((s) => s.signal.action_type === 'open').length;
  const lastSignalDate = signals.length > 0 ? signals[signals.length - 1].created_at : null;

  // Type distributions
  const instrumentTypes = signals.reduce(
    (acc, signal) => ({
      asset: acc.asset + (signal.signal.instrument_type === InstrumentType.asset ? 1 : 0),
      option: acc.option + (signal.signal.instrument_type === InstrumentType.option ? 1 : 0),
    }),
    { asset: 0, option: 0 }
  );

  const positionTypes = signals.reduce(
    (acc, signal) => ({
      long: acc.long + (signal.signal.position_type === 'long' ? 1 : 0),
      short: acc.short + (signal.signal.position_type === 'short' ? 1 : 0),
    }),
    { long: 0, short: 0 }
  );

  // Position analysis
  const totalExpectedValue = signals.reduce((sum, signal) => sum + signal.signal.expected_total_price_usd, 0);

  const averagePositionSize =
    signals.length > 0 ? signals.reduce((sum, signal) => sum + signal.signal.size, 0) / signals.length : 0;

  return {
    totalSignals: signals.length,
    activeSignals,
    lastSignalDate,
    instrumentTypeDistribution: instrumentTypes,
    positionTypeDistribution: positionTypes,
    totalExpectedValue,
    averagePositionSize,
  };
};
