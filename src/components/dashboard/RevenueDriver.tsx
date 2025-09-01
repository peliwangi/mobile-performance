import React from 'react';
import { formatNumber, getChangeColor, formatPercentage } from '@/lib/dashboard-utils';

interface RevenueBucket {
  name: string;
  mtd: number;
  mom: number;
  yoy: number;
}

interface RevenueDriverItem {
  name: string;
  buckets: RevenueBucket[];
  total: number;
}

interface RevenueDriverProps {
  data: RevenueDriverItem[];
}

const BucketCard: React.FC<{ bucket: RevenueBucket }> = ({ bucket }) => {
  return (
    <div className="bg-muted-bg/50 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{bucket.name}</span>
        <span className="text-sm font-bold text-foreground">
          {formatNumber(bucket.mtd)}K
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground block">MoM</span>
          <span className={`font-semibold ${getChangeColor(bucket.mom)}`}>
            {formatPercentage(bucket.mom)}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">YoY</span>
          <span className={`font-semibold ${getChangeColor(bucket.yoy)}`}>
            {formatPercentage(bucket.yoy)}
          </span>
        </div>
      </div>
    </div>
  );
};

const RegionCard: React.FC<{ region: RevenueDriverItem }> = ({ region }) => {
  return (
    <div className="card-elevated p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-foreground">{region.name}</h4>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="text-xl font-bold text-primary">
            {formatNumber(region.total)}K
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {region.buckets.map((bucket) => (
          <BucketCard key={bucket.name} bucket={bucket} />
        ))}
      </div>

      {/* Progress visualization */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">LoS Distribution</div>
        <div className="flex h-2 bg-muted-bg rounded-full overflow-hidden">
          {region.buckets.map((bucket, index) => {
            const percentage = (bucket.mtd / region.total) * 100;
            const colors = [
              'bg-primary', 
              'bg-primary-light', 
              'bg-success'
            ];
            return (
              <div
                key={bucket.name}
                className={`${colors[index]} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
                title={`${bucket.name}: ${percentage.toFixed(1)}%`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>New Users</span>
          <span>Loyal Users</span>
        </div>
      </div>
    </div>
  );
};

const RevenueDriver: React.FC<RevenueDriverProps> = ({ data }) => {
  const totalPayingUsers = data.reduce((sum, region) => sum + region.total, 0);

  return (
    <div className="card-analytics xl:col-span-2">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Revenue Driver</h3>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Paying Users</div>
            <div className="text-2xl font-bold text-primary">
              {formatNumber(totalPayingUsers)}K
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Paying Users by Length of Service (LoS) across regions
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((region) => (
            <RegionCard key={region.name} region={region} />
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-sm text-center">
            <div>
              <div className="text-muted-foreground">0-1 Month</div>
              <div className="font-bold text-foreground">
                {formatNumber(
                  data.reduce((sum, region) => 
                    sum + region.buckets.find(b => b.name === '0-1mo')?.mtd || 0, 0
                  )
                )}K
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">1-6 Months</div>
              <div className="font-bold text-foreground">
                {formatNumber(
                  data.reduce((sum, region) => 
                    sum + region.buckets.find(b => b.name === '1-6mo')?.mtd || 0, 0
                  )
                )}K
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">6+ Months</div>
              <div className="font-bold text-foreground">
                {formatNumber(
                  data.reduce((sum, region) => 
                    sum + region.buckets.find(b => b.name === '>6mo')?.mtd || 0, 0
                  )
                )}K
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDriver;