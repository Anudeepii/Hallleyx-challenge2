import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Responsive } from 'react-grid-layout';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useOrderStore } from '@/stores/orderStore';
import EmptyDashboard from '@/components/features/dashboard/EmptyDashboard';
import DateFilter from '@/components/features/dashboard/DateFilter';
import WidgetRenderer from '@/components/features/dashboard/WidgetRenderer';
import { filterOrdersByDate } from '@/lib/computeWidgetData';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import { Settings2 } from 'lucide-react';

export default function Dashboard() {
  const { widgets, layouts, dateFilter, clearConfiguration, fetchConfiguration } = useDashboardStore();
  const { orders, fetchOrders } = useOrderStore();
  const filteredOrders = filterOrdersByDate(orders, dateFilter);

  useEffect(() => {
    fetchConfiguration();
    fetchOrders();
  }, [fetchConfiguration, fetchOrders]);

  if (widgets.length === 0) {
    return <EmptyDashboard />;
  }

  const { ref: gridRef, width: gridWidth } = useContainerWidth();

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-3">
          <DateFilter />
          <Button variant="ghost" onClick={clearConfiguration} className="gap-2">
            Clear Dashboard
          </Button>
          <Link to="/dashboard/configure">
            <Button variant="outline" className="gap-2">
              <Settings2 className="size-4" />
              Configure Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div ref={gridRef}>
        <Responsive
          className="layout"
          width={gridWidth}
          layouts={layouts}
          breakpoints={{ lg: 1024, md: 768, sm: 0 }}
          cols={{ lg: 12, md: 8, sm: 4 }}
          rowHeight={60}
          isDraggable={false}
          isResizable={false}
          compactType="vertical"
          margin={[16, 16]}
          containerPadding={[0, 0]}
        >
          {widgets.map((widget) => (
            <div key={widget.id}>
              <div className="h-full bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <WidgetRenderer widget={widget} orders={filteredOrders} />
              </div>
            </div>
          ))}
        </Responsive>
      </div>
    </div>
  );
}
