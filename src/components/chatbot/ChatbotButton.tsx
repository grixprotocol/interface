import { IconButton, IconButtonProps, Image } from '@chakra-ui/react';

import { TradeboardResponse } from '@/api/tradeboard/types';
import { grixLogoUrl } from '@/config';
import { useTradePath } from '@/pages/TradePage/hooks/useTradePath';

import { ChatbotProps } from './chatbotChat';
import { useChatbot } from './ChatbotContext';

type ChatbotButtonProps = {
  buttonProps?: Omit<IconButtonProps, 'aria-label' | 'onClick'>;
  tradeboardData?: TradeboardResponse | undefined;
} & ChatbotProps;

export const ChatbotButton = ({ context, buttonProps, tradeboardData }: ChatbotButtonProps) => {
  const { openChat } = useChatbot();
  const { isTradePage } = useTradePath();

  const handleOpenAIAssistant = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChat({
      chatContext: {
        pageName: context?.chatContext?.pageName || '',
        pageDescription: context?.chatContext?.pageDescription || '',
        initialMessage: context?.chatContext?.initialMessage || '',
        defaultQuestions: context?.chatContext?.defaultQuestions || [],
        data: context?.chatContext?.data || {},
        underlyingAsset: context?.chatContext?.underlyingAsset || '',
        tradeboardData: isTradePage ? tradeboardData : undefined,
      },
    });
  };

  return (
    <IconButton
      aria-label="Open Grix AI Assistant"
      icon={<Image src={grixLogoUrl} alt="Grix" boxSize="20px" objectFit="contain" />}
      size="sm"
      variant="solid"
      bg="whiteAlpha.200"
      _hover={{
        bg: 'whiteAlpha.300',
        transform: 'scale(1.1)',
      }}
      _active={{
        bg: 'whiteAlpha.400',
      }}
      transition="all 0.2s"
      onClick={handleOpenAIAssistant}
      {...buttonProps}
    />
  );
};
