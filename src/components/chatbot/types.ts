import { TradeboardResponse } from '@/api/tradeboard/types';

export type ChatbotToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export type UserContextType = {
  role: string;
  content: string;
};

export type ChatbotResponseType = {
  message: string;
  userContext: UserContextType[];
};

export type Message = {
  text: string;
  user: 'bot' | 'user';
};

export type FAQQuestion = {
  question: string;
  category?: string; // Optional grouping
  priority?: number; // Optional sorting
};

export type ChatContext = {
  chatContext: {
    pageName: string;
    pageDescription: string;
    initialMessage: string;
    defaultQuestions?: FAQQuestion[]; // Add this new field
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    underlyingAsset?: string;
    tradeboardData?: TradeboardResponse;
  };
};
