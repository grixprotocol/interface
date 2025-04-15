import { Box, Button, HStack, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

import { useSocialAgentActions } from '@/api/socialAgentActionsGet/useSocialAgentActions';
import { BaseCard } from '@/components/BaseCard';
import { useAnalytics } from '@/services/analytics';

import { sectionDescriptions } from '../../../config/sectionDescriptions';
import { SignalCard } from './SignalCard';

export const AgentFeedSection = () => {
  const [searchParams] = useSearchParams();
  const { track } = useAnalytics();
  const id = searchParams.get('id');

  const { data, isLoading, isError } = useSocialAgentActions({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (id) {
      track('view_signal_details', {
        signalId: id,
      });
    }
  }, [id, track]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <Spinner size="lg" color="blue.400" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="red.400" mb={4}>
          Failed to load market analysis and signals
        </Text>
        <Button colorScheme="blue" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data?.data?.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="whiteAlpha.600">No market insights available</Text>
      </Box>
    );
  }

  return (
    <BaseCard maxH="500px" overflow="auto">
      <VStack mb={4} align="flex-start">
        <HStack>
          <Icon as={FaChartLine} color="blue.400" boxSize={5} />
          <Text color="white" fontSize="lg" fontWeight="bold">
            {sectionDescriptions.marketInsights.title}
          </Text>
        </HStack>
        <Text color="gray.300" fontSize="md">
          {sectionDescriptions.marketInsights.description}
        </Text>
      </VStack>

      <VStack spacing={{ base: 2, md: 3 }} align="stretch" width="100%">
        {data.data.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </VStack>
    </BaseCard>
  );
};
