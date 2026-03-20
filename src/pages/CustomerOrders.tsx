import { useState, useEffect } from 'react';
import { Plus, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '@/stores/orderStore';
import OrderTable from '@/components/features/orders/OrderTable';
import OrderFormModal from '@/components/features/orders/OrderFormModal';
import DeleteOrderDialog from '@/components/features/orders/DeleteOrderDialog';
import type { CustomerOrder } from '@/types/order';

export default function CustomerOrders() {
  const { orders, loading, fetchOrders, clearOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<CustomerOrder | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const handleEdit = (order: CustomerOrder) => {
    setEditingOrder(order);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingOrder(null);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Customer Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setFormOpen(true)} className="gap-2">
            <Plus className="size-4" />
            Create Order
          </Button>
          <Button variant="outline" onClick={clearOrders} className="gap-2">
            Clear Orders
          </Button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <PackageOpen className="size-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            No orders yet
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Create your first customer order to start building your dashboard
            with real data.
          </p>
          <Button onClick={() => setFormOpen(true)} className="gap-2">
            <Plus className="size-4" />
            Create Order
          </Button>
        </div>
      ) : (
        <OrderTable
          orders={orders}
          onEdit={handleEdit}
          onDelete={setDeletingOrderId}
        />
      )}

      <OrderFormModal
        open={formOpen}
        onClose={handleCloseForm}
        editingOrder={editingOrder}
      />

      <DeleteOrderDialog
        orderId={deletingOrderId}
        onClose={() => setDeletingOrderId(null)}
      />
    </div>
  );
}
