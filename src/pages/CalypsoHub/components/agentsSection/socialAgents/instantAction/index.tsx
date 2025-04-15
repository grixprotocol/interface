import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { AgentMessageType } from '../../../../../../api/socialAgents/createAgent/types'; // Import AgentMessageType
import { SocialAgentInstantActionResponse } from '../../../../../../api/socialAgents/getInstantAction/types';
import { fetchSocialAgentInstantAction } from '../../../../../../api/socialAgents/getInstantAction/useInstantActionGet';

const personalPrompts = [
  {
    text: 'Explain complex topics as if I am 5 years old, using simple language and relatable examples.',
    description: 'This prompt encourages simple explanations, making complex ideas easier to understand.',
  },
  {
    text: 'Use real-life stories to express your meaning, ensuring the tone is friendly and engaging.',
    description: 'This prompt helps to create relatable responses through storytelling.',
  },
  {
    text: 'Be concise and to the point, providing clear and direct answers without unnecessary details.',
    description: 'This prompt focuses on brevity, ensuring responses are straightforward and clear.',
  },
  {
    text: 'Provide detailed explanations with examples, maintaining a professional tone and demonstrating expertise in the subject matter.',
    description: 'This prompt encourages thorough and professional responses, ideal for in-depth discussions.',
  },
];

export const InstantActionCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionType, setActionType] = useState<AgentMessageType | ''>(''); // Set initial state to empty
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [asset, setAsset] = useState<'ETH' | 'BTC'>('ETH');
  const [data, setData] = useState<SocialAgentInstantActionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetInstantAction = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await fetchSocialAgentInstantAction({
        actionType,
        personalPrompt: selectedPrompt,
        asset,
      });
      setData(response);
    } catch (err) {
      setIsError(true);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" variant="solid" size="sm">
        Simulate Agent Task
      </Button>
      {isOpen && (
        <Card bg="gray.800" borderWidth={1} borderColor="whiteAlpha.300" borderRadius="md" boxShadow="md" p={2}>
          <CardBody>
            <IconButton
              aria-label="Close"
              icon={<CloseIcon />}
              variant="ghost"
              colorScheme="whiteAlpha"
              onClick={onClose}
              position="absolute"
              top={2}
              right={2}
              size="sm"
            />
            {data ? (
              <>
                <Text color="green.300" mt={2} fontSize="sm">
                  Response: {data.response}
                </Text>
                <Button
                  onClick={() => {
                    setData(null); // Reset data to show input fields again
                    setActionType(''); // Reset action type
                    setSelectedPrompt(''); // Reset selected prompt
                  }}
                  colorScheme="blue"
                  variant="solid"
                  width="full"
                  size="sm"
                >
                  Try Again
                </Button>
              </>
            ) : (
              <>
                <FormControl mb={2}>
                  <FormLabel color="gray.200" fontSize="sm">
                    Action Type
                  </FormLabel>
                  <Select
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value as AgentMessageType)}
                    size="sm"
                    color="white"
                    bg="whiteAlpha.50"
                  >
                    <option value="">Select Action Type</option>
                    {Object.values(AgentMessageType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <VStack spacing={2} align="stretch">
                  <Text color="white" fontWeight="medium">
                    Select a Personal Prompt:
                  </Text>
                  <Select
                    placeholder="Choose a prompt"
                    value={selectedPrompt}
                    onChange={(e) => setSelectedPrompt(e.target.value)}
                    color="white"
                    bg="whiteAlpha.50"
                  >
                    {personalPrompts.map((prompt, index) => (
                      <option key={index} value={prompt.text} title={prompt.description}>
                        {prompt.text}
                      </option>
                    ))}
                  </Select>
                </VStack>
                <FormControl mb={2}>
                  <FormLabel color="gray.200" fontSize="sm">
                    Asset
                  </FormLabel>
                  <Select
                    value={asset}
                    onChange={(e) => setAsset(e.target.value as 'ETH' | 'BTC')}
                    size="sm"
                    color="white"
                    bg="whiteAlpha.50"
                  >
                    <option value="ETH">ETH</option>
                    <option value="BTC">BTC</option>
                  </Select>
                </FormControl>
                <Button
                  onClick={() => void handleGetInstantAction()}
                  isLoading={isLoading}
                  colorScheme="blue"
                  variant="solid"
                  width="full"
                  size="sm"
                >
                  Get agent analysis
                </Button>
                {isError && (
                  <Text color="red.300" mt={2} fontSize="sm">
                    Error: {error}
                  </Text>
                )}
              </>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};
