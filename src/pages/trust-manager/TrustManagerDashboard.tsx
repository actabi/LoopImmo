import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { TrustManagerHome } from './TrustManagerHome';
import { PropertyValidation } from './PropertyValidation';
import { QualityControl } from './QualityControl';
import { LeadQualification } from './LeadQualification';
import { ContractReview } from './ContractReview';
import { NotaryCoordination } from './NotaryCoordination';
import { ComplianceCenter } from './ComplianceCenter';
import { TasksOverview } from './TasksOverview';

export const TrustManagerDashboard: React.FC = () => {
  return (
    <DashboardLayout role="trust_manager">
      <Routes>
        <Route index element={<Navigate to="/trust-manager/dashboard" replace />} />
        <Route path="dashboard" element={<TrustManagerHome />} />
        <Route path="tasks" element={<TasksOverview />} />
        <Route path="validation" element={<PropertyValidation />} />
        <Route path="quality-control" element={<QualityControl />} />
        <Route path="lead-qualification" element={<LeadQualification />} />
        <Route path="contracts" element={<ContractReview />} />
        <Route path="notary" element={<NotaryCoordination />} />
        <Route path="compliance" element={<ComplianceCenter />} />
      </Routes>
    </DashboardLayout>
  );
};
