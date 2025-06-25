import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Home, Search, Users, TrendingUp, Euro, Calendar, 
  Heart, Eye, Trophy, ArrowRight, Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '../../utils/calculations';
import { 
  mockPropertyStats, 
  mockAmbassadorStats, 
  mockSavedSearches,
  mockUpcomingVisits 
} from '../../data/mockData';

export const UnifiedDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const hasRole = (role: string) => user.roles.includes(role as any);

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour {user.firstName} 👋
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de tous vos rôles actifs
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <Euro className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(15600)}
            </p>
            <p className="text-sm text-gray-600">Revenus totaux</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">+23%</p>
            <p className="text-sm text-gray-600">Performance ce mois</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Actions en attente</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <Trophy className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">847</p>
            <p className="text-sm text-gray-600">Score global</p>
          </Card>
        </div>

        {/* Role Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Seller Card */}
          {hasRole('seller') && (
            <Card className="overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Home className="w-8 h-8" />
                    <h2 className="text-xl font-semibold">Mode Vendeur</h2>
                  </div>
                  <Link to="/seller/dashboard">
                    <Button size="sm" variant="secondary">
                      Voir détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">1</p>
                    <p className="text-blue-100">Bien en vente</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-blue-100">Visites cette semaine</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Vues totales</span>
                  </div>
                  <span className="font-semibold">{mockPropertyStats.views}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Favoris</span>
                  </div>
                  <span className="font-semibold">{mockPropertyStats.favorites}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Action requise
                  </p>
                  <Button size="sm" className="w-full">
                    Valider les photos du bien
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Buyer Card */}
          {hasRole('buyer') && (
            <Card className="overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Search className="w-8 h-8" />
                    <h2 className="text-xl font-semibold">Mode Acheteur</h2>
                  </div>
                  <Link to="/buyer/dashboard">
                    <Button size="sm" variant="secondary">
                      Voir détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">{mockSavedSearches.length}</p>
                    <p className="text-green-100">Recherches actives</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-green-100">Biens favoris</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Visites prévues</span>
                  </div>
                  <span className="font-semibold">{mockUpcomingVisits.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Euro className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Budget max</span>
                  </div>
                  <span className="font-semibold">{formatPrice(350000)}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Nouveaux biens
                  </p>
                  <Button size="sm" className="w-full">
                    3 nouveaux biens correspondent
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Ambassador Card */}
          {hasRole('ambassador') && (
            <Card className="overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8" />
                    <h2 className="text-xl font-semibold">Mode Ambassadeur</h2>
                  </div>
                  <Link to="/ambassador/dashboard">
                    <Button size="sm" variant="secondary">
                      Voir détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">{mockAmbassadorStats.score}/5</p>
                    <p className="text-purple-100">Score SMART</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{formatPrice(mockAmbassadorStats.monthlyEarnings)}</p>
                    <p className="text-purple-100">Ce mois</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Leads actifs</span>
                  </div>
                  <span className="font-semibold">{mockAmbassadorStats.activeLeads}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Niveau</span>
                  </div>
                  <span className="font-semibold">{mockAmbassadorStats.level}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Nouveau lead
                  </p>
                  <Button size="sm" className="w-full">
                    Marie Dubois - 3P République
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Add Role Card */}
          {user.roles.length < 3 && (
            <Card className="overflow-hidden border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors">
              <Link to="/profil/roles" className="block p-12 text-center">
                <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ajouter un rôle
                </h3>
                <p className="text-sm text-gray-600">
                  Développez votre activité en ajoutant de nouveaux rôles
                </p>
              </Link>
            </Card>
          )}
        </div>

        {/* Cross-Role Suggestions */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Suggestions personnalisées
            </h3>
            
            <div className="space-y-4">
              {!hasRole('ambassador') && hasRole('buyer') && (
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Devenez ambassadeur dans le 7ème
                      </p>
                      <p className="text-sm text-gray-600">
                        Vous visitez souvent ce quartier, gagnez des commissions
                      </p>
                    </div>
                  </div>
                  <Button size="sm">
                    En savoir plus
                  </Button>
                </div>
              )}
              
              {hasRole('seller') && !hasRole('buyer') && (
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Trouvez votre prochain bien
                      </p>
                      <p className="text-sm text-gray-600">
                        Votre vente avance bien, anticipez votre prochain achat
                      </p>
                    </div>
                  </div>
                  <Button size="sm">
                    Commencer
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
