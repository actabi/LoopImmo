import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LaunchPage } from './pages/LaunchPage';
import { LandingPage } from './pages/LandingPage';
import { LaunchPageV2 } from './pages/LaunchPageV2';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AcheterPage } from './pages/AcheterPage';
import { VendrePage } from './pages/VendrePage';
import { AmbassadeurPage } from './pages/AmbassadeurPage';
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

    // Logs pour débugger en production
  console.log('Variables env:', {
    VITE_LAUNCH_MODE: import.meta.env.VITE_LAUNCH_MODE,
    VITE_V2_MODE: import.meta.env.VITE_V2_MODE,
    isLaunchMode,
    isV2Mode
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/';
      fetch(apiUrl)
        .then((res) => {
          console.debug('Backend connection success', res.status);
        })
        .catch((err) => {
          console.error('Backend connection failed', err);
        });
    }
  }, []);

  return (
    <AuthProvider>
      <Routes>
              <div style={{position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', padding: '5px', zIndex: 9999}}>
        Debug: Launch={isLaunchMode ? 'true' : 'false'}, V2={isV2Mode ? 'true' : 'false'}
      </div>
      
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
          <Route path="/ambassadeur" element={<AmbassadeurPage />} />
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
