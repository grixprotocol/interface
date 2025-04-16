import { Avatar, Button, FormControl, FormLabel, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { CreateSocialAgentPayload, TaskTarget } from '@/api/socialAgents/createAgent/types';

import { DEFAULT_PROFILE_PICTURES } from '../../constants/templates';

type StepOneProps = {
  formData: CreateSocialAgentPayload;
  setFormData: (data: CreateSocialAgentPayload) => void;
};

export const StepOne = ({ formData, setFormData }: StepOneProps) => (
  <VStack spacing={6} align="stretch">
    <Text color="gray.300" fontSize="md">
      {`Let's configure your new social agent`}
    </Text>
    <FormControl>
      <FormLabel color="gray.300">Agent Name</FormLabel>
      <Input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Crypto News Bot"
        bg="whiteAlpha.50"
        borderColor="whiteAlpha.200"
        color="white"
      />
    </FormControl>

    <FormControl>
      <FormLabel color="gray.300">Profile Picture</FormLabel>
      <SimpleGrid columns={4} spacing={4}>
        {DEFAULT_PROFILE_PICTURES.map((pic) => (
          <Avatar
            key={pic}
            src={pic}
            size="lg"
            cursor="pointer"
            onClick={() => setFormData({ ...formData, pictureURL: pic })}
            border={formData.pictureURL === pic ? '2px solid' : 'none'}
            borderColor="blue.400"
          />
        ))}
      </SimpleGrid>
    </FormControl>

    <FormControl>
      <FormLabel color="gray.300">Platforms</FormLabel>
      <SimpleGrid columns={2} spacing={4}>
        {([TaskTarget.DISCORD, TaskTarget.TELEGRAM] as TaskTarget[]).map((platform) => (
          <Button
            key={platform}
            variant={JSON.stringify(formData.task_target).includes(platform) ? 'solid' : 'outline'}
            colorScheme="whiteAlpha"
            onClick={() => {
              if (platform === TaskTarget.TELEGRAM) return;
              const newPlatforms = JSON.stringify(formData.task_target).includes(platform)
                ? formData.task_target.filter((p) => p !== platform)
                : [...formData.task_target, platform];
              setFormData({ ...formData, task_target: newPlatforms });
            }}
            isDisabled={platform === TaskTarget.TELEGRAM}
            opacity={platform === TaskTarget.TELEGRAM ? 0.5 : 1}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </Button>
        ))}
      </SimpleGrid>
    </FormControl>

    {/* Add webhook inputs based on selected platforms */}
    {formData.task_target.includes(TaskTarget.DISCORD) && (
      <FormControl>
        <FormLabel color="gray.300">Discord Webhook URL</FormLabel>
        <Input
          value={formData.target_credentials?.[TaskTarget.DISCORD]?.webhookUrl || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              target_credentials: {
                ...formData.target_credentials,
                [TaskTarget.DISCORD]: { webhookUrl: e.target.value },
              },
            })
          }
          placeholder="https://discord.com/api/webhooks/..."
          bg="whiteAlpha.50"
          borderColor="whiteAlpha.200"
          color="white"
        />
      </FormControl>
    )}

    {formData.task_target.includes(TaskTarget.TELEGRAM) && (
      <FormControl>
        <FormLabel color="gray.300">Telegram Bot Token</FormLabel>
        <Input
          value={formData.target_credentials?.[TaskTarget.TELEGRAM]?.chatId || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              target_credentials: {
                ...formData.target_credentials,
                [TaskTarget.TELEGRAM]: { chatId: e.target.value },
              },
            })
          }
          placeholder="Enter your Telegram bot token"
          bg="whiteAlpha.50"
          borderColor="whiteAlpha.200"
          color="white"
        />
      </FormControl>
    )}
  </VStack>
);
