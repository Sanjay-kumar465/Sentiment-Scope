import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterControlsBar from './components/FilterControlsBar';
import SentimentTrendChart from './components/SentimentTrendChart';
import SentimentDistributionChart from './components/SentimentDistributionChart';
import ConfidenceScoreChart from './components/ConfidenceScoreChart';
import ComparativeAnalysisChart from './components/ComparativeAnalysisChart';
import ChartCustomizationPanel from './components/ChartCustomizationPanel';
import Icon from '../../components/AppIcon';

const SentimentVisualizationDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last-7-days',
    textSource: 'all',
    sentimentType: 'all',
    groupBy: 'day'
  });

  const [customizations, setCustomizations] = useState({
    colorScheme: 'default',
    chartType: 'line',
    showGrid: true,
    showLegend: true,
    showTooltips: true,
    animationEnabled: true
  });

  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    let interval;
    if (isRealTimeEnabled) {
      interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRealTimeEnabled]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCustomizationChange = (newCustomizations) => {
    setCustomizations(newCustomizations);
  };

  const toggleRealTime = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled);
    if (!isRealTimeEnabled) {
      setLastUpdated(new Date());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Sentiment Visualization Dashboard
              </h1>
              <p className="text-muted-foreground">
                Interactive charts and graphs for comprehensive sentiment analysis insights
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              
              <button
                onClick={toggleRealTime}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isRealTimeEnabled
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  isRealTimeEnabled ? 'bg-white animate-pulse' : 'bg-muted-foreground'
                }`}></div>
                <span>{isRealTimeEnabled ? 'Live' : 'Static'}</span>
              </button>
              
              <ChartCustomizationPanel onCustomizationChange={handleCustomizationChange} />
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControlsBar onFiltersChange={handleFiltersChange} />

          {/* Main Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Primary Sentiment Trend Chart - 8 columns */}
            <div className="lg:col-span-8">
              <SentimentTrendChart filters={filters} customizations={customizations} />
            </div>

            {/* Secondary Charts - 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <SentimentDistributionChart filters={filters} customizations={customizations} />
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Quick Stats</h4>
                  <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Analyzed</span>
                    <span className="font-medium text-foreground">12,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Confidence</span>
                    <span className="font-medium text-foreground">87.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Processing Speed</span>
                    <span className="font-medium text-foreground">2.1s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ConfidenceScoreChart filters={filters} customizations={customizations} />
            <ComparativeAnalysisChart filters={filters} customizations={customizations} />
          </div>

          {/* Insights Panel */}
          <div className="mt-6 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Lightbulb" size={20} className="text-warning" />
              <h3 className="text-lg font-semibold text-foreground">AI-Generated Insights</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="font-medium text-foreground">Positive Trend</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customer sentiment has improved by 15% over the last week, particularly in product quality feedback.
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="font-medium text-foreground">Attention Needed</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Support ticket sentiment shows declining satisfaction. Consider reviewing response times.
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="font-medium text-foreground">Opportunity</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Social media mentions show high engagement potential. Focus on positive amplification strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SentimentVisualizationDashboard;