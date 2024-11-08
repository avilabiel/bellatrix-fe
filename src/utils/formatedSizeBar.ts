export const formatSizeBar = (
  currentValueSize: number,
  maxValueSize: number,
  width: number
): number => {
  const valueSizeBarFormatted = currentValueSize < 0 ? 0 : currentValueSize;
  const currentValueSizeBarPercentage = (valueSizeBarFormatted * 100) / maxValueSize;
  return (currentValueSizeBarPercentage / 100) * width;    
};
