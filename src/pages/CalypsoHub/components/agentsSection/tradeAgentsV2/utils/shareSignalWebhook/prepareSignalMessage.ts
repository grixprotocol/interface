import { BidAskSnapshot } from '@/api/optionPriceHistory/types';
import { Signal } from '@/api/trade-agents/types/TradeAgent';
import { calculatePnlFromHistory } from '@/components/OptionPriceGraph/pnlCalculator';

export const prepareSignalMessage = (
  signal: Signal,
  priceHistory: Record<string, BidAskSnapshot> | undefined
): string => {
  const {
    signal: {
      instrument,
      action_type,
      position_type,
      size,
      expected_instrument_price_usd,
      expected_total_price_usd,
      reason,
    },
  } = signal;

  const currentPnl = priceHistory
    ? calculatePnlFromHistory(
        priceHistory,
        signal.created_at,
        signal.signal.size,
        signal.signal.position_type,
        signal.signal.action_type
      )
    : null;

  // Format the core signal information
  let message = `📊 Trade Signal Summary\n`;
  message += `${action_type.toUpperCase()} ${position_type.toUpperCase()} position\n`;
  message += `Instrument: ${instrument}\n`;
  message += `Size: ${size} contracts\n\n`;

  // Add PnL information if available, with emphasis on positive results
  if (currentPnl?.values) {
    const totalPnl = currentPnl.values.total.maxValueChange;
    const pnlPercentage = currentPnl.values.total.currentValueChange;

    const pnlEmoji = totalPnl > 0 ? '📈' : '📉';
    message += `${pnlEmoji} Performance\n`;
    message += `PnL: ${totalPnl > 0 ? '+' : ''}${totalPnl.toFixed(2)} USD (${pnlPercentage.toFixed(2)}%)\n\n`;
  }

  // Add price information
  message += `💰 Pricing\n`;
  message += `Expected Price: ${expected_instrument_price_usd} USD\n`;
  message += `Total Cost: ${expected_total_price_usd} USD\n\n`;

  // Add reasoning if provided
  if (reason) {
    message += `📝 Analysis\n${reason}`;
  }

  return message;
};
