import React from 'react';
import { formatNumber, getChangeColor, formatPercentage, generateSparklineData } from '@/lib/dashboard-utils';

interface RevenueItem {
  name: string;
  mtd: number;
  mom: number;
  ytd: number;
}

interface RevenueTotalProps {
  data: RevenueItem[];
}

const SparklineBar: React.FC<{ data: number[]; height?: number }> = ({ data, height = 24 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end space-x-0.5" style={{ height: `${height}px` }}>
      {data.map((value, index) => {
        const normalizedHeight = ((value - min) / range) * height;
        return (
          <div
            key={index}
            className="bg-primary/60 rounded-sm w-1"
            style={{ height: `${Math.max(2, normalizedHeight)}px` }}
          />
        );
      })}
    </div>
  );
};

const RevenueTotal: React.FC<RevenueTotalProps> = ({ data }) => {
  return (
    <div className="card-analytics lg:col-span-2">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Revenue Total</h3>
          <span className="text-sm text-muted-foreground">MTD Performance</span>
        </div>

        <div className="space-y-4">
          {data.map((item, index) => {
            const sparklineData = generateSparklineData(item.mtd, item.mom);
            
            return (
              <div key={item.name} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-24">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  
                  <div className="flex-1 max-w-20">
                    <SparklineBar data={sparklineData} />
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {formatNumber(item.mtd)}M
                    </div>
                    <div className="text-xs text-muted-foreground">MTD</div>
                  </div>

                  <div className="text-right">
                    <div className={`font-semibold ${getChangeColor(item.mom)}`}>
                      {formatPercentage(item.mom)}
                    </div>
                    <div className="text-xs text-muted-foreground">MoM</div>
                  </div>

                  <div className="text-right">
                    <div className={`font-semibold ${getChangeColor(item.ytd)}`}>
                      {formatPercentage(item.ytd)}
                    </div>
                    <div className="text-xs text-muted-foreground">YTD</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total MTD Revenue</span>
            <span className="font-bold text-foreground">
              {formatNumber(data.reduce((sum, item) => sum + item.mtd, 0))}M
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTotal;