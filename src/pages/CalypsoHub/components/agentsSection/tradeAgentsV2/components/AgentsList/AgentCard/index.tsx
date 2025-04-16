import { Box, HStack, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, VStack } from '@chakra-ui/react';
import { FaCog, FaRobot } from 'react-icons/fa';

import { formatDate, formatDuration } from '@/utils/dateUtil';

import { AgentCardProps } from '../../../types';
export const AgentCard = ({ agent, onSelect, isSelected }: AgentCardProps) => {
  const latestSignal = agent.signal_requests?.[0]?.signals?.[0];

  const formatTimeWindow = (ms: number) => formatDuration(ms);

  const formatList = (items: string[]) => {
    if (items.length <= 3) return items.join(', ');
    return `${items.slice(0, 2).join(', ')} +${items.length - 2} more`;
  };

  return (
    <Box
      p={4}
      bg="whiteAlpha.50"
      borderRadius="xl"
      borderWidth={1}
      borderColor={isSelected ? 'blue.400' : 'whiteAlpha.200'}
      cursor="pointer"
      _hover={{
        bg: 'whiteAlpha.100',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      onClick={() => {
        onSelect(agent.id);
      }}
      transition="all 0.2s"
      width="100%"
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaRobot} color="blue.400" />
            <Text color="white" fontWeight="bold">
              <Text as="span" color="gray.400">
                By:{' '}
              </Text>
              {agent.config.agent_name}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Popover trigger="hover" placement="top-end">
              <PopoverTrigger>
                <Box>
                  <Icon as={FaCog} color="gray.400" _hover={{ color: 'blue.400' }} cursor="pointer" />
                </Box>
              </PopoverTrigger>
              <PopoverContent bg="gray.800" borderColor="whiteAlpha.200" width="300px" boxShadow="lg" _focus={{ outline: 'none' }} p={2}>
                <PopoverBody>
                  <VStack align="start" spacing={3} p={2}>
                    <Text color="blue.400" fontSize="sm" fontWeight="bold" mb={1}>
                      Agent Settings
                    </Text>
                    <Box width="100%">
                      <Text color="gray.400" fontSize="xs" mb={1}>
                        Assets
                      </Text>
                      <Box p={2} bg="whiteAlpha.50" borderRadius="md" fontSize="sm">
                        <Text color="white">{formatList(agent.config.signal_request_config?.assets ?? [])}</Text>
                      </Box>
                    </Box>
                    <Box width="100%">
                      <Text color="gray.400" fontSize="xs" mb={1}>
                        Protocols
                      </Text>
                      <Box p={2} bg="whiteAlpha.50" borderRadius="md" fontSize="sm">
                        <Text color="white">{formatList(agent.config.signal_request_config?.protocols ?? [])}</Text>
                      </Box>
                    </Box>
                    <HStack width="100%" spacing={4}>
                      <Box flex={1}>
                        <Text color="gray.400" fontSize="xs" mb={1}>
                          Budget
                        </Text>
                        <Box p={2} bg="whiteAlpha.50" borderRadius="md" fontSize="sm">
                          <Text color="white">${parseFloat(agent.config.signal_request_config?.budget_usd ?? '0').toLocaleString()}</Text>
                        </Box>
                      </Box>
                      <Box flex={1}>
                        <Text color="gray.400" fontSize="xs" mb={1}>
                          Trade Window
                        </Text>
                        <Box p={2} bg="whiteAlpha.50" borderRadius="md" fontSize="sm">
                          <Text color="white">{formatTimeWindow(agent.config.signal_request_config?.trade_window_ms ?? 0)}</Text>
                        </Box>
                      </Box>
                    </HStack>
                    <Box width="100%">
                      <Text color="gray.400" fontSize="xs" mb={1}>
                        Context Window
                      </Text>
                      <Box p={2} bg="whiteAlpha.50" borderRadius="md" fontSize="sm">
                        <Text color="white">{formatTimeWindow(agent.config.signal_request_config?.context_window_ms ?? 0)}</Text>
                      </Box>
                    </Box>
                    {agent.config.signal_request_config?.user_prompt && (
                      <Box width="100%">
                        <Text color="gray.400" fontSize="xs" mb={1}>
                          Custom Prompt
                        </Text>
                        <Box p={2} bg="whiteAlpha.50" borderRadius="md" fontSize="sm">
                          <Text color="white" noOfLines={2}>
                            {agent.config.signal_request_config?.user_prompt}
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Text fontSize="xs" color="gray.400">
              {formatDate(agent.created_at)}
            </Text>
          </HStack>
        </HStack>

        <Box>
          <Text color="gray.400" fontSize="sm">
            Signals:{' '}
            <Text as="span" fontWeight="bold">
              {agent.signal_requests?.length ?? 0}
            </Text>
          </Text>
          {latestSignal && (
            <Text color="gray.400" fontSize="sm">
              Expected Value:{' '}
              <Text as="span" fontWeight="bold">
                ${latestSignal.signal.expected_total_price_usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Text>
            </Text>
          )}
        </Box>

        <Text color="gray.500" fontSize="xs">
          Last Action:{' '}
          <Text as="span" fontWeight="medium">
            {latestSignal?.signal.action_type || 'No actions yet'}
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};
