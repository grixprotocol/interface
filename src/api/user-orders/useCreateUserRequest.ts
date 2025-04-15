import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/services/apiClient';

import { GrixFeeResponse } from '../grixFee/useGrixFee';

type CreateUserRequestData = {
  expiration: string;
  isCall: boolean;
  strikePrice: string;
  contractsAmount: string;
  baseAsset: string;
  signatureExpired: string;
  addressWallet: string;
  userSignature: string;
  slippage: string;
  selectedProtocol: string;
  signedMessage: string;
  grixFee: GrixFeeResponse;
  optionId: string;
  payWithAddress: string;
  totalPriceInUSD: number;
  isExercise?: boolean;
  exercisePositionMetadata?: {
    nftAddress: `0x${string}`;
    expectedRefundAmount: string;
    nftSizeOutInWei: string;
    refundTokenAddress: `0x${string}`;
    optionTokenId: string;
    nftExerciseContractAddress: `0x${string}`;
  };
};

type ResponseDataWithStatusCode = {
  data: {
    message: string;
    signReqId: string;
  };
  statusCode: number;
};

export const useCreateUserRequest = () =>
  useMutation({
    mutationFn: async (params: CreateUserRequestData) => {
      const response = await apiClient.post<ResponseDataWithStatusCode>('/userequestpost', {
        ...params,
        networkName: 'Arbitrum',
        isActive: true,
        tradeType: 'long',
        order_type: 'market',

        limit_price: '0',
      });

      const responseDataWithStatusCode: ResponseDataWithStatusCode = {
        ...response.data,
        statusCode: response.status,
      };

      return responseDataWithStatusCode as unknown;
    },
  });
