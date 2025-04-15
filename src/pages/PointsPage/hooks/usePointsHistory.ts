import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';

export const usePointsHistory = ({ userAddress }: { userAddress?: string }) =>
  useQuery({
    queryKey: ['points-milestones'],
    queryFn: async () => {
      if (!userAddress) throw new Error('User address is required');

      return Fuul.getUserPointsMovements({ user_address: userAddress });
    },
    enabled: !!userAddress,
  });
