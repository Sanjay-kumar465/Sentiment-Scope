import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ConfidenceScoreChart = ({ filters }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockData = generateMockData(filters);
      setChartData(mockData);
      setIsLoading(false);
    }, 600);
  }, [filters]);

  const generateMockData = (filters) => {
    const confidenceRanges = [
      { range: '0-20%', min: 0, max: 20 },
      { range: '21-40%', min: 21, max: 40 },
      { range: '41-60%', min: 41, max: 60 },
      { range: '61-80%', min: 61, max: 80 },
      { range: '81-100%', min: 81, max: 100 }
    ];

    return confidenceRanges.map(range => ({
      range: range.range,
      positive: Math.floor(Math.random() * 150) + 20,
      negative: Math.floor(Math.random() * 120) + 15,
      neutral: Math.floor(Math.random() * 100) + 10
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, item) => sum + item.value, 0);
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">Confidence: {label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="capitalize text-muted-foreground">{entry.dataKey}:</span>
              </div>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium text-foreground">{total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Confidence Score Distribution</h3>
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Loading confidence data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Confidence Score Distribution</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="range" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="positive" 
              stackId="a" 
              fill="var(--color-success)"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="negative" 
              stackId="a" 
              fill="var(--color-error)"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="neutral" 
              stackId="a" 
              fill="var(--color-warning)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-sm font-medium text-foreground">Positive</span>
          </div>
          <div className="text-lg font-bold text-success">
            {chartData.reduce((sum, item) => sum + item.positive, 0)}
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-sm font-medium text-foreground">Negative</span>
          </div>
          <div className="text-lg font-bold text-error">
            {chartData.reduce((sum, item) => sum + item.negative, 0)}
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-sm font-medium text-foreground">Neutral</span>
          </div>
          <div className="text-lg font-bold text-warning">
            {chartData.reduce((sum, item) => sum + item.neutral, 0)}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Higher confidence scores indicate more reliable sentiment predictions</span>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceScoreChart;