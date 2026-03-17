import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Sparkles } from 'lucide-react';

export default function EmptyDashboard() {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center max-w-lg">
        <div className="relative mx-auto w-48 h-48 mb-8">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-6" />
          <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3" />
          <div className="relative bg-card rounded-2xl border border-border shadow-sm h-full flex flex-col items-center justify-center gap-3 p-6">
            <LayoutDashboard className="size-12 text-primary/60" />
            <div className="flex gap-2">
              <div className="w-8 h-6 rounded bg-primary/20" />
              <div className="w-8 h-6 rounded bg-primary/15" />
              <div className="w-8 h-6 rounded bg-primary/10" />
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-4 rounded bg-muted" />
              <div className="w-8 h-4 rounded bg-muted" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Build Your Dashboard
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-pretty">
          Create a personalized analytics dashboard by adding charts, tables, and KPI
          cards that visualize your customer order data.
        </p>

        <Link to="/dashboard/configure">
          <Button size="lg" className="gap-2 px-8">
            <Sparkles className="size-4" />
            Configure Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
