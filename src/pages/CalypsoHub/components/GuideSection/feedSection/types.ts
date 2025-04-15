import { AgentMessageType } from '@/api/socialAgents/createAgent/types';
import { ActionStatus } from '@/api/socialAgents/getAgentTaskActions/types';

export type SocialAgentAction = {
  id: number;
  scheduled_at: Date;
  created_at: Date;
  updated_at: Date;
  type: AgentMessageType;
  status: ActionStatus;
  result?: string | null;
  failure_reason?: string;
};
