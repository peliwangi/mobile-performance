import React from 'react';
import { formatNumber, getChangeColor } from '@/lib/dashboard-utils';

interface KPI {
  key: string;
  label: string;
  value: number;
  unit: string;
  ach: number;
  mom: number;
  ytdOrYoy: number;
}

interface KPICardsProps {
  kpis: KPI[];
}

const KPICard: React.FC<{ kpi: KPI }> = ({ kpi }) => {
  return (
    <div className="card-kpi dashboard-slide-up">
      <div className="space-y-4">
        <div>
          <h3 className="text-kpi-label">{kpi.label}</h3>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-kpi-value">
              {formatNumber(kpi.value)}
            </span>
            <span className="text-lg font-medium text-muted-foreground">
              {kpi.unit}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground block">Ach</span>
            <span className={`font-semibold ${getChangeColor(kpi.ach - 90)}`}>
              {kpi.ach.toFixed(1)}%
            </span>
          </div>
          
          <div>
            <span className="text-muted-foreground block">MoM</span>
            <span className={`font-semibold ${getChangeColor(kpi.mom)}`}>
              {kpi.mom > 0 ? '+' : ''}{kpi.mom.toFixed(1)}%
            </span>
          </div>
          
          <div>
            <span className="text-muted-foreground block">
              {kpi.key === 'paying_user_0_1' ? 'YTD' : 'YoY'}
            </span>
            <span className={`font-semibold ${getChangeColor(kpi.ytdOrYoy)}`}>
              {kpi.ytdOrYoy > 0 ? '+' : ''}{kpi.ytdOrYoy.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Progress bar for achievement */}
        <div className="space-y-1">
          <div className="w-full bg-muted-bg rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(100, kpi.ach)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICards: React.FC<KPICardsProps> = ({ kpis }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Key Performance Indicators</h2>
      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <KPICard key={kpi.key} kpi={kpi} />
        ))}
      </div>
    </div>
  );
};

export default KPICards;