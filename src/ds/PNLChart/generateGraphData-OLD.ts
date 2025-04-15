import { DataPoint, GraphData, PNLChartPosition } from './types';

export const createGraphData = (Positions: PNLChartPosition): GraphData => {
  const { strikePrice, premium: contractPrice, amount: contractAmount, optionType, positionType } = Positions;

  //** Derived variables **/
  const isCall = optionType === 'call' ? true : false;
  const isLong = positionType === 'long' ? true : false;
  const breakEvenPrice = isCall ? strikePrice + contractPrice : strikePrice - contractPrice;

  //** X axis range and increment calculation **/
  const totalDatapoints = 100;
  const increment = (contractPrice * contractAmount) / (totalDatapoints * 0.25);
  const semiRange = totalDatapoints * 0.5 * increment; //semi-range is half of the total graph range
  const startPrice = breakEvenPrice - semiRange;

  //** Calculate pnl for every X axis datapoint **/
  const dataPoints: DataPoint[] = [];
  for (let dataStep = 0; dataStep < totalDatapoints; dataStep++) {
    const assetPrice = startPrice + dataStep * increment;
    const pnl = pnlCalculator(isCall, isLong, assetPrice, strikePrice, contractPrice, contractAmount);
    dataPoints.push({ assetPrice, pnl });
  }

  //** Add precise strikePrice datapoint **/
  if (contractAmount >= 0.5) {
    //TODO Find a better solution, currently adding a manual datapoint breaks the graph if contracts are too small
    dataPoints.push({
      assetPrice: strikePrice,
      pnl: pnlCalculator(isCall, isLong, strikePrice, strikePrice, contractPrice, contractAmount),
    });
  }
  const sortedDataPoints = dataPoints.sort((a, b) => a.assetPrice - b.assetPrice);
  return { dataPoints: sortedDataPoints, semiRange, breakEvenPrice, strikePrice };
};

const pnlCalculator = (
  isCall: boolean,
  isLong: boolean,
  assetPrice: number,
  strikePrice: number,
  contractPrice: number,
  contractAmount: number
): number => {
  // Calculate intrinsic value
  const intrinsicValue = isCall ? Math.max(assetPrice - strikePrice, 0) : Math.max(strikePrice - assetPrice, 0);

  // Calculate P&L
  const pnl = isLong ? intrinsicValue - contractPrice : contractPrice - intrinsicValue;

  // Adjust P&L by contract amount
  const adjustedPnl = pnl * contractAmount;
  const roundedPnl = parseFloat(adjustedPnl.toFixed(2));
  return roundedPnl;
};
