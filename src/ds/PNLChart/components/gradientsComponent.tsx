import { colors } from '@/ds/theme';

export const gradientsComponent = (isCall: boolean, isLong: boolean) => {
  let startColor: string;
  let endColor: string;
  if (isLong) {
    startColor = isCall ? '#ff1a6c' : colors.primary[500];
    endColor = isCall ? colors.primary[500] : '#ff1a6c';
  } else {
    startColor = isCall ? colors.primary[500] : '#ff1a6c';
    endColor = isCall ? '#ff1a6c' : colors.primary[500];
  }

  return (
    <defs>
      <linearGradient id="colorLine">
        <stop offset="0%" stopColor={startColor} />
        <stop offset={`${50 - 4}%`} stopColor={startColor} />
        <stop offset={`${50 + 4}%`} stopColor={endColor} />
        <stop offset="100%" stopColor={endColor} />
      </linearGradient>
      <linearGradient id="colorArea">
        <stop offset="0%" stopColor={startColor} />
        <stop offset="50%" stopColor={colors.base.black} />
        <stop offset="100%" stopColor={endColor} />
      </linearGradient>
    </defs>
  );
};
