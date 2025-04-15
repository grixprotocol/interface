import { Badge, Box, FormControl, FormLabel, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { CreateSocialAgentPayload } from '@/api/socialAgents/createAgent/types';

import { PERSONALITY_TEMPLATES } from '../../constants/templates';

type StepTwoProps = {
  formData: CreateSocialAgentPayload;
  setFormData: (data: CreateSocialAgentPayload) => void;
};

export const StepTwo = ({ formData, setFormData }: StepTwoProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('professional-analyst');

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({ ...formData, personality: templateId });
  };

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel color="gray.300">Personality Template</FormLabel>
          <SimpleGrid columns={1} spacing={4}>
            {PERSONALITY_TEMPLATES.map((template) => (
              <Box
                key={template.id}
                p={4}
                bg="whiteAlpha.50"
                borderRadius="md"
                borderWidth={1}
                borderColor={selectedTemplate === template.id ? 'blue.400' : 'whiteAlpha.200'}
                cursor="pointer"
                onClick={() => handleTemplateClick(template.id)}
              >
                <VStack align="start" spacing={2}>
                  <Text color="white" fontWeight="bold">
                    {template.name}
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    {template.description}
                  </Text>
                  <HStack>
                    <Badge colorScheme="purple">{template.communicationStyle}</Badge>
                    <Badge colorScheme="blue">{template.interactionStyle}</Badge>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </FormControl>
      </VStack>
    </VStack>
  );
};
