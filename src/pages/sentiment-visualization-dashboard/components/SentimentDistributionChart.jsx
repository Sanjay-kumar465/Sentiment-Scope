import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const SentimentDistributionChart = ({ filters }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  const COLORS = {
    positive: 'var(--color-success)',
    negative: 'var(--color-error)',
    neutral: 'var(--color-warning)'
  };

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockData = generateMockData(filters);
      setChartData(mockData);
      setIsLoading(false);
    }, 800);
  }, [filters]);

  const generateMockData = (filters) => {
    const baseData = [
      { name: 'Positive', value: Math.floor(Math.random() * 500) + 300, color: COLORS.positive },
      { name: 'Negative', value: Math.floor(Math.random() * 300) + 150, color: COLORS.negative },
      { name: 'Neutral', value: Math.floor(Math.random() * 400) + 200, color: COLORS.neutral }
    ];

    // Apply sentiment type filter
    if (filters.sentimentType !== 'all') {
      return baseData.filter(item => 
        item.name.toLowerCase() === filters.sentimentType
      );
    }

    return baseData;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-medium text-foreground">{data.value}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="font-medium text-foreground">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Sentiment Distribution</h3>
          <Icon name="PieChart" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Loading distribution...</span>
          </div>
        </div>
      </div>
    );
  }

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Sentiment Distribution</h3>
        <Icon name="PieChart" size={20} className="text-muted-foreground" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={activeIndex === index ? 'var(--color-foreground)' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-3">
        {chartData.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{item.value}</div>
                <div className="text-xs text-muted-foreground">{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Total Analyzed</span>
          <span className="text-lg font-bold text-foreground">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentDistributionChart;