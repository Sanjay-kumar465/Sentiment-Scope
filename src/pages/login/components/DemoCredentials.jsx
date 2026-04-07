import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DemoCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoAccounts = [
    {
      role: 'Administrator',
      email: 'admin@sentimentscope.com',
      password: 'admin123',
      description: 'Full access to all features and settings'
    },
    {
      role: 'Business Analyst',
      email: 'analyst@company.com',
      password: 'analyst123',
      description: 'Access to analysis tools and reports'
    },
    {
      role: 'Manager',
      email: 'manager@business.com',
      password: 'manager123',
      description: 'Dashboard and team overview access'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Demo Credentials</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground mb-3">
            Use these credentials to explore the platform:
          </p>
          
          {demoAccounts.map((account, index) => (
            <div key={index} className="p-3 bg-card rounded-md border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{account.role}</h4>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyToClipboard(account.email)}
                    className="p-1 hover:bg-muted rounded transition-colors duration-200"
                    title="Copy email"
                  >
                    <Icon name="Copy" size={12} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground w-16">Email:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {account.email}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground w-16">Password:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {account.password}
                  </code>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                {account.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;