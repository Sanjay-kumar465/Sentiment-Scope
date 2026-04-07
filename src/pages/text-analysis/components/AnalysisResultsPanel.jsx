import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisResultsPanel = ({ 
  results, 
  isAnalyzing, 
  onSaveResults, 
  onExportData 
}) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'neutral':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSentimentBgColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'bg-success/10 border-success/20';
      case 'negative':
        return 'bg-error/10 border-error/20';
      case 'neutral':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 0.8) return { label: 'High', color: 'text-success' };
    if (confidence >= 0.6) return { label: 'Medium', color: 'text-warning' };
    return { label: 'Low', color: 'text-error' };
  };

  if (isAnalyzing) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto animate-spin">
              <Icon name="Loader2" size={48} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">Analyzing Text...</p>
              <p className="text-sm text-muted-foreground">Processing sentiment analysis</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="BarChart3" size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">Ready for Analysis</p>
              <p className="text-sm text-muted-foreground">
                Enter text or upload files to see sentiment analysis results
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Analysis Results</h2>
          <p className="text-sm text-muted-foreground">
            Real-time sentiment analysis results
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onSaveResults}
            iconName="Save"
            iconPosition="left"
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={onExportData}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Main Sentiment Score */}
      <div className={`p-6 rounded-lg border mb-6 ${getSentimentBgColor(results.sentiment)}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-foreground">
                {results.sentiment}
              </h3>
              <span className={`text-lg font-semibold ${getSentimentColor(results.sentiment)}`}>
                {(results.score * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Overall sentiment classification
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Target" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Confidence</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-semibold ${getConfidenceLevel(results.confidence).color}`}>
                {(results.confidence * 100).toFixed(1)}%
              </span>
              <span className={`text-xs px-2 py-1 rounded-full bg-background ${getConfidenceLevel(results.confidence).color}`}>
                {getConfidenceLevel(results.confidence).label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sentiment Distribution */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Sentiment Distribution</h4>
          <div className="space-y-3">
            {results.breakdown.map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {item.type}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {(item.score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.type === 'positive' ? 'bg-success' :
                      item.type === 'negative' ? 'bg-error' : 'bg-warning'
                    }`}
                    style={{ width: `${item.score * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Phrases */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Key Phrases</h4>
          <div className="space-y-2">
            {results.keyPhrases.map((phrase, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">{phrase.text}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-background ${getSentimentColor(phrase.sentiment)}`}>
                    {phrase.sentiment}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(phrase.weight * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emotional Indicators */}
      <div className="space-y-4 mb-6">
        <h4 className="text-lg font-semibold text-foreground">Emotional Indicators</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.emotions.map((emotion) => (
            <div key={emotion.type} className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">{emotion.icon}</div>
              <p className="text-sm font-medium text-foreground capitalize">{emotion.type}</p>
              <p className="text-xs text-muted-foreground">
                {(emotion.intensity * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Details */}
      <div className="border-t border-border pt-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Processing Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="FileText" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Text Length</p>
              <p className="text-xs text-muted-foreground">{results.textLength} characters</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="Clock" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Processing Time</p>
              <p className="text-xs text-muted-foreground">{results.processingTime}ms</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="Cpu" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Model Used</p>
              <p className="text-xs text-muted-foreground">{results.modelVersion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultsPanel;