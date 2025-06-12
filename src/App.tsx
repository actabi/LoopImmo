import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import des pages principales
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { AcheterPage } from './pages/AcheterPage';
import { VendrePage } from './pages/VendrePage';
import { AmbassadeurPage } from './pages/AmbassadeurPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { EstimationPage } from './pages/EstimationPage';

// Import des dashboards principaux
import { SellerDashboard } from './pages/seller/SellerDashboard';
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { AmbassadorDashboard } from './pages/ambassador/AmbassadorDashboard';
import { TrustManagerDashboard } from './pages/trust-manager/TrustManagerDashboard';

// Import des pages Buyer
import { BuyerSearch } from './pages/buyer/BuyerSearch';
import { BuyerFavorites } from './pages/buyer/BuyerFavorites';
import { BuyerVisits } from './pages/buyer/BuyerVisits';
import { BuyerOffers } from './pages/buyer/BuyerOffers';
import { BuyerDossier } from './pages/buyer/BuyerDossier';
import { BuyerFinancing } from './pages/buyer/BuyerFinancing';
import { BuyerSubscription } from './pages/buyer/BuyerSubscription';

// Import des pages Profile
import { RolesManagement } from './pages/profile/RolesManagement';

// Import des pages Ambassador
import { OnboardingPage as AmbassadorOnboarding } from './pages/ambassador/OnboardingPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<SignupPage />} />
        <Route path="/acheter" element={<AcheterPage />} />
        <Route path="/vendre" element={<VendrePage />} />
        <Route path="/ambassadeur" element={<AmbassadeurPage />} />
        <Route path="/bien/:id" element={<PropertyDetailPage />} />
        <Route path="/estimer" element={<EstimationPage />} />
        
        {/* Routes Profile */}
        <Route path="/profile/roles" element={<RolesManagement />} />
        
        {/* Routes Vendeur - Route principale avec sous-routes gérées dans SellerDashboard */}
        <Route path="/seller/*" element={<SellerDashboard />} />

        {/* Routes Acheteur */}
        <Route path="/buyer">
          <Route index element={<Navigate to="/buyer/dashboard" replace />} />
          <Route path="dashboard" element={<BuyerDashboard />} />
          <Route path="search" element={<BuyerSearch />} />
          <Route path="favorites" element={<BuyerFavorites />} />
          <Route path="visits" element={<BuyerVisits />} />
          <Route path="offers" element={<BuyerOffers />} />
          <Route path="dossier" element={<BuyerDossier />} />
          <Route path="financing" element={<BuyerFinancing />} />
          <Route path="subscription" element={<BuyerSubscription />} />
        </Route>

        {/* Routes Ambassadeur - Route principale avec sous-routes gérées dans AmbassadorDashboard */}
        <Route path="/ambassador/*" element={<AmbassadorDashboard />} />
        <Route path="/ambassador/onboarding" element={<AmbassadorOnboarding />} />

        {/* Route Trust Manager */}
        <Route path="/trust-manager/*" element={<TrustManagerDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
