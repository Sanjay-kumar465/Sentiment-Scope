import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic details' },
    { id: 2, title: 'Business Info', description: 'Company details' },
    { id: 3, title: 'Verification', description: 'Email confirmation' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                currentStep > step.id
                  ? 'bg-success border-success text-white'
                  : currentStep === step.id
                  ? 'bg-primary border-primary text-white' :'bg-card border-border text-muted-foreground'
              }`}>
                {currentStep > step.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;