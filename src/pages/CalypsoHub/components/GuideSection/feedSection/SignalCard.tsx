import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';

import { BaseCard } from '@/components/BaseCard';
import calypsoImage from '@/pages/Calypso/Images/calypso.png';

import { SocialAgentAction } from './types';

export const SignalCard = ({ signal }: { signal: SocialAgentAction }) => {
  const scheduled_at = signal?.scheduled_at || new Date().toISOString();

  return (
    <BaseCard>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 3, md: 3 }}
        align={{ base: 'stretch', md: 'flex-start' }}
      >
        <Box width={{ base: '100%', md: 'auto' }} mb={{ base: 2, md: 0 }}>
          <Image
            src={calypsoImage}
            alt="Profile"
            borderRadius="full"
            boxSize={{ base: '60px', md: '48px' }}
            mx={{ base: 'auto', md: 0 }}
          />
        </Box>

        <Box flex="1">
          <VStack align="stretch" spacing={{ base: 3, md: 2 }}>
            <Flex direction={{ base: 'row', md: 'row' }} justify="space-between" align="center" width="100%">
              <Text color="whiteAlpha.600" fontSize="sm">
                {format(new Date(scheduled_at), 'MMM d, yyyy HH:mm')}
              </Text>
            </Flex>

            <Box>
              <Text color="white" fontSize="md">
                {signal?.result || 'No message available'}
              </Text>

              {signal?.failure_reason && (
                <Text color="red.400" fontSize="sm" mt={2}>
                  Error: {signal.failure_reason}
                </Text>
              )}
            </Box>
          </VStack>
        </Box>
      </Flex>
    </BaseCard>
  );
};
