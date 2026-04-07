import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControlsBar = ({ onFiltersChange }) => {
  const [dateRange, setDateRange] = useState('last-7-days');
  const [textSource, setTextSource] = useState('all');
  const [sentimentType, setSentimentType] = useState('all');
  const [groupBy, setGroupBy] = useState('day');

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const textSourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'customer-reviews', label: 'Customer Reviews' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'support-tickets', label: 'Support Tickets' },
    { value: 'surveys', label: 'Surveys' },
    { value: 'feedback-forms', label: 'Feedback Forms' }
  ];

  const sentimentTypeOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive Only' },
    { value: 'negative', label: 'Negative Only' },
    { value: 'neutral', label: 'Neutral Only' }
  ];

  const groupByOptions = [
    { value: 'hour', label: 'Hourly' },
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      dateRange,
      textSource,
      sentimentType,
      groupBy
    };

    switch (filterType) {
      case 'dateRange':
        setDateRange(value);
        newFilters.dateRange = value;
        break;
      case 'textSource':
        setTextSource(value);
        newFilters.textSource = value;
        break;
      case 'sentimentType':
        setSentimentType(value);
        newFilters.sentimentType = value;
        break;
      case 'groupBy':
        setGroupBy(value);
        newFilters.groupBy = value;
        break;
    }

    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setDateRange('last-7-days');
    setTextSource('all');
    setSentimentType('all');
    setGroupBy('day');
    
    onFiltersChange({
      dateRange: 'last-7-days',
      textSource: 'all',
      sentimentType: 'all',
      groupBy: 'day'
    });
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting visualization data...');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="w-full"
          />
          
          <Select
            label="Text Source"
            options={textSourceOptions}
            value={textSource}
            onChange={(value) => handleFilterChange('textSource', value)}
            className="w-full"
          />
          
          <Select
            label="Sentiment Type"
            options={sentimentTypeOptions}
            value={sentimentType}
            onChange={(value) => handleFilterChange('sentimentType', value)}
            className="w-full"
          />
          
          <Select
            label="Group By"
            options={groupByOptions}
            value={groupBy}
            onChange={(value) => handleFilterChange('groupBy', value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
            size="sm"
          >
            Reset
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            size="sm"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControlsBar;