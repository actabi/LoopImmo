import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { 
  Building, TrendingUp, Calendar, Eye, Target, FileText, 
  Camera, CreditCard, Plus, ArrowRight, AlertCircle, CheckCircle,
  Clock, Users, Home, MapPin, Euro, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import des pages existantes uniquement
import { PropertiesPage } from './PropertiesPage';
import { VisitsPage } from './VisitsPage';
import { OffersPage } from './OffersPage';
import { MessagesPage } from './MessagesPage';
import { AnalyticsPage } from './AnalyticsPage';
import { PaymentsPage } from './PaymentsPage';

// Composant pour la page d'accueil du dashboard
const SellerDashboardHome: React.FC = () => {
  // Données simulées pour le tableau de bord
  const stats = {
    activeProperties: 3,
    totalViews: 1247,
    scheduledVisits: 8,
    activeOffers: 2
  };

  const recentActivities = [
    {
      id: 1,
      type: 'view',
      property: 'Appartement T3 - Lyon 6èmes',
      message: 'Vue par Marie D.',
      time: 'Il y a 2 heures',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'visit',
      property: 'Maison 5 pièces - Écully',
      message: 'Visite confirmée pour demain 14h',
      time: 'Il y a 5 heures',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'offer',
      property: 'Studio - Lyon 3ème',
      message: 'Nouvelle offre reçue: 185 000€',
      time: 'Hier',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  const properties = [
    {
      id: 1,
      title: 'Appartement T3 - Lyon 6ème',
      price: '320 000€',
      status: 'active',
      views: 456,
      visits: 3,
      offers: 1,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Maison 5 pièces - Écully',
      price: '650 000€',
      status: 'active',
      views: 623,
      visits: 4,
      offers: 0,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Studio - Lyon 3ème',
      price: '190 000€',
      status: 'negotiation',
      views: 168,
      visits: 1,
      offers: 1,
      image: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingVisits = [
    {
      id: 1,
      property: 'Maison 5 pièces - Écully',
      visitor: 'Pierre et Marie Dubois',
      date: 'Demain',
      time: '14h00',
      type: 'Première visite'
    },
    {
      id: 2,
      property: 'Appartement T3 - Lyon 6ème',
      visitor: 'Sophie Martin',
      date: 'Jeudi',
      time: '10h30',
      type: 'Contre-visite'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec message de bienvenue */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour Pierre
        </h1>
        <p className="text-gray-600">
          Voici un aperçu de l'activité de vos biens immobiliers.
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+0%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.activeProperties}</h3>
          <p className="text-gray-600 text-sm mt-1">Biens actifs</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalViews}</h3>
          <p className="text-gray-600 text-sm mt-1">Vues ce mois</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+3</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.scheduledVisits}</h3>
          <p className="text-gray-600 text-sm mt-1">Visites prévues</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-orange-600 font-medium">Nouveau</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.activeOffers}</h3>
          <p className="text-gray-600 text-sm mt-1">Offres actives</p>
        </div>
      </div>

      {/* Alertes et notifications */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Optimisez vos annonces pour plus de visibilité
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Ajoutez des photos professionnelles et une visite virtuelle pour augmenter vos chances de vendre rapidement.
            </p>
            <Link to="/seller/analytics" className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Voir mes statistiques →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activité récente */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mes biens */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Mes biens</h2>
                <Link 
                  to="/seller/properties" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir tout
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {properties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{property.title}</h3>
                          <p className="text-lg font-bold text-gray-900 mt-1">{property.price}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          property.status === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {property.status === 'active' ? 'Actif' : 'En négociation'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {property.views} vues
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {property.visits} visites
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {property.offers} offre{property.offers > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100">
              <Link 
                to="/seller/properties"
                className="flex items-center justify-center gap-2 w-full py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Ajouter un bien
              </Link>
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-gray-50`}>
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.property}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prochaines visites */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Prochaines visites</h2>
                <Link 
                  to="/seller/visits" 
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Voir tout
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{visit.property}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {visit.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{visit.visitor}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{visit.date} à {visit.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <Link 
                to="/seller/properties"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Ajouter un bien</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link 
                to="/seller/analytics"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Voir mes statistiques</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link 
                to="/seller/messages"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Mes messages</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Conseils */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-2">
              💡 Conseil du jour
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Les biens avec des photos professionnelles se vendent 32% plus rapidement. 
              Pensez à faire appel à notre photographe partenaire !
            </p>
            <Link to="/seller/analytics" className="text-sm text-purple-600 font-medium hover:text-purple-700">
              En savoir plus →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SellerDashboard: React.FC = () => {
  return (
    <DashboardLayout role="seller">
      <Routes>
        <Route index element={<Navigate to="/seller/dashboard" replace />} />
        <Route path="dashboard" element={<SellerDashboardHome />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="visits" element={<VisitsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
      </Routes>
    </DashboardLayout>
  );
};
