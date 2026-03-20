import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
import { useDashboardStore } from '@/stores/dashboardStore';
import { useOrderStore } from '@/stores/orderStore';
import WidgetPalette from '@/components/features/dashboard/WidgetPalette';
import CanvasGrid from '@/components/features/dashboard/CanvasGrid';
import WidgetSettingsPanel from '@/components/features/dashboard/WidgetSettingsPanel';

export default function DashboardConfig() {
  const {
    draftWidgets,
    initDraft,
    removeDraftWidget,
    saveConfiguration,
  } = useDashboardStore();
  const { fetchOrders } = useOrderStore();
  const navigate = useNavigate();

  const [settingsWidgetId, setSettingsWidgetId] = useState<string | null>(null);
  const [deletingWidgetId, setDeletingWidgetId] = useState<string | null>(null);

  useEffect(() => {
    initDraft();
    fetchOrders();
  }, [initDraft, fetchOrders]);

  const handleSave = async () => {
    try {
      await saveConfiguration();
      toast.success('Dashboard configuration saved successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save dashboard configuration');
    }
  };

  const handleConfirmDelete = () => {
    if (deletingWidgetId) {
      removeDraftWidget(deletingWidgetId);
      if (settingsWidgetId === deletingWidgetId) {
        setSettingsWidgetId(null);
      }
      setDeletingWidgetId(null);
      toast.success('Widget removed');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:h-screen">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-base font-semibold text-foreground">
              Configure Dashboard
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {draftWidgets.length} widget{draftWidgets.length !== 1 ? 's' : ''} added
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="size-4" />
          Save Configuration
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <WidgetPalette />
        </div>
        <CanvasGrid
          onOpenSettings={setSettingsWidgetId}
          onDeleteWidget={setDeletingWidgetId}
        />
      </div>

      <WidgetSettingsPanel
        widgetId={settingsWidgetId}
        onClose={() => setSettingsWidgetId(null)}
      />

      <AlertDialog
        open={!!deletingWidgetId}
        onOpenChange={() => setDeletingWidgetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Widget</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this widget from the dashboard?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
