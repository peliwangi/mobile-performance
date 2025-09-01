import React from 'react';

interface DashboardHeaderProps {
  lastUpdated: Date;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
  };

  return (
    <header className="dashboard-header">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">
            Mobile Tracking – Performance Aug 2025
          </h1>
          <span className="indicator-positive">
            Update {formatDate(lastUpdated)}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
          </div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;