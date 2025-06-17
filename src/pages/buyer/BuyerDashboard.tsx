import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Search, Heart, Calendar, Target, FileText, CreditCard,
  TrendingUp, Clock, MapPin, Home, Bell, Star, ArrowRight,
  CheckCircle, AlertCircle, Info
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  // Données mockées pour le dashboard
  const stats = {
    savedProperties: 12,
    scheduledVisits: 3,
    activeOffers: 2,
    dossierProgress: 75
  };

  const recentProperties = [
    {
      id: '1',
      title: 'Appartement 3 pièces',
      location: 'Paris 11ème',
      price: '450 000€',
      surface: '75m²',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Maison avec jardin',
      location: 'Levallois-Perret',
      price: '890 000€',
      surface: '120m²',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Studio rénové',
      location: 'Paris 15ème',
      price: '320 000€',
      surface: '35m²',
      image: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingVisits = [
    {
      id: '1',
      property: 'Appartement 3 pièces - Paris 11ème',
      date: '15 Mars 2024',
      time: '14h30',
      agent: 'Marie Dubois'
    },
    {
      id: '2',
      property: 'Maison avec jardin - Levallois-Perret',
      date: '16 Mars 2024',
      time: '10h00',
      agent: 'Pierre Martin'
    }
  ];

  const alerts = [
    {
      id: '1',
      type: 'price',
      message: 'Baisse de prix sur un bien dans vos favoris',
      property: 'Appartement 2 pièces - Paris 20ème',
      time: 'Il y a 2 heures'
    },
    {
      id: '2',
      type: 'new',
      message: 'Nouveau bien correspondant à vos critères',
      property: 'Studio - Paris 15ème',
      time: 'Il y a 5 heures'
    }
  ];

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, Marie Martin
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre recherche immobilière
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Ce mois</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.savedProperties}</h3>
            <p className="text-sm text-gray-600 mt-1">Biens sauvegardés</p>
            <Link to="/buyer/favorites" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center">
              Voir tous
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">À venir</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.scheduledVisits}</h3>
            <p className="text-sm text-gray-600 mt-1">Visites programmées</p>
            <Link to="/buyer/visits" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center">
              Gérer
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">En cours</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeOffers}</h3>
            <p className="text-sm text-gray-600 mt-1">Offres actives</p>
            <Link to="/buyer/offers" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center">
              Suivre
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Complété</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.dossierProgress}%</h3>
            <p className="text-sm text-gray-600 mt-1">Dossier complété</p>
            <Link to="/buyer/dossier" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center">
              Compléter
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Alertes et notifications</h2>
              <Link to="/buyer/alerts" className="text-sm text-primary-600 hover:text-primary-700">
                Voir toutes
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {alerts.map(alert => (
              <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.type === 'price' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {alert.type === 'price' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">{alert.property}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Properties */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Biens récemment consultés</h2>
                  <Link to="/buyer/search" className="text-sm text-primary-600 hover:text-primary-700">
                    Nouvelle recherche
                  </Link>
                </div>
              </div>
              <div className="divide-y">
                {recentProperties.map(property => (
                  <div key={property.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {property.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold text-primary-600">{property.price}</span>
                          <span className="text-sm text-gray-500">{property.surface}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Link to={`/bien/${property.id}`}>
                          <Button size="sm" variant="primary">
                            Voir
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Upcoming Visits */}
          <div>
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Prochaines visites</h2>
              </div>
              <div className="divide-y">
                {upcomingVisits.map(visit => (
                  <div key={visit.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{visit.property}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {visit.date} à {visit.time}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Avec {visit.agent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4">
                  <Link to="/buyer/visits">
                    <Button variant="outline" size="sm" className="w-full">
                      Voir toutes les visites
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Link to="/buyer/search" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="w-4 h-4 mr-2" />
                      Nouvelle recherche
                    </Button>
                  </Link>
                  <Link to="/buyer/dossier" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Compléter mon dossier
                    </Button>
                  </Link>
                  <Link to="/buyer/financing" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Simuler mon financement
                    </Button>
                  </Link>
                  <Link to="/buyer/subscription" className="block">
                    <Button variant="primary" className="w-full justify-start">
                      <Star className="w-4 h-4 mr-2" />
                      Passer Premium
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
