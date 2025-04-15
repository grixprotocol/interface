import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

import { Chatbot } from './chatbotChat';
import { ChatbotContext } from './ChatbotContext';
import { ChatContext } from './types';

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | undefined>();

  const toggleChatbot = () => setIsOpen((prev) => !prev);

  const openChat = (context?: ChatContext) => {
    setChatContext(context);
    setIsOpen(true);
  };

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChatbot, openChat }}>
      {children}
      {isOpen && (
        <Box position="fixed" bottom="36" right="10" width="530px" borderRadius="xl" zIndex="9">
          <Chatbot context={chatContext} />
        </Box>
      )}
    </ChatbotContext.Provider>
  );
};
