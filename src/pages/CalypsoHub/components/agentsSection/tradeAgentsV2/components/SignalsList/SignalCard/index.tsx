import { Box, Grid, HStack, Icon, IconButton, SimpleGrid, Tag, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPaperPlane } from 'react-icons/fa';

import { useOptionPriceHistory } from '@/api/optionPriceHistory/useOptionPriceHistory';
import { useShareSignalWebhook } from '@/api/trade-agents/shareSignalWebhook/useShareSignalWebhook';
import { InstrumentType } from '@/api/trade-agents/types/shared';
import { ChatbotButton } from '@/components/chatbot/ChatbotButton';
import { createAgentSignalContext } from '@/components/chatbot/pageContext/tradeAgentSignalContext';
import { usePnlCalculation } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/hooks/usePnlCalculation';
import { NotificationModal } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/utils/shareSignalWebhook/NotificationModal';
import { prepareSignalMessage } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/utils/shareSignalWebhook/prepareSignalMessage';
import { formatDate } from '@/utils/dateUtil';

import { NotificationSettings, SignalCardProps, WebhookDestination } from '../types';
import { AnalysisMetrics } from './components/analysisMetrics';
import { PerformanceSection } from './components/performanceSection';
import { MetricBox } from './metrixBox';

export const SignalCard = ({ signal, agent }: SignalCardProps) => {
  const { isOpen: isExpanded, onToggle } = useDisclosure();
  const { isOpen: isOpenNotification, onOpen: onOpenNotification, onClose: onCloseNotification } = useDisclosure();
  const { mutateAsync: shareSignalWebhook } = useShareSignalWebhook();
  const { data: priceHistory } = useOptionPriceHistory(
    { optionkey: signal.signal.instrument },
    signal.signal.instrument_type === InstrumentType.option
  );
  const [agentSignalWebhookSettings, setAgentSignalWebhookSettings] = useState<NotificationSettings>({
    type: WebhookDestination.TELEGRAM,
    webhookUrl: '',
    botToken: '',
    chatId: '',
  });
  const { pnlResult, isPriceHistoryLoading } = usePnlCalculation(signal, true);

  const chatbotContext = useMemo(() => createAgentSignalContext(signal, agent), [signal, agent]);

  const toast = useToast();

  const hasAchievedProfit = pnlResult?.values?.total?.maxValueChange ?? 0 > 0;
  const maxPnl = hasAchievedProfit ? pnlResult?.values?.total?.maxValueChange : null;

  const handleSubmitSignalWebhook = async () => {
    toast({
      title: 'Sending signal...',
      status: 'loading',
      duration: null,
      isClosable: false,
      colorScheme: 'orange',
    });

    try {
      await shareSignalWebhook({
        signalId: signal.id,
        type: agentSignalWebhookSettings.type,
        webhookUrl: agentSignalWebhookSettings.webhookUrl ?? '',
        message: prepareSignalMessage(signal, priceHistory?.[0]?.price_history),
        botToken: agentSignalWebhookSettings.botToken ?? '',
        chatId: agentSignalWebhookSettings.chatId ?? '',
      });

      toast.closeAll();
      toast({
        title: 'Signal sent successfully',
        description: 'The signal has been sent to the webhook.',
        status: 'success',
        duration: 5000,
      });
      onCloseNotification();
    } catch (error) {
      toast.closeAll();
      toast({
        title: 'Error sending signal',
        description: isAxiosError(error)
          ? (error.response?.data as { error: string }).error
          : error instanceof Error
          ? error.message
          : 'Please check the webhook URL and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      p={4}
      bg="whiteAlpha.50"
      borderRadius="lg"
      borderWidth={1}
      borderColor="whiteAlpha.200"
      transition="all 0.2s"
      width="100%"
      _hover={{
        bg: 'whiteAlpha.100',
        borderColor: 'blue.400',
      }}
    >
      {/* Collapsed View - Always visible */}
      <Grid templateColumns="2fr 1fr 1fr 1fr auto auto" gap={3} alignItems="center" width="100%" minH="60px">
        {/* First 4 sections remain the same, wrapped in a clickable box */}
        <Box onClick={onToggle} cursor="pointer" gridColumn="span 5">
          <Grid templateColumns="2fr 1fr 1fr 1fr" gap={3} alignItems="center">
            {/* Instrument & Position Type */}
            <Box>
              <HStack spacing={2} mb={1}>
                <Text color="white" fontSize="sm" fontWeight="semibold">
                  {signal.signal.instrument}
                </Text>
                <Tag size="sm" colorScheme={signal.signal.position_type === 'long' ? 'green' : 'red'} borderRadius="full">
                  {signal.signal.position_type.toUpperCase()}
                </Tag>
              </HStack>
              <Text color="gray.400" fontSize="xs">
                {formatDate(signal.created_at)}
              </Text>
            </Box>

            {/* Size */}
            <Box>
              <Text color="gray.400" fontSize="xs">
                Size
              </Text>
              <Text color="white" fontSize="sm">
                {signal.signal.size} {signal.signal.instrument_type === InstrumentType.asset ? 'units' : 'contracts'}
              </Text>
            </Box>

            {/* Value */}
            <Box>
              <Text color="gray.400" fontSize="xs">
                Value
              </Text>
              <Text color="white" fontSize="sm" fontWeight="semibold">
                ${signal.signal.expected_total_price_usd.toLocaleString()}
              </Text>
            </Box>

            {/* Max PNL */}
            <Box>
              <Text color="gray.400" fontSize="xs">
                Max PNL
              </Text>
              {isPriceHistoryLoading ? (
                <Text color="whiteAlpha.600" fontSize="sm">
                  Loading...
                </Text>
              ) : maxPnl ? (
                <Text color="green.400" fontSize="sm" fontWeight="semibold">
                  +${maxPnl.toLocaleString()}
                </Text>
              ) : (
                <Text color="whiteAlpha.400" fontSize="sm">
                  -
                </Text>
              )}
            </Box>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <HStack spacing={2} alignSelf="center" onClick={(e) => e.stopPropagation()}>
          <ChatbotButton context={chatbotContext} aria-label="Chat about this signal" />
          <IconButton
            aria-label="Share signal"
            size="sm"
            icon={<Icon as={FaPaperPlane} color="white" />}
            variant="ghost"
            onClick={onOpenNotification}
            _hover={{
              bg: 'whiteAlpha.100',
            }}
          />
          <IconButton
            aria-label="Toggle details"
            size="sm"
            icon={<Icon as={isExpanded ? FaChevronUp : FaChevronDown} color="white" />}
            variant="ghost"
            onClick={onToggle}
            _hover={{
              bg: 'whiteAlpha.100',
            }}
          />
        </HStack>
      </Grid>

      {/* Expanded View - Only visible when expanded */}
      {isExpanded && (
        <VStack spacing={4} align="stretch" mt={4}>
          {/* Key Metrics Row */}
          <SimpleGrid columns={3} gap={4} bg="whiteAlpha.50" p={3} borderRadius="md">
            <MetricBox
              label="Position Size"
              value={`${signal.signal.size} ${signal.signal.instrument_type === InstrumentType.asset ? 'units' : 'contracts'}`}
              valueColor="white"
            />
            <MetricBox
              label="Expected Price"
              value={`$${signal.signal.expected_instrument_price_usd.toLocaleString()}`}
              valueColor="white"
            />
            <MetricBox label="Total Value" value={`$${signal.signal.expected_total_price_usd.toLocaleString()}`} valueColor="white" />
          </SimpleGrid>

          {/* Analysis Section */}
          <AnalysisMetrics signal={signal} />

          {/* Performance Section */}
          {priceHistory?.[0]?.price_history && <PerformanceSection signal={signal} priceHistory={priceHistory?.[0]?.price_history} />}
        </VStack>
      )}

      <NotificationModal
        isOpen={isOpenNotification}
        onClose={onCloseNotification}
        settings={agentSignalWebhookSettings}
        onSettingsChange={setAgentSignalWebhookSettings}
        onSubmit={() => {
          void handleSubmitSignalWebhook();
        }}
      />
    </Box>
  );
};
