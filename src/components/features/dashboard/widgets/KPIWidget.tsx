import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { computeKPIValue } from '@/lib/computeWidgetData';
import type { DashboardWidget, KPIConfig } from '@/types/dashboard';
import type { CustomerOrder } from '@/types/order';

interface KPIWidgetProps {
  widget: DashboardWidget;
  orders: CustomerOrder[];
}

export default function KPIWidget({ widget, orders }: KPIWidgetProps) {
  const config = widget.config as KPIConfig;
  const value = computeKPIValue(orders, config.metric, config.aggregation);

  const formatted =
    config.dataFormat === 'Currency'
      ? `$${value.toLocaleString('en-US', {
          minimumFractionDigits: config.decimalPrecision,
          maximumFractionDigits: config.decimalPrecision,
        })}`
      : value.toLocaleString('en-US', {
          minimumFractionDigits: config.decimalPrecision,
          maximumFractionDigits: config.decimalPrecision,
        });

  const TrendIcon = value > 0 ? TrendingUp : value < 0 ? TrendingDown : Minus;
  const trendColor = value > 0 ? 'text-emerald-600' : value < 0 ? 'text-red-500' : 'text-muted-foreground';

  return (
    <div className="p-4 h-full flex flex-col justify-center">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 truncate">
        {widget.title}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-bold tabular-nums text-foreground truncate">
          {orders.length === 0 ? '—' : formatted}
        </span>
        {orders.length > 0 && (
          <TrendIcon className={`size-4 shrink-0 ${trendColor}`} />
        )}
      </div>
      {widget.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {widget.description}
        </p>
      )}
      <p className="text-[10px] text-muted-foreground/60 mt-auto pt-1">
        {config.aggregation} of {config.metric}
      </p>
    </div>
  );
}
