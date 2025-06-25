import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from './dashboard/DashboardLayout';

export const Layout: React.FC = () => {
  const { activeRole } = useAuth();
  return (
    <DashboardLayout role={activeRole}>
      <Outlet />
    </DashboardLayout>
  );
};
