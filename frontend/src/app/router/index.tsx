// filepath: src/app/router/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { TodosPage } from '../../pages/todos/TodosPage';
import { SettingsPage } from '../../pages/settings/SettingsPage';
import { Navbar } from '../../widgets/navbar';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};