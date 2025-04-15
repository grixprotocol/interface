import { checkBalanceOfERC1155 } from '@/utils/web3Util';

export const getNftBalanceByAddress = async (
  optionTokenId: string,
  userAddress: `0x${string}`,
  mobyNftAddress: string
): Promise<bigint> => {
  const balance = await checkBalanceOfERC1155(mobyNftAddress, userAddress, optionTokenId);
  return balance;
};

export type MobyCloseOrSettleType = {
  userAccount: `0x${string}`;
  isExpired: boolean;
  optionTokenId: string;
  size: string;
  asset: string;
  isCall: boolean;
  setIsActionBtnLoading: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      optionTokenId: string;
    }>
  >;
};
