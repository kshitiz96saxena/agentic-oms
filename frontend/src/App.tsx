import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load feature views for performance
const DashboardView = lazy(() => import('./features/orders/DashboardView'));
const InventoryView = lazy(() => import('./features/inventory/InventoryView'));
const SetupView = lazy(() => import('./features/setup/SetupView'))

function App() {
  return (
    <BrowserRouter>
      {/* Suspense fallback for the lazy-loaded components */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Initializing Agentic OMS...</p>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Index redirect to Dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<DashboardView />} />
            <Route path="inventory" element={<InventoryView />} />
            <Route path='setup' element={<SetupView />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
