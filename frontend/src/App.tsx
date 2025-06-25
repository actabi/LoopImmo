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

useEffect(() => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  console.log('=== DEBUG CONNEXION BACKEND ===');
  console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
  console.log('Final API URL:', apiUrl);
  console.log('NODE_ENV:', import.meta.env.NODE_ENV);
  console.log('All env variables:', import.meta.env);
  
  // Test de base pour voir si l'URL est valide
  try {
    const url = new URL(apiUrl);
    console.log('✅ URL is valid:', {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname
    });
  } catch (error) {
    console.error('❌ Invalid URL:', error);
    return;
  }

  console.log('🚀 Starting fetch to:', apiUrl);
  
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('✅ Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.text(); // Utilisez .text() au lieu de .json() pour voir le contenu brut
    })
    .then((data) => {
      console.log('📦 Response data:', data);
      console.log('✅ Backend connection successful!');
    })
    .catch((error) => {
      console.error('❌ Backend connection failed:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: error.cause
      });
      
      // Tests supplémentaires pour diagnostiquer
      console.log('🔍 Additional diagnostics:');
      console.log('- Is online?', navigator.onLine);
      console.log('- User agent:', navigator.userAgent);
      console.log('- Current URL:', window.location.href);
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
