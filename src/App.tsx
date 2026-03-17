import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import DashboardConfig from './pages/DashboardConfig';
import CustomerOrders from './pages/CustomerOrders';

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/configure" element={<DashboardConfig />} />
          <Route path="/orders" element={<CustomerOrders />} />
        </Route>
      </Routes>
    </>
  );
}
