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
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaChartLine, FaLightbulb, FaRobot, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { BaseCard } from '@/components/BaseCard';

import { sectionDescriptions } from '../../config/sectionDescriptions';
import { FeatureRequestsSection } from '../featureRequestsSection/featureRequestPage';
import { AgentFeedSection } from './feedSection';

const iconMap: Record<string, IconType> = {
  FaChartLine,
  FaRobot,
  FaUsers,
};

export const GuideSection = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainSections = ['tradeAgents', 'socialAgents'];

  return (
    <VStack spacing={8}>
      <BaseCard w="full" position="relative">
        <VStack spacing={4} textAlign="center" mb={4}>
          <Text as="h1" fontSize="3xl" fontWeight="bold" bgGradient="linear(to-r, blue.500, primary.500)" bgClip="text">
            Welcome to Grix AI Playground
          </Text>
          <Text color="gray.400" fontSize={{ base: 'md', md: 'lg' }} maxW="600px">
            Explore AI-powered derivatives trading in a controlled environment.
          </Text>
        </VStack>
        <Box position="absolute" top={0} right={0}>
          <Button leftIcon={<FaLightbulb />} onClick={onOpen} variant="ghost" color="gray.400" _hover={{ color: 'blue.400' }} size="sm">
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

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
        {mainSections.map((key) => {
          const section = sectionDescriptions[key];
          return (
            <Box
              key={section.title}
              p={8}
              borderRadius="xl"
              bg="whiteAlpha.50"
              borderWidth={1}
              borderColor="whiteAlpha.200"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              minH="240px"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
            >
              <Box>
                <HStack mb={6} spacing={4}>
                  <Icon as={iconMap[section.icon]} color={section.color} boxSize={6} />
                  <Text color="white" fontSize="xl" fontWeight="bold">
                    {section.title}
                  </Text>
                </HStack>
                <Text color="gray.300" fontSize="md" lineHeight="tall">
                  {section.description}
                </Text>
              </Box>
              <Button
                mt={8}
                colorScheme="blue"
                size="lg"
                onClick={() => navigate(section.path)}
                bgGradient="linear(to-r, blue.400, teal.400)"
                _hover={{
                  bgGradient: 'linear(to-r, blue.500, teal.500)',
                  transform: 'translateY(-1px)',
                }}
                w="full"
              >
                {section.ctaText}
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
      <AgentFeedSection />
    </VStack>
  );
};
