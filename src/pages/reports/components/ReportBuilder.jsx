import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportBuilder = ({ onReportConfigChange, reportConfig }) => {
  const [expandedSections, setExpandedSections] = useState({
    dataSelection: true,
    visualization: true,
    metrics: true,
    templates: false
  });

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'All sources' },
    { value: 'customer_feedback', label: 'Customer Feedback' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'product_reviews', label: 'Product Reviews' },
    { value: 'support_tickets', label: 'Support Tickets' }
  ];

  const chartTypeOptions = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'area', label: 'Area Chart' },
    { value: 'donut', label: 'Donut Chart' }
  ];

  const templates = [
    {
      id: 'customer_feedback',
      name: 'Customer Feedback Analysis',
      description: 'Comprehensive analysis of customer satisfaction and feedback trends',
      icon: 'MessageSquare'
    },
    {
      id: 'social_monitoring',
      name: 'Social Media Monitoring',
      description: 'Track brand sentiment across social media platforms',
      icon: 'Share2'
    },
    {
      id: 'product_review',
      name: 'Product Review Assessment',
      description: 'Analyze product reviews and ratings sentiment',
      icon: 'Star'
    },
    {
      id: 'competitive_analysis',
      name: 'Competitive Analysis',
      description: 'Compare sentiment across competitors and market trends',
      icon: 'TrendingUp'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleConfigChange = (key, value) => {
    const updatedConfig = { ...reportConfig, [key]: value };
    onReportConfigChange(updatedConfig);
  };

  const handleMetricToggle = (metric, checked) => {
    const updatedMetrics = checked 
      ? [...reportConfig.metrics, metric]
      : reportConfig.metrics.filter(m => m !== metric);
    handleConfigChange('metrics', updatedMetrics);
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      handleConfigChange('selectedTemplate', templateId);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Report Builder</h2>
        <Button variant="outline" size="sm" iconName="RotateCcw">
          Reset
        </Button>
      </div>

      {/* Data Selection Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('dataSelection')}
          className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={16} />
            <span className="font-medium text-foreground">Data Selection</span>
          </div>
          <Icon 
            name={expandedSections.dataSelection ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>

        {expandedSections.dataSelection && (
          <div className="mt-4 space-y-4 pl-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={reportConfig.dateRange}
              onChange={(value) => handleConfigChange('dateRange', value)}
            />

            {reportConfig.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Date"
                  type="date"
                  value={reportConfig.startDate}
                  onChange={(e) => handleConfigChange('startDate', e.target.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={reportConfig.endDate}
                  onChange={(e) => handleConfigChange('endDate', e.target.value)}
                />
              </div>
            )}

            <Select
              label="Data Source"
              options={sourceOptions}
              value={reportConfig.dataSource}
              onChange={(value) => handleConfigChange('dataSource', value)}
            />
          </div>
        )}
      </div>

      {/* Visualization Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('visualization')}
          className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} />
            <span className="font-medium text-foreground">Visualization</span>
          </div>
          <Icon 
            name={expandedSections.visualization ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>

        {expandedSections.visualization && (
          <div className="mt-4 space-y-4 pl-4">
            <Select
              label="Primary Chart Type"
              options={chartTypeOptions}
              value={reportConfig.chartType}
              onChange={(value) => handleConfigChange('chartType', value)}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Chart Options</label>
              <div className="space-y-2">
                <Checkbox
                  label="Show data labels"
                  checked={reportConfig.showDataLabels}
                  onChange={(e) => handleConfigChange('showDataLabels', e.target.checked)}
                />
                <Checkbox
                  label="Include trend lines"
                  checked={reportConfig.includeTrendLines}
                  onChange={(e) => handleConfigChange('includeTrendLines', e.target.checked)}
                />
                <Checkbox
                  label="Enable interactive tooltips"
                  checked={reportConfig.interactiveTooltips}
                  onChange={(e) => handleConfigChange('interactiveTooltips', e.target.checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('metrics')}
          className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} />
            <span className="font-medium text-foreground">Metrics</span>
          </div>
          <Icon 
            name={expandedSections.metrics ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>

        {expandedSections.metrics && (
          <div className="mt-4 space-y-3 pl-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Include Metrics</label>
              <div className="space-y-2">
                <Checkbox
                  label="Sentiment Scores"
                  checked={reportConfig.metrics.includes('sentiment_scores')}
                  onChange={(e) => handleMetricToggle('sentiment_scores', e.target.checked)}
                />
                <Checkbox
                  label="Confidence Levels"
                  checked={reportConfig.metrics.includes('confidence_levels')}
                  onChange={(e) => handleMetricToggle('confidence_levels', e.target.checked)}
                />
                <Checkbox
                  label="Trend Analysis"
                  checked={reportConfig.metrics.includes('trend_analysis')}
                  onChange={(e) => handleMetricToggle('trend_analysis', e.target.checked)}
                />
                <Checkbox
                  label="Volume Statistics"
                  checked={reportConfig.metrics.includes('volume_stats')}
                  onChange={(e) => handleMetricToggle('volume_stats', e.target.checked)}
                />
                <Checkbox
                  label="Comparative Analysis"
                  checked={reportConfig.metrics.includes('comparative_analysis')}
                  onChange={(e) => handleMetricToggle('comparative_analysis', e.target.checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Templates Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('templates')}
          className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Icon name="FileTemplate" size={16} />
            <span className="font-medium text-foreground">Templates</span>
          </div>
          <Icon 
            name={expandedSections.templates ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>

        {expandedSections.templates && (
          <div className="mt-4 space-y-3 pl-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  reportConfig.selectedTemplate === template.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={template.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button variant="default" fullWidth iconName="Play">
        Generate Report
      </Button>
    </div>
  );
};

export default ReportBuilder;