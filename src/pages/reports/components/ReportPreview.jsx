import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportPreview = ({ reportConfig }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isGenerating, setIsGenerating] = useState(false);

  const mockSentimentData = [
    { name: 'Jan', positive: 65, negative: 20, neutral: 15 },
    { name: 'Feb', positive: 70, negative: 18, neutral: 12 },
    { name: 'Mar', positive: 68, negative: 22, neutral: 10 },
    { name: 'Apr', positive: 75, negative: 15, neutral: 10 },
    { name: 'May', positive: 72, negative: 17, neutral: 11 },
    { name: 'Jun', positive: 78, negative: 12, neutral: 10 }
  ];

  const mockPieData = [
    { name: 'Positive', value: 68, color: '#10B981' },
    { name: 'Negative', value: 17, color: '#EF4444' },
    { name: 'Neutral', value: 15, color: '#6B7280' }
  ];

  const mockMetrics = {
    totalAnalyzed: 15420,
    averageScore: 0.72,
    confidenceLevel: 94.2,
    trendDirection: 'up',
    trendPercentage: 12.5
  };

  const handleExport = async (format) => {
    setIsGenerating(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // In a real app, this would trigger the actual export
    console.log(`Exporting report as ${format}`);
  };

  const renderChart = () => {
    const { chartType } = reportConfig;

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockSentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="neutral" stroke="#6B7280" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockSentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" fill="#10B981" />
              <Bar dataKey="negative" fill="#EF4444" />
              <Bar dataKey="neutral" fill="#6B7280" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">Report Preview</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'desktop' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name="Monitor" size={16} />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'tablet' 
                  ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name="Tablet" size={16} />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'mobile' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name="Smartphone" size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => handleExport('pdf')}
            loading={isGenerating}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileSpreadsheet"
            onClick={() => handleExport('excel')}
            loading={isGenerating}
          >
            Export Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Presentation"
            onClick={() => handleExport('powerpoint')}
            loading={isGenerating}
          >
            Export PPT
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`p-6 ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : previewMode === 'tablet' ? 'max-w-2xl mx-auto' : ''}`}>
        {/* Report Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sentiment Analysis Report</h1>
              <p className="text-muted-foreground">
                Generated on {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Report Period</div>
              <div className="font-medium text-foreground">
                {reportConfig.dateRange === 'custom' 
                  ? `${reportConfig.startDate} - ${reportConfig.endDate}`
                  : reportConfig.dateRange.replace(/([A-Z])/g, ' $1').toLowerCase()
                }
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        {reportConfig.metrics.includes('sentiment_scores') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Analyzed</p>
                    <p className="text-2xl font-bold text-foreground">{mockMetrics.totalAnalyzed.toLocaleString()}</p>
                  </div>
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold text-foreground">{mockMetrics.averageScore}</p>
                  </div>
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
              </div>
              
              {reportConfig.metrics.includes('confidence_levels') && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <p className="text-2xl font-bold text-foreground">{mockMetrics.confidenceLevel}%</p>
                    </div>
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                </div>
              )}
              
              {reportConfig.metrics.includes('trend_analysis') && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Trend</p>
                      <p className="text-2xl font-bold text-success">+{mockMetrics.trendPercentage}%</p>
                    </div>
                    <Icon name="ArrowUp" size={24} className="text-success" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sentiment Distribution Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Sentiment Distribution</h2>
          <div className="bg-muted/30 p-6 rounded-lg">
            {renderChart()}
          </div>
        </div>

        {/* Data Source Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Data Sources</h2>
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={16} className="text-primary" />
              <span className="font-medium text-foreground">
                {sourceOptions.find(s => s.value === reportConfig.dataSource)?.label || 'All sources'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Data collected from selected sources within the specified time range. 
              All sentiment analysis performed using advanced NLP algorithms with 
              {mockMetrics.confidenceLevel}% average confidence level.
            </p>
          </div>
        </div>

        {/* Report Footer */}
        <div className="border-t border-border pt-6 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              <p>Generated by SentimentScope</p>
              <p>Report ID: RPT-{Date.now().toString().slice(-6)}</p>
            </div>
            <div className="text-right">
              <p>Page 1 of 1</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sourceOptions = [
  { value: 'all', label: 'All sources' },
  { value: 'customer_feedback', label: 'Customer Feedback' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'product_reviews', label: 'Product Reviews' },
  { value: 'support_tickets', label: 'Support Tickets' }
];

export default ReportPreview;