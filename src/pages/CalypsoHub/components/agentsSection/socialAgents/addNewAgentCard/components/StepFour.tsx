import { FormControl, FormLabel, Text, Textarea, VStack } from '@chakra-ui/react';

import { CreateSocialAgentPayload } from '@/api/socialAgents/createAgent/types';

type StepFourProps = {
  formData: CreateSocialAgentPayload;
  setFormData: (data: CreateSocialAgentPayload) => void;
};

const MINIMUM_PROMPT_LENGTH = 80;

export const StepFour = ({ formData, setFormData }: StepFourProps) => (
  <VStack spacing={6} align="stretch">
    <FormControl>
      <FormLabel color="gray.300">Custom Instructions</FormLabel>
      <Textarea
        value={formData.prompt}
        onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
        placeholder="Add any specific instructions or preferences for your social agent..."
        rows={6}
        bg="whiteAlpha.50"
        borderColor="whiteAlpha.200"
        color="white"
        isInvalid={formData.prompt.length < MINIMUM_PROMPT_LENGTH}
      />
      <Text mt={2} color="gray.400" fontSize="sm">
        Example: Focus on educational content and explain technical analysis in simple terms.
      </Text>
      <Text mt={1} fontSize="sm" color={formData.prompt.length < MINIMUM_PROMPT_LENGTH ? 'red.300' : 'gray.400'}>
        {formData.prompt.length}/{MINIMUM_PROMPT_LENGTH} characters minimum required
      </Text>
    </FormControl>
  </VStack>
);
