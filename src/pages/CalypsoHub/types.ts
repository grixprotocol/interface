import { IconType } from 'react-icons';

export type SessionData = {
  totalValue: number;
  valueChange: number;
  yield: number;
  yieldChange: number;
  protectionCost: number;
  trades: number;
  uptime: string;
  risk: number;
  nextAction: string;
  asset: string;
  playbookInfo: {
    name: string;
    complexity: string;
    strategies: string[];
    behaviors: string[];
  };
  tradeHistory: Trade[];
  valueHistory: ValueDataPoint[];
  openPositions: Position[];
};

export type Agent = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'stopped';
  playbookId: string;
  playbookName: string;
  performance: {
    totalValue: number;
    yield: number;
    trades: number;
  };
  lastAction: string;
  createdAt: string;
};

export type Playbook = {
  id: string;
  name: string;
  description: string;
  performanceScore: number;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  behaviors: string[];
  strategies: string[];
  icon: IconType;
};

export type Trade = {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  hash: string;
};

export type ValueDataPoint = {
  timestamp: string;
  value: number;
};

export type Position = {
  asset: string;
  type: 'long' | 'short' | 'option';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  strategy: string;
};

export type AgentDetailsProps = {
  sessionId: string;
  sessionData: SessionData;
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;
};

export type Strategy = {
  id: string;
  name: string;
  type: 'income' | 'protection' | 'growth';
  description: string;
  risk: number;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  expectedYield: string;
  timeHorizon: string;
  marketConditions: string[];
  metrics: {
    risk: number; // 0-100
    complexity: number; // 0-100
    profitPotential: number; // 0-100
    timeCommitment: number; // 0-100
    capitalRequired: number; // 0-100
  };
  useCases: string[];
  actions: string[];
  example: {
    scenario: string;
    story: string[];
  };
};
