import 'github-markdown-css/github-markdown.css';

import { Box, HStack } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Message } from '../types';

export const ChatbotMessage: React.FC<{ msg: Message; idx: number }> = ({ msg, idx }) => (
  <HStack borderRadius="xl" key={idx} justify={msg.user === 'user' ? 'flex-end' : 'flex-start'} mb={3} transition="all 0.3s ease">
    <Box
      bg={msg.user === 'user' ? 'rgba(75, 85, 99, 0.9)' : 'rgba(55, 65, 81, 0.9)'}
      color={msg.user === 'user' ? 'white' : 'gray.100'}
      p={3}
      borderRadius="xl"
      maxWidth="75%"
      width="fit-content"
      wordBreak="break-word"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      transition="transform 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
      }}
    >
      <strong>{msg.user === 'user' ? 'You' : '🧝‍♀️ Calypso'}:</strong>{' '}
      {msg.user === 'bot' ? (
        <Box
          bg="rgba(55, 65, 81, 0.9)" // Change this to your desired color
          p={2} // Add some padding for better spacing
          borderRadius="md" // Optional: Add border radius for a softer look
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
        </Box>
      ) : (
        msg.text
      )}
    </Box>
  </HStack>
);
