import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TextInputPanel = ({ 
  activeTab, 
  setActiveTab, 
  singleText, 
  setSingleText, 
  uploadedFiles, 
  setUploadedFiles,
  onAnalyze,
  onClear,
  isAnalyzing 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setSingleText(text);
    setCharacterCount(text.length);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type === 'text/plain' || 
      file.type === 'text/csv' || 
      file.type === 'application/json'|| file.name.endsWith('.txt') ||
      file.name.endsWith('.csv') ||
      file.name.endsWith('.json')
    );
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Text Input</h2>
        <p className="text-sm text-muted-foreground">
          Enter text for sentiment analysis or upload files in bulk
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('single')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'single' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="FileText" size={16} />
          <span>Single Text</span>
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'bulk' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Upload" size={16} />
          <span>Bulk Upload</span>
        </button>
      </div>

      {/* Single Text Tab */}
      {activeTab === 'single' && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={singleText}
              onChange={handleTextChange}
              placeholder="Enter your text here for sentiment analysis..."
              className="w-full h-48 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              maxLength={5000}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
              {characterCount}/5000
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={14} />
              <span>Maximum 5,000 characters</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={onClear}
                disabled={!singleText || isAnalyzing}
              >
                Clear
              </Button>
              <Button
                onClick={onAnalyze}
                disabled={!singleText.trim() || isAnalyzing}
                loading={isAnalyzing}
                iconName="Play"
                iconPosition="left"
              >
                Analyze
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Tab */}
      {activeTab === 'bulk' && (
        <div className="space-y-4">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".txt,.csv,.json"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports TXT, CSV, and JSON files
                </p>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { format: 'TXT', icon: 'FileText', desc: 'Plain text files' },
              { format: 'CSV', icon: 'Table', desc: 'Comma separated values' },
              { format: 'JSON', icon: 'Braces', desc: 'JSON data format' }
            ].map((item) => (
              <div key={item.format} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                <Icon name={item.icon} size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.format}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Uploaded Files</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="File" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-background rounded transition-colors duration-200"
                    >
                      <Icon name="X" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setUploadedFiles([])}
              disabled={uploadedFiles.length === 0 || isAnalyzing}
            >
              Clear All
            </Button>
            <Button
              onClick={onAnalyze}
              disabled={uploadedFiles.length === 0 || isAnalyzing}
              loading={isAnalyzing}
              iconName="Play"
              iconPosition="left"
            >
              Analyze Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInputPanel;