import { useState } from 'react';
import { useAccount } from 'wagmi';

import { useCreateTradeAgent } from '@/api/trade-agents/createAgent/useCreateTradeAgent';
import { useRequestAgentSignals } from '@/api/trade-agents/requestSignals/useRequestAgentSignals';

import { CreateAgentFormData } from '../components/CreateAgentForm/types';

export class WalletNotConnectedError extends Error {
  constructor() {
    super('Please connect your wallet to create an agent');
    this.name = 'WalletNotConnectedError';
  }
}

export const useCreateAgentWithSignal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createAgent = useCreateTradeAgent();
  const requestSignal = useRequestAgentSignals();
  const { address, isConnecting } = useAccount();

  const createAgentWithSignal = async (formData: CreateAgentFormData) => {
    if (!address) {
      throw new WalletNotConnectedError();
    }

    setIsLoading(true);
    try {
      // Step 1: Create the agent
      const newAgent = await createAgent.mutateAsync({
        ownerAddress: address,
        config: {
          agent_name: formData.name,
          is_simulation: formData.is_simulation,
          signal_request_config: {
            budget_usd: formData.budget_usd,
            assets: formData.assets,
            protocols: formData.protocols,
            context_window_ms: formData.context_window_ms,
            trade_window_ms: formData.trade_window_ms,
            input_data: formData.input_data,
          },
        },
      });

      // Step 2: Immediately create a signal request for this agent
      await requestSignal.mutateAsync({
        agentId: newAgent.agentId,
        config: {
          budget_usd: formData.budget_usd,
          assets: formData.assets,
          protocols: formData.protocols,
          context_window_ms: formData.context_window_ms,
          trade_window_ms: formData.trade_window_ms,
          input_data: formData.input_data,
          user_prompt: formData.user_prompt,
        },
      });

      return newAgent;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAgentWithSignal,
    isLoading: isLoading || createAgent.isPending || requestSignal.isPending || isConnecting,
    isWalletConnected: !!address,
    isWalletConnecting: isConnecting,
  };
};
