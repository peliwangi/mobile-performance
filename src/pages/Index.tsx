import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FilterBar from '@/components/dashboard/FilterBar';
import KPICards from '@/components/dashboard/KPICards';
import RevenueTotal from '@/components/dashboard/RevenueTotal';
import BroadbandPack from '@/components/dashboard/BroadbandPack';
import RevenueDriver from '@/components/dashboard/RevenueDriver';

interface FilterState {
  regional: string;
  branch: string;
  cluster: string;
}

interface DashboardData {
  kpis: Array<{
    key: string;
    label: string;
    value: number;
    unit: string;
    ach: number;
    mom: number;
    ytdOrYoy: number;
  }>;
  revenue_total: Array<{
    name: string;
    mtd: number;
    mom: number;
    ytd: number;
  }>;
  broadband_pack: Array<{
    label: string;
    previous: number;
    current: number;
    changePct: number;
  }>;
  revenue_driver: Array<{
    name: string;
    buckets: Array<{
      name: string;
      mtd: number;
      mom: number;
      yoy: number;
    }>;
    total: number;
  }>;
}

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    regional: 'All',
    branch: 'All',
    cluster: 'All'
  });

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadData = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - in real implementation, this would come from API
      const mockData: DashboardData = {
        kpis: [
          {
            key: 'revenue_total',
            label: 'Revenue Total',
            value: 2.45,
            unit: 'Bn',
            ach: 87.5,
            mom: 5.2,
            ytdOrYoy: 12.8
          },
          {
            key: 'rev_new_sales',
            label: 'Rev New Sales',
            value: 456.2,
            unit: 'Mn',
            ach: 92.3,
            mom: -2.1,
            ytdOrYoy: 8.4
          },
          {
            key: 'rev_existing',
            label: 'Rev Existing',
            value: 1.98,
            unit: 'Bn',
            ach: 85.1,
            mom: 7.3,
            ytdOrYoy: 15.2
          },
          {
            key: 'rev_broadband',
            label: 'Rev Broadband',
            value: 678.5,
            unit: 'Mn',
            ach: 94.7,
            mom: 3.8,
            ytdOrYoy: 18.6
          },
          {
            key: 'paying_user_0_1',
            label: 'Paying User 0-1',
            value: 125.3,
            unit: 'K',
            ach: 88.9,
            mom: -1.2,
            ytdOrYoy: 22.4
          }
        ],
        revenue_total: [
          { name: 'Broadband', mtd: 678.5, mom: 3.8, ytd: 18.6 },
          { name: 'Dig. Services', mtd: 234.2, mom: -1.5, ytd: 8.3 },
          { name: 'Voices', mtd: 456.8, mom: 2.1, ytd: -3.2 },
          { name: 'SMS', mtd: 89.3, mom: -5.2, ytd: -12.8 },
          { name: 'Int. Roaming', mtd: 45.7, mom: 12.4, ytd: 34.5 }
        ],
        broadband_pack: [
          { label: 'CVM', previous: 125.5, current: 142.3, changePct: 13.4 },
          { label: 'CORE', previous: 89.2, current: 95.8, changePct: 7.4 },
          { label: 'PV', previous: 67.1, current: 59.3, changePct: -11.6 },
          { label: 'ACQ', previous: 156.8, current: 178.9, changePct: 14.1 },
          { label: 'OTHERS', previous: 45.3, current: 42.1, changePct: -7.1 }
        ],
        revenue_driver: [
          {
            name: 'Area 3',
            buckets: [
              { name: '0-1mo', mtd: 45.2, mom: 3.5, yoy: 12.8 },
              { name: '1-6mo', mtd: 89.6, mom: -2.1, yoy: 8.4 },
              { name: '>6mo', mtd: 125.8, mom: 5.7, yoy: 18.2 }
            ],
            total: 260.6
          },
          {
            name: 'Balinus',
            buckets: [
              { name: '0-1mo', mtd: 38.7, mom: 1.8, yoy: 15.3 },
              { name: '1-6mo', mtd: 72.4, mom: -3.2, yoy: 6.7 },
              { name: '>6mo', mtd: 98.1, mom: 4.9, yoy: 21.5 }
            ],
            total: 209.2
          },
          {
            name: 'Jateng',
            buckets: [
              { name: '0-1mo', mtd: 52.3, mom: 2.7, yoy: 9.8 },
              { name: '1-6mo', mtd: 96.8, mom: -1.5, yoy: 12.4 },
              { name: '>6mo', mtd: 134.2, mom: 6.1, yoy: 16.7 }
            ],
            total: 283.3
          },
          {
            name: 'Jatim',
            buckets: [
              { name: '0-1mo', mtd: 47.9, mom: 4.2, yoy: 11.2 },
              { name: '1-6mo', mtd: 84.5, mom: -0.8, yoy: 7.9 },
              { name: '>6mo', mtd: 118.7, mom: 3.4, yoy: 19.8 }
            ],
            total: 251.1
          }
        ]
      };

      setData(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">No Data Available</h2>
            <p className="text-muted-foreground">Unable to load dashboard data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader lastUpdated={lastUpdated} />
      
      <div className="dashboard-content">
        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          onRefresh={handleRefresh}
        />
        
        <div className="space-y-8 fade-in">
          <KPICards kpis={data.kpis} />
          
          <div className="analytics-grid">
            <RevenueTotal data={data.revenue_total} />
            <BroadbandPack data={data.broadband_pack} />
            <RevenueDriver data={data.revenue_driver} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;