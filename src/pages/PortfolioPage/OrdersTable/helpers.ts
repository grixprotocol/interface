import { useQuery } from '@tanstack/react-query';

import { UserRequest } from '@/api';
import { mobyContracts } from '@/web3Config/moby/config';
import { getNftBalanceByAddress } from '@/web3Config/moby/mobyPositionsManager';
import { useFillQuote } from '@/web3Config/premia/fillQuote';

export const useSplitPositionsData = (userAddress: `0x${string}`, data?: UserRequest[]) => {
  const { premiaPositionBalance } = useFillQuote();

  return useQuery({
    queryKey: ['split-positions-data', data],
    queryFn: async () => {
      try {
        if (!data?.length) return { historyData: [], positionsData: [] };
        const tempProcessedData = await Promise.all(
          data.map(async (d) => {
            const expirationTimestamp = Number(d.request_data.expiration) * 1000;
            const currentTimestamp = Date.now();

            const isExpired = currentTimestamp > expirationTimestamp;
            d.isExpired = isExpired;

            if (d.request_data.selectedProtocol === 'moby') {
              const baseAsset = d.request_data.baseAsset.toLowerCase() as keyof typeof mobyContracts.mobyNFTManager;
              const mobyNFTManagerAsset = mobyContracts.mobyNFTManager[baseAsset] as string;
              const { optionTokenId } = d.optionOnChainData ?? {};
              //    const refundCloseBuy = d.refundCloseBuy ?? 0;
              //  const refundCloseSell = d.refundCloseSell ?? 0;
              //const refundSettleBuy = d.refundSettleBuy ?? 0;
              const isClosePositionDisabled = expirationTimestamp - currentTimestamp < 30 * 60 * 1000 && !isExpired ? true : false;

              d.isClosePositionDisabled = isClosePositionDisabled;

              if (optionTokenId) {
                const nftBalance = await getNftBalanceByAddress(optionTokenId, userAddress, mobyNFTManagerAsset);
                d.nftBalance = nftBalance;
                /*  if (
                  (Number(refundCloseBuy) < 0.001 &&
                    Number(refundCloseSell) < 0.001 &&
                    Number(refundSettleBuy) < 0.001) ||
                  nftBalance === 0n
                ) {
                  return { ...d, isPosition: false };
                }*/
                return nftBalance > 0 ? { ...d, isPosition: true } : { ...d, isPosition: false };
              }
            }
            if (d.request_data.selectedProtocol === 'premia') {
              //  const refundCloseBuy = d.refundCloseBuy ?? 0;
              const nftAddress = (d.optionMetadata.poolAddress as `0x${string}`) || null;
              if (!nftAddress) return { ...d, isPosition: null };
              const isShort = d.tradeType.toLowerCase() === 'short';
              const nftBalance = await premiaPositionBalance(nftAddress, userAddress, isShort);
              d.nftBalance = nftBalance;
              /* if (Number(refundCloseBuy) < 0.001 || nftBalance === 0n) {
                return { ...d, isPosition: false };
              }*/

              if (nftBalance > 0) {
                return { ...d, isPosition: true };
              }
            }
            return { ...d, isPosition: null };
          })
        );

        const historyData = tempProcessedData.filter((d) => !d.isPosition);
        const positionsData = tempProcessedData.filter((d) => d.isPosition);

        return { historyData, positionsData };
      } catch (error) {
        throw new Error('Error processing data:', error as Error);
      }
    },
    enabled: !!data,
  });
};
