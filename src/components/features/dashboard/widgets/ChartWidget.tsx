import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { computeChartData, computeScatterData } from '@/lib/computeWidgetData';
import type { DashboardWidget, ChartConfig } from '@/types/dashboard';
import type { CustomerOrder } from '@/types/order';
import { BarChart3 } from 'lucide-react';

interface ChartWidgetProps {
  widget: DashboardWidget;
  orders: CustomerOrder[];
}

export default function ChartWidget({ widget, orders }: ChartWidgetProps) {
  const config = widget.config as ChartConfig;
  const isScatter = widget.type === 'scatter-plot';
  const data = isScatter
    ? computeScatterData(orders, config.xAxis, config.yAxis)
    : computeChartData(orders, config.xAxis, config.yAxis);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <BarChart3 className="size-8 mb-2 opacity-40" />
        <p className="text-xs">No data available</p>
      </div>
    );
  }

  const labelProps = config.showDataLabel
    ? { label: { position: 'top' as const, fill: '#888', fontSize: 11 } }
    : {};

  const renderChart = () => {
    switch (widget.type) {
      case 'bar-chart':
        return (
          <BarChart data={data} margin={{ top: 16, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid hsl(var(--border))',
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill={config.chartColor} radius={[4, 4, 0, 0]} {...labelProps} />
          </BarChart>
        );

      case 'line-chart':
        return (
          <LineChart data={data} margin={{ top: 16, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid hsl(var(--border))',
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={config.chartColor}
              strokeWidth={2}
              dot={{ r: 4, fill: config.chartColor }}
              {...labelProps}
            />
          </LineChart>
        );

      case 'area-chart':
        return (
          <AreaChart data={data} margin={{ top: 16, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid hsl(var(--border))',
                fontSize: 12,
              }}
            />
            <defs>
              <linearGradient id={`grad-${widget.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={config.chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={config.chartColor}
              strokeWidth={2}
              fill={`url(#grad-${widget.id})`}
              {...labelProps}
            />
          </AreaChart>
        );

      case 'scatter-plot':
        return (
          <ScatterChart margin={{ top: 16, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="x" name={config.xAxis} tick={{ fontSize: 11 }} />
            <YAxis dataKey="y" name={config.yAxis} tick={{ fontSize: 11 }} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                borderRadius: 8,
                border: '1px solid hsl(var(--border))',
                fontSize: 12,
              }}
            />
            <Scatter data={data} fill={config.chartColor} />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-3 h-full flex flex-col">
      <p className="text-sm font-medium text-foreground mb-1 truncate">
        {widget.title}
      </p>
      {widget.description && (
        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
          {widget.description}
        </p>
      )}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()!}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
