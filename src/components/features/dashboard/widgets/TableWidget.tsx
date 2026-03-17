import { useMemo, useState } from 'react';
import { Table2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFieldValue } from '@/lib/computeWidgetData';
import type { DashboardWidget, TableWidgetConfig } from '@/types/dashboard';
import type { CustomerOrder } from '@/types/order';

interface TableWidgetProps {
  widget: DashboardWidget;
  orders: CustomerOrder[];
}

export default function TableWidget({ widget, orders }: TableWidgetProps) {
  const config = widget.config as TableWidgetConfig;
  const [page, setPage] = useState(0);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (config.applyFilter && config.filters && config.filters.length > 0) {
      result = result.filter((order) =>
        config.filters.every((f) => {
          const val = String(getFieldValue(order, f.field)).toLowerCase();
          const filterVal = f.value.toLowerCase();
          if (!filterVal) return true;
          switch (f.operator) {
            case 'Contains':
              return val.includes(filterVal);
            case 'Equals':
              return val === filterVal;
            case 'Greater than':
              return Number(getFieldValue(order, f.field)) > Number(f.value);
            case 'Less than':
              return Number(getFieldValue(order, f.field)) < Number(f.value);
            default:
              return true;
          }
        })
      );
    }

    if (config.sortBy === 'Ascending') {
      result.sort((a, b) => (a.totalAmount || 0) - (b.totalAmount || 0));
    } else if (config.sortBy === 'Descending') {
      result.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
    } else if (config.sortBy === 'Order date') {
      result.sort(
        (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
    }

    return result;
  }, [orders, config]);

  const pageSize = config.pagination || 10;
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const pagedOrders = filteredOrders.slice(page * pageSize, (page + 1) * pageSize);
  const columns = config.columns || [];

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <Table2 className="size-8 mb-2 opacity-40" />
        <p className="text-xs">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ fontSize: config.fontSize || 14 }}>
      <div className="px-3 pt-3 pb-1">
        <p className="text-sm font-medium text-foreground truncate">
          {widget.title}
        </p>
      </div>

      <div className="flex-1 overflow-auto px-1">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-[1]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left text-xs font-semibold text-white whitespace-nowrap"
                  style={{ backgroundColor: config.headerBackground || '#54bd95' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border hover:bg-muted/40 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col} className="px-3 py-2 whitespace-nowrap">
                    {col === 'Unit price' || col === 'Total amount'
                      ? `$${Number(getFieldValue(order, col)).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : String(getFieldValue(order, col))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs text-muted-foreground">
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="p-1 rounded hover:bg-accent disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="p-1 rounded hover:bg-accent disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
