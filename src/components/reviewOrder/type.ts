export type OrderDescriptionProps = {
  protocolIcon: string | undefined;
  protocolLabel: string | undefined;
  availableContracts: string | null;
  amount: string | number;
  minAssetAmount: number;
  onAmountChange: (value: string) => void;
  totalPriceInUSD: number;
};

export type OrderDescription = {
  id: string;
  label: string;
  column: JSX.Element;
  rightColumn?: React.ReactNode;
};
