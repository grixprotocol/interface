/* eslint max-lines: ["off"] */
import { InfoIcon } from '@chakra-ui/icons';
import { Badge, Box, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import { AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format, formatDistanceToNowStrict, isFuture } from 'date-fns';
import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

import { SupportedAsset, useAssetPrice, UserOrderType, UserRequest } from '@/api';
import { AnimatedPnL } from '@/components/AnimatedPnL/AnimatedPnL';
import { ChatbotButton } from '@/components/chatbot/ChatbotButton';
import { createPortfolioContext } from '@/components/chatbot/pageContext/portfolioContext';
import { protocolsArrayData } from '@/config';
import { SupportedAssetIcons } from '@/ds';
import { useExercisePositionRequest } from '@/pages/TradePage/hooks/useExercisePositionRequest';
import { formatTimestampToDate } from '@/utils/dateUtil';
import { formatCurrency } from '@/utils/number';
import { useUserAccount } from '@/utils/web3Util';
import { mobyContracts } from '@/web3Config/moby/config';

import { CenteredIconTableCell } from './CenteredIconTableCell';
import {
  exerciseColumnPreValidations,
  getParameters,
  getToolTipContent,
  handleExercisePosition,
  isCurrentPositionLoading,
  PreValidationResult,
} from './columnsHelpers';
import { GenericTableCell } from './GenericTableCell';

const columnHelper = createColumnHelper<UserRequest>();

type ColumnType =
  | AccessorKeyColumnDef<UserRequest, string>
  | AccessorKeyColumnDef<UserRequest, number>
  | AccessorKeyColumnDef<UserRequest, SupportedAsset>
  | AccessorKeyColumnDef<UserRequest, { pnl: string; pnlPercentage: string }>
  | AccessorKeyColumnDef<UserRequest, boolean>;

export const useColumns = ({ currentTab }: { currentTab: UserOrderType }): ColumnType[] | undefined => {
  const { data: BtcCurrentPrice } = useAssetPrice(SupportedAsset.BTC);
  const { data: EthCurrentPrice } = useAssetPrice(SupportedAsset.ETH);
  const { address: userAddress } = useUserAccount();
  const [isActionBtnLoading, setIsActionBtnLoading] = useState({ state: false, optionTokenId: '' });
  const { mutateAsync: submitExercisePosition } = useExercisePositionRequest({
    userAddress: userAddress as `0x${string}`,
  });

  const created_at_column = columnHelper.accessor('created_at', {
    header: 'Tx Creation Date',
    cell: function CreationDateCell(info) {
      const createdAt = new Date(info.getValue());
      const formattedDateTime = formatTimestampToDate(Math.floor(createdAt.getTime() / 1000), true);

      return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" pl={0}>
          <Text>{formattedDateTime}</Text>
        </Box>
      );
    },
  });

  const underlying_asset_column = columnHelper.accessor('request_data.baseAsset', {
    cell: (info) => {
      const baseAsset = info.cell.row.original.request_data.baseAsset.toUpperCase() as SupportedAsset;
      const Icon = SupportedAssetIcons[baseAsset];
      return <CenteredIconTableCell icon={<Icon size={24} />} title={baseAsset} />;
    },
    header: 'Underlying Asset',
  });

  const option_column = columnHelper.accessor('optionData', {
    header: 'Option',
    cell: function OptionCell(info) {
      const baseAsset = info.row.original.request_data.baseAsset.toUpperCase() as SupportedAsset;
      const Icon = SupportedAssetIcons[baseAsset];

      return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" pl={0}>
          <HStack spacing={2} justify="center">
            {Icon && <Icon size={24} />}
            <Text>{info.getValue()}</Text>
          </HStack>
        </Box>
      );
    },
  });

  const contract_type_column = columnHelper.accessor('request_data.isCall', {
    header: 'Position',
    cell: function PositionCell(info) {
      const isCall = info.row.original.request_data.isCall;
      const tradeType = info.row.original.request_data.tradeType;

      return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" pl={0}>
          <HStack spacing={2} justify="center">
            <Text color={tradeType === 'long' ? 'primary.300' : 'error.300'}>
              {tradeType === 'long' ? 'Long' : 'Short'}
            </Text>
            <Box w="4px" h="4px" bgColor="gray.300" borderRadius="50%" />
            <Text color={isCall ? 'primary.400' : 'error.400'}>{isCall ? 'Call' : 'Put'}</Text>
          </HStack>
        </Box>
      );
    },
  });

  const strike_column = columnHelper.accessor('request_data.strikePrice', {
    cell: (info) => <GenericTableCell title={formatCurrency(info.cell.row.original.request_data.strikePrice)} />,
    header: 'Strike',
  });

  const expiration_column = columnHelper.accessor('request_data.expiration', {
    cell: (info) => {
      const expirationTimestamp = Number(info.cell.row.original.request_data.expiration) * 1000;
      const formattedDate = format(expirationTimestamp, 'MMM dd, yyyy');
      const timeDifference = formatDistanceToNowStrict(expirationTimestamp, { addSuffix: true });

      return <GenericTableCell title={formattedDate} description={timeDifference} isInline={false} />;
    },
    header: 'Expiry Date',
  });

  const size_column = columnHelper.accessor('request_data.contractsAmount', {
    header: 'Size',
    cell: function SizeCell(info) {
      return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
          {info.getValue()}
        </Box>
      );
    },
  });

  const protocol_column = columnHelper.accessor('request_data.selectedProtocol', {
    header: 'Protocol',
    cell: function ProtocolCell(info) {
      const protocolData = protocolsArrayData.find((p) => p.protocolName === info.getValue());

      return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
          <GenericTableCell
            img={protocolData?.icon}
            imgProps={{
              gap: '0',
              display: 'flex',
              flexDir: 'row',
            }}
            title={protocolData?.label}
          />
        </Box>
      );
    },
  });

  const status_column = columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.cell.row.original.status;
      const expirationTimestamp = new Date(info.cell.row.original.signature_expired_datetime);
      const expiresIn = isFuture(expirationTimestamp)
        ? `Valid for ${formatDistanceToNowStrict(expirationTimestamp, { unit: 'minute' })}`
        : 'Not valid anymore';
      const failureReason = info.cell.row.original.failureReason;

      const tooltipContent =
        currentTab === UserOrderType.InactiveOrders && failureReason ? JSON.stringify(failureReason) : expiresIn;

      switch (status) {
        case 'completed':
          return <Badge variant="primary">Completed</Badge>;
        case 'pending':
          return (
            <Badge _hover={{ cursor: 'pointer' }} variant="warning">
              Pending
            </Badge>
          );
        case 'expired':
          return (
            <>
              <Badge variant="warning" mr={2}>
                Failed
              </Badge>
              <Tooltip label={tooltipContent} aria-label="Status Tooltip">
                <InfoIcon color="gray.500" boxSize={4} />
              </Tooltip>
            </>
          );
        case 'failed_3rd_party':
          return (
            <>
              <Badge variant="warning" mr={2}>
                Failed_3rd_party
              </Badge>
              <Tooltip
                label="The order failed on the protocol end, funds were refunded into your wallet"
                aria-label="Status Tooltip"
              >
                <InfoIcon color="gray.500" boxSize={4} />
              </Tooltip>
            </>
          );
        default:
          return <Badge variant="secondary">Unknown</Badge>;
      }
    },
  });

  const action_column = columnHelper.accessor('exercisePrice', {
    header: 'Action',
    cell: (info) => {
      const preValidation: PreValidationResult = exerciseColumnPreValidations(info, userAddress as `0x${string}`);
      if (preValidation?.isPreValidationFailed) {
        return preValidation.returnContent;
      }

      const params = getParameters(info);
      const {
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
        expectedRefundAmount,
        isClosePositionDisabled,
        expirationDateUnix,
        strikePrice,
        contractsAmount,
      } = params;

      const isCurrentPositionButtonLoading = isCurrentPositionLoading(
        selectedProtocol,
        isActionBtnLoading,
        optionTokenId,
        poolAddress as string
      );
      const isOneOfThePositionsLoading = isActionBtnLoading.state;

      const { mobySettleManager, mobyPositionManager } = mobyContracts;
      const nftAddress =
        selectedProtocol === 'premia'
          ? (info.cell.row.original.optionMetadata?.poolAddress as `0x${string}`)
          : (mobyContracts.mobyNFTManager[baseAsset] as `0x${string}`);

      const nftExerciseContractAddress =
        selectedProtocol === 'premia'
          ? (info.cell.row.original.optionMetadata?.poolAddress as `0x${string}`)
          : isExpired
          ? (mobySettleManager.address as `0x${string}`)
          : (mobyPositionManager.address as `0x${string}`);
      const assetPriceUSD = (upperCaseAsset === SupportedAsset.BTC ? BtcCurrentPrice : EthCurrentPrice) as number;

      if (
        nftBalance !== 0n
        // && (Number(refundCloseBuy) >= 0.001 || Number(refundCloseSell) >= 0.001 || Number(refundSettleBuy) >= 0.001)
      ) {
        return (
          <Box width="100%" display="flex" justifyContent="center" alignItems="center" gap={2}>
            <Tooltip
              label={getToolTipContent({
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
              })}
            >
              <Badge
                sx={{
                  fontWeight: 'bold',
                  opacity: isOneOfThePositionsLoading && !isCurrentPositionButtonLoading ? 0.5 : 1,
                  cursor:
                    (isOneOfThePositionsLoading && !isCurrentPositionButtonLoading) || isClosePositionDisabled
                      ? 'not-allowed'
                      : 'pointer',
                }}
                _hover={{
                  cursor: 'pointer',
                  transform: 'scale(1.11)',
                  transition: 'transform 0.2s',
                }}
                variant={isExpired ? 'settlePosition' : 'closePosition'}
                size="sm"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleExercisePosition({
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
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    submitExercisePosition,
                    poolAddress,
                    optionId,
                    expirationDateUnix,
                    strikePrice,
                    contractsAmount,
                    nftAddress,
                    nftExerciseContractAddress,
                    setIsActionBtnLoading,
                  });
                }}
              >
                {isOneOfThePositionsLoading && isCurrentPositionButtonLoading
                  ? 'Processing...'
                  : isExpired
                  ? 'Settle Position'
                  : 'Close Position'}
              </Badge>
            </Tooltip>

            <ChatbotButton
              context={createPortfolioContext({
                selectedProtocol,
                isCall,
                baseAsset,
                positionType,
                strikePrice: Number(strikePrice),
                contractsAmount,
                expirationDateUnix,
                isExpired,
                refundCloseBuy: Number(refundCloseBuy),
                refundCloseSell: Number(refundCloseSell),
                refundSettleBuy: Number(refundSettleBuy),
              })}
              buttonProps={{
                size: 'sm',
                rounded: 'full',
                bg: 'transparent',
                w: 8,
                h: 8,
                minW: 8,
                p: 0,
                _hover: {
                  bg: 'whiteAlpha.300',
                  transform: 'scale(1.1)',
                },
                children: <Icon as={FaRobot} color="gray.300" boxSize="14px" />,
                border: '1px solid',
                borderColor: 'gray.700',
              }}
            />
          </Box>
        );
      } else if (
        Number(refundCloseBuy) < 0.001 &&
        Number(refundCloseSell) < 0.001 &&
        Number(refundSettleBuy) < 0.001 &&
        selectedProtocol === 'moby'
      ) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Tooltip
              label="Out the money, cannot be closed or settled."
              aria-label="NFT Balance Tooltip"
              placement="left"
            >
              <InfoIcon color="gray.500" boxSize={4} />
            </Tooltip>
          </Box>
        );
      } else {
        return null;
      }
    },
  });

  const pnl_column = columnHelper.accessor('pnl', {
    header: 'PnL',
    cell: (info) => {
      const status = info.cell.row.original.status;
      const pnlObject = info.cell.row.original.pnl;
      const pnl = pnlObject?.pnl ?? null;
      if (!pnl || status !== 'completed') return <GenericTableCell title="-" />;
      const ROI = info.cell.row.original.pnl?.pnlPercentage ?? null;
      if (!ROI || status !== 'completed') return <GenericTableCell title="-" />;

      return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
          <AnimatedPnL value={`$${Number(pnl).toFixed(2)}`} />
          <Box ml={2}>
            <AnimatedPnL value={`${Number(ROI).toFixed(2)}%`} />
          </Box>
        </Box>
      );
    },
  });

  const isExercise_column = columnHelper.accessor('request_data.isExercise', {
    header: 'Order Type',
    cell: (info) => {
      const isExercise = info.cell.row.original.request_data.isExercise;
      return <GenericTableCell title={isExercise ? 'Exercise' : 'Open Position'} />;
    },
  });

  if (currentTab === UserOrderType.Positions) {
    return [
      created_at_column,
      contract_type_column,
      option_column,
      size_column,
      protocol_column,
      action_column,
      pnl_column,
    ];
  }
  if (currentTab === UserOrderType.History) {
    return [created_at_column, contract_type_column, option_column, size_column, protocol_column];
  }
  if (currentTab === UserOrderType.LiveOrders) {
    return [
      created_at_column,
      contract_type_column,
      option_column,
      size_column,
      protocol_column,
      status_column,
      isExercise_column,
    ];
  }
  if (currentTab === UserOrderType.InactiveOrders || currentTab === UserOrderType.OrdersHistory) {
    return [
      created_at_column,
      underlying_asset_column,
      contract_type_column,
      strike_column,
      expiration_column,
      size_column,
      protocol_column,
      status_column,
    ];
  }
  if (currentTab === UserOrderType.Refund) {
    return [created_at_column, contract_type_column, option_column, size_column, protocol_column, status_column];
  }
};
