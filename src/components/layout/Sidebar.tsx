import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Customer Orders', icon: ShoppingCart },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-60 h-full bg-[hsl(222,47%,11%)] text-[hsl(210,40%,98%)] flex flex-col">
      <div className="px-6 py-5 border-b border-[hsl(217,33%,17%)]">
        <h1 className="text-base font-bold tracking-tight">Dashboard Builder</h1>
        <p className="text-[hsl(215,16%,60%)] text-xs mt-0.5">Analytics workspace</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.path === '/dashboard'
              ? location.pathname.startsWith('/dashboard')
              : location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[hsl(217,33%,17%)] text-[hsl(157,44%,54%)]'
                  : 'text-[hsl(215,16%,60%)] hover:text-[hsl(210,40%,98%)] hover:bg-[hsl(217,33%,17%)]/50'
              }`}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[hsl(217,33%,17%)]">
        <p className="text-[10px] text-[hsl(215,16%,45%)]">Halleyx</p>
      </div>
    </aside>
  );
}
