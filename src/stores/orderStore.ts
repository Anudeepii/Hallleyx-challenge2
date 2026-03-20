import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { CustomerOrder } from '@/types/order';

interface OrderState {
  orders: CustomerOrder[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (
    order: Omit<CustomerOrder, 'id' | 'customerId' | 'orderId' | 'orderDate'>
  ) => Promise<void>;
  updateOrder: (id: string, updates: Partial<CustomerOrder>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  clearOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('customer_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) throw error;

      const orders: CustomerOrder[] = (data || []).map((row) => ({
        id: row.id,
        customerId: row.customer_id,
        orderId: row.order_id,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        phone: row.phone,
        streetAddress: row.street_address,
        city: row.city,
        state: row.state,
        postalCode: row.postal_code,
        country: row.country,
        product: row.product,
        quantity: row.quantity,
        unitPrice: Number(row.unit_price),
        totalAmount: Number(row.total_amount),
        status: row.status,
        createdBy: row.created_by,
        orderDate: row.order_date,
      }));

      set({ orders, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const { data: maxCustomer } = await supabase
        .from('customer_orders')
        .select('customer_id')
        .order('customer_id', { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: maxOrder } = await supabase
        .from('customer_orders')
        .select('order_id')
        .order('order_id', { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextCustomerNum = maxCustomer
        ? parseInt(maxCustomer.customer_id.split('-')[1]) + 1
        : 1;
      const nextOrderNum = maxOrder
        ? parseInt(maxOrder.order_id.split('-')[1]) + 1
        : 1;

      const customerId = `CUS-${String(nextCustomerNum).padStart(3, '0')}`;
      const orderId = `ORD-${String(nextOrderNum).padStart(3, '0')}`;
      const totalAmount = orderData.quantity * orderData.unitPrice;

      const { error } = await supabase.from('customer_orders').insert({
        customer_id: customerId,
        order_id: orderId,
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        street_address: orderData.streetAddress,
        city: orderData.city,
        state: orderData.state,
        postal_code: orderData.postalCode,
        country: orderData.country,
        product: orderData.product,
        quantity: orderData.quantity,
        unit_price: orderData.unitPrice,
        total_amount: totalAmount,
        status: orderData.status,
        created_by: orderData.createdBy,
      });

      if (error) throw error;

      await get().fetchOrders();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateOrder: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updateData: any = {};

      if (updates.firstName !== undefined) updateData.first_name = updates.firstName;
      if (updates.lastName !== undefined) updateData.last_name = updates.lastName;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.phone !== undefined) updateData.phone = updates.phone;
      if (updates.streetAddress !== undefined) updateData.street_address = updates.streetAddress;
      if (updates.city !== undefined) updateData.city = updates.city;
      if (updates.state !== undefined) updateData.state = updates.state;
      if (updates.postalCode !== undefined) updateData.postal_code = updates.postalCode;
      if (updates.country !== undefined) updateData.country = updates.country;
      if (updates.product !== undefined) updateData.product = updates.product;
      if (updates.quantity !== undefined) updateData.quantity = updates.quantity;
      if (updates.unitPrice !== undefined) updateData.unit_price = updates.unitPrice;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.createdBy !== undefined) updateData.created_by = updates.createdBy;

      if (updates.quantity !== undefined || updates.unitPrice !== undefined) {
        const currentOrder = get().orders.find((o) => o.id === id);
        if (currentOrder) {
          const newQuantity = updates.quantity ?? currentOrder.quantity;
          const newUnitPrice = updates.unitPrice ?? currentOrder.unitPrice;
          updateData.total_amount = newQuantity * newUnitPrice;
        }
      }

      const { error } = await supabase
        .from('customer_orders')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      await get().fetchOrders();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('customer_orders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await get().fetchOrders();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearOrders: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('customer_orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;

      set({ orders: [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
