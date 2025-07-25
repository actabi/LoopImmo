import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LaunchPage } from './pages/LaunchPage';
import { LandingPage } from './pages/LandingPage';
import { LaunchPageV2 } from './pages/LaunchPageV2';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AcheterPage } from './pages/AcheterPage';
import { apiUrl } from './utils/api';
import { VendrePage } from './pages/VendrePage';
import { LooperPage } from './pages/LooperPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { UnifiedDashboard } from './pages/dashboard/UnifiedDashboard';
import { RolesManagement } from './pages/profile/RolesManagement';
import { PropertiesPage } from './pages/seller/PropertiesPage';
import { VisitsPage } from './pages/seller/VisitsPage';
import { OffersPage } from './pages/seller/OffersPage';
import { MessagesPage } from './pages/seller/MessagesPage';
import { SettingsPage } from './pages/seller/SettingsPage';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  // Lire la variable d'environnement pour déterminer quelle page afficher
  const isLaunchMode = import.meta.env.VITE_LAUNCH_MODE === 'true';
  const isV2Mode = import.meta.env.VITE_V2_MODE === 'true';

useEffect(() => {
  // Preload backend connection without exposing environment details in the console
  fetch(apiUrl('/api/users'), { method: 'GET' }).catch(() => {
    // Silently ignore connection errors
  });
}, []);

  return (
    <AuthProvider>
      <Routes>
          {/* Page d'accueil - bascule selon le mode */}
          <Route path="/" element={
            isLaunchMode ? <LaunchPage /> : 
            isV2Mode ? <LaunchPageV2 /> : 
            <LandingPage />
          } />
          
          {/* Route dédiée pour tester la V2 */}
          <Route path="/v2" element={<LaunchPageV2 />} />
          
          {/* Autres pages publiques */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/acheter" element={<AcheterPage />} />
          <Route path="/vendre" element={<VendrePage />} />
          <Route path="/looper" element={<LooperPage />} />
          <Route path="/bien/:id" element={<PropertyDetailPage />} />
          
          {/* Pages protégées avec Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<UnifiedDashboard />} />
            <Route path="/profile" element={<RolesManagement />} />
            <Route path="/mes-biens" element={<PropertiesPage />} />
            <Route path="/visites" element={<VisitsPage />} />
            <Route path="/offres" element={<OffersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/parametres" element={<SettingsPage />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
