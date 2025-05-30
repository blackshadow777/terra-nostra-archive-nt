import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Index from './pages/Index';
import MigrantDetails from './pages/MigrantDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import AdminMigrants from './pages/AdminMigrants';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-terra-beige/5 to-terra-red/5">
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/migrant/:id" element={<MigrantDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/migrants" element={<AdminMigrants />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
