import { AgentSignal } from '@/api/agentSignals/types';

import { ChatContext, FAQQuestion } from '../types';

const getSignalFAQs = (signal: AgentSignal, protocolName: string): FAQQuestion[] => [
  {
    question: 'Why was this trade recommended?',
    category: 'Strategy',
    priority: 1,
  },
  {
    question: `What's the expected profit potential on ${protocolName}?`,
    category: 'Performance',
    priority: 1,
  },
  {
    question: 'What are the key risks to consider?',
    category: 'Risk',
    priority: 2,
  },
  {
    question: 'How long should I hold this position?',
    category: 'Strategy',
    priority: 2,
  },
  {
    question: "What's the market context for this signal?",
    category: 'Analysis',
    priority: 3,
  },
  {
    question: 'How do options signals work?',
    category: 'Education',
    priority: 2,
  },
  {
    question: "What's the optimal position sizing for this trade?",
    category: 'Strategy',
    priority: 2,
  },
];

export const createSignalContext = (
  signal: AgentSignal,
  optionSymbol: string | null,
  protocolName: string
): ChatContext => ({
  chatContext: {
    pageName: 'Calypso Signal',
    pageDescription:
      "I'm here to help you understand this trading signal from Calypso and answer any questions you might have about the recommendation.",
    initialMessage: `I see you're interested in this trading signal: "${signal.task.message}". This involves the ${optionSymbol} option on ${protocolName}. How can I help you understand this recommendation?`,
    defaultQuestions: getSignalFAQs(signal, protocolName),
    data: {
      signalMessage: signal.task.message,
      optionSymbol,
      protocolName,
      timestamp: signal.task.created_at,
      tweetId: signal.task.tweet_id,
      failureReason: signal.task.failure_reason,
    },
  },
});
