import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: '7d',
    textSource: 'all',
    sentimentType: 'all'
  });

  const dateRangeOptions = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const textSourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'reviews', label: 'Product Reviews' },
    { value: 'social', label: 'Social Media' },
    { value: 'support', label: 'Support Tickets' },
    { value: 'surveys', label: 'Customer Surveys' },
    { value: 'emails', label: 'Email Feedback' }
  ];

  const sentimentTypeOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive Only' },
    { value: 'negative', label: 'Negative Only' },
    { value: 'neutral', label: 'Neutral Only' },
    { value: 'mixed', label: 'Mixed Sentiment' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '7d',
      textSource: 'all',
      sentimentType: 'all'
    };
    setFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  const hasActiveFilters = filters.textSource !== 'all' || filters.sentimentType !== 'all' || filters.dateRange !== '7d';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Text Source"
            options={textSourceOptions}
            value={filters.textSource}
            onChange={(value) => handleFilterChange('textSource', value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Sentiment Type"
            options={sentimentTypeOptions}
            value={filters.sentimentType}
            onChange={(value) => handleFilterChange('sentimentType', value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Showing results for: {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}, {textSourceOptions.find(opt => opt.value === filters.textSource)?.label}, {sentimentTypeOptions.find(opt => opt.value === filters.sentimentType)?.label}
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={() => window.location.reload()}
        >
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;