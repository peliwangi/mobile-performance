/**
 * Utility functions for dashboard data formatting and calculations
 */

export const formatNumber = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2);
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(1);
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1);
  }
  return value.toFixed(1);
};

export const formatNumberWithUnit = (value: number, unit: string): string => {
  const formatted = formatNumber(value);
  return `${formatted}${unit}`;
};

export const getChangeColor = (change: number): string => {
  if (change > 0) {
    return 'text-success';
  } else if (change < 0) {
    return 'text-danger';
  }
  return 'text-muted-foreground';
};

export const getChangeIndicator = (change: number): string => {
  return change > 0 ? '+' : '';
};

export const computeMoM = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const computeYoY = (current: number, lastYear: number): number => {
  if (lastYear === 0) return 0;
  return ((current - lastYear) / lastYear) * 100;
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

export const generateSparklineData = (value: number, trend: number): number[] => {
  // Generate simple sparkline data based on value and trend
  const points = 8;
  const data: number[] = [];
  const baseValue = value * 0.8;
  const variance = value * 0.4;
  
  for (let i = 0; i < points; i++) {
    const trendEffect = (trend / 100) * (i / points) * value;
    const randomVariance = (Math.random() - 0.5) * variance * 0.3;
    data.push(baseValue + trendEffect + randomVariance);
  }
  
  return data;
};