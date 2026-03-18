import { useCallback, useState } from 'react';
import { Responsive } from 'react-grid-layout';
import { Settings, Trash2, GripVertical } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useOrderStore } from '@/stores/orderStore';
import { filterOrdersByDate } from '@/lib/computeWidgetData';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import WidgetRenderer from './WidgetRenderer';
import type { WidgetType } from '@/types/dashboard';

interface CanvasGridProps {
  onOpenSettings: (widgetId: string) => void;
  onDeleteWidget: (widgetId: string) => void;
}

export default function CanvasGrid({
  onOpenSettings,
  onDeleteWidget,
}: CanvasGridProps) {
  const {
    draftWidgets,
    draftLayouts,
    addDraftWidget,
    updateDraftLayouts,
    dateFilter,
  } = useDashboardStore();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { ref: gridRef, width: gridWidth } = useContainerWidth();
  const orders = useOrderStore((s) => s.orders);
  const filteredOrders = filterOrdersByDate(orders, dateFilter);

  const handleExternalDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      const widgetType = e.dataTransfer.getData('widgetType') as WidgetType;
      if (!widgetType) return;
      const maxY = (draftLayouts.lg || []).reduce(
        (m, item) => Math.max(m, item.y + item.h),
        0
      );
      addDraftWidget(widgetType, 0, maxY);
    },
    [addDraftWidget, draftLayouts.lg]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleLayoutChange = useCallback(
    (_currentLayout: any, allLayouts: any) => {
      updateDraftLayouts(allLayouts);
    },
    [updateDraftLayouts]
  );

  return (
    <div
      className="flex-1 overflow-auto bg-muted/30 relative"
      onDrop={handleExternalDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {draftWidgets.length === 0 ? (
        <div className="flex items-center justify-center h-full min-h-[400px] p-8">
          <div className="text-center border-2 border-dashed border-border rounded-xl p-12 max-w-md">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <GripVertical className="size-6 text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground mb-1">
              Drag widgets here
            </p>
            <p className="text-sm text-muted-foreground">
              Drop widgets from the palette on the left to start building your
              dashboard
            </p>
          </div>
        </div>
      ) : (
        <div className="p-2 sm:p-4 relative" ref={gridRef}>
          {isDraggingOver && (
            <div className="absolute inset-0 z-20 pointer-events-none bg-primary/5 border-2 border-dashed border-primary rounded-xl flex items-center justify-center text-primary font-medium">
              Drop widget to add to dashboard
            </div>
          )}
          <Responsive
            className="layout"
            width={gridWidth}
            layouts={draftLayouts}
            breakpoints={{ lg: 1024, md: 768, sm: 0 }}
            cols={{ lg: 12, md: 8, sm: 4 }}
            rowHeight={60}
            isDraggable={true}
            isResizable={false}
            onLayoutChange={handleLayoutChange}
            compactType="vertical"
            margin={[12, 12]}
            containerPadding={[0, 0]}
          >
            {draftWidgets.map((widget) => (
              <div key={widget.id} className="group">
                <div className="h-full bg-card rounded-lg border border-border shadow-sm overflow-hidden relative">
                  <WidgetRenderer widget={widget} orders={filteredOrders} />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSettings(widget.id);
                      }}
                      className="p-1.5 rounded-md bg-card/95 backdrop-blur-sm border border-border shadow-sm hover:bg-accent transition-colors"
                      aria-label="Widget settings"
                    >
                      <Settings className="size-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWidget(widget.id);
                      }}
                      className="p-1.5 rounded-md bg-card/95 backdrop-blur-sm border border-border shadow-sm hover:bg-destructive/10 transition-colors"
                      aria-label="Delete widget"
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Responsive>
        </div>
      )}
    </div>
  );
}
