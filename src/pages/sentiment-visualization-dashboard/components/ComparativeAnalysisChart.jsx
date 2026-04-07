import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ComparativeAnalysisChart = ({ filters }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonType, setComparisonType] = useState('source');

  const comparisonOptions = [
    { value: 'source', label: 'By Source' },
    { value: 'time', label: 'By Time Period' },
    { value: 'category', label: 'By Category' }
  ];

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockData = generateMockData(filters, comparisonType);
      setChartData(mockData);
      setIsLoading(false);
    }, 700);
  }, [filters, comparisonType]);

  const generateMockData = (filters, type) => {
    switch (type) {
      case 'source':
        return [
          {
            name: 'Reviews',
            positive: Math.floor(Math.random() * 200) + 100,
            negative: Math.floor(Math.random() * 150) + 50,
            neutral: Math.floor(Math.random() * 100) + 30
          },
          {
            name: 'Social Media',
            positive: Math.floor(Math.random() * 180) + 80,
            negative: Math.floor(Math.random() * 120) + 60,
            neutral: Math.floor(Math.random() * 90) + 40
          },
          {
            name: 'Support',
            positive: Math.floor(Math.random() * 160) + 70,
            negative: Math.floor(Math.random() * 200) + 100,
            neutral: Math.floor(Math.random() * 80) + 20
          },
          {
            name: 'Surveys',
            positive: Math.floor(Math.random() * 220) + 120,
            negative: Math.floor(Math.random() * 100) + 40,
            neutral: Math.floor(Math.random() * 110) + 50
          }
        ];
      
      case 'time':
        return [
          {
            name: 'This Week',
            positive: Math.floor(Math.random() * 300) + 150,
            negative: Math.floor(Math.random() * 200) + 80,
            neutral: Math.floor(Math.random() * 150) + 60
          },
          {
            name: 'Last Week',
            positive: Math.floor(Math.random() * 280) + 140,
            negative: Math.floor(Math.random() * 180) + 70,
            neutral: Math.floor(Math.random() * 140) + 55
          },
          {
            name: 'Two Weeks Ago',
            positive: Math.floor(Math.random() * 260) + 130,
            negative: Math.floor(Math.random() * 160) + 60,
            neutral: Math.floor(Math.random() * 130) + 50
          }
        ];
      
      case 'category':
        return [
          {
            name: 'Product Quality',
            positive: Math.floor(Math.random() * 250) + 120,
            negative: Math.floor(Math.random() * 180) + 70,
            neutral: Math.floor(Math.random() * 120) + 40
          },
          {
            name: 'Customer Service',
            positive: Math.floor(Math.random() * 200) + 100,
            negative: Math.floor(Math.random() * 220) + 90,
            neutral: Math.floor(Math.random() * 100) + 30
          },
          {
            name: 'Pricing',
            positive: Math.floor(Math.random() * 180) + 80,
            negative: Math.floor(Math.random() * 200) + 100,
            neutral: Math.floor(Math.random() * 140) + 60
          },
          {
            name: 'Delivery',
            positive: Math.floor(Math.random() * 220) + 110,
            negative: Math.floor(Math.random() * 160) + 60,
            neutral: Math.floor(Math.random() * 110) + 35
          }
        ];
      
      default:
        return [];
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, item) => sum + item.value, 0);
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => {
            const percentage = ((entry.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="capitalize text-muted-foreground">{entry.dataKey}:</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-foreground">{entry.value}</span>
                  <span className="text-xs text-muted-foreground ml-1">({percentage}%)</span>
                </div>
              </div>
            );
          })}
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
          <h3 className="text-lg font-semibold text-foreground">Comparative Analysis</h3>
          <Icon name="BarChart" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Loading comparison...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Comparative Analysis</h3>
        <div className="flex items-center gap-3">
          <Select
            options={comparisonOptions}
            value={comparisonType}
            onChange={setComparisonType}
            className="w-40"
          />
          <Icon name="BarChart" size={20} className="text-muted-foreground" />
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="positive" 
              name="Positive"
              fill="var(--color-success)"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="negative" 
              name="Negative"
              fill="var(--color-error)"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="neutral" 
              name="Neutral"
              fill="var(--color-warning)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-lg font-bold text-success">
            {chartData.reduce((sum, item) => sum + item.positive, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Positive</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-lg font-bold text-error">
            {chartData.reduce((sum, item) => sum + item.negative, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Negative</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-lg font-bold text-warning">
            {chartData.reduce((sum, item) => sum + item.neutral, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Neutral</div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysisChart;