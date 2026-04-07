import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/dashboard': 'Dashboard',
    '/text-analysis': 'Text Analysis',
    '/sentiment-visualization-dashboard': 'Sentiment Visualizations',
    '/reports': 'Reports',
    '/profile': 'Profile',
    '/settings': 'Settings'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/dashboard',
      isActive: location.pathname === '/dashboard'
    });

    // Add current page if it's not dashboard
    if (location.pathname !== '/dashboard' && pathMap[location.pathname]) {
      breadcrumbs.push({
        label: pathMap[location.pathname],
        path: location.pathname,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path, isActive) => {
    if (!isActive) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          <button
            onClick={() => handleBreadcrumbClick(breadcrumb.path, breadcrumb.isActive)}
            className={`transition-colors duration-200 ${
              breadcrumb.isActive
                ? 'text-foreground font-medium cursor-default'
                : 'text-muted-foreground hover:text-foreground cursor-pointer'
            }`}
            disabled={breadcrumb.isActive}
          >
            {breadcrumb.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;