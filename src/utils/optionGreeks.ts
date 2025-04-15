import { msValues } from './dateUtil';

export type Greeks = {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
};

type GreeksInput = {
  underlyingPrice: number;
  strikePrice: number;
  riskFreeRate: number;
  impliedVolatility: number;
  expiryTimestamp: number;
  isCall: boolean;
};

/**
 * Standard normal cumulative distribution function
 */
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2.0);

  const t = 1.0 / (1.0 + p * x);
  const erf = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * erf);
}

/**
 * Standard normal probability density function
 */
function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/**
 * Calculate d1 and d2 parameters for Black-Scholes model
 */
function calculateD1D2(S: number, K: number, r: number, σ: number, T: number): [number, number] {
  const d1 = (Math.log(S / K) + (r + 0.5 * σ * σ) * T) / (σ * Math.sqrt(T));
  const d2 = d1 - σ * Math.sqrt(T);
  return [d1, d2];
}

/**
 * Calculate option Greeks using Black-Scholes model
 * @param params Input parameters for Greeks calculation
 * @returns Object containing all Greeks values
 */
export function calculateGreeks({
  underlyingPrice: S,
  strikePrice: K,
  riskFreeRate: r,
  impliedVolatility: σ,
  expiryTimestamp,
  isCall,
}: GreeksInput): Greeks {
  // Convert milliseconds to years
  const T = (expiryTimestamp - Date.now()) / msValues.year;

  // Early return if expired
  if (T <= 0) {
    return {
      delta: isCall ? (S > K ? 1 : 0) : S > K ? -1 : 0,
      gamma: 0,
      theta: 0,
      vega: 0,
      rho: 0,
    };
  }

  const [d1, d2] = calculateD1D2(S, K, r, σ, T);
  const discount = Math.exp(-r * T);

  // Calculate Delta
  const delta = isCall ? normalCDF(d1) : normalCDF(d1) - 1;

  // Calculate Gamma (same for calls and puts)
  const gamma = normalPDF(d1) / (S * σ * Math.sqrt(T));

  // Calculate Theta
  const theta = isCall
    ? (-S * normalPDF(d1) * σ) / (2 * Math.sqrt(T)) - r * K * discount * normalCDF(d2)
    : (-S * normalPDF(d1) * σ) / (2 * Math.sqrt(T)) + r * K * discount * normalCDF(-d2);

  // Convert theta to daily value
  const thetaDaily = theta / 365;

  // Calculate Vega (same for calls and puts)
  // Note: Vega is typically expressed as change for 1% move in volatility
  const vega = (S * Math.sqrt(T) * normalPDF(d1)) / 100;

  // Calculate Rho (typically expressed as change for 1% move in interest rate)
  const rho = isCall ? (K * T * discount * normalCDF(d2)) / 100 : (-K * T * discount * normalCDF(-d2)) / 100;

  return {
    delta,
    gamma,
    theta: thetaDaily,
    vega,
    rho,
  };
}

/**
 * Helper function to format Greeks for display
 */
export function formatGreeks(greeks: Greeks): Record<keyof Greeks, string> {
  return {
    delta: greeks.delta.toFixed(4),
    gamma: greeks.gamma.toFixed(4),
    theta: greeks.theta.toFixed(4),
    vega: greeks.vega.toFixed(4),
    rho: greeks.rho.toFixed(4),
  };
}
