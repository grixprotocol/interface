import { Box, HStack, Text } from '@chakra-ui/react';

import { formatDate } from '@/utils/dateUtil';

import { NoSignalsCardProps } from '../types';

export const NoSignalsCard: React.FC<NoSignalsCardProps> = ({ request }) => (
  <Box
    key={request.id}
    bg="whiteAlpha.50"
    borderRadius="lg"
    borderWidth={1}
    borderColor="whiteAlpha.200"
    overflow="hidden"
    boxShadow="md"
    _hover={{ boxShadow: 'lg', transition: 'box-shadow 0.2s ease' }}
    m={3}
    p={4}
  >
    {/* Header for agents with no signals */}
    <HStack justify="space-between" align="center">
      <Text color="white" fontWeight="semibold" fontSize="md">
        Signal Request #{request.id.slice(-6)}
      </Text>
      <Text color="gray.400" fontSize="xs">
        No Signals Available
      </Text>
    </HStack>
    <Text color="gray.400" fontSize="xs" mt={2}>
      {formatDate(request.created_at)}
    </Text>
  </Box>
);
