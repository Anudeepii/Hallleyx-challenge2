export interface CustomerOrder {
  id: string;
  customerId: string;
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  product: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  createdBy: string;
  orderDate: string;
}
