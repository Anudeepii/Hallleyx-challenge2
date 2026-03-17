import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useOrderStore } from '@/stores/orderStore';
import { COUNTRIES, PRODUCTS, STATUSES, CREATED_BY_OPTIONS } from '@/constants/config';
import type { CustomerOrder } from '@/types/order';

interface OrderFormModalProps {
  open: boolean;
  onClose: () => void;
  editingOrder: CustomerOrder | null;
}

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  product: '',
  quantity: 1,
  unitPrice: 0,
  status: 'Pending',
  createdBy: '',
};

type FormData = typeof emptyForm;

const REQUIRED_FIELDS: (keyof FormData)[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'streetAddress',
  'city',
  'state',
  'postalCode',
  'country',
  'product',
  'createdBy',
];

export default function OrderFormModal({ open, onClose, editingOrder }: OrderFormModalProps) {
  const { addOrder, updateOrder } = useOrderStore();
  const [formData, setFormData] = useState<FormData>({ ...emptyForm });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      if (editingOrder) {
        setFormData({
          firstName: editingOrder.firstName,
          lastName: editingOrder.lastName,
          email: editingOrder.email,
          phone: editingOrder.phone,
          streetAddress: editingOrder.streetAddress,
          city: editingOrder.city,
          state: editingOrder.state,
          postalCode: editingOrder.postalCode,
          country: editingOrder.country,
          product: editingOrder.product,
          quantity: editingOrder.quantity,
          unitPrice: editingOrder.unitPrice,
          status: editingOrder.status,
          createdBy: editingOrder.createdBy,
        });
      } else {
        setFormData({ ...emptyForm });
      }
      setErrors({});
    }
  }, [open, editingOrder]);

  const totalAmount = useMemo(
    () => formData.quantity * formData.unitPrice,
    [formData.quantity, formData.unitPrice]
  );

  const set = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    REQUIRED_FIELDS.forEach((f) => {
      if (!formData[f] || String(formData[f]).trim() === '') {
        newErrors[f] = 'Please fill the field';
      }
    });
    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = 'Please fill the field';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editingOrder) {
      updateOrder(editingOrder.id, { ...formData, totalAmount });
      toast.success('Order updated successfully');
    } else {
      addOrder({ ...formData, totalAmount } as any);
      toast.success('Order created successfully');
    }
    onClose();
  };

  const fieldClass = (field: string) =>
    errors[field]
      ? 'border-destructive focus:ring-destructive'
      : '';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingOrder ? 'Edit Order' : 'Create Order'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Customer Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First name *" error={errors.firstName}>
                <Input
                  value={formData.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                  className={fieldClass('firstName')}
                />
              </Field>
              <Field label="Last name *" error={errors.lastName}>
                <Input
                  value={formData.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                  className={fieldClass('lastName')}
                />
              </Field>
              <Field label="Email id *" error={errors.email}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={fieldClass('email')}
                />
              </Field>
              <Field label="Phone number *" error={errors.phone}>
                <Input
                  value={formData.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className={fieldClass('phone')}
                />
              </Field>
              <Field label="Street Address *" error={errors.streetAddress}>
                <Input
                  value={formData.streetAddress}
                  onChange={(e) => set('streetAddress', e.target.value)}
                  className={fieldClass('streetAddress')}
                />
              </Field>
              <Field label="City *" error={errors.city}>
                <Input
                  value={formData.city}
                  onChange={(e) => set('city', e.target.value)}
                  className={fieldClass('city')}
                />
              </Field>
              <Field label="State / Province *" error={errors.state}>
                <Input
                  value={formData.state}
                  onChange={(e) => set('state', e.target.value)}
                  className={fieldClass('state')}
                />
              </Field>
              <Field label="Postal code *" error={errors.postalCode}>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => set('postalCode', e.target.value)}
                  className={fieldClass('postalCode')}
                />
              </Field>
              <Field label="Country *" error={errors.country}>
                <select
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.country ? 'border-destructive focus:ring-destructive' : 'border-input'
                  }`}
                  value={formData.country}
                  onChange={(e) => set('country', e.target.value)}
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <Separator />

          {/* Order Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Order Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Choose product *" error={errors.product}>
                <select
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.product ? 'border-destructive focus:ring-destructive' : 'border-input'
                  }`}
                  value={formData.product}
                  onChange={(e) => set('product', e.target.value)}
                >
                  <option value="">Select product</option>
                  {PRODUCTS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>

              <Field label="Quantity *">
                <Input
                  type="number"
                  min={1}
                  value={formData.quantity}
                  onChange={(e) =>
                    set('quantity', Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </Field>

              <Field label="Unit price *" error={errors.unitPrice}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={formData.unitPrice || ''}
                    onChange={(e) =>
                      set('unitPrice', parseFloat(e.target.value) || 0)
                    }
                    className={`pl-7 ${fieldClass('unitPrice')}`}
                  />
                </div>
              </Field>

              <Field label="Total amount">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    readOnly
                    value={totalAmount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    className="pl-7 bg-muted/50"
                  />
                </div>
              </Field>

              <Field label="Status *">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.status}
                  onChange={(e) => set('status', e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <Field label="Created by *" error={errors.createdBy}>
                <select
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.createdBy ? 'border-destructive focus:ring-destructive' : 'border-input'
                  }`}
                  value={formData.createdBy}
                  onChange={(e) => set('createdBy', e.target.value)}
                >
                  <option value="">Select person</option>
                  {CREATED_BY_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editingOrder ? 'Save Changes' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="size-1 rounded-full bg-destructive inline-block" />
          {error}
        </p>
      )}
    </div>
  );
}
