import { Box, Button, Grid, GridItem, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { FaGlobeAmericas, FaPlus, FaUserAstronaut } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import { AgentsList } from './components/AgentsList';
import { CreateAgentForm } from './components/CreateAgentForm';
import { SignalsList } from './components/SignalsList';
import { useAgentsV2 } from './hooks/useAgentsV2';

type AgentListType = 'personal' | 'public';

export const TradeAgentsV2 = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(undefined);
  const [activeList, setActiveList] = useState<AgentListType>('public');
  const { address } = useAccount();
  const { agents, isLoading } = useAgentsV2(address);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const personalAgents = agents?.personalAgents;
  const publicAgents = agents?.publicAgents?.filter((agent) => agent.signal_requests?.some((request) => request.signals?.length > 0));

  const defaultSelectedAgentId = useMemo(() => {
    // If there's already a selected agent that exists in the current list, keep it
    if (selectedAgentId) {
      if (activeList === 'public' && publicAgents?.some((agent) => agent.id === selectedAgentId)) {
        return selectedAgentId;
      }
      if (activeList === 'personal' && personalAgents?.some((agent) => agent.id === selectedAgentId)) {
        return selectedAgentId;
      }
    }

    // Otherwise, select the first agent from the active list
    if (activeList === 'public' && publicAgents && publicAgents.length > 0) {
      return publicAgents[0].id;
    }
    if (activeList === 'personal' && personalAgents && personalAgents.length > 0) {
      return personalAgents[0].id;
    }

    return undefined;
  }, [activeList, publicAgents, personalAgents, selectedAgentId]);

  // Update selectedAgentId when defaultSelectedAgentId changes
  useEffect(() => {
    setSelectedAgentId(defaultSelectedAgentId);
  }, [defaultSelectedAgentId]);

  const selectedAgent =
    activeList === 'personal'
      ? personalAgents?.find((agent) => agent.id === selectedAgentId)
      : publicAgents?.find((agent) => agent.id === selectedAgentId);

  return (
    <Box width="72vw">
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <HStack
          spacing={0}
          bg="gray.800"
          p={1}
          borderRadius="xl"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        >
          <Button
            size="lg"
            variant="unstyled"
            onClick={() => setActiveList('personal')}
            position="relative"
            px={6}
            py={3}
            color={activeList === 'personal' ? 'white' : 'gray.400'}
            _hover={{ color: 'white' }}
            transition="all 0.2s"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg={activeList === 'personal' ? 'blue.500' : 'transparent'}
              borderRadius="lg"
              transition="all 0.2s"
              zIndex={0}
              _hover={{
                bg: activeList === 'personal' ? 'blue.400' : 'whiteAlpha.100',
              }}
            />
            <HStack spacing={2} position="relative" zIndex={1}>
              <FaUserAstronaut />
              <Text fontWeight="bold">Customized signal</Text>
            </HStack>
          </Button>
          <Button
            size="lg"
            variant="unstyled"
            onClick={() => setActiveList('public')}
            position="relative"
            px={6}
            py={3}
            color={activeList === 'public' ? 'white' : 'gray.400'}
            _hover={{ color: 'white' }}
            transition="all 0.2s"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg={activeList === 'public' ? 'purple.500' : 'transparent'}
              borderRadius="lg"
              transition="all 0.2s"
              zIndex={0}
              _hover={{
                bg: activeList === 'public' ? 'purple.400' : 'whiteAlpha.100',
              }}
            />
            <HStack spacing={2} position="relative" zIndex={1}>
              <FaGlobeAmericas />
              <Text fontWeight="bold">Public signal</Text>
            </HStack>
          </Button>
        </HStack>

        {activeList === 'personal' && (
          <Button
            leftIcon={<FaPlus />}
            colorScheme="blue"
            onClick={onOpen}
            size="lg"
            px={6}
            borderRadius="xl"
            bgGradient="linear(to-r, blue.400, blue.500)"
            _hover={{
              bgGradient: 'linear(to-r, blue.500, blue.600)',
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
          >
            Create New Agent
          </Button>
        )}
      </Box>

      <Grid templateColumns={{ base: '1fr', md: '1fr 3fr' }} gap={4}>
        <GridItem>
          <AgentsList
            agents={activeList === 'personal' ? personalAgents || [] : publicAgents || []}
            isLoading={isLoading}
            onAgentSelect={setSelectedAgentId}
            selectedAgentId={selectedAgentId}
          />
        </GridItem>
        <GridItem>
          {selectedAgent && (
            <SignalsList signalRequests={selectedAgent?.signal_requests || []} isLoading={isLoading} agent={selectedAgent} />
          )}
        </GridItem>
      </Grid>

      <CreateAgentForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
