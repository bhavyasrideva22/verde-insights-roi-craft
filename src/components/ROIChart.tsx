
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { formatIndianRupee } from "@/utils/calculatorUtils";

interface ROIChartProps {
  dataPoints: { month: number; value: number }[];
  durationYears: number;
  initialInvestment: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const monthLabel = parseInt(label || "0");
    const years = Math.floor(monthLabel / 12);
    const months = monthLabel % 12;
    const timeLabel = `${years} year${years !== 1 ? 's' : ''}${months > 0 ? `, ${months} month${months !== 1 ? 's' : ''}` : ''}`;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
        <p className="font-medium text-charcoal">{timeLabel}</p>
        <p className="text-primary font-bold">
          {formatIndianRupee(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

export const ROIChart: React.FC<ROIChartProps> = ({ 
  dataPoints, 
  durationYears,
  initialInvestment
}) => {
  // Generate tick values for x-axis (years)
  const xAxisTicks = [];
  for (let year = 0; year <= durationYears; year++) {
    xAxisTicks.push(year * 12);
  }
  
  // Format x-axis ticks to show years
  const formatXAxis = (month: number) => {
    return `${Math.floor(month / 12)}y`;
  };
  
  // Format y-axis ticks to show currency values
  const formatYAxis = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)} L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dataPoints}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="month"
            ticks={xAxisTicks}
            tickFormatter={formatXAxis}
            stroke="#333"
            tick={{ fill: '#333', fontSize: 12 }}
            label={{ 
              value: 'Time (Years)',
              position: 'insideBottom',
              offset: -10,
              fill: '#333'
            }}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            stroke="#333"
            tick={{ fill: '#333', fontSize: 12 }}
            label={{ 
              value: 'Value (₹)',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
              fill: '#333'
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            y={initialInvestment} 
            stroke="#e9c46a" 
            strokeDasharray="3 3"
            label={{ 
              value: 'Initial Investment',
              position: 'left', 
              fill: '#e9c46a', 
              fontSize: 12 
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#245e4f"
            fill="url(#colorGradient)"
            strokeWidth={2}
            activeDot={{ r: 6, fill: '#245e4f', stroke: '#fff' }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#245e4f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7ac9a7" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
