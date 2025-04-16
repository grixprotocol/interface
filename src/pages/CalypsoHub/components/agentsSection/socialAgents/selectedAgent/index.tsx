import { CloseIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FaEdit, FaPause, FaPlay } from 'react-icons/fa';

import { SocialAgentTask } from '@/api/socialAgents/getAgentTasks/types';

import { ActivitySection } from './components/ActivitySection';
import { AgentHeader } from './components/AgentHeader';
import { ConfigurationSection } from './components/ConfigurationSection';

type SelectedAgentProps = {
  agent: SocialAgentTask;
  onClose: () => void;
};

export const SelectedAgent = ({ agent, onClose }: SelectedAgentProps) => (
  <Stack spacing={6}>
    <HStack justify="space-between">
      <AgentHeader
        name={agent?.name}
        platforms={[agent?.task_target]}
        status={agent?.is_active ? 'active' : 'inactive'}
      />
      <HStack spacing={2}>
        <Button
          size="sm"
          leftIcon={agent?.is_active ? <FaPause /> : <FaPlay />}
          variant="ghost"
          colorScheme="whiteAlpha"
        >
          {agent?.is_active ? 'Pause' : 'Activate'}
        </Button>
        <Button size="sm" leftIcon={<FaEdit />} colorScheme="blue">
          Edit
        </Button>
        <IconButton aria-label="Close agent details" icon={<CloseIcon />} variant="ghost" size="sm" onClick={onClose} />
      </HStack>
    </HStack>

    <Tabs variant="soft-rounded" colorScheme="whiteAlpha">
      <TabList>
        <Tab>Configuration</Tab>
        <Tab>Performance</Tab>
        <Tab>Activity</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <ConfigurationSection
            prompt={agent?.prompt}
            actionRate={String(agent?.action_rate ?? '')}
            taskTarget={agent?.task_target}
          />
        </TabPanel>
        <TabPanel px={0}>{/* <PerformanceSection /> */}</TabPanel>
        <TabPanel px={0}>
          <ActivitySection agent={agent} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Stack>
);
