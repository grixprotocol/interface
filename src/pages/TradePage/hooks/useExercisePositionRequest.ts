import { UseToastOptions } from '@chakra-ui/react';
import { OrderbookQuote } from '@premia/v3-sdk';
import { useMutation } from '@tanstack/react-query';

import { PositionTypes, PriceType, SupportedAsset, TradeOptionType, useCreateUserRequest } from '@/api';
import { useGrixToast } from '@/components/useToast/useToast';
import { config } from '@/config';
import { useAnalytics } from '@/services/analytics';
import { getSignatureExpired } from '@/utils/dateUtil';
import { handlePositionSignMessage } from '@/utils/signMessageWagmi';
import {
  approveAllowance,
  approveErc1155Allowance,
  checkBalanceOfERC20,
  fetchAllowance,
  isApprovalSetForAll,
} from '@/utils/web3Util';
import { fetchPoolQuery } from '@/web3Config/premia/fillQuote';

export type ExercisePositionRequest = {
  optionId: number;
  marketName: string;
  strikePrice: string;
  expirationDate: number;
  optionType: TradeOptionType;
  positionType: PositionTypes;
  priceType: PriceType;
  asset: SupportedAsset;
  optionTokenId: string;
  nftSizeOut: string;
  selectedProtocol: string;
  isExpired: boolean;
  expectedRefundAmount: string;
  contractsAmount: string;
  poolAddress?: string;
};

export const useExercisePositionRequest = ({ userAddress }: { userAddress?: `0x${string}` }) => {
  const { mutateAsync: createUserRequest } = useCreateUserRequest();

  const { track } = useAnalytics();
  const grixToast = useGrixToast();

  const displayToast = (
    grixToast: (options: UseToastOptions) => void,
    title: string,
    description: string,
    status: 'error' | 'warning' | 'info'
  ) => {
    grixToast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: async ({
      option,
      nftAddress,
      nftExerciseContractAddress,
      setIsActionBtnLoading,
    }: {
      option: ExercisePositionRequest;
      nftAddress: `0x${string}`;
      nftExerciseContractAddress: `0x${string}`;
      setIsActionBtnLoading: React.Dispatch<
        React.SetStateAction<{
          state: boolean;
          optionTokenId: string;
        }>
      >;
    }) => {
      try {
        const optionIdentifier = option.selectedProtocol === 'moby' ? option.optionTokenId : option.poolAddress;
        setIsActionBtnLoading({ state: true, optionTokenId: optionIdentifier as string });
        if (!userAddress) {
          throw new Error('User address is not defined');
        }
        try {
          await preExerciseValidations({ option, nftAddress, userAddress, track, displayToast, grixToast });
        } catch (error) {
          return {
            success: false,
            error: error as Error,
          };
        }

        const payWithTokenAddress = config.WETH; // TODO: make it dynamic, check if necessary fot this endpoint

        const signatureExpired = getSignatureExpired();
        const { userSignature, signedMessage } = await handlePositionSignMessage(
          '0',
          option.marketName,
          userAddress,
          signatureExpired,
          option.asset,
          option.expirationDate,
          option.strikePrice,
          option.optionType,
          option.contractsAmount
        );
        if (userSignature) {
          track('exercise_position_confirm_signature');
        }

        const createUserRequestParams = {
          expiration: String(option.expirationDate),
          isCall: option.optionType === 'call',
          strikePrice: option.strikePrice,
          contractsAmount: option.contractsAmount,
          baseAsset: option.asset,
          selectedProtocol: option.marketName,
          signatureExpired,
          addressWallet: userAddress,
          userSignature,
          signedMessage,
          optionId: String(option.optionId),
          payWithAddress: payWithTokenAddress, //TODO: check this parameter
          slippage: '5',
          totalPriceInUSD: 0,
          grixFee: {
            usdFee: 0,
            payWithTokenFee: 0,
          },
          isExercise: true,
          exercisePositionMetadata: {
            nftAddress,
            expectedRefundAmount: option.expectedRefundAmount,
            nftSizeOutInWei: option.nftSizeOut,
            refundTokenAddress:
              option.isExpired === false && option.selectedProtocol === 'moby'
                ? config.networks.Arbitrum.USDC
                : option.asset === SupportedAsset.BTC
                ? config.networks.Arbitrum.WBTC
                : config.networks.Arbitrum.WETH,
            optionTokenId: option.optionTokenId,
            nftExerciseContractAddress,
          },
        };

        const createUserRequestResponse = await createUserRequest(createUserRequestParams);

        return createUserRequestResponse;
      } catch (error) {
        return {
          success: false,
          error: error as Error,
        };
      } finally {
        setIsActionBtnLoading({ state: false, optionTokenId: '' });
      }
    },
  });
};

const preExerciseValidations = async ({
  option,
  nftAddress,
  userAddress,
  track,
  displayToast,
  grixToast,
}: {
  option: ExercisePositionRequest;
  nftAddress: `0x${string}`;
  userAddress: `0x${string}`;
  track: (event: string) => void;
  displayToast: (
    grixToast: (options: UseToastOptions) => void,
    title: string,
    description: string,
    status: 'error' | 'warning' | 'info'
  ) => void;
  grixToast: (options: UseToastOptions) => void;
}) => {
  if (!nftAddress) {
    displayToast(grixToast, 'Token address is not defined', '', 'error');
    throw new Error('Token address is not defined');
  }
  switch (option.selectedProtocol) {
    case 'premia':
      await handlePremiaProtocol(option, nftAddress, userAddress, grixToast, displayToast);
      break;
    case 'moby':
      await handleMobyProtocol(option, userAddress, grixToast, displayToast);
      break;
    default:
      throw new Error(`Unsupported protocol: ${option.selectedProtocol}`);
  }

  const operator = config.grix['Arbitrum One'].grixRouter;
  const isApprovedForAll = await isApprovalSetForAll(nftAddress, userAddress, operator);

  if (!isApprovedForAll) {
    const approval = await approveErc1155Allowance(nftAddress, operator);
    if (approval) {
      track('exercise_position_approve_click');
    }
  }
};

const handlePremiaProtocol = async (
  option: ExercisePositionRequest,
  nftAddress: `0x${string}`,
  userAddress: `0x${string}`,
  grixToast: (options: UseToastOptions) => void,
  displayToast: (
    grixToast: (options: UseToastOptions) => void,
    title: string,
    description: string,
    status: 'error' | 'warning' | 'info'
  ) => void
) => {
  if (option.isExpired || option.nftSizeOut === '0') return;

  const poolQuote: OrderbookQuote | null = await fetchPoolQuery(nftAddress, userAddress, option.nftSizeOut);
  if (!poolQuote) {
    displayToast(
      grixToast,
      'Pool quote not found',
      'Please try again later, or you could try creating a limit order to sell your position or depositing it into a range order (via Premia dApp).',
      'warning'
    );
    throw new Error('Pool quote not found');
  }
};

const handleMobyProtocol = async (
  option: ExercisePositionRequest,
  userAddress: `0x${string}`,
  grixToast: (options: UseToastOptions) => void,
  displayToast: (
    grixToast: (options: UseToastOptions) => void,
    title: string,
    description: string,
    status: 'error' | 'warning' | 'info'
  ) => void
) => {
  if (option.isExpired) return;

  const balance = await checkBalanceOfERC20(config.networks.Arbitrum.WETH, userAddress);
  if (balance < 60000000000000n) {
    displayToast(grixToast, 'Insufficient balance', 'This action requires 0.00006 WETH', 'error');
    throw new Error('Insufficient balance');
  }

  const allowance = await fetchAllowance(userAddress, config.networks.Arbitrum.WETH);
  if (allowance < 60000000000000n) {
    await approveAllowance('60000000000000', config.networks.Arbitrum.WETH);
  }
};
