import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ChartCustomizationPanel = ({ onCustomizationChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colorScheme, setColorScheme] = useState('default');
  const [chartType, setChartType] = useState('line');
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const colorSchemeOptions = [
    { value: 'default', label: 'Default Colors' },
    { value: 'colorblind', label: 'Colorblind Friendly' },
    { value: 'monochrome', label: 'Monochrome' },
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'pastel', label: 'Pastel' }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'area', label: 'Area Chart' },
    { value: 'scatter', label: 'Scatter Plot' }
  ];

  const handleCustomizationChange = (key, value) => {
    const customizations = {
      colorScheme,
      chartType,
      showGrid,
      showLegend,
      showTooltips,
      animationEnabled,
      [key]: value
    };

    // Update local state
    switch (key) {
      case 'colorScheme':
        setColorScheme(value);
        break;
      case 'chartType':
        setChartType(value);
        break;
      case 'showGrid':
        setShowGrid(value);
        break;
      case 'showLegend':
        setShowLegend(value);
        break;
      case 'showTooltips':
        setShowTooltips(value);
        break;
      case 'animationEnabled':
        setAnimationEnabled(value);
        break;
    }

    onCustomizationChange(customizations);
  };

  const handleReset = () => {
    setColorScheme('default');
    setChartType('line');
    setShowGrid(true);
    setShowLegend(true);
    setShowTooltips(true);
    setAnimationEnabled(true);

    onCustomizationChange({
      colorScheme: 'default',
      chartType: 'line',
      showGrid: true,
      showLegend: true,
      showTooltips: true,
      animationEnabled: true
    });
  };

  const handleExportChart = (format) => {
    console.log(`Exporting chart as ${format}...`);
    // Mock export functionality
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Settings"
        iconPosition="left"
        size="sm"
      >
        Customize Charts
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">Chart Customization</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                iconName="X"
              />
            </div>

            <div className="space-y-4">
              {/* Color Scheme */}
              <div>
                <Select
                  label="Color Scheme"
                  options={colorSchemeOptions}
                  value={colorScheme}
                  onChange={(value) => handleCustomizationChange('colorScheme', value)}
                />
              </div>

              {/* Chart Type */}
              <div>
                <Select
                  label="Primary Chart Type"
                  options={chartTypeOptions}
                  value={chartType}
                  onChange={(value) => handleCustomizationChange('chartType', value)}
                />
              </div>

              {/* Display Options */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-foreground">Display Options</h5>
                
                <Checkbox
                  label="Show Grid Lines"
                  checked={showGrid}
                  onChange={(e) => handleCustomizationChange('showGrid', e.target.checked)}
                />
                
                <Checkbox
                  label="Show Legend"
                  checked={showLegend}
                  onChange={(e) => handleCustomizationChange('showLegend', e.target.checked)}
                />
                
                <Checkbox
                  label="Show Tooltips"
                  checked={showTooltips}
                  onChange={(e) => handleCustomizationChange('showTooltips', e.target.checked)}
                />
                
                <Checkbox
                  label="Enable Animations"
                  checked={animationEnabled}
                  onChange={(e) => handleCustomizationChange('animationEnabled', e.target.checked)}
                />
              </div>

              {/* Export Options */}
              <div className="border-t border-border pt-4">
                <h5 className="text-sm font-medium text-foreground mb-3">Export Charts</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportChart('png')}
                    iconName="Image"
                    iconPosition="left"
                  >
                    PNG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportChart('svg')}
                    iconName="FileImage"
                    iconPosition="left"
                  >
                    SVG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportChart('pdf')}
                    iconName="FileText"
                    iconPosition="left"
                  >
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportChart('csv')}
                    iconName="Download"
                    iconPosition="left"
                  >
                    CSV
                  </Button>
                </div>
              </div>

              {/* Reset Button */}
              <div className="border-t border-border pt-4">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleReset}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close panel when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ChartCustomizationPanel;