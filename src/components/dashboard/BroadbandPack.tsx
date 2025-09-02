import React, { useEffect, useRef } from 'react';
import { formatNumber, getChangeColor, formatPercentage } from '@/lib/dashboard-utils';

interface BroadbandPackItem {
  label: string;
  previous: number;
  current: number;
  changePct: number;
}

interface BroadbandPackProps {
  data: BroadbandPackItem[];
}

const BroadbandPack: React.FC<BroadbandPackProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    const barWidth = chartWidth / (data.length * 3); // 2 bars + spacing per group
    const maxValue = Math.max(...data.flatMap(item => [item.previous, item.current]));

    // Colors - Using semantic tokens for red theme
    const colors = {
      previous: 'hsl(0, 0%, 80%)', // light gray for previous
      current: 'hsl(14, 91%, 52%)', // primary orange
      text: 'hsl(0, 0%, 100%)', // white text for red background
      grid: 'hsl(0, 0%, 90%)' // light grid
    };

    // Draw grid lines
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * (chartWidth / data.length);
      const groupWidth = chartWidth / data.length;
      const barSpacing = groupWidth * 0.1;
      const actualBarWidth = (groupWidth - barSpacing) / 2;

      // Previous bar
      const prevHeight = (item.previous / maxValue) * chartHeight;
      ctx.fillStyle = colors.previous;
      ctx.fillRect(
        x + barSpacing / 2,
        padding + chartHeight - prevHeight,
        actualBarWidth,
        prevHeight
      );

      // Current bar
      const currentHeight = (item.current / maxValue) * chartHeight;
      ctx.fillStyle = colors.current;
      ctx.fillRect(
        x + barSpacing / 2 + actualBarWidth,
        padding + chartHeight - currentHeight,
        actualBarWidth,
        currentHeight
      );

      // Label
      ctx.fillStyle = colors.text;
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(
        item.label,
        x + groupWidth / 2,
        rect.height - 10
      );

      // Change percentage badge
      const changeY = padding + chartHeight - Math.max(prevHeight, currentHeight) - 20;
      const changeColor = item.changePct >= 0 ? '#059669' : '#dc2626'; // success : danger
      
      ctx.fillStyle = changeColor;
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${item.changePct > 0 ? '+' : ''}${item.changePct.toFixed(1)}%`,
        x + groupWidth / 2,
        changeY
      );
    });

    // Y-axis labels
    ctx.fillStyle = colors.text;
    ctx.font = '11px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const value = (maxValue / 4) * (4 - i);
      const y = padding + (chartHeight / 4) * i;
      ctx.fillText(
        formatNumber(value) + 'M',
        padding - 10,
        y + 4
      );
    }

  }, [data]);

  return (
    <div className="card-analytics">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Broadband Pack</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-sm"></div>
              <span className="text-muted-foreground">Jul 23</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <span className="text-muted-foreground">Aug 23</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className="grid grid-cols-5 gap-4 text-center text-sm">
          {data.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-medium text-foreground">{item.label}</div>
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">
                  Prev: {formatNumber(item.previous)}M
                </div>
                <div className="text-xs font-medium text-foreground">
                  Curr: {formatNumber(item.current)}M
                </div>
                <div className={`text-xs font-bold ${getChangeColor(item.changePct)}`}>
                  {formatPercentage(item.changePct)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroadbandPack;