import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useOrderStore } from '@/stores/orderStore';

interface DeleteOrderDialogProps {
  orderId: string | null;
  onClose: () => void;
}

export default function DeleteOrderDialog({ orderId, onClose }: DeleteOrderDialogProps) {
  const deleteOrder = useOrderStore((s) => s.deleteOrder);

  const handleDelete = () => {
    if (orderId) {
      deleteOrder(orderId);
      toast.success('Order deleted successfully');
      onClose();
    }
  };

  return (
    <AlertDialog open={!!orderId} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Order</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this order? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
