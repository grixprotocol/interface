import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

import { AgentInputType } from '@/api/trade-agents/types/TradeAgent';
import { UnderlyingAsset } from '@/api/types';
import { FormMultiSelect } from '@/components/FormControls';
import { useGrixToast } from '@/components/useToast/useToast';
import { protocolsArrayData } from '@/config';
import { assetConfig } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/config/assetConfig';
import { inputTypeConfig } from '@/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/config/inputTypeConfig';
import { ConnectButton } from '@/pages/customW3mButton';

import { useCreateAgentWithSignal, WalletNotConnectedError } from '../../hooks/useCreateAgentWithSignal';
import { DEFAULT_FORM_DATA } from './defaults';
import { CreateAgentFormProps } from './types';
import { validateForm } from './validation';
export const CreateAgentForm: React.FC<CreateAgentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createAgentWithSignal, isLoading, isWalletConnected, isWalletConnecting } = useCreateAgentWithSignal();
  const toast = useGrixToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) return;

    try {
      await createAgentWithSignal(formData);

      toast({
        title: 'Agent Created',
        description: 'Your trading agent has been created successfully',
        status: 'success',
        duration: 5000,
      });

      onClose();
    } catch (error) {
      if (error instanceof WalletNotConnectedError) {
        toast({
          title: 'Wallet Not Connected',
          description: 'Please connect your wallet to create an agent',
          status: 'warning',
          duration: 5000,
        });
      } else {
        toast({
          title: 'Failed to Create Agent',
          description: error instanceof Error ? error.message : 'An unexpected error occurred',
          status: 'error',
          duration: 5000,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(8px) brightness(0.4)" bg="rgba(0, 0, 0, 0.8)" />
      <ModalContent
        bg="rgba(13, 17, 25, 0.95)"
        borderWidth="1px"
        borderColor="rgba(66, 153, 225, 0.3)"
        borderRadius="xl"
        boxShadow="0 0 40px rgba(66, 153, 225, 0.15)"
        backdropFilter="blur(20px)"
      >
        <ModalHeader borderBottom="1px solid rgba(66, 153, 225, 0.2)" py={6}>
          <HStack spacing={4}>
            <Icon as={FaRobot} color="blue.400" boxSize={8} filter="drop-shadow(0 0 8px rgba(66, 153, 225, 0.6))" />
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, blue.400, purple.400)" bgClip="text">
                Create Signal Strategy
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700">
                Configure your AI-powered trading strategy
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="gray.400" />

        <ModalBody pb={6}>
          <VStack
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(e);
            }}
            spacing={6}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel fontSize="sm" color="gray.400">
                Strategy Name
              </FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder="Enter strategy name..."
                borderColor="blue.400"
                _focus={{
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px #4299E1',
                }}
                _hover={{
                  borderColor: 'blue.300',
                }}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel
                fontSize="sm"
                color="whiteAlpha.800"
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Budget (USD)
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="whiteAlpha.700">
                  $
                </InputLeftElement>
                <Input
                  bg="rgba(13, 17, 25, 0.6)"
                  border="1px solid rgba(66, 153, 225, 0.3)"
                  _hover={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px rgba(66, 153, 225, 0.3)',
                  }}
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.3)',
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.assets}>
              <FormLabel fontSize="sm" color="gray.400">
                Trading Assets
              </FormLabel>
              <FormMultiSelect
                label="Trading Assets"
                options={Object.values(UnderlyingAsset).map((asset) => ({
                  value: asset,
                  label: assetConfig[asset].label,
                  icon: assetConfig[asset].icon,
                }))}
                selectedValues={formData.assets}
                onChange={(values) => {
                  setFormData((prev) => ({
                    ...prev,
                    assets: values.map((v) => v as UnderlyingAsset),
                  }));
                  setErrors((prev) => ({ ...prev, assets: '' }));
                }}
              />
              <FormErrorMessage>{errors.assets}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.protocols}>
              <FormLabel fontSize="sm" color="gray.400">
                Trading Protocols
              </FormLabel>
              <FormMultiSelect
                label="Trading Protocols"
                options={protocolsArrayData.map((protocol) => ({
                  value: protocol.protocolName,
                  label: protocol.label,
                  iconUrl: protocol.icon,
                }))}
                selectedValues={formData.protocols}
                onChange={(values) => {
                  setFormData((prev) => ({ ...prev, protocols: values }));
                  setErrors((prev) => ({ ...prev, protocols: '' }));
                }}
              />
              <FormErrorMessage>{errors.protocols}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.input_data}>
              <FormLabel fontSize="sm" color="gray.400">
                Data Sources
              </FormLabel>
              <FormMultiSelect
                label="Data Sources"
                options={Object.values(AgentInputType).map((type) => ({
                  value: type,
                  label: inputTypeConfig[type].label,
                  icon: inputTypeConfig[type].icon,
                }))}
                selectedValues={formData.input_data}
                onChange={(values) => {
                  setFormData((prev) => ({
                    ...prev,
                    input_data: values.map((v) => v as AgentInputType),
                  }));
                  setErrors((prev) => ({ ...prev, input_data: '' }));
                }}
              />
              <FormErrorMessage>{errors.input_data}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.user_prompt}>
              <FormLabel fontSize="sm" color="gray.400">
                Strategy Description (Optional)
              </FormLabel>
              <Input
                value={formData.user_prompt || ''}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    user_prompt: e.target.value,
                  }));
                  setErrors((prev) => ({ ...prev, user_prompt: '' }));
                }}
                placeholder="Describe your trading strategy..."
                borderColor="blue.400"
                _focus={{
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px #4299E1',
                }}
                _hover={{
                  borderColor: 'blue.300',
                }}
              />
              <FormErrorMessage>{errors.user_prompt}</FormErrorMessage>
            </FormControl>

            {!isWalletConnected ? (
              <VStack spacing={4} w="full">
                <Text color="gray.400" fontSize="sm">
                  Connect your wallet to create a strategy
                </Text>
                <ConnectButton onClick={() => {}} label="Connect Wallet" />
              </VStack>
            ) : (
              <Button
                type="submit"
                position="relative"
                width="full"
                height="56px"
                isLoading={isLoading}
                loadingText={isWalletConnecting ? 'Connecting Wallet...' : 'Creating Strategy...'}
                bg="linear-gradient(135deg, #4299E1 0%, #2B6CB0 100%)"
                color="white"
                border="2px solid"
                borderColor="blue.400"
                borderRadius="xl"
                fontSize="xl"
                fontWeight="bold"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 20px rgba(66, 153, 225, 0.6)',
                }}
                _active={{
                  transform: 'scale(0.98)',
                }}
              >
                Create Strategy
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
