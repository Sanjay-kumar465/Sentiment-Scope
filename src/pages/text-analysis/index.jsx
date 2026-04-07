import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TextInputPanel from './components/TextInputPanel';
import AnalysisResultsPanel from './components/AnalysisResultsPanel';
import AdvancedOptionsPanel from './components/AdvancedOptionsPanel';
import Icon from '../../components/AppIcon';

const TextAnalysis = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [singleText, setSingleText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState({
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
  });

  // Mock analysis function
  const performAnalysis = async (text) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock sentiment analysis results
    const mockResults = {
      sentiment: text.toLowerCase().includes('good') || text.toLowerCase().includes('great') || text.toLowerCase().includes('excellent') ? 'Positive' :
                text.toLowerCase().includes('bad') || text.toLowerCase().includes('terrible') || text.toLowerCase().includes('awful') ? 'Negative' : 'Neutral',
      score: Math.random() * 0.4 + 0.6, // Random score between 0.6-1.0
      confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
      breakdown: [
        { type: 'positive', score: Math.random() * 0.5 + 0.3 },
        { type: 'negative', score: Math.random() * 0.3 + 0.1 },
        { type: 'neutral', score: Math.random() * 0.4 + 0.2 }
      ],
      keyPhrases: [
        { text: 'customer service', sentiment: 'positive', weight: 0.8 },
        { text: 'product quality', sentiment: 'positive', weight: 0.7 },
        { text: 'delivery time', sentiment: 'neutral', weight: 0.5 },
        { text: 'user experience', sentiment: 'positive', weight: 0.9 }
      ],
      emotions: [
        { type: 'joy', intensity: 0.7, icon: '😊' },
        { type: 'trust', intensity: 0.6, icon: '🤝' },
        { type: 'anticipation', intensity: 0.4, icon: '🎯' },
        { type: 'surprise', intensity: 0.3, icon: '😮' }
      ],
      textLength: text.length,
      processingTime: Math.floor(Math.random() * 500 + 100),
      modelVersion: advancedOptions.model === 'enhanced' ? 'Enhanced v2.1' : 
                   advancedOptions.model === 'domain-specific' ? 'Domain v1.3' : 'Standard v1.8'
    };

    setAnalysisResults(mockResults);
    setIsAnalyzing(false);
  };

  const handleAnalyze = () => {
    if (activeTab === 'single' && singleText.trim()) {
      performAnalysis(singleText);
    } else if (activeTab === 'bulk' && uploadedFiles.length > 0) {
      // For bulk analysis, we'll use a sample text
      performAnalysis("This is a sample text from uploaded files for demonstration purposes. The service was excellent and the product quality exceeded expectations.");
    }
  };

  const handleClear = () => {
    if (activeTab === 'single') {
      setSingleText('');
    } else {
      setUploadedFiles([]);
    }
    setAnalysisResults(null);
  };

  const handleSaveResults = () => {
    if (analysisResults) {
      const dataStr = JSON.stringify(analysisResults, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `sentiment-analysis-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const handleExportData = () => {
    if (analysisResults) {
      const csvContent = `Sentiment,Score,Confidence,Text Length,Processing Time,Model\n${analysisResults.sentiment},${analysisResults.score.toFixed(3)},${analysisResults.confidence.toFixed(3)},${analysisResults.textLength},${analysisResults.processingTime},${analysisResults.modelVersion}`;
      
      const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvContent);
      const exportFileDefaultName = `sentiment-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  // Clear results when switching tabs
  useEffect(() => {
    setAnalysisResults(null);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Enhanced Header Section */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <Icon name="Brain" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">AI Text Analysis</h1>
                <p className="text-lg text-muted-foreground">
                  Advanced sentiment analysis powered by machine learning
                </p>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={20} className="text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">99.2%</h3>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">&lt;2s</h3>
                <p className="text-sm text-muted-foreground">Processing Time</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Globe" size={20} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">25+</h3>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={20} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">100%</h3>
                <p className="text-sm text-muted-foreground">Secure</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid - Improved Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel - Input Interface */}
            <div className="lg:col-span-5 space-y-6">
              <TextInputPanel
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                singleText={singleText}
                setSingleText={setSingleText}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                onAnalyze={handleAnalyze}
                onClear={handleClear}
                isAnalyzing={isAnalyzing}
              />
              
              <AdvancedOptionsPanel
                options={advancedOptions}
                setOptions={setAdvancedOptions}
                isExpanded={isAdvancedExpanded}
                setIsExpanded={setIsAdvancedExpanded}
              />
            </div>

            {/* Right Panel - Analysis Results */}
            <div className="lg:col-span-7">
              <AnalysisResultsPanel
                results={analysisResults}
                isAnalyzing={isAnalyzing}
                onSaveResults={handleSaveResults}
                onExportData={handleExportData}
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
                <Icon name="Brain" size={28} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Advanced AI Models</h3>
              <p className="text-muted-foreground">
                State-of-the-art natural language processing with transformer-based architectures
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                <Icon name="BarChart3" size={28} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Detailed Analytics</h3>
              <p className="text-muted-foreground">
                Comprehensive sentiment breakdown with confidence scores and emotion detection
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <Icon name="Upload" size={28} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Bulk Processing</h3>
              <p className="text-muted-foreground">
                Process multiple files simultaneously with support for various formats
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextAnalysis;