export type IOptionDataStruct = {
  base: string;
  type: string; // "P" for Put, "C" for Call
  expiration: string; // Date string
  strike: number;
  price: number;
};

export enum TokenType {
  SHORT = 0,
  LONG = 1,
  LONG_EXERCISED = 2,
}

export type HandlePremiaFillQuoteParams = {
  poolAddress: string;
  fillSize: bigint;
  userAddress: `0x${string}`;
  setIsActionBtnLoading: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      optionTokenId: string;
    }>
  >;
  isExpired: boolean;
};
