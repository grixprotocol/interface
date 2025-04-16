import { colors } from '@/ds/theme';

export const textComponent = (isCall: boolean, isLong: boolean) => {
  // Adjusting text and styles based on whether the position is long or short
  const leftText = isCall
    ? isLong
      ? 'Worthless exp.'
      : 'Limited profit'
    : isLong
    ? 'Unlimited profit'
    : 'Unlimited downside';

  const rightText = isCall
    ? isLong
      ? 'Unlimited upside'
      : 'Unlimited downside'
    : isLong
    ? 'Worthless exp.'
    : 'Limited profit';

  const leftFill = isCall ? (isLong ? '#ff1a6c' : colors.primary[500]) : isLong ? colors.primary[500] : '#ff1a6c';
  const rightFill = isCall ? (isLong ? colors.primary[500] : '#ff1a6c') : isLong ? '#ff1a6c' : colors.primary[500];
  const leftY = isCall ? (isLong ? '55%' : '40%') : isLong ? '40%' : '55%';
  const rightY = isCall ? (isLong ? '40%' : '55%') : isLong ? '55%' : '40%';

  return (
    <>
      <text x="98%" y={rightY} dy={12} style={{ fontSize: 14, fill: rightFill }} width={200} textAnchor="end">
        {rightText}
      </text>
      <text x="2%" y={leftY} dy={6} style={{ fontSize: 14, fill: leftFill }} width={200} textAnchor="start">
        {leftText}
      </text>
    </>
  );
};
