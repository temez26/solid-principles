import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthGuard } from '../providers/AuthGuard';
import { AuthPage } from '../../pages/auth/AuthPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { TodosPage } from '../../pages/todos/TodosPage';
import { SettingsPage } from '../../pages/settings/SettingsPage';
import { Navbar } from '../../widgets/navbar';

const ProtectedLayout: React.FC = () => (
  <AuthGuard>
    <Navbar />
    <Outlet />
  </AuthGuard>
);

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};