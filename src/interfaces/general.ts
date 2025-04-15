/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export type ResultData = {
  asset: {
    base_asset: {
      name: string;
      priceUSD: number;
    };
    quote_asset: string;
  };
  result: {
    [key: string]: {
      premia_amount: number;
      premia_price: number;
      hegic_amount: number;
      hegic_price: number;
      moby_amount: number;
      moby_price: number;
      panoptic_amount: number;
      panoptic_price: number;
      sdx_amount: number;
      sdx_price: number;
      stryke_amount: number;
      stryke_price: number;
      thetanuts_amount: number;
      thetanuts_price: number;
      derive_amount: number;
      derive_price: number;
      rysk_amount: number;
      rysk_price: number;
      total_cost: number;
    };
  };
};

export type TransactModalProps = {
  isUserAuthorized: boolean;
  permittedAddress: string;
  isOpen: boolean;
  onClose: () => void;
  data: any;
  TradeDetails: any;
  loadingModalTx: boolean;
};

export type BuyPageProps = {
  isUserAuthorized: boolean;
  selectedOptionObject: any;
  setSelectedOptionObject: any;
  assetPrice: any;
  baseAsset: string;
  supportedAssets: Asset | null;
  maturityDates: string[];
  maturityDate: string;
  selectedStrikePrice: number | null | undefined;
  selectedBoardId: string | null | undefined;
  strikePrices: string[];
  optionType: number;
  pricingOptionsList: Results | null;
  loading: boolean;
  minPriceStrategy: string;
  modalData: ModalDataType | null;
  isModalOpen: boolean;
  contractAmountInputValue: string;
  propsTradeDetails: any;
  showModalWalletPermission: boolean;
  showModalPayment: boolean;
  loadingModalTx: boolean;
  keyObjectTrade: any;
  setContractAmountInputValue: Dispatch<SetStateAction<string>>;
  setBaseAsset: Dispatch<SetStateAction<string>>;
  handleMaturityDateChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  handleStrikePriceChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  setOptionType: Dispatch<SetStateAction<number>>;
  handleSuggestionClick: (data: any, id: any) => void;
  handleCloseModal: () => void;
  closePermissionModal: () => void;
  setShowModalPayment: (isOpen: boolean) => void;
  handlePaymentSelectionModal: (token: any) => void;
};

export type ModalDataType = {
  baseAsset: string | null;
  quoteAsset: string | null;
  userAddress: string | null;
  maturityDate: string | null;
  selectedStrikePrice: number | null | undefined;
  selectedStrikeId: number | null | undefined;
  selectedBoardId: string | null | undefined;
  optionType: number | null;
  contractsAmount: number | null;
  deriveContractAddress: string | null;
  payWithToken: string | null;
};

export type Results = {
  asset: {
    base_asset: {
      name: string;
    };
  };
  result: Record<string, Record<string, number>>;
};

export type Asset = {
  baseAssets: string[];
  quoteAssets: string[];
};

export type SupportedAssets = {
  baseAssets: any; // replace 'any' with your specific type if known
  quoteAssets: any; // replace 'any' with your specific type if known
};
export type InfoPopoverProps = {
  data: string;
  sizeBox: string;
};

export type Position = {
  tokenName: string;
  positionSize: number;
  positionType: string;
  strikePrice: number;
  currentPAndL: number;
  expiration: string;
  protocol: string;
  positionCategory: string;
  data: any;
};
export type ITradeData = {
  premia_amount: number;
  premia_price: number;
  hegic_amount: number;
  hegic_price: number;
  moby_amount: number;
  moby_price: number;
  panoptic_amount: number;
  panoptic_price: number;
  sdx_amount: number;
  sdx_price: number;
  stryke_amount: number;
  stryke_price: number;
  thetanuts_amount: number;
  thetanuts_price: number;
  derive_amount: number;
  derive_price: number;
  rysk_amount: number;
  rysk_price: number;
  total_cost: number;
};
export type ResultsDisplayProps = {
  isUserAuthorized: boolean;
  pricingOptionsList: any;
  minPriceStrategy: string;
  userAddress?: string;
  handleSuggestionClick: (value: any, id: string, maturityDateSelected: string, strikePricesSelected: number) => void;

  setShowAlert: (value: boolean) => void;
  maturityDateSelected: string;
  strikePricesSelected: number;
  optionTypeColor: string;
  protocolsToAddArr: { key: string; svg: any; url: string }[];
};
