import React from 'react';
import { formatNumber, getChangeColor } from '@/lib/dashboard-utils';
import { DollarSign, TrendingUp, Users, Wifi, CreditCard } from 'lucide-react';

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

const getKPIIcon = (key: string) => {
  const iconProps = { className: "w-6 h-6", strokeWidth: 1.5 };
  
  switch (key) {
    case 'revenue_total':
      return <DollarSign {...iconProps} className="w-6 h-6 text-danger" />;
    case 'rev_new_sales':
      return <TrendingUp {...iconProps} className="w-6 h-6 text-success" />;
    case 'rev_existing':
      return <Users {...iconProps} className="w-6 h-6 text-foreground" />;
    case 'rev_broadband':
      return <Wifi {...iconProps} className="w-6 h-6 text-warning" />;
    case 'paying_user_0_1':
      return <CreditCard {...iconProps} className="w-6 h-6 text-danger" />;
    default:
      return <DollarSign {...iconProps} />;
  }
};

const KPICard: React.FC<{ kpi: KPI }> = ({ kpi }) => {
  const getChangeIndicator = (change: number) => {
    if (change > 0) return { icon: '↗', color: 'text-success' };
    if (change < 0) return { icon: '↘', color: 'text-danger' };
    return { icon: '→', color: 'text-muted-foreground' };
  };

  const momIndicator = getChangeIndicator(kpi.mom);
  const yoyIndicator = getChangeIndicator(kpi.ytdOrYoy);

  return (
    <div className="bg-card rounded-lg border border-border p-6 dashboard-slide-up shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {kpi.label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {kpi.key === 'revenue_total' ? 'Gross Revenue to RKAP' :
             kpi.key === 'rev_new_sales' ? 'New customer acquisition' :
             kpi.key === 'rev_existing' ? 'Existing customer revenue' :
             kpi.key === 'rev_broadband' ? 'Broadband services' :
             'New paying users'}
          </p>
        </div>
        <div className="flex-shrink-0">
          {getKPIIcon(kpi.key)}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">
            {formatNumber(kpi.value)}
          </span>
          <span className="text-lg font-medium text-muted-foreground">
            {kpi.unit}
          </span>
        </div>
        
        <div className="mt-2">
          <span className="text-sm text-muted-foreground">
            Ach. {kpi.ach.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium flex items-center space-x-1 ${momIndicator.color}`}>
            <span>{momIndicator.icon}</span>
            <span>MoM {kpi.mom > 0 ? '+' : ''}{kpi.mom.toFixed(2)}%</span>
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium flex items-center space-x-1 ${yoyIndicator.color}`}>
            <span>{yoyIndicator.icon}</span>
            <span>
              {kpi.key === 'paying_user_0_1' ? 'YoY' : 'YoY'} {kpi.ytdOrYoy > 0 ? '+' : ''}{kpi.ytdOrYoy.toFixed(2)}%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

const KPICards: React.FC<KPICardsProps> = ({ kpis }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Key Performance Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.key} kpi={kpi} />
        ))}
      </div>
    </div>
  );
};

export default KPICards;