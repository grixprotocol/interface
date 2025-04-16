import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';

export const useUserPoints = ({ userAddress, pageSize }: { userAddress?: string; pageSize?: number }) =>
  useQuery({
    queryKey: ['user-points', userAddress],
    queryFn: async () => {
      const leaderboard = await Fuul.getPointsLeaderboard({
        user_address: userAddress,
        page_size: pageSize,
      });
      return leaderboard;
    },
  });
