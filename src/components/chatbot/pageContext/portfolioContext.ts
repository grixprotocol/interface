import { ChatContext, FAQQuestion } from '../types';

type PortfolioPosition = {
  selectedProtocol: string;
  isCall: boolean;
  baseAsset: string;
  positionType: string;
  strikePrice: number;
  contractsAmount: number;
  expirationDateUnix: number;
  isExpired: boolean;
  refundCloseBuy?: number;
  refundCloseSell?: number;
  refundSettleBuy?: number;
};

const getPortfolioFAQs = (position: PortfolioPosition): FAQQuestion[] => {
  const baseQuestions: FAQQuestion[] = [
    {
      question: "What's my current P/L for this position?",
      category: 'Performance',
      priority: 1,
    },
    {
      question: 'When should I consider closing this position?',
      category: 'Strategy',
      priority: 1,
    },
    {
      question: 'What are the risks of this position?',
      category: 'Risk',
      priority: 2,
    },
    {
      question: `How does ${position.isCall ? 'a call' : 'a put'} option work?`,
      category: 'Education',
      priority: 2,
    },
    {
      question: "What's the break-even price for this position?",
      category: 'Strategy',
      priority: 2,
    },
  ];

  // Add position-specific questions
  if (position.isExpired) {
    baseQuestions.push({
      question: 'How do I settle this expired position?',
      category: 'Action',
      priority: 1,
    });
  } else {
    baseQuestions.push({
      question: `What happens if ${position.baseAsset} price ${position.isCall ? 'goes up' : 'goes down'}?`,
      category: 'Scenario',
      priority: 2,
    });
  }

  return baseQuestions;
};

export const createPortfolioContext = (position: PortfolioPosition): ChatContext => {
  const positionType = position.isCall ? 'Call' : 'Put';
  const actionType = position.isExpired ? 'settle' : 'close';
  const refundAmount = Math.max(
    Number(position.refundCloseBuy || 0),
    Number(position.refundCloseSell || 0),
    Number(position.refundSettleBuy || 0)
  );

  return {
    chatContext: {
      pageName: 'Portfolio Position',
      pageDescription: "I'm here to help you understand this position and guide you through potential actions.",
      initialMessage: `I see you're looking at a ${position.contractsAmount} contract ${positionType} position for ${
        position.baseAsset
      } on ${position.selectedProtocol}. The strike price is $${position.strikePrice} and it ${
        position.isExpired
          ? 'has expired'
          : `expires on ${new Date(position.expirationDateUnix * 1000).toLocaleDateString()}`
      }. Would you like to understand more about ${actionType}ing this position?`,
      defaultQuestions: getPortfolioFAQs(position),
      data: {
        ...position,
        positionType,
        refundAmount,
        actionAvailable: refundAmount >= 0.001,
        suggestedAction: position.isExpired ? 'settle' : 'close',
      },
    },
  };
};
