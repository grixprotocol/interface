import { Box, Button, Collapse, HStack, Select, Spinner, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

import { useGenerateSignal } from '@/api/trade-agents/generateSignal/useGenerateSignal';
import { InstrumentType } from '@/api/trade-agents/types/shared';
import { formatDate } from '@/utils/dateUtil';

import { RequestMaxProfit } from './components/RequestMaxProfit';
import { SignalCard } from './SignalCard';
import { NoSignalsCard } from './SignalCard/NoSignalsCard';
import { SignalsListProps } from './types';

// Add type for progress
type RequestProgress = 'completed' | 'pending' | 'failed';

const INSTRUMENT_TYPE_OPTIONS = [
  { label: 'All Types', value: 'all' },
  { label: 'Option', value: InstrumentType.option },
  { label: 'Asset', value: InstrumentType.asset },
];

export const SignalsList = ({ signalRequests, isLoading, agent }: SignalsListProps) => {
  const { mutateAsync: generateSignal, isPending: isGeneratingSignal } = useGenerateSignal();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedInstrumentType, setSelectedInstrumentType] = useState<string>(INSTRUMENT_TYPE_OPTIONS[0].value);
  const [expandedRequests, setExpandedRequests] = useState<Set<string>>(new Set());

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const toggleRequestExpansion = (requestId: string) => {
    setExpandedRequests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(requestId)) {
        newSet.delete(requestId);
      } else {
        newSet.add(requestId);
      }
      return newSet;
    });
  };

  // Get all signals from all requests for filtering
  const allSignals = signalRequests?.flatMap((request) => request.signals) || [];

  const filteredRequests = signalRequests?.filter((request) => {
    if (selectedInstrumentType === INSTRUMENT_TYPE_OPTIONS[0].value) return true;
    return request.signals.some(
      (signal) => signal.signal.instrument_type === (selectedInstrumentType as InstrumentType)
    );
  });

  // Get unique instrument types for the dropdown
  const uniqueInstrumentTypes = [...new Set(allSignals?.map((signal) => signal.signal.instrument_type) || [])];

  return (
    <Box flex={1} width="100%">
      <Box
        bg="whiteAlpha.50"
        borderRadius="xl"
        borderWidth={1}
        borderColor="whiteAlpha.200"
        overflow="hidden"
        height="calc(100vh - 100px)"
        position="sticky"
        top="20px"
        width="100%"
      >
        {/* Header */}
        <HStack
          p={4}
          borderBottom="1px"
          borderColor="whiteAlpha.200"
          bg="whiteAlpha.50"
          justifyContent="space-between"
          _hover={{ bg: 'whiteAlpha.100', transition: 'background 0.2s ease' }}
        >
          <Text color="white" fontWeight="semibold" fontSize="md">
            Signal Requests ({filteredRequests?.length ?? 0})
          </Text>
          <HStack spacing={3}>
            <Tooltip label="Filter by instrument type" placement="top">
              <Select
                size="sm"
                variant="ghost"
                bg="gray.800"
                color="white"
                borderRadius="md"
                borderColor="transparent"
                _hover={{
                  bg: 'gray.700',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 8px rgba(52, 152, 219, 0.4)',
                  transition: 'all 0.2s ease',
                }}
                value={selectedInstrumentType}
                onChange={(e) => setSelectedInstrumentType(e.target.value)}
                width="150px"
                icon={<Text fontSize="xs">▼</Text>}
                sx={{
                  '> option': {
                    background: 'gray.800',
                    color: 'white',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <option value="all">All Types</option>
                {uniqueInstrumentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Tooltip>
            <Tooltip label={`Sort by ${sortOrder === 'desc' ? 'oldest first' : 'newest first'}`} placement="top">
              <Button
                variant="ghost"
                size="sm"
                bg="gray.800"
                color="white"
                _hover={{
                  bg: 'gray.700',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 8px rgba(155, 89, 182, 0.4)',
                  transition: 'all 0.2s ease',
                }}
                _active={{
                  transform: 'translateY(0)',
                  boxShadow: 'none',
                }}
                transition="all 0.2s ease"
                onClick={toggleSortOrder}
              >
                Sort {sortOrder === 'desc' ? '↓' : '↑'}
              </Button>
            </Tooltip>
            <Tooltip label="Create a new trading signal" placement="top">
              <Button
                variant="ghost"
                size="sm"
                bg="gray.800"
                color="white"
                _hover={{
                  bg: 'gray.700',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 8px rgba(46, 204, 113, 0.4)',
                  transition: 'all 0.2s ease',
                }}
                _active={{
                  transform: 'translateY(0)',
                  boxShadow: 'none',
                }}
                transition="all 0.2s ease"
                onClick={() => void generateSignal({ agentId: agent.id })}
              >
                Generate signal
              </Button>
            </Tooltip>
          </HStack>
        </HStack>

        {isGeneratingSignal && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Box>
        )}

        {/* Scrollable content area */}
        <Box
          overflowY="auto"
          height="calc(100% - 60px)"
          width="100%"
          css={{
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
            },
          }}
        >
          {isLoading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <Spinner />
            </Box>
          ) : !filteredRequests?.length ? (
            <Box p={4} textAlign="center">
              <Text color="gray.500" fontSize="sm">
                No signal requests found
              </Text>
            </Box>
          ) : (
            <VStack spacing={3} p={3} width="100%" align="stretch">
              {filteredRequests
                .sort((a, b) => {
                  const comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                  return sortOrder === 'desc' ? comparison : -comparison;
                })
                .map((request) => {
                  if (!request.signals || request.signals.length === 0) {
                    return <NoSignalsCard key={request.id} request={request} agent={agent} />;
                  }
                  return (
                    <Box
                      key={request.id}
                      bg="whiteAlpha.50"
                      borderRadius="lg"
                      borderWidth={1}
                      borderColor="whiteAlpha.200"
                      overflow="hidden"
                      boxShadow="md"
                      _hover={{ boxShadow: 'lg', transition: 'box-shadow 0.2s ease' }}
                    >
                      <HStack
                        p={4}
                        cursor="pointer"
                        onClick={() => toggleRequestExpansion(request.id)}
                        _hover={{ bg: 'whiteAlpha.100' }}
                        justify="space-between"
                        borderLeft={expandedRequests.has(request.id) ? '4px solid' : '4px solid transparent'}
                        borderLeftColor={expandedRequests.has(request.id) ? 'blue.400' : 'transparent'}
                        transition="border-color 0.2s ease"
                      >
                        <HStack spacing={4} align="center">
                          {expandedRequests.has(request.id) ? (
                            <FaChevronDown size={16} />
                          ) : (
                            <FaChevronRight size={16} />
                          )}
                          <VStack align="start" spacing={1}>
                            <HStack spacing={3}>
                              <Text color="gray.300" fontSize="sm">
                                Request #{request.id.slice(-6)}
                              </Text>
                              <Text
                                color={
                                  request.progress === ('completed' as RequestProgress) ? 'green.400' : 'yellow.400'
                                }
                                fontSize="xs"
                                fontWeight="medium"
                                px={2}
                                py={0.5}
                                borderRadius="full"
                                bg={
                                  request.progress === ('completed' as RequestProgress)
                                    ? 'green.400.15'
                                    : 'yellow.400.15'
                                }
                              >
                                {request.progress}
                              </Text>
                            </HStack>
                            <Text color="gray.400" fontSize="xs">
                              {formatDate(request.created_at)}
                            </Text>
                          </VStack>
                        </HStack>
                        <HStack spacing={4} align="center">
                          <VStack align="center" spacing={0}>
                            <Text color="blue.300" fontSize="lg" fontWeight="bold">
                              {request.signals.length}
                            </Text>
                            <Text color="gray.400" fontSize="xs">
                              Signals
                            </Text>
                          </VStack>
                          <RequestMaxProfit signals={request.signals} />
                        </HStack>
                      </HStack>
                      <Collapse in={expandedRequests.has(request.id)} animateOpacity style={{ overflow: 'hidden' }}>
                        <VStack spacing={2} p={3} pl={6} align="stretch">
                          {request.signals.map((signal) => (
                            <SignalCard key={signal.id} signal={signal} agent={agent} />
                          ))}
                        </VStack>
                      </Collapse>
                    </Box>
                  );
                })}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};
