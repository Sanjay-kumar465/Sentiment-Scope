import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const AdvancedOptionsPanel = ({ 
  options, 
  setOptions, 
  isExpanded, 
  setIsExpanded 
}) => {
  const modelOptions = [
    { value: 'standard', label: 'Standard Model', description: 'General purpose sentiment analysis' },
    { value: 'enhanced', label: 'Enhanced Model', description: 'Advanced NLP with emotion detection' },
    { value: 'domain-specific', label: 'Domain Specific', description: 'Optimized for business reviews' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'auto', label: 'Auto-detect' }
  ];

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground">Advanced Options</h3>
            <p className="text-sm text-muted-foreground">
              Configure analysis parameters and preprocessing
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>

      {isExpanded && (
        <div className="border-t border-border p-6 space-y-6">
          {/* Model Selection */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Analysis Model</h4>
            <Select
              label="Choose Analysis Model"
              description="Select the sentiment analysis model to use"
              options={modelOptions}
              value={options.model}
              onChange={(value) => handleOptionChange('model', value)}
            />
          </div>

          {/* Language Settings */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Language Settings</h4>
            <Select
              label="Text Language"
              description="Specify the language of your text for better accuracy"
              options={languageOptions}
              value={options.language}
              onChange={(value) => handleOptionChange('language', value)}
            />
          </div>

          {/* Confidence Threshold */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Confidence Settings</h4>
            <Input
              label="Minimum Confidence Threshold"
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={options.confidenceThreshold}
              onChange={(e) => handleOptionChange('confidenceThreshold', parseFloat(e.target.value))}
              description="Results below this threshold will be flagged as uncertain"
            />
          </div>

          {/* Text Preprocessing */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Text Preprocessing</h4>
            <div className="space-y-3">
              <Checkbox
                label="Remove Stop Words"
                description="Filter out common words like 'the', 'and', 'is'"
                checked={options.removeStopWords}
                onChange={(e) => handleOptionChange('removeStopWords', e.target.checked)}
              />
              <Checkbox
                label="Normalize Text Case"
                description="Convert all text to lowercase for consistent analysis"
                checked={options.normalizeCase}
                onChange={(e) => handleOptionChange('normalizeCase', e.target.checked)}
              />
              <Checkbox
                label="Remove Special Characters"
                description="Strip punctuation and special symbols"
                checked={options.removeSpecialChars}
                onChange={(e) => handleOptionChange('removeSpecialChars', e.target.checked)}
              />
              <Checkbox
                label="Expand Contractions"
                description="Convert contractions like 'don't' to 'do not'"
                checked={options.expandContractions}
                onChange={(e) => handleOptionChange('expandContractions', e.target.checked)}
              />
            </div>
          </div>

          {/* Analysis Features */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Analysis Features</h4>
            <div className="space-y-3">
              <Checkbox
                label="Emotion Detection"
                description="Identify specific emotions beyond sentiment polarity"
                checked={options.emotionDetection}
                onChange={(e) => handleOptionChange('emotionDetection', e.target.checked)}
              />
              <Checkbox
                label="Key Phrase Extraction"
                description="Extract important phrases that influence sentiment"
                checked={options.keyPhraseExtraction}
                onChange={(e) => handleOptionChange('keyPhraseExtraction', e.target.checked)}
              />
              <Checkbox
                label="Sarcasm Detection"
                description="Attempt to identify sarcastic or ironic statements"
                checked={options.sarcasmDetection}
                onChange={(e) => handleOptionChange('sarcasmDetection', e.target.checked)}
              />
              <Checkbox
                label="Context Analysis"
                description="Consider surrounding context for better accuracy"
                checked={options.contextAnalysis}
                onChange={(e) => handleOptionChange('contextAnalysis', e.target.checked)}
              />
            </div>
          </div>

          {/* Output Options */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Output Options</h4>
            <div className="space-y-3">
              <Checkbox
                label="Include Raw Scores"
                description="Show detailed numerical scores for all sentiment classes"
                checked={options.includeRawScores}
                onChange={(e) => handleOptionChange('includeRawScores', e.target.checked)}
              />
              <Checkbox
                label="Generate Explanation"
                description="Provide reasoning for the sentiment classification"
                checked={options.generateExplanation}
                onChange={(e) => handleOptionChange('generateExplanation', e.target.checked)}
              />
              <Checkbox
                label="Save Processing Log"
                description="Keep detailed logs of preprocessing steps"
                checked={options.saveProcessingLog}
                onChange={(e) => handleOptionChange('saveProcessingLog', e.target.checked)}
              />
            </div>
          </div>

          {/* Reset Options */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={() => setOptions({
                model: 'standard',
                language: 'auto',
                confidenceThreshold: 0.6,
                removeStopWords: true,
                normalizeCase: true,
                removeSpecialChars: false,
                expandContractions: true,
                emotionDetection: true,
                keyPhraseExtraction: true,
                sarcasmDetection: false,
                contextAnalysis: true,
                includeRawScores: false,
                generateExplanation: true,
                saveProcessingLog: false
              })}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="RotateCcw" size={16} />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptionsPanel;