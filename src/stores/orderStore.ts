import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CustomerOrder } from '@/types/order';

interface OrderState {
  orders: CustomerOrder[];
  nextCustomerNum: number;
  nextOrderNum: number;
  addOrder: (
    order: Omit<CustomerOrder, 'id' | 'customerId' | 'orderId' | 'orderDate'>
  ) => void;
  updateOrder: (id: string, updates: Partial<CustomerOrder>) => void;
  deleteOrder: (id: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      nextCustomerNum: 1,
      nextOrderNum: 1,

      addOrder: (orderData) => {
        const state = get();
        const newOrder: CustomerOrder = {
          ...orderData,
          id: crypto.randomUUID(),
          customerId: `CUS-${String(state.nextCustomerNum).padStart(3, '0')}`,
          orderId: `ORD-${String(state.nextOrderNum).padStart(3, '0')}`,
          orderDate: new Date().toISOString(),
          totalAmount: orderData.quantity * orderData.unitPrice,
        };
        set({
          orders: [...state.orders, newOrder],
          nextCustomerNum: state.nextCustomerNum + 1,
          nextOrderNum: state.nextOrderNum + 1,
        });
      },

      updateOrder: (id, updates) => {
        set({
          orders: get().orders.map((o) => {
            if (o.id !== id) return o;
            const updated = { ...o, ...updates };
            updated.totalAmount = updated.quantity * updated.unitPrice;
            return updated;
          }),
        });
      },

      deleteOrder: (id) => {
        set({ orders: get().orders.filter((o) => o.id !== id) });
      },

      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    { name: 'customer-orders-store' }
  )
);
