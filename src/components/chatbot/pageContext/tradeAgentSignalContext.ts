import { Signal, TradeAgent } from '@/api/trade-agents/types/TradeAgent';

import { ChatContext, FAQQuestion } from '../types';

const getAgentSignalFAQs = (signal: Signal): FAQQuestion[] => [
  {
    question: `Why did the agent recommend this ${signal.signal.position_type} ${signal.signal.action_type} trade?`,
    category: 'Strategy',
    priority: 1,
  },
  {
    question: 'What are the key risks to consider?',
    category: 'Risk',
    priority: 1,
  },
  {
    question: `What's the expected profit potential?`,
    category: 'Performance',
    priority: 2,
  },
  {
    question: 'How long should I hold this position?',
    category: 'Strategy',
    priority: 2,
  },
  {
    question: `How does the ${signal.signal.instrument} underlying price affect this position?`,
    category: 'Analysis',
    priority: 2,
  },
  {
    question: "What's the optimal position sizing?",
    category: 'Strategy',
    priority: 3,
  },
];

export const createAgentSignalContext = (signal: Signal, agent: TradeAgent): ChatContext => ({
  chatContext: {
    pageName: 'Agent Signal',
    pageDescription: "I'm here to help you understand this trading signal and answer any questions about the recommendation.",
    initialMessage: `I see you're looking at a ${signal.signal.position_type} ${signal.signal.action_type} signal for ${
      signal.signal.instrument
    } at $${signal.signal.expected_instrument_price_usd.toFixed(2)}. ${
      agent.config.signal_request_config.user_prompt
        ? `This was generated in response to: "${agent.config.signal_request_config.user_prompt}". `
        : ''
    }How can I help you understand this recommendation?`,
    defaultQuestions: getAgentSignalFAQs(signal),
    data: {
      signal,
      agent,
      timestamp: signal.created_at,
      instrumentPrice: signal.signal.expected_instrument_price_usd,
      totalPrice: signal.signal.expected_total_price_usd,
      size: signal.signal.size,
      reason: signal.signal.reason,
    },
  },
});
