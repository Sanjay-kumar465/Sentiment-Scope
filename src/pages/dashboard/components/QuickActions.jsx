import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'New Analysis',
      description: 'Start analyzing new text content',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/text-analysis')
    },
    {
      title: 'Upload Batch',
      description: 'Process multiple texts at once',
      icon: 'Upload',
      variant: 'outline',
      onClick: () => navigate('/text-analysis')
    },
    {
      title: 'View Reports',
      description: 'Access detailed analytics reports',
      icon: 'FileBarChart',
      variant: 'secondary',
      onClick: () => navigate('/reports')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Button variant="ghost" size="icon" iconName="Zap" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Get started with common tasks</p>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">{action.title}</h4>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
            <Button
              variant={action.variant}
              size="sm"
              iconName={action.icon}
              iconPosition="left"
              onClick={action.onClick}
              className="ml-4"
            >
              {action.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;