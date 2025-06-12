import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, Building, Calendar, MessageSquare, FileText,
  Camera, BarChart3, CreditCard, LogOut, Menu, X,
  Search, Heart, Eye, Target, DollarSign, Users,
  Briefcase, Award, Settings, HelpCircle, Zap, BookOpen,
  FileCheck, Archive, Shield
} from 'lucide-react';
import { RoleSelector } from '../layout/RoleSelector';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'buyer' | 'seller' | 'ambassador' | 'trust_manager';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = {
    buyer: [
      { name: 'Tableau de bord', href: '/buyer/dashboard', icon: Home },
      { name: 'Recherche', href: '/buyer/search', icon: Search },
      { name: 'Favoris', href: '/buyer/favorites', icon: Heart },
      { name: 'Visites', href: '/buyer/visits', icon: Calendar },
      { name: 'Offres', href: '/buyer/offers', icon: Target },
      { name: 'Mon dossier', href: '/buyer/dossier', icon: FileText },
      { name: 'Financement', href: '/buyer/financing', icon: DollarSign },
      { name: 'Abonnement', href: '/buyer/subscription', icon: CreditCard },
    ],
    seller: [
      { name: 'Tableau de bord', href: '/seller/dashboard', icon: Home },
      { name: 'Mes biens', href: '/seller/properties', icon: Building },
      { name: 'Visites', href: '/seller/visits', icon: Calendar },
      { name: 'Offres reçues', href: '/seller/offers', icon: Target },
      { name: 'Messages', href: '/seller/messages', icon: MessageSquare },
      { name: 'Analyses', href: '/seller/analytics', icon: BarChart3 },
      { name: 'Paiements', href: '/seller/payments', icon: CreditCard },
    ],
    ambassador: [
      { name: 'Tableau de bord', href: '/ambassador/dashboard', icon: Home },
      { name: 'Mes annonces', href: '/ambassador/properties', icon: Building },
      { name: 'Mes clients', href: '/ambassador/leads', icon: Users },
      { name: 'Visites', href: '/ambassador/visits', icon: Calendar },
      { name: 'Commissions', href: '/ambassador/commissions', icon: DollarSign },
      { name: 'Formation', href: '/ambassador/training', icon: BookOpen },
    ],
    trust_manager: [
      { name: 'Dashboard', href: '/trust-manager/home', icon: Home },
      { name: 'Tâches', href: '/trust-manager/tasks', icon: Calendar },
      { name: 'Validation', href: '/trust-manager/validation', icon: FileCheck },
      { name: 'Qualité', href: '/trust-manager/quality-control', icon: Camera },
      { name: 'Leads', href: '/trust-manager/lead-qualification', icon: Users },
      { name: 'Contrats', href: '/trust-manager/contracts', icon: FileText },
      { name: 'Notaire', href: '/trust-manager/notary', icon: Archive },
      { name: 'Conformité', href: '/trust-manager/compliance', icon: Shield },
    ],
  };

  const currentNavigation = navigation[role];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              LoopImmo
            </Link>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {currentNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${
                    isActive ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            {/* Role Selector */}
            {user && user.roles.length > 1 && (
              <div className="mb-4">
                <RoleSelector />
              </div>
            )}

            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              {role !== 'ambassador' && (
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Settings className="w-5 h-5 mr-3 text-gray-400" />
                  Paramètres
                </Link>
              )}
							
					{role === 'ambassador' && (
					  <Link
					    to="/ambassador/settings"
					    className="flex items-center px-3 py-2 mb-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
					  >
					    <Settings className="w-5 h-5 mr-3 text-gray-400" />
					    Paramètres
					  </Link>
					)}
              <Link
                to="/help"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
                Aide
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5 mr-3 text-gray-400" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-primary-600">
            LoopImmo
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-50"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm bg-white">
              <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                <span className="text-xl font-bold text-primary-600">LoopImmo</span>
              </div>
              
              <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {currentNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${
                        isActive ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-200">
                {/* Role Selector for mobile */}
                {user && user.roles.length > 1 && (
                  <div className="mb-4">
                    <RoleSelector />
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <LogOut className="w-5 h-5 mr-3 text-gray-400" />
                  Déconnexion
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
