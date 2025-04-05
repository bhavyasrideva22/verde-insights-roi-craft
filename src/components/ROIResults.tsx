
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatIndianRupee, formatPercentage, formatYears } from "@/utils/calculatorUtils";
import { BadgeIndianRupee, BarChart2, ChevronRight, Clock, Percent, PiggyBank, TrendingUp } from "lucide-react";

interface ROIResultsProps {
  totalROI: number;
  totalReturn: number;
  annualizedROI: number;
  costSavings: number;
  paybackPeriod: number;
  initialInvestment: number;
}

export const ROIResults: React.FC<ROIResultsProps> = ({
  totalROI,
  totalReturn,
  annualizedROI,
  costSavings,
  paybackPeriod,
  initialInvestment
}) => {
  const ResultCard = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    color = "primary" 
  }: { 
    title: string; 
    value: string; 
    subtitle: string; 
    icon: React.ReactNode;
    color?: "primary" | "secondary" | "accent"; 
  }) => {
    const bgColorClass = {
      primary: "bg-primary/10",
      secondary: "bg-secondary/20",
      accent: "bg-accent/20"
    }[color];
    
    const textColorClass = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent"
    }[color];
    
    return (
      <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className={`text-2xl font-bold ${textColorClass}`}>{value}</h3>
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className={`${bgColorClass} p-3 rounded-full`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">ROI Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in">
          <ResultCard
            title="Total ROI"
            value={formatPercentage(totalROI)}
            subtitle="Return on initial investment"
            icon={<Percent size={24} className="text-primary" />}
          />
          <ResultCard
            title="Total Return"
            value={formatIndianRupee(totalReturn)}
            subtitle="Net profit from investment"
            icon={<BadgeIndianRupee size={24} className="text-primary" />}
            color="secondary"
          />
          <ResultCard
            title="Annualized ROI"
            value={formatPercentage(annualizedROI)}
            subtitle="Average yearly return rate"
            icon={<BarChart2 size={24} className="text-secondary" />}
            color="accent"
          />
          <ResultCard
            title="Payback Period"
            value={formatYears(paybackPeriod)}
            subtitle="Time to recover investment"
            icon={<Clock size={24} className="text-accent" />}
            color="primary"
          />
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-6">
          <div className="bg-cream p-5 rounded-lg border border-primary/20">
            <h3 className="text-lg font-medium flex items-center text-primary">
              <PiggyBank size={20} className="mr-2" />
              Investment Summary
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center text-sm">
                <ChevronRight size={16} className="text-secondary mr-2" />
                <span className="text-gray-600">Initial Investment: </span>
                <span className="ml-2 font-medium">{formatIndianRupee(initialInvestment)}</span>
              </li>
              <li className="flex items-center text-sm">
                <ChevronRight size={16} className="text-secondary mr-2" />
                <span className="text-gray-600">Net Return: </span>
                <span className="ml-2 font-medium">{formatIndianRupee(totalReturn)}</span>
              </li>
              <li className="flex items-center text-sm">
                <ChevronRight size={16} className="text-secondary mr-2" />
                <span className="text-gray-600">Final Value: </span>
                <span className="ml-2 font-medium">{formatIndianRupee(initialInvestment + totalReturn)}</span>
              </li>
              <li className="flex items-center text-sm">
                <ChevronRight size={16} className="text-secondary mr-2" />
                <span className="text-gray-600">Cost Savings: </span>
                <span className="ml-2 font-medium">{formatIndianRupee(costSavings)}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary/5 p-5 rounded-lg border border-primary/20">
            <h3 className="text-lg font-medium flex items-center text-primary">
              <TrendingUp size={20} className="mr-2" />
              Performance Analysis
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              Based on your inputs, this investment will generate a total return of 
              <span className="text-primary font-medium"> {formatPercentage(totalROI)} </span> 
              over the investment period, with an annualized return of 
              <span className="text-primary font-medium"> {formatPercentage(annualizedROI)}</span>.
              You'll recover your initial investment in 
              <span className="text-primary font-medium"> {formatYears(paybackPeriod)}</span>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
