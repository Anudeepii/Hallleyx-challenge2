import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { computePieData } from '@/lib/computeWidgetData';
import { PIE_COLORS } from '@/constants/config';
import type { DashboardWidget, PieChartConfig } from '@/types/dashboard';
import type { CustomerOrder } from '@/types/order';

interface PieChartWidgetProps {
  widget: DashboardWidget;
  orders: CustomerOrder[];
}

export default function PieChartWidget({ widget, orders }: PieChartWidgetProps) {
  const config = widget.config as PieChartConfig;
  const data = computePieData(orders, config.chartData);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <PieIcon className="size-8 mb-2 opacity-40" />
        <p className="text-xs">No data available</p>
      </div>
    );
  }

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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="70%"
              dataKey="value"
              nameKey="name"
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid hsl(var(--border))',
                fontSize: 12,
              }}
            />
            {config.showLegend && (
              <Legend
                wrapperStyle={{ fontSize: 11 }}
                iconType="circle"
                iconSize={8}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
