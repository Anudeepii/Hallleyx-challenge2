import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 bg-[hsl(222,47%,11%)] border-b border-[hsl(217,33%,17%)]">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="size-5 text-white" />
        </button>
        <span className="text-white font-semibold ml-3 text-sm">
          Dashboard Builder
        </span>
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-60 bg-[hsl(222,47%,11%)] border-r-0">
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
