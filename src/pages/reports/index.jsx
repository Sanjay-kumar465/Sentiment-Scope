import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ReportBuilder from './components/ReportBuilder';
import ReportPreview from './components/ReportPreview';
import ScheduledReports from './components/ScheduledReports';
import ReportHistory from './components/ReportHistory';
import Icon from '../../components/AppIcon';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [reportConfig, setReportConfig] = useState({
    dateRange: 'last30days',
    startDate: '',
    endDate: '',
    dataSource: 'all',
    chartType: 'bar',
    showDataLabels: true,
    includeTrendLines: false,
    interactiveTooltips: true,
    metrics: ['sentiment_scores', 'confidence_levels', 'trend_analysis'],
    selectedTemplate: null
  });

  const tabs = [
    { id: 'builder', label: 'Report Builder', icon: 'Settings' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: 'Calendar' },
    { id: 'history', label: 'Report History', icon: 'History' }
  ];

  const handleReportConfigChange = (newConfig) => {
    setReportConfig(newConfig);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'scheduled':
        return <ScheduledReports />;
      case 'history':
        return <ReportHistory />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Report Builder Sidebar */}
            <div className="lg:col-span-4">
              <ReportBuilder 
                reportConfig={reportConfig}
                onReportConfigChange={handleReportConfigChange}
              />
            </div>
            
            {/* Report Preview */}
            <div className="lg:col-span-8">
              <ReportPreview reportConfig={reportConfig} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="FileBarChart" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Reports</h1>
                <p className="text-muted-foreground">
                  Generate, customize, and export comprehensive sentiment analysis reports
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;