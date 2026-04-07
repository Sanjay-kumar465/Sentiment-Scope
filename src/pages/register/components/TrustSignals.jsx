import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'We follow strict data protection regulations'
    },
    {
      icon: 'CheckCircle',
      title: 'SOC 2 Certified',
      description: 'Independently verified security controls'
    },
    {
      icon: 'Users',
      title: '10,000+ Users',
      description: 'Trusted by businesses worldwide'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
      <h4 className="text-sm font-semibold text-foreground mb-3">Why businesses trust SentimentScope</h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={16} className="text-warning fill-current" />
          <span className="text-sm font-medium text-foreground">4.8/5</span>
          <span className="text-xs text-muted-foreground">from 2,500+ reviews</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;