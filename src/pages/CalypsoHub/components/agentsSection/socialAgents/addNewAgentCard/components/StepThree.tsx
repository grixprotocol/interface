import { Box, Button, Checkbox, FormControl, FormLabel, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { AgentMessageType, CreateSocialAgentPayload } from '@/api/socialAgents/createAgent/types';

const taskCategories = {
  'Market Status': [
    AgentMessageType.marketStatusBTC,
    AgentMessageType.marketStatusETH,
    AgentMessageType.marketSentiment,
  ],
  Analysis: [AgentMessageType.actionableRecommendation],
};

const MAX_SELECTIONS = 3;

const formatTaskName = (task: string) =>
  task
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

const intervals = [
  { label: '1 Hour', value: '1H' },
  { label: '3 Hours', value: '3H' },
  { label: '6 Hours', value: '6H' },
  { label: '24 Hours', value: '24H' },
];

type StepThreeProps = {
  formData: CreateSocialAgentPayload;
  setFormData: (data: CreateSocialAgentPayload) => void;
};

export const StepThree = ({ formData, setFormData }: StepThreeProps) => {
  const handleTaskToggle = (task: AgentMessageType) => {
    const currentTasks = formData.agentTask_actios_types || [];

    // If task is already selected, remove it
    if (currentTasks.includes(task)) {
      setFormData({
        ...formData,
        agentTask_actios_types: currentTasks.filter((t) => t !== task),
      });
      return;
    }

    // If trying to add more than MAX_SELECTIONS, don't allow
    if (currentTasks.length >= MAX_SELECTIONS) {
      return;
    }

    // Add the new task
    setFormData({
      ...formData,
      agentTask_actios_types: [...currentTasks, task],
    });
  };

  const selectedCount = formData.agentTask_actios_types?.length || 0;

  return (
    <VStack spacing={6} align="stretch">
      <FormControl>
        <FormLabel color="gray.300">Action Interval</FormLabel>
        <SimpleGrid columns={4} spacing={4}>
          {intervals.map(({ label, value }) => (
            <Button
              key={value}
              variant={formData.action_rate === value ? 'solid' : 'outline'}
              colorScheme="whiteAlpha"
              onClick={() => setFormData({ ...formData, action_rate: value })}
            >
              {label}
            </Button>
          ))}
        </SimpleGrid>
      </FormControl>

      <FormControl>
        <FormLabel color="gray.300">
          Message Types ({selectedCount}/{MAX_SELECTIONS})
        </FormLabel>
        <Text color="gray.400" fontSize="sm" mb={4}>
          Select up to {MAX_SELECTIONS} message types that you want to receive
        </Text>
        <VStack align="stretch" spacing={4}>
          {Object.entries(taskCategories).map(([category, tasks]) => (
            <Box key={category}>
              <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>
                {category}
              </Text>
              <SimpleGrid columns={2} spacing={2}>
                {tasks.map((task) => (
                  <Checkbox
                    key={task}
                    isChecked={formData.agentTask_actios_types?.includes(task)}
                    onChange={() => handleTaskToggle(task)}
                    isDisabled={!formData.agentTask_actios_types?.includes(task) && selectedCount >= MAX_SELECTIONS}
                    colorScheme="blue"
                    color="gray.300"
                  >
                    {formatTaskName(task)}
                  </Checkbox>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </VStack>
      </FormControl>
    </VStack>
  );
};
