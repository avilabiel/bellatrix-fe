export const formatSizeBar = (
  currentValue: number,
  maxValue: number,
  width: number
): number => {
  const manaFormatted = currentValue < 0 ? 0 : currentValue;
  const currentManaPercentage = (manaFormatted * 100) / maxValue;
  return (currentManaPercentage / 100) * width;
};
