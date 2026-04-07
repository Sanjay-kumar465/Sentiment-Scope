import React from 'react';
import Icon from '../AppIcon';

const LoadingIndicator = ({ 
  size = 'default', 
  text = 'Loading...', 
  variant = 'spinner',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  if (variant === 'spinner') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className={`${sizeClasses[size]} animate-spin`}>
          <Icon name="Loader2" size={size === 'sm' ? 16 : size === 'lg' ? 32 : size === 'xl' ? 48 : 24} />
        </div>
        {text && (
          <span className={`${textSizeClasses[size]} text-muted-foreground`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className="flex space-x-1">
          <div className={`${sizeClasses[size]} bg-primary rounded-full animate-pulse`} style={{ animationDelay: '0ms' }}></div>
          <div className={`${sizeClasses[size]} bg-primary rounded-full animate-pulse`} style={{ animationDelay: '150ms' }}></div>
          <div className={`${sizeClasses[size]} bg-primary rounded-full animate-pulse`} style={{ animationDelay: '300ms' }}></div>
        </div>
        {text && (
          <span className={`${textSizeClasses[size]} text-muted-foreground ml-2`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse"></div>
        </div>
        {text && (
          <span className={`${textSizeClasses[size]} text-muted-foreground`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  return null;
};

// Global loading overlay component
const LoadingOverlay = ({ isVisible, text = 'Processing...', variant = 'spinner' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1300] flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
        <LoadingIndicator size="lg" text={text} variant={variant} />
      </div>
    </div>
  );
};

// Inline loading state for content areas
const ContentLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingIndicator;
export { LoadingOverlay, ContentLoader };