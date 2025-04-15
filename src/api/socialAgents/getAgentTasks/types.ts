import { AgentMessageType, TaskTarget } from '../createAgent/types';

export type SocialAgentTask = {
  id: number;
  prompt: string;
  task_target: TaskTarget;
  agentTask_actios_types: AgentMessageType[];
  name: string;
  is_active: boolean;
  action_rate: {
    hours: number;
  };
  number_of_scheduled_actions: number;
};

export type SocialAgentTaskResponse = {
  tasks: SocialAgentTask[];
};
