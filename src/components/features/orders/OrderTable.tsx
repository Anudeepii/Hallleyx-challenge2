import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { CustomerOrder } from '@/types/order';

interface OrderTableProps {
  orders: CustomerOrder[];
  onEdit: (order: CustomerOrder) => void;
  onDelete: (id: string) => void;
}

const statusVariantMap: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-800 border-amber-200',
  'In progress': 'bg-blue-100 text-blue-800 border-blue-200',
  Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function OrderTable({ orders, onEdit, onDelete }: OrderTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Order ID</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Customer</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Product</th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Qty</th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Total</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell">
                Created by
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground hidden lg:table-cell">
                Date
              </th>
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {order.orderId}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.customerId}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {order.email}
                </td>
                <td className="px-4 py-3 max-w-[180px] truncate">{order.product}</td>
                <td className="px-4 py-3 text-right tabular-nums">{order.quantity}</td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium border ${
                      statusVariantMap[order.status] || 'bg-muted text-foreground'
                    }`}
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {order.createdBy}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                  {formatDate(order.orderDate)}
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="p-1.5 rounded-md hover:bg-accent transition-colors"
                        aria-label="Order actions"
                      >
                        <MoreHorizontal className="size-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(order)}>
                        <Pencil className="size-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(order.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
