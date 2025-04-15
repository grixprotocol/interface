export type OptionPriceHistoryParams = {
  optionkey: string;
};

export type Quote = {
  protocol: string;
  price: number;
  liquidity?: string;
  implied_volatility?: string;
};

export type BidAskSnapshot = {
  bids: Quote[];
  asks: Quote[];
  underlying_price?: string;
  risk_free_rate?: string;
};

export type Result = {
  created_at: string;
  expiry: string;
  option_key: string;
  option_type: string;
  price_history: Record<string, BidAskSnapshot>;
  status: string;
  strike: number;
  underlying_asset: string;
  updated_at: string;
};

export type OptionPriceHistoryResponse = {
  results: Result[];
};
