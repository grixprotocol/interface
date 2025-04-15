import { PositionTypes, SupportedAsset, TradeOptionType } from '@/api';
import { OptionBoardItem } from '@/api/tradeboard/types';

import { FAQQuestion } from '../types';

const getTradeFAQs = (
  positionType: PositionTypes,
  optionType: TradeOptionType,
  asset: SupportedAsset
): FAQQuestion[] => [
  {
    question: `How does this ${optionType} option work?`,
    category: 'Education',
    priority: 1,
  },
  {
    question: `What's my maximum potential loss?`,
    category: 'Risk',
    priority: 1,
  },
  {
    question: `When should I exercise this option?`,
    category: 'Strategy',
    priority: 2,
  },
  {
    question: `How does ${asset} price affect my position?`,
    category: 'Analysis',
    priority: 2,
  },
  {
    question: 'What are the fees involved?',
    category: 'Costs',
    priority: 3,
  },
  {
    question: 'What are options Greeks?',
    category: 'Education',
    priority: 2,
  },
  {
    question: "What's a good entry strategy?",
    category: 'Strategy',
    priority: 2,
  },
];

export const getTradeChatbotContext = (
  positionType: PositionTypes,
  optionType: TradeOptionType,
  asset: SupportedAsset,
  strikePrice: string,
  expirationDate: string,
  amount: string,
  selectedOption: OptionBoardItem | undefined,
  isTradePage: boolean
) => ({
  chatContext: {
    underlyingAsset: asset,
    pageName: 'Trade',
    pageDescription:
      "I'm here to help you understand this trading position and answer any questions you might have about it.",
    initialMessage: `Hi! I see you're looking at ${
      positionType === 'long' ? 'buying' : 'selling'
    } a ${optionType} option for ${asset}${strikePrice ? ` with strike price $${strikePrice}` : ''}${
      expirationDate ? ` expiring on ${new Date(Number(expirationDate) * 1000).toLocaleDateString()}` : ''
    }. How can I help you understand this position?`,
    defaultQuestions: getTradeFAQs(positionType, optionType, asset),
    data: {
      asset,
      optionType,
      positionType,
      strikePrice,
      expirationDate,
      amount,
      selectedOption,
      isTradePage,
    },
  },
});
