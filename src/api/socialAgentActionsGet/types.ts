import { CalypsoTaskStatus, CalypsoTaskType } from '../agentSignals/types';
import { AgentMessageType, TaskTarget } from '../socialAgents/createAgent/types';
import { ActionStatus } from '../socialAgents/getAgentTaskActions/types';

export type SocialAgentActionsParams = {
  limit?: number;
  offset?: number;
  status?: CalypsoTaskStatus;
  type?: CalypsoTaskType;
};

type SocialAgentAction = {
  id: number;
  action_type: AgentMessageType;
  status: ActionStatus;
  scheduled_at: Date;
  result: string | null;
  error: string | null;
  social_agent_task: {
    id: number;
    task_target: TaskTarget;
  };
  created_at: Date;
  updated_at: Date;
  type: AgentMessageType;
};

export type SocialAgentActionsResponse = {
  data: SocialAgentAction[];
  totalCount: number;
};
