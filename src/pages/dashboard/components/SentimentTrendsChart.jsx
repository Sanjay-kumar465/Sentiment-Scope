import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SentimentTrendsChart = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const chartData = [
    { date: '2025-07-24', positive: 65, negative: 20, neutral: 15 },
    { date: '2025-07-25', positive: 72, negative: 18, neutral: 10 },
    { date: '2025-07-26', positive: 68, negative: 22, neutral: 10 },
    { date: '2025-07-27', positive: 75, negative: 15, neutral: 10 },
    { date: '2025-07-28', positive: 70, negative: 20, neutral: 10 },
    { date: '2025-07-29', positive: 78, negative: 12, neutral: 10 },
    { date: '2025-07-30', positive: 82, negative: 10, neutral: 8 },
    { date: '2025-07-31', positive: 85, negative: 8, neutral: 7 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground capitalize">{entry.dataKey}:</span>
              <span className="font-medium text-foreground">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sentiment Trends</h3>
            <p className="text-sm text-muted-foreground">Historical sentiment analysis over time</p>
          </div>
        </div>
        <div className="w-40">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select range"
          />
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="positive" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
              name="Positive"
            />
            <Line 
              type="monotone" 
              dataKey="negative" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-error)', strokeWidth: 2 }}
              name="Negative"
            />
            <Line 
              type="monotone" 
              dataKey="neutral" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-warning)', strokeWidth: 2 }}
              name="Neutral"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentTrendsChart;