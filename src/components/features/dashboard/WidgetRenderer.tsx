import type { DashboardWidget } from '@/types/dashboard';
import type { CustomerOrder } from '@/types/order';
import KPIWidget from './widgets/KPIWidget';
import ChartWidget from './widgets/ChartWidget';
import PieChartWidget from './widgets/PieChartWidget';
import TableWidget from './widgets/TableWidget';

interface WidgetRendererProps {
  widget: DashboardWidget;
  orders: CustomerOrder[];
}

export default function WidgetRenderer({ widget, orders }: WidgetRendererProps) {
  switch (widget.type) {
    case 'kpi':
      return <KPIWidget widget={widget} orders={orders} />;
    case 'bar-chart':
    case 'line-chart':
    case 'area-chart':
    case 'scatter-plot':
      return <ChartWidget widget={widget} orders={orders} />;
    case 'pie-chart':
      return <PieChartWidget widget={widget} orders={orders} />;
    case 'table':
      return <TableWidget widget={widget} orders={orders} />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          Unknown widget
        </div>
      );
  }
}
