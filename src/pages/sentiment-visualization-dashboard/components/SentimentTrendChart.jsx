import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SentimentTrendChart = ({ filters }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState({
    positive: true,
    negative: true,
    neutral: true
  });

  // Mock data generation based on filters
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockData = generateMockData(filters);
      setChartData(mockData);
      setIsLoading(false);
    }, 1000);
  }, [filters]);

  const generateMockData = (filters) => {
    const dataPoints = [];
    const days = filters.dateRange === 'last-7-days' ? 7 : 
                 filters.dateRange === 'last-30-days' ? 30 : 7;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      dataPoints.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        positive: Math.floor(Math.random() * 100) + 50,
        negative: Math.floor(Math.random() * 80) + 20,
        neutral: Math.floor(Math.random() * 60) + 30,
        total: 0
      });
    }

    // Calculate totals
    dataPoints.forEach(point => {
      point.total = point.positive + point.negative + point.neutral;
    });

    return dataPoints;
  };

  const toggleLine = (lineKey) => {
    setVisibleLines(prev => ({
      ...prev,
      [lineKey]: !prev[lineKey]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="capitalize text-muted-foreground">{entry.dataKey}:</span>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Sentiment Trends</h3>
          <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Loading chart data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Sentiment Trends</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {Object.entries(visibleLines).map(([key, visible]) => (
              <button
                key={key}
                onClick={() => toggleLine(key)}
                className={`flex items-center gap-1 text-sm transition-opacity ${
                  visible ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${
                    key === 'positive' ? 'bg-success' :
                    key === 'negative' ? 'bg-error' : 'bg-warning'
                  }`}
                ></div>
                <span className="capitalize">{key}</span>
              </button>
            ))}
          </div>
          <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {visibleLines.positive && (
              <Line
                type="monotone"
                dataKey="positive"
                stroke="var(--color-success)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
              />
            )}
            
            {visibleLines.negative && (
              <Line
                type="monotone"
                dataKey="negative"
                stroke="var(--color-error)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-error)', strokeWidth: 2 }}
              />
            )}
            
            {visibleLines.neutral && (
              <Line
                type="monotone"
                dataKey="neutral"
                stroke="var(--color-warning)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-warning)', strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-success">
            {chartData.reduce((sum, item) => sum + item.positive, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Positive</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-error">
            {chartData.reduce((sum, item) => sum + item.negative, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Negative</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-warning">
            {chartData.reduce((sum, item) => sum + item.neutral, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Neutral</div>
        </div>
      </div>
    </div>
  );
};

export default SentimentTrendChart;