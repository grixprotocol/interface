export const expirationTypes = ['vanilla', '24hrs'] as const;
export type ExpirationType = (typeof expirationTypes)[number];

export const positionTypes = ['long', 'short'] as const;
export type PositionTypes = (typeof positionTypes)[number];

export enum UnderlyingAsset {
  BTC = 'BTC',
  ETH = 'ETH',
}

export enum PositionType {
  long = 'long',
  short = 'short',
}

export enum OptionType {
  call = 'call',
  put = 'put',
}

export enum ActionType {
  open = 'open',
  close = 'close',
}

export enum SupportedToken {
  WETH = 'WETH',
  WBTC = 'WBTC',
  USDC = 'USDC',
}

export enum SupportedAsset {
  BTC = 'BTC',
  ETH = 'ETH',
  USDC = 'USDC',
  USDCE = 'USDC.E',
}
export const tokenDecimals: Record<SupportedToken, number> = {
  [SupportedToken.WETH]: 8,
  [SupportedToken.WBTC]: 8,
  [SupportedToken.USDC]: 2,
};

export const supportedAssets = Object.values(SupportedAsset);

export const tradeOptionTypes = ['call', 'put'] as const;
export type TradeOptionType = (typeof tradeOptionTypes)[number];

export const priceTypes = ['ask', 'bid'] as const;
export type PriceType = (typeof priceTypes)[number];

export const tokenToAssetMap: Record<SupportedToken, SupportedAsset> = {
  [SupportedToken.WETH]: SupportedAsset.ETH,
  [SupportedToken.WBTC]: SupportedAsset.BTC,
  [SupportedToken.USDC]: SupportedAsset.USDC,
};

export const assetToTokenMap: Record<SupportedAsset, SupportedToken> = {
  [SupportedAsset.BTC]: SupportedToken.WBTC,
  [SupportedAsset.ETH]: SupportedToken.WETH,
  [SupportedAsset.USDC]: SupportedToken.USDC,
  [SupportedAsset.USDCE]: SupportedToken.USDC,
};
