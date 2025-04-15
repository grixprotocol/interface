import { Fuul } from '@fuul/sdk';
import { useMutation } from '@tanstack/react-query';
import { useSignMessage } from 'wagmi';

import { useUserAccount } from '@/utils/web3Util';

export const useAffiliateLink = () => {
  const { address } = useUserAccount();
  const { signMessageAsync } = useSignMessage();

  return useMutation({
    mutationFn: async () => {
      const message = `I want to become an affiliate for Grix. My wallet address is ${address}`;
      const signature = await signMessageAsync({ message });
      if (!address || !signature) throw new Error('missing params');

      await Fuul.sendConnectWallet({ address, signature, message });

      return await Fuul.generateTrackingLink('https://app.grix.finance/trade', address);
    },
  });
};
