
// ROI Calculation functions
export const calculateROI = (
  initialInvestment: number,
  expectedReturn: number,
  durationYears: number,
  annualCosts: number = 0
): {
  totalROI: number;
  totalReturn: number;
  annualizedROI: number;
  costSavings: number;
  paybackPeriod: number;
  monthlyDataPoints: { month: number; value: number }[];
} => {
  // Calculate total return on investment
  const totalReturn = (initialInvestment * (expectedReturn / 100) * durationYears) - (annualCosts * durationYears);
  
  // Calculate ROI percentage
  const totalROI = (totalReturn / initialInvestment) * 100;
  
  // Calculate annualized ROI
  const annualizedROI = ((1 + totalROI / 100) ** (1 / durationYears) - 1) * 100;
  
  // Calculate cost savings (assuming return includes savings)
  const costSavings = expectedReturn / 100 * initialInvestment * durationYears;
  
  // Calculate payback period in years (when total return equals initial investment)
  const yearlyReturn = expectedReturn / 100 * initialInvestment - annualCosts;
  const paybackPeriod = yearlyReturn > 0 ? initialInvestment / yearlyReturn : 0;
  
  // Generate monthly data points for graphs
  const totalMonths = durationYears * 12;
  const monthlyDataPoints = [];
  
  for (let month = 0; month <= totalMonths; month++) {
    const yearFraction = month / 12;
    const value = initialInvestment + (yearlyReturn * yearFraction);
    monthlyDataPoints.push({
      month,
      value
    });
  }
  
  return {
    totalROI,
    totalReturn,
    annualizedROI,
    costSavings,
    paybackPeriod,
    monthlyDataPoints
  };
};

// Format currency in Indian Rupee format
export const formatIndianRupee = (value: number): string => {
  // Convert to Indian numbering system (with lakhs and crores)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  
  return formatter.format(value);
};

// Format percentage with 2 decimal places
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Format years with 1 decimal place
export const formatYears = (value: number): string => {
  return value.toFixed(1) + (value === 1 ? ' year' : ' years');
};
