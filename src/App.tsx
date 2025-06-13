import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LaunchPage } from './pages/LaunchPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BuyPage } from './pages/BuyPage';
import { SellPage } from './pages/SellPage';
import { AmbassadorPage } from './pages/AmbassadorPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { VisitsPage } from './pages/VisitsPage';
import { OffersPage } from './pages/OffersPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  // Lire la variable d'environnement pour déterminer quelle page afficher
  const isLaunchMode = import.meta.env.VITE_LAUNCH_MODE === 'true';

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Page d'accueil - bascule selon le mode */}
          <Route path="/" element={isLaunchMode ? <LaunchPage /> : <LandingPage />} />
          
          {/* Autres pages publiques */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/acheter" element={<BuyPage />} />
          <Route path="/vendre" element={<SellPage />} />
          <Route path="/ambassadeur" element={<AmbassadorPage />} />
          <Route path="/bien/:id" element={<PropertyDetailPage />} />
          
          {/* Pages protégées avec Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mes-biens" element={<PropertiesPage />} />
            <Route path="/visites" element={<VisitsPage />} />
            <Route path="/offres" element={<OffersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/parametres" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
