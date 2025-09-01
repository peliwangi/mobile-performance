import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface FilterBarProps {
  filters: {
    regional: string;
    branch: string;
    cluster: string;
  };
  onFilterChange: (filters: Partial<{
    regional: string;
    branch: string;
    cluster: string;
  }>) => void;
  onRefresh: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onRefresh }) => {
  const regionalOptions = ['All', 'Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5'];
  const branchOptions = ['All', 'Jakarta', 'Surabaya', 'Bandung', 'Semarang', 'Yogyakarta'];
  const clusterOptions = ['All', 'Central', 'North', 'South', 'East', 'West'];

  return (
    <div className="card-base p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="regional" className="text-sm font-medium text-foreground">
            Regional:
          </label>
          <select
            id="regional"
            className="filter-select"
            value={filters.regional}
            onChange={(e) => onFilterChange({ regional: e.target.value })}
          >
            {regionalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="branch" className="text-sm font-medium text-foreground">
            Branch:
          </label>
          <select
            id="branch"
            className="filter-select"
            value={filters.branch}
            onChange={(e) => onFilterChange({ branch: e.target.value })}
          >
            {branchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="cluster" className="text-sm font-medium text-foreground">
            Cluster:
          </label>
          <select
            id="cluster"
            className="filter-select"
            value={filters.cluster}
            onChange={(e) => onFilterChange({ cluster: e.target.value })}
          >
            {clusterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1"></div>

        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;