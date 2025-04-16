export type AgentsMetrics = {
  activeTradeAgents: number;
  pausedTradeAgents: number;
  disabledTradeAgents: number;
  failedTradeAgents: number;
  socialAgentTasksCount: number;
  numberOfCompletedTradeAgentSignals: number;
  numberOfCompletedSocialAgentTaskActions: number;
};

export type GrixMetricsData = {
  availableMarket: {
    id: number;
    protocol_name: string;
    asset_display_name: string;
  }[];
  totalUniqueWeb3Accounts: number;
  integratedProtocolsList: {
    protocol_name: string;
  }[];
  totalOpenInterest: string;
  numberOfUpdatedExpiries: number;
  numberOfUpdatedOptions: {
    count: string;
    type: 'call' | 'put';
  }[];
  numberOfArchivedPerEntity: {
    count: string;
    entity_type: string;
    entity_type_string: string;
  }[];
  numberOfPausedPerEntity: {
    count: string;
    entity_type: string;
    entity_type_string: string;
  }[];
  graphTokens: {
    tokenName: string;
    totalPurchases: string;
    totalFeePaidByToken: string;
  }[];
  graphStatistics: {
    uniqueUserCount: string;
    totalNotionalValue: string;
    totalTransactions: string;
    totalEthFees: string;
    numberOfRefundFromProtocolTransactions: string;
    numberOfOrderLimitTransactions: string;
    numberOfExerciseTransactions: string;
    numberOfBuyOptionTransactions: string;
  };
  agentsMetrics: AgentsMetrics;
};

export type TransactionBreakdown =
  | {
      totalTransactions: string;
      refunds: string;
      limitOrders: string;
      exercises: string;
      buyOptions: string;
    }
  | undefined;
