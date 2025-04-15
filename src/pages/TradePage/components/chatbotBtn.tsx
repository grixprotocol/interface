import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaRobot } from 'react-icons/fa';

import { TradeboardResponse } from '@/api/tradeboard/types';
import { ChatbotButton } from '@/components/chatbot/ChatbotButton';
import { ChatContext } from '@/components/chatbot/types';
const rotateGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const TradePageChatbotBtn = ({
  chatbotContext,
  tradeboardData,
}: {
  chatbotContext: ChatContext;
  tradeboardData: TradeboardResponse | undefined;
}) => (
  <Box position="fixed" bottom={24} right={10} zIndex={999}>
    <Tooltip label="Need help understanding options?" hasArrow placement="left" bg="gray.700" openDelay={200}>
      <Box>
        <ChatbotButton
          context={chatbotContext}
          tradeboardData={tradeboardData}
          buttonProps={{
            size: 'lg',
            rounded: 'full',
            w: '56px',
            h: '56px',
            position: 'relative',
            bg: 'rgba(0, 0, 0, 0.8)',
            sx: {
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                bottom: '-2px',
                left: '-2px',
                borderRadius: 'inherit',
                padding: '2px',
                background: 'linear-gradient(90deg, #00C6FF, #0072FF, #00C6FF, #0072FF)',
                backgroundSize: '200% 200%',
                animation: `${rotateGradient} 3s ease infinite`,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              },
            },
            _hover: {
              '&::before': {
                animationDuration: '2s',
                background: 'linear-gradient(90deg, #00C6FF, #0072FF, #00C6FF, #0072FF)',
                backgroundSize: '200% 200%',
              },
              transform: 'translateY(-2px)',
            },
            _active: {
              transform: 'translateY(0)',
              '&::before': {
                animationDuration: '1s',
              },
            },
            transition: 'all 0.2s',
            children: <Icon as={FaRobot} color="blue.300" boxSize="24px" />,
          }}
        />
      </Box>
    </Tooltip>
  </Box>
);
