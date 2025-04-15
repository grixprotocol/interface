import { createContext, useContext } from 'react';

import { ChatContext } from './types';

export type ChatbotContextType = {
  isOpen: boolean;
  toggleChatbot: () => void;
  openChat: (context?: ChatContext) => void;
};

export const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
