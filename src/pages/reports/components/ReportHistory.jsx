import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');

  const reportHistory = [
    {
      id: 1,
      name: "Customer Feedback Analysis - Q2 2025",
      type: "Customer Feedback",
      createdDate: "2025-07-31",
      createdBy: "John Doe",
      format: "PDF",
      size: "2.4 MB",
      downloads: 12,
      status: "completed"
    },
    {
      id: 2,
      name: "Social Media Sentiment - July 2025",
      type: "Social Media",
      createdDate: "2025-07-30",
      createdBy: "Sarah Wilson",
      format: "Excel",
      size: "1.8 MB",
      downloads: 8,
      status: "completed"
    },
    {
      id: 3,
      name: "Product Review Analysis - Weekly",
      type: "Product Reviews",
      createdDate: "2025-07-29",
      createdBy: "Mike Johnson",
      format: "PowerPoint",
      size: "5.2 MB",
      downloads: 15,
      status: "completed"
    },
    {
      id: 4,
      name: "Competitive Analysis Report",
      type: "Competitive Analysis",
      createdDate: "2025-07-28",
      createdBy: "Emily Chen",
      format: "PDF",
      size: "3.1 MB",
      downloads: 6,
      status: "completed"
    },
    {
      id: 5,
      name: "Support Ticket Sentiment Analysis",
      type: "Support Tickets",
      createdDate: "2025-07-27",
      createdBy: "David Brown",
      format: "Excel",
      size: "1.2 MB",
      downloads: 4,
      status: "processing"
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'customer_feedback', label: 'Customer Feedback' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'product_reviews', label: 'Product Reviews' },
    { value: 'competitive_analysis', label: 'Competitive Analysis' },
    { value: 'support_tickets', label: 'Support Tickets' }
  ];

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'downloads_desc', label: 'Most Downloaded' }
  ];

  const filteredReports = reportHistory.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type.toLowerCase().replace(/\s+/g,'_') === filterType;
    return matchesSearch && matchesType;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'date_asc':
        return new Date(a.createdDate) - new Date(b.createdDate);
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'downloads_desc':
        return b.downloads - a.downloads;
      default: // date_desc
        return new Date(b.createdDate) - new Date(a.createdDate);
    }
  });

  const handleDownload = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const handleRegenerate = (reportId) => {
    console.log('Regenerating report:', reportId);
  };

  const handleDelete = (reportId) => {
    console.log('Deleting report:', reportId);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success/10 text-success`;
      case 'processing':
        return `${baseClasses} bg-warning/10 text-warning`;
      case 'failed':
        return `${baseClasses} bg-error/10 text-error`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const getFormatIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'excel':
        return 'FileSpreadsheet';
      case 'powerpoint':
        return 'Presentation';
      default:
        return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Report History</h2>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconName="Search"
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Filter by type"
              className="w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-40"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {sortedReports.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Reports Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' ?'Try adjusting your search or filter criteria.' :'You haven\'t generated any reports yet. Create your first report to get started.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedReports.map((report) => (
              <div key={report.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name={getFormatIcon(report.format)} size={20} className="text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-foreground">{report.name}</h3>
                        <span className={getStatusBadge(report.status)}>
                          {report.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Type:</span> {report.type}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {new Date(report.createdDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">By:</span> {report.createdBy}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {report.size}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Download" size={14} />
                          <span>{report.downloads} downloads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="File" size={14} />
                          <span>{report.format}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {report.status === 'completed' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Download"
                          onClick={() => handleDownload(report.id)}
                        >
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="RefreshCw"
                          onClick={() => handleRegenerate(report.id)}
                        >
                          Regenerate
                        </Button>
                      </>
                    )}
                    
                    {report.status === 'processing' && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        <span>Processing...</span>
                      </div>
                    )}
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDelete(report.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistory;