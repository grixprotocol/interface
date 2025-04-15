import { AgentMessageType } from '../createAgent/types';
import { SocialAgentTask } from '../getAgentTasks/types';

export type SocialAgentTaskActionResponse = {
  taskActions: SocialAgentTaskAction[];
};

export type SocialAgentTaskAction = {
  id: number;
  status: ActionStatus;
  action_type: AgentMessageType;
  scheduled_at: Date;
  result?: string;
  error?: string;
  failure_reason?: string;
  created_at: Date;
  updated_at: Date;
  social_agent_task: SocialAgentTask;
};

export enum ActionStatus {
  SCHEDULED = 'scheduled',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SENT = 'sent',
}
