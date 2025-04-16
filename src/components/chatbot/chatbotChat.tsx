import 'github-markdown-css/github-markdown.css';

import { Box, Button, Flex, HStack, IconButton, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import { useChatbot } from './ChatbotContext';
import { ChatbotMessage } from './components/chatbotMessage';
import { ChatContext, FAQQuestion, Message, UserContextType } from './types';
import { useSendMessage } from './useSendMessage';

export type ChatbotProps = {
  context?: ChatContext;
};

// Define the glow animation with a more vibrant color
const glowAnimation = keyframes`
  0% { box-shadow: 0 8px 32px 0 rgba(66, 153, 225, 0.35); }
  50% { box-shadow: 0 8px 32px 0 rgba(49, 151, 149, 0.45); }
  100% { box-shadow: 0 8px 32px 0 rgba(66, 153, 225, 0.35); }
`;

export const Chatbot: React.FC<ChatbotProps> = ({ context }) => {
  const { toggleChatbot } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: context?.chatContext?.initialMessage || "Hi there! I'm your DeFi Assistant. How can I help you today?",
      user: 'bot',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [userContext, setUserContext] = useState<UserContextType[]>([]);
  const [showFAQ, setShowFAQ] = useState(true);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messages.length <= 1) return;
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = (text: string, user: 'bot' | 'user') => {
    setMessages((prev) => [...prev, { text, user }]);
  };

  const { mutateAsync: sendMessage, isPending } = useSendMessage();

  const handleSend = async () => {
    if (!input.trim()) return;
    setShowFAQ(false);

    addMessage(input, 'user');

    try {
      const response = await sendMessage({
        userMessage: input,
        userContext,
        underlyingAsset: context?.chatContext?.underlyingAsset ?? '',
        pageContext: context?.chatContext
          ? {
              pageName: context.chatContext.pageName,
              pageDescription: context.chatContext.pageDescription,
              data: context.chatContext.data || {},
            }
          : undefined,
        tradeboardData: context?.chatContext?.tradeboardData ?? undefined,
      });

      addMessage(response?.message ?? 'No response from the bot.', 'bot');
      setUserContext(response?.userContext ?? []);
    } catch (err) {
      addMessage(`Error: ${err instanceof Error ? err.message : 'Something went wrong.'}`, 'bot');
    } finally {
      setInput('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const handleFAQClick = async (question: string) => {
    addMessage(question, 'user');
    setShowFAQ(false);

    try {
      const response = await sendMessage({
        userMessage: question,
        userContext,
        pageContext: context?.chatContext,
        underlyingAsset: context?.chatContext?.underlyingAsset ?? '',
      });

      addMessage(response?.message ?? 'No response from the bot.', 'bot');
      setUserContext(response?.userContext ?? []);
    } catch (err) {
      addMessage(`Error: ${err instanceof Error ? err.message : 'Something went wrong.'}`, 'bot');
    }
  };

  const renderFAQSection = () => {
    if (!showFAQ || !context?.chatContext?.defaultQuestions?.length) return null;

    // Group questions by category
    const groupedQuestions = context.chatContext.defaultQuestions.reduce((acc, q) => {
      const category = q.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(q);
      return acc;
    }, {} as Record<string, FAQQuestion[]>);

    return (
      <VStack spacing={3} align="stretch" w="100%" overflowY="auto">
        <Text fontSize="sm" fontWeight="medium" color="gray.300">
          FAQ
        </Text>
        {Object.entries(groupedQuestions).map(([category, questions]) => (
          <Box key={category}>
            <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2}>
              {category}
            </Text>
            <Flex flexWrap="wrap" gap={2} justifyContent="space-between">
              {questions
                .sort((a, b) => (a.priority || 99) - (b.priority || 99))
                .map((q, idx) => (
                  <Box
                    key={idx}
                    as="button"
                    onClick={() => void handleFAQClick(q.question)}
                    px={2.5}
                    py={1}
                    borderRadius="md"
                    bg="whiteAlpha.50"
                    _hover={{
                      bg: 'whiteAlpha.100',
                      transform: 'translateY(-1px)',
                    }}
                    _active={{
                      bg: 'whiteAlpha.200',
                      transform: 'translateY(0)',
                    }}
                    transition="all 0.2s"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    display="flex"
                    alignItems="center"
                    flexBasis="48%" // Takes up slightly less than half the width
                    maxW="48%" // Ensures two items per row
                  >
                    <Box
                      w="1.5"
                      h="1.5"
                      borderRadius="full"
                      bg={idx < 2 ? 'blue.400' : 'blue.600'}
                      opacity={idx < 2 ? 1 : 0.6}
                      flexShrink={0}
                      mr={1.5}
                    />
                    <Text fontSize="xs" color="gray.200" lineHeight="1.2" fontWeight="medium" noOfLines={2} textAlign="left">
                      {q.question}
                    </Text>
                  </Box>
                ))}
            </Flex>
          </Box>
        ))}
      </VStack>
    );
  };

  return (
    <VStack
      maxH="70vh"
      overflowY="auto"
      mb={6}
      border="1px solid rgba(75, 85, 99, 0.4)"
      borderRadius="xl"
      p="6"
      bg="whiteAlpha.100"
      backdropFilter="blur(20px)"
      spacing={4}
      position="relative"
      animation={`${glowAnimation} 3s infinite ease-in-out`}
      css={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
        },
      }}
    >
      <IconButton
        icon={<FaTimes />}
        aria-label="Close chatbot"
        position="absolute"
        right={4}
        top={4}
        variant="ghost"
        colorScheme="whiteAlpha"
        size="sm"
        onClick={toggleChatbot}
        _hover={{ bg: 'whiteAlpha.200' }}
      />
      <Box
        w="100%"
        maxH="500px"
        overflowY="auto"
        px={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
          },
        }}
      >
        {messages.map((message, index) => (
          <ChatbotMessage key={index} msg={message} idx={index} />
        ))}
        {isPending && (
          <HStack spacing={2} p={4}>
            <Spinner size="sm" color="blue.400" thickness="3px" speed="0.8s" />
            <Text color="gray.300" fontSize="sm">
              Processing...
            </Text>
          </HStack>
        )}
        <div ref={messageEndRef} />
      </Box>
      {renderFAQSection()}
      <HStack width="100%" spacing={3}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about DeFi options trading..."
          size="lg"
          variant="filled"
          flex="1"
          bg="whiteAlpha.50"
          color="white"
          borderColor="whiteAlpha.200"
          borderWidth="2px"
          borderRadius="xl"
          _hover={{ bg: 'whiteAlpha.100', borderColor: 'whiteAlpha.300' }}
          _focus={{
            bg: 'whiteAlpha.100',
            borderColor: 'blue.400',
            boxShadow: 'none',
          }}
          _placeholder={{ color: 'gray.500' }}
        />
        <Button
          onClick={() => void handleSend()}
          isLoading={isPending}
          isDisabled={!input.trim()}
          bg="blue.400"
          color="white"
          _hover={{ bg: 'blue.500', transform: 'translateY(-2px)' }}
          _active={{ bg: 'blue.600', transform: 'translateY(0)' }}
          minW="100px"
          borderRadius="xl"
          boxShadow="0 4px 6px rgba(66, 153, 225, 0.2)"
          transition="all 0.3s ease"
        >
          Send
        </Button>
      </HStack>
    </VStack>
  );
};
