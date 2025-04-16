import { Fuul } from '@fuul/sdk';
import type { GetPointsLeaderboardParams } from '@fuul/sdk/dist/types/api';


type TotalPoints = {
  totalPoints: number;
};

const FUUL_API_KEY = "8d5dbc2bc85b953e795b97c38865741f95172d79857e1cece53e059ee07dfd15";  

export const fuulInit = () => {
  Fuul.init({
    apiKey: FUUL_API_KEY,
  });
};

export const generateTrackingLink = async (address: string) => {
  const trackingLink = await Fuul.generateTrackingLink('https://app.grix.finance/trade', address);
  return trackingLink;
};

export const getUserStats = async (
  params: GetPointsLeaderboardParams
): Promise<{ points: number | string; position: number | string }> => {
  const leaderboard = await Fuul.getPointsLeaderboard(params);
  if (leaderboard.results.length > 0) {
    const points = Number(leaderboard.results[0].total_amount);
    const position = leaderboard.results[0].rank;
    return { points, position };
  }
  return { points: 0, position: 'N/A' };
};

export const getTotalPoints = async (): Promise<TotalPoints> => {
  let totalPoints = 0;
  const leaderboard = await Fuul.getPointsLeaderboard({});
  const totalPages = Math.ceil(leaderboard.total_results / leaderboard.page_size);
  const allLeaderboard = [];
  for (let i = 1; i <= totalPages; i++) {
    const leaderboard = await Fuul.getPointsLeaderboard({ page: i });
    allLeaderboard.push(leaderboard);
    leaderboard.results.forEach((result) => {
      totalPoints += Number(result.total_amount);
    });
  }
  return { totalPoints };
};

export const sendPageView = async (pathname: string): Promise<void> => {
  await Fuul.sendPageview(pathname);
};

export const sendWalletConnected = async (address: string, signature: string, message: string): Promise<void> => {
  await Fuul.sendConnectWallet({ address, signature, message });
};
