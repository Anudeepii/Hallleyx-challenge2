import type { CustomerOrder } from '@/types/order';

export function getFieldValue(order: CustomerOrder, field: string): string | number {
  switch (field) {
    case 'Customer ID':
      return order.customerId;
    case 'Customer name':
      return `${order.firstName} ${order.lastName}`;
    case 'Email id':
      return order.email;
    case 'Phone number':
      return order.phone;
    case 'Address':
      return `${order.streetAddress}, ${order.city}, ${order.state} ${order.postalCode}`;
    case 'Order ID':
      return order.orderId;
    case 'Order date':
      return new Date(order.orderDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    case 'Product':
      return order.product;
    case 'Quantity':
      return order.quantity;
    case 'Unit price':
      return order.unitPrice;
    case 'Total amount':
      return order.totalAmount;
    case 'Status':
      return order.status;
    case 'Created by':
      return order.createdBy;
    case 'Duration': {
      const days = Math.floor(
        (Date.now() - new Date(order.orderDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      return Math.max(0, days);
    }
    default:
      return '';
  }
}

export function computeKPIValue(
  orders: CustomerOrder[],
  metric: string,
  aggregation: string
): number {
  if (orders.length === 0) return 0;
  if (aggregation === 'Count') return orders.length;

  const values = orders
    .map((o) => Number(getFieldValue(o, metric)))
    .filter((n) => !isNaN(n));

  if (values.length === 0) return 0;

  if (aggregation === 'Sum') return values.reduce((a, b) => a + b, 0);
  if (aggregation === 'Average') return values.reduce((a, b) => a + b, 0) / values.length;

  return 0;
}

export function computeChartData(
  orders: CustomerOrder[],
  xField: string,
  yField: string
): { name: string; value: number }[] {
  if (orders.length === 0) return [];

  const groups: Record<string, number[]> = {};

  orders.forEach((order) => {
    const xVal = String(getFieldValue(order, xField));
    const yVal = Number(getFieldValue(order, yField));
    if (!groups[xVal]) groups[xVal] = [];
    groups[xVal].push(isNaN(yVal) ? 1 : yVal);
  });

  return Object.entries(groups).map(([name, values]) => ({
    name,
    value: values.reduce((a, b) => a + b, 0),
  }));
}

export function computeScatterData(
  orders: CustomerOrder[],
  xField: string,
  yField: string
): { x: number; y: number; name: string }[] {
  if (orders.length === 0) return [];

  return orders.map((order, idx) => ({
    x: Number(getFieldValue(order, xField)) || idx,
    y: Number(getFieldValue(order, yField)) || 0,
    name: `Order ${idx + 1}`,
  }));
}

export function computePieData(
  orders: CustomerOrder[],
  field: string
): { name: string; value: number }[] {
  if (orders.length === 0) return [];

  const counts: Record<string, number> = {};
  orders.forEach((order) => {
    const val = String(getFieldValue(order, field));
    counts[val] = (counts[val] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function filterOrdersByDate(
  orders: CustomerOrder[],
  filter: string
): CustomerOrder[] {
  if (filter === 'all') return orders;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const msPerDay = 24 * 60 * 60 * 1000;
  let cutoff: Date;

  switch (filter) {
    case 'today':
      cutoff = todayStart;
      break;
    case '7days':
      cutoff = new Date(todayStart.getTime() - 7 * msPerDay);
      break;
    case '30days':
      cutoff = new Date(todayStart.getTime() - 30 * msPerDay);
      break;
    case '90days':
      cutoff = new Date(todayStart.getTime() - 90 * msPerDay);
      break;
    default:
      return orders;
  }

  return orders.filter((o) => new Date(o.orderDate) >= cutoff);
}
