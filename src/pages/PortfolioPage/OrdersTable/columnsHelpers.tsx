/* eslint max-lines: ["off"] */

import { InfoIcon } from '@chakra-ui/icons';
import { Box, Tooltip } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { SupportedAsset, UserRequest } from '@/api';
import { ExercisePositionRequest } from '@/pages/TradePage/hooks/useExercisePositionRequest';
import { mobyContracts } from '@/web3Config/moby/config';

export type PreValidationResult = {
  isPreValidationFailed: boolean;
  returnContent: ReactNode | null;
};

export const exerciseColumnPreValidations = (
  info: CellContext<UserRequest, string | undefined>,
  userAddress: `0x${string}` | undefined
): PreValidationResult => {
  const selectedProtocol = info.cell.row.original.request_data.selectedProtocol;
  const status = info.cell.row.original.status;
  if (status !== 'completed') {
    return { isPreValidationFailed: true, returnContent: null };
  }
  if ((selectedProtocol !== 'moby' && selectedProtocol !== 'premia') || !userAddress)
    return { isPreValidationFailed: true, returnContent: null };

  const nftBalance = info.cell.row.original.nftBalance ?? 0n;

  if (nftBalance === 0n) {
    return {
      isPreValidationFailed: true,
      returnContent: (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Tooltip
            label="This position has been already closed or settled"
            aria-label="NFT Balance Tooltip"
            placement="left"
          >
            <InfoIcon color="gray.500" boxSize={4} />
          </Tooltip>
        </Box>
      ),
    };
  }
  return { isPreValidationFailed: false, returnContent: null };
};

export const getParameters = (
  info: CellContext<UserRequest, string | undefined>
): {
  selectedProtocol: string;
  nftBalance: bigint;
  poolAddress: `0x${string}` | null;
  isCall: boolean;
  baseAsset: keyof typeof mobyContracts.mobyNFTManager;
  upperCaseAsset: SupportedAsset;
  nftSizeOut: string | undefined;
  positionType: 'long' | 'short';
  optionTokenId: string;
  refundCloseBuy: string | number;
  refundCloseSell: string | number;
  refundSettleBuy: string | number;
  isExpired: boolean;
  optionId: number;
  expectedRefundAmount: string;
  isClosePositionDisabled: boolean;
  expirationDateUnix: number;
  strikePrice: string;
  contractsAmount: number;
} => {
  const selectedProtocol = info.cell.row.original.request_data.selectedProtocol;
  const nftBalance = info.cell.row.original.nftBalance ?? 0n;
  const poolAddress = info.cell.row.original.optionMetadata?.poolAddress as `0x${string}` | null;
  const isCall = info.cell.row.original.request_data.isCall;
  const baseAsset =
    info.cell.row.original.request_data.baseAsset.toLowerCase() as keyof typeof mobyContracts.mobyNFTManager;
  const upperCaseAsset = baseAsset.toUpperCase() as SupportedAsset;
  const { nftSizeOut } = info.cell.row.original.optionOnChainData ?? {};
  const positionType = info.cell.row.original.tradeType as 'long' | 'short';
  const optionTokenId =
    selectedProtocol === 'premia'
      ? positionType.toLowerCase() === 'short'
        ? '0'
        : '1'
      : selectedProtocol === 'moby'
      ? info.cell.row.original.optionOnChainData.optionTokenId
      : (() => {
          throw new Error('Unsupported protocol or missing optionTokenId');
        })();
  const refundCloseBuy = info.cell.row.original.refundCloseBuy ?? 0;
  const refundCloseSell = info.cell.row.original.refundCloseSell ?? 0;
  const refundSettleBuy = info.cell.row.original.refundSettleBuy ?? 0;
  const isExpired = info.cell.row.original.isExpired ?? false;
  const optionId = info.cell.row.original.optionId || 0;
  const expectedRefundAmount = isExpired ? Number(refundSettleBuy) * 1.2 : Number(refundCloseBuy) * 1.2;
  const isClosePositionDisabled = info.cell.row.original.isClosePositionDisabled ?? false;
  const expirationDateUnix = Number(info.cell.row.original.request_data.expiration);
  const strikePrice = info.cell.row.original.request_data.strikePrice;
  const contractsAmount = info.cell.row.original.request_data.contractsAmount;

  return {
    selectedProtocol,
    nftBalance,
    poolAddress,
    isCall,
    baseAsset,
    upperCaseAsset,
    nftSizeOut,
    positionType,
    optionTokenId,
    refundCloseBuy,
    refundCloseSell,
    refundSettleBuy,
    isExpired,
    optionId,
    expectedRefundAmount: expectedRefundAmount.toString(),
    isClosePositionDisabled,
    expirationDateUnix,
    strikePrice,
    contractsAmount,
  };
};

export const getToolTipContent = ({
  isActionBtnLoading,
  optionTokenId,
  positionType,
  isExpired,
  refundCloseBuy,
  refundCloseSell,
  refundSettleBuy,
  isClosePositionDisabled,
  assetPriceUSD,
  upperCaseAsset,
}: {
  isActionBtnLoading: { state: boolean; optionTokenId: string };
  optionTokenId: string;
  positionType: string;
  isExpired: boolean;
  refundCloseBuy: string | number;
  refundCloseSell: string | number;
  refundSettleBuy: string | number;
  isClosePositionDisabled: boolean;
  assetPriceUSD: number;
  upperCaseAsset: string;
}) => {
  if (isActionBtnLoading.state && isActionBtnLoading.optionTokenId !== optionTokenId) {
    return 'Another position is already in progress, check your wallet messages';
  }

  switch (positionType) {
    case 'long': {
      if (!isExpired && refundCloseBuy) {
        return isClosePositionDisabled
          ? `Moby positions can't be closed 30 minutes before expiry`
          : `Estimated Return: ${Number(refundCloseBuy).toFixed(4)} USDC (subject to market conditions)`;
      }

      if (isExpired && refundSettleBuy !== null && Number(refundSettleBuy) > 0) {
        return `Estimated Return: ${(Number(refundSettleBuy) / assetPriceUSD).toFixed(
          4
        )} W${upperCaseAsset} (subject to market conditions)`;
      }
      break;
    }
    case 'short': {
      if (!isExpired && refundCloseSell) {
        return `Estimated Return: ${refundCloseSell} USDC (subject to market conditions)`;
      }
      break;
    }
    default:
      return null;
  }

  return null;
};

export const handleExercisePosition = ({
  isActionBtnLoading,
  optionTokenId,
  isClosePositionDisabled,
  selectedProtocol,
  isExpired,
  nftSizeOut,
  nftBalance,
  isCall,
  positionType,
  upperCaseAsset,
  expectedRefundAmount,
  submitExercisePosition,
  poolAddress,
  optionId,
  expirationDateUnix,
  strikePrice,
  contractsAmount,
  nftAddress,
  nftExerciseContractAddress,
  setIsActionBtnLoading,
}: {
  isActionBtnLoading: { state: boolean; optionTokenId: string };
  optionTokenId: string | undefined;
  isClosePositionDisabled: boolean;
  selectedProtocol: string;
  isExpired: boolean;
  nftSizeOut?: string;
  nftBalance: bigint;
  isCall: boolean;
  positionType: 'long' | 'short';
  upperCaseAsset: SupportedAsset;
  expectedRefundAmount: string;
  submitExercisePosition: (data: {
    option: ExercisePositionRequest;
    nftAddress: `0x${string}`;
    nftExerciseContractAddress: `0x${string}`;
    setIsActionBtnLoading: React.Dispatch<
      React.SetStateAction<{
        state: boolean;
        optionTokenId: string;
      }>
    >;
  }) => void;
  poolAddress?: `0x${string}` | null;
  optionId: number;
  expirationDateUnix: number;
  strikePrice: string;
  contractsAmount: number;
  nftAddress: `0x${string}`;
  nftExerciseContractAddress: `0x${string}`;
  setIsActionBtnLoading: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      optionTokenId: string;
    }>
  >;
}) => {
  if ((isActionBtnLoading.state && isActionBtnLoading.optionTokenId !== optionTokenId) || isClosePositionDisabled) {
    return;
  }

  if (selectedProtocol === 'moby' && optionTokenId) {
    const optionInfo: ExercisePositionRequest = {
      optionId,
      marketName: selectedProtocol,
      expirationDate: expirationDateUnix,
      strikePrice,
      nftSizeOut: nftBalance.toString() || (nftSizeOut as string),
      optionType: isCall ? 'call' : 'put',
      positionType,
      priceType: positionType === 'long' ? 'ask' : 'bid',
      asset: upperCaseAsset,
      optionTokenId,
      selectedProtocol,
      isExpired,
      expectedRefundAmount: expectedRefundAmount.toString(),
      contractsAmount: contractsAmount.toString(),
    };
    void submitExercisePosition({
      option: optionInfo,
      nftAddress,
      nftExerciseContractAddress,
      setIsActionBtnLoading,
    });
  } else if (selectedProtocol === 'premia' && poolAddress) {
    const optionInfo: ExercisePositionRequest = {
      optionId,
      marketName: selectedProtocol,
      expirationDate: expirationDateUnix,
      strikePrice,
      nftSizeOut: nftBalance.toString(),
      optionType: isCall ? 'call' : 'put',
      positionType,
      priceType: positionType === 'long' ? 'ask' : 'bid',
      asset: upperCaseAsset,
      optionTokenId: optionTokenId as string,
      selectedProtocol,
      isExpired,
      expectedRefundAmount: expectedRefundAmount.toString(),
      contractsAmount: contractsAmount.toString(),
      poolAddress: poolAddress as string,
    };
    void submitExercisePosition({
      option: optionInfo,
      nftAddress,
      nftExerciseContractAddress,
      setIsActionBtnLoading,
    });
  }
};

export const isCurrentPositionLoading = (
  selectedProtocol: string,
  isActionBtnLoading: { state: boolean; optionTokenId: string },
  optionTokenId: string,
  poolAddress: string
) => {
  switch (selectedProtocol) {
    case 'moby':
      return isActionBtnLoading.optionTokenId === optionTokenId;
    case 'premia':
      return isActionBtnLoading.optionTokenId === poolAddress;
    default:
      return false;
  }
};
