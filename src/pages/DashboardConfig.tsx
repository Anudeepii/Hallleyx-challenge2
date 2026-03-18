import { useEffect } from 'react';
import { Responsive } from 'react-grid-layout';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useOrderStore } from '@/stores/orderStore';
import { filterOrdersByDate } from '@/lib/computeWidgetData';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import WidgetRenderer from '@/components/features/dashboard/WidgetRenderer';

export default function Dashboard() {
  const {
    widgets,
    layouts,
    loadConfiguration,
    dateFilter,
  } = useDashboardStore();

  const { ref: gridRef, width: gridWidth } = useContainerWidth();
  const orders = useOrderStore((s) => s.orders);

  const filteredOrders = filterOrdersByDate(orders, dateFilter);

  useEffect(() => {
    loadConfiguration(); // ✅ Load saved dashboard
  }, [loadConfiguration]);

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-screen bg-muted/30">

      {/* EMPTY STATE */}
      {widgets.length === 0 ? (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center border-2 border-dashed border-border rounded-xl p-12 max-w-md">
            <p className="text-lg font-semibold mb-2">
              No widgets configured
            </p>
            <p className="text-sm text-muted-foreground">
              Go to dashboard settings and add widgets
            </p>
          </div>
        </div>
      ) : (
        <div className="p-2 sm:p-4 h-full overflow-auto" ref={gridRef}>

          <Responsive
            className="layout"
            width={gridWidth}
            layouts={layouts}
            breakpoints={{ lg: 1024, md: 768, sm: 0 }}
            cols={{ lg: 12, md: 8, sm: 4 }}
            rowHeight={60}
            isDraggable={false}   // ❌ No dragging in view mode
            isResizable={false}   // ❌ No resizing in view mode
            compactType="vertical"
            margin={[12, 12]}
            containerPadding={[0, 0]}
          >
            {widgets.map((widget) => (
              <div key={widget.id}>
                <div className="h-full bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                  
                  {/* Widget Content */}
                  <WidgetRenderer
                    widget={widget}
                    orders={filteredOrders}
                  />

                </div>
              </div>
            ))}
          </Responsive>

        </div>
      )}
    </div>
  );
}
