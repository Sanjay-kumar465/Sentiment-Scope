import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import SentimentTrendsChart from './components/SentimentTrendsChart';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateRange: '7d',
    textSource: 'all',
    sentimentType: 'all'
  });

  const [dashboardData, setDashboardData] = useState({
    totalTextsProcessed: 12847,
    averageSentimentScore: 0.73,
    trendingDirection: 'up',
    positivePercentage: 68,
    negativePercentage: 18,
    neutralPercentage: 14
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would trigger an API call to fetch filtered data
    console.log('Filters changed:', newFilters);
  };

  const handleMetricCardClick = (metricType) => {
    switch (metricType) {
      case 'total': navigate('/text-analysis');
        break;
      case 'sentiment': navigate('/sentiment-visualization-dashboard');
        break;
      case 'trends': navigate('/sentiment-visualization-dashboard');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Simulate data loading based on filters
    // In a real application, this would be an API call
    const loadDashboardData = () => {
      // Mock data update based on filters
      setDashboardData(prev => ({
        ...prev,
        // Simulate different data based on filters
        totalTextsProcessed: filters.dateRange === '1d' ? 1250 : 
                           filters.dateRange === '30d' ? 45000 : 12847
      }));
    };

    loadDashboardData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's an overview of your sentiment analysis insights.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>Last updated: {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls onFiltersChange={handleFiltersChange} />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Texts Processed"
              value={dashboardData.totalTextsProcessed.toLocaleString()}
              change="+12.5%"
              changeType="positive"
              icon="FileText"
              color="bg-primary"
              onClick={() => handleMetricCardClick('total')}
            />
            <MetricCard
              title="Average Sentiment Score"
              value={`${(dashboardData.averageSentimentScore * 100).toFixed(1)}%`}
              change="+5.2%"
              changeType="positive"
              icon="TrendingUp"
              color="bg-success"
              onClick={() => handleMetricCardClick('sentiment')}
            />
            <MetricCard
              title="Positive Sentiment"
              value={`${dashboardData.positivePercentage}%`}
              change="+3.1%"
              changeType="positive"
              icon="ThumbsUp"
              color="bg-success"
              onClick={() => handleMetricCardClick('trends')}
            />
            <MetricCard
              title="Negative Sentiment"
              value={`${dashboardData.negativePercentage}%`}
              change="-2.4%"
              changeType="positive"
              icon="ThumbsDown"
              color="bg-error"
              onClick={() => handleMetricCardClick('trends')}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <SentimentTrendsChart />
            </div>

            {/* Sidebar - Takes 1 column on large screens */}
            <div className="space-y-6">
              <QuickActions />
              <RecentActivity />
            </div>
          </div>

          {/* Additional Insights Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Attention Required</h3>
                  <p className="text-sm text-muted-foreground">Items that need your review</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">Low confidence scores</p>
                    <p className="text-xs text-muted-foreground">23 analyses need manual review</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-warning" />
                </div>
                <div className="flex items-center justify-between p-3 bg-error/10 rounded-lg border border-error/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">Negative trend alert</p>
                    <p className="text-xs text-muted-foreground">Sentiment dropping in support tickets</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-error" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Performance Goals</h3>
                  <p className="text-sm text-muted-foreground">Track your analysis targets</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Monthly Analysis Goal</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Accuracy Target</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;