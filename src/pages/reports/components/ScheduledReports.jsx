import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduledReports = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    frequency: 'weekly',
    recipients: '',
    format: 'pdf',
    includeCharts: true,
    includeMetrics: true
  });

  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Customer Feedback Summary",
      frequency: "Weekly",
      nextRun: "2025-08-07",
      recipients: ["manager@company.com", "team@company.com"],
      format: "PDF",
      status: "active",
      lastRun: "2025-07-31"
    },
    {
      id: 2,
      name: "Monthly Social Media Analysis",
      frequency: "Monthly",
      nextRun: "2025-08-31",
      recipients: ["marketing@company.com"],
      format: "Excel",
      status: "active",
      lastRun: "2025-07-01"
    },
    {
      id: 3,
      name: "Daily Product Review Monitor",
      frequency: "Daily",
      nextRun: "2025-08-01",
      recipients: ["product@company.com", "support@company.com"],
      format: "PDF",
      status: "paused",
      lastRun: "2025-07-30"
    }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'powerpoint', label: 'PowerPoint' }
  ];

  const handleCreateSchedule = () => {
    // In a real app, this would save to backend
    console.log('Creating scheduled report:', newSchedule);
    setShowCreateModal(false);
    setNewSchedule({
      name: '',
      frequency: 'weekly',
      recipients: '',
      format: 'pdf',
      includeCharts: true,
      includeMetrics: true
    });
  };

  const toggleReportStatus = (reportId) => {
    console.log('Toggling status for report:', reportId);
  };

  const deleteScheduledReport = (reportId) => {
    console.log('Deleting scheduled report:', reportId);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-success/10 text-success`;
      case 'paused':
        return `${baseClasses} bg-warning/10 text-warning`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Scheduled Reports</h2>
        <Button
          variant="default"
          iconName="Plus"
          onClick={() => setShowCreateModal(true)}
        >
          Schedule Report
        </Button>
      </div>

      <div className="p-6">
        {scheduledReports.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Scheduled Reports</h3>
            <p className="text-muted-foreground mb-4">
              Create your first scheduled report to receive automated sentiment analysis updates.
            </p>
            <Button
              variant="default"
              iconName="Plus"
              onClick={() => setShowCreateModal(true)}
            >
              Schedule Your First Report
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div key={report.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-foreground">{report.name}</h3>
                      <span className={getStatusBadge(report.status)}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>
                        <span className="ml-2 text-foreground">{report.frequency}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Run:</span>
                        <span className="ml-2 text-foreground">{report.nextRun}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Format:</span>
                        <span className="ml-2 text-foreground">{report.format}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <span className="ml-2 text-foreground">{report.lastRun}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-muted-foreground text-sm">Recipients:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {report.recipients.map((email, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                          >
                            {email}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName={report.status === 'active' ? 'Pause' : 'Play'}
                      onClick={() => toggleReportStatus(report.id)}
                    >
                      {report.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => deleteScheduledReport(report.id)}
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

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Schedule New Report</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <Input
                label="Report Name"
                placeholder="Enter report name"
                value={newSchedule.name}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <Select
                label="Frequency"
                options={frequencyOptions}
                value={newSchedule.frequency}
                onChange={(value) => setNewSchedule(prev => ({ ...prev, frequency: value }))}
              />
              
              <Input
                label="Recipients"
                placeholder="Enter email addresses separated by commas"
                value={newSchedule.recipients}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, recipients: e.target.value }))}
              />
              
              <Select
                label="Export Format"
                options={formatOptions}
                value={newSchedule.format}
                onChange={(value) => setNewSchedule(prev => ({ ...prev, format: value }))}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Include in Report</label>
                <div className="space-y-2">
                  <Checkbox
                    label="Charts and visualizations"
                    checked={newSchedule.includeCharts}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, includeCharts: e.target.checked }))}
                  />
                  <Checkbox
                    label="Key metrics and statistics"
                    checked={newSchedule.includeMetrics}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, includeMetrics: e.target.checked }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleCreateSchedule}
                disabled={!newSchedule.name || !newSchedule.recipients}
              >
                Create Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledReports;