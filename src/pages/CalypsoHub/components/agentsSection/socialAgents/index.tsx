import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaLightbulb, FaUsers } from 'react-icons/fa';

import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';
import { useSocialAgentTasksGet } from '@/api/socialAgents/getAgentTasks/useSocialAgentTasksGet';
import { BaseCard } from '@/components/BaseCard';
import { useUserAccount } from '@/utils/web3Util';

import { sectionDescriptions } from '../../../config/sectionDescriptions';
import { FeatureRequestsSection } from '../../featureRequestsSection/featureRequestPage';
import { Dashboard } from './components/Dashboard';
import { SelectedAgent } from './selectedAgent';
import { SidebarAgentsList } from './sidebarAgentsList';
import { SocialAgentStats } from './types';

export const SocialAgents = () => {
  const [selectedAgent, setSelectedAgent] = useState<SocialAgentTask | null>(null);
  const { address } = useUserAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: agents, isLoading, isError } = useSocialAgentTasksGet({ userAddress: address || '' });

  const stats: SocialAgentStats = {
    totalAgents: agents?.length || 0,
    activeAgents: agents?.filter((agent) => agent.is_active).length || 0,
  };

  const activeAgent = selectedAgent ? agents?.find((agent) => agent.id === selectedAgent.id) : null;

  return (
    <VStack w="full" spacing={4}>
      <BaseCard>
        <HStack gap={2}>
          <Icon as={FaUsers} color="blue.400" boxSize={5} />
          <Text color="white" fontSize="lg" fontWeight="bold">
            {sectionDescriptions.socialAgents.title}
          </Text>
        </HStack>
        <Text color="gray.300" fontSize="md">
          {sectionDescriptions.socialAgents.description}
        </Text>
        <Box position="absolute" top={6} right={6}>
          <Button
            leftIcon={<FaLightbulb />}
            onClick={onOpen}
            variant="ghost"
            color="gray.400"
            _hover={{ color: 'blue.400' }}
            size="sm"
          >
            Feature Requests
          </Button>
        </Box>
      </BaseCard>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent bg="gray.800" maxH="90vh" overflowY="auto">
          <ModalHeader color="white">Feature Requests</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <FeatureRequestsSection />
          </ModalBody>
        </ModalContent>
      </Modal>

      <BaseCard>
        <SidebarAgentsList
          onClose={() => setSelectedAgent(null)}
          agents={agents}
          isLoading={isLoading}
          isError={isError}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
        />
        <Box>
          {selectedAgent && activeAgent ? (
            <SelectedAgent agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
          ) : (
            <Dashboard stats={stats} agents={agents} onSelectAgent={(agent) => setSelectedAgent(agent)} />
          )}
        </Box>
      </BaseCard>
    </VStack>
  );
};
