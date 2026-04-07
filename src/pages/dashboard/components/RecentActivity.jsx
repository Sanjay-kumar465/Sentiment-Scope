import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'analysis',
      title: 'Customer Review Analysis',
      description: 'Processed 150 product reviews',
      sentiment: 'positive',
      timestamp: '2 minutes ago',
      score: 0.85
    },
    {
      id: 2,
      type: 'batch',
      title: 'Social Media Batch',
      description: 'Analyzed 500 social media posts',
      sentiment: 'mixed',
      timestamp: '15 minutes ago',
      score: 0.62
    },
    {
      id: 3,
      type: 'analysis',
      title: 'Support Ticket Analysis',
      description: 'Processed 75 support tickets',
      sentiment: 'negative',
      timestamp: '1 hour ago',
      score: 0.28
    },
    {
      id: 4,
      type: 'report',
      title: 'Weekly Report Generated',
      description: 'Sentiment summary for July 24-31',
      sentiment: 'positive',
      timestamp: '2 hours ago',
      score: 0.78
    },
    {
      id: 5,
      type: 'analysis',
      title: 'Email Campaign Feedback',
      description: 'Analyzed 200 email responses',
      sentiment: 'positive',
      timestamp: '3 hours ago',
      score: 0.91
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'analysis': return 'FileText';
      case 'batch': return 'Layers';
      case 'report': return 'FileBarChart';
      default: return 'Activity';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'mixed': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getSentimentBadgeColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-success/10 text-success border-success/20';
      case 'negative': return 'bg-error/10 text-error border-error/20';
      case 'mixed': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest processed analyses</p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name={getActivityIcon(activity.type)} size={16} className="text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">{activity.title}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{activity.timestamp}</span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSentimentBadgeColor(activity.sentiment)}`}>
                  {activity.sentiment}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Score:</span>
                  <span className={`text-xs font-medium ${getSentimentColor(activity.sentiment)}`}>
                    {(activity.score * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;