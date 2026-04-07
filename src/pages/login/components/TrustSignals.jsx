import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'GDPR Compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'SOC 2 Certified'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-6">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon 
              name={feature.icon} 
              size={16} 
              className="text-success" 
            />
            <span className="text-xs text-muted-foreground font-medium">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SentimentScope. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;