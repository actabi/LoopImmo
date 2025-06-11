import React, { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Home, TrendingUp, Eye, Heart, Users, Calendar, 
  MessageSquare, Euro, Clock, AlertCircle, CheckCircle,
  FileText, Upload, BarChart3, Zap, Shield, ChevronRight,
  Building, Download, Info, Rocket, FileCheck, AlertTriangle
} from 'lucide-react';
import { getProperties } from '../services/dataService';
import { formatPrice, formatPercentage } from '../utils/calculations';
import { cn } from '../utils/cn';

interface QuickStats {
  totalViews: number;
  viewsChange: number;
  totalFavorites: number;
  favoritesChange: number;
  totalInquiries: number;
  inquiriesChange: number;
  scheduledVisits: number;
  activeOffers: number;
}

interface DocumentStats {
  total: number;
  valid: number;
  pending: number;
  expired: number;
  completion: number;
}

export const SellerPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'documents'>('overview');

  const properties = getProperties();

  // Mock data for demonstration
  const userProperties = properties.slice(0, 3);
  
  const quickStats: QuickStats = {
    totalViews: 1846,
    viewsChange: 12.5,
    totalFavorites: 75,
    favoritesChange: 8.3,
    totalInquiries: 28,
    inquiriesChange: -5.2,
    scheduledVisits: 12,
    activeOffers: 3
  };

  const documentStats: DocumentStats = {
    total: 15,
    valid: 12,
    pending: 2,
    expired: 1,
    completion: 80
  };

  const recentActivities = [
    {
      id: '1',
      type: 'view',
      property: 'Appartement République',
      user: 'Marie D.',
      time: 'Il y a 2 heures',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'favorite',
      property: 'Maison Lyon',
      user: 'Pierre L.',
      time: 'Il y a 4 heures',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      id: '3',
      type: 'inquiry',
      property: 'Studio Bastille',
      user: 'Sophie M.',
      time: 'Il y a 6 heures',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      id: '4',
      type: 'visit',
      property: 'Appartement République',
      user: 'Thomas R.',
      time: 'Demain 14h',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  const boostOptions = [
    {
      id: 'highlight',
      name: 'Mise en avant',
      price: 49,
      duration: '7 jours',
      features: ['Position prioritaire', 'Badge coup de cœur', '+150% de vues'],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      duration: '14 jours',
      features: ['Tout de Mise en avant', 'Visite virtuelle 360°', '+300% de vues'],
      recommended: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: 199,
      duration: '30 jours',
      features: ['Tout de Premium', 'Home staging virtuel', 'Agent dédié', '+500% de vues'],
      recommended: false
    }
  ];

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header with Quick Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord vendeur</h1>
            <p className="text-gray-600 mt-1">Gérez vos biens et suivez leur performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setActiveTab('documents')}>
              <FileText className="w-4 h-4 mr-2" />
              Documents
              {documentStats.pending > 0 && (
                <Badge size="sm" variant="warning" className="ml-2">{documentStats.pending}</Badge>
              )}
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('analytics')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistiques
            </Button>
            <Button variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Ajouter un bien
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b">
          {(['overview', 'analytics', 'documents'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab 
                  ? "border-primary-500 text-primary-600" 
                  : "border-transparent text-gray-600 hover:text-gray-900"
              )}
            >
              {tab === 'overview' && 'Vue d\'ensemble'}
              {tab === 'analytics' && 'Statistiques'}
              {tab === 'documents' && 'Documents'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-8 h-8 text-blue-500" />
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+{quickStats.viewsChange}%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{quickStats.totalViews}</p>
                <p className="text-sm text-gray-600">Vues totales</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+{quickStats.favoritesChange}%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{quickStats.totalFavorites}</p>
                <p className="text-sm text-gray-600">Favoris</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="w-8 h-8 text-green-500" />
                  <Badge size="sm" variant="success">Actif</Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{quickStats.totalInquiries}</p>
                <p className="text-sm text-gray-600">Demandes</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <Badge size="sm" variant="info">{quickStats.activeOffers}</Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{quickStats.scheduledVisits}</p>
                <p className="text-sm text-gray-600">Visites prévues</p>
              </Card>
            </div>

            {/* Properties Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Mes biens en vente</h2>
                <Button variant="ghost" size="sm">
                  Voir tout
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {userProperties.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    
                    {/* Property Stats Overlay */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">234</p>
                          <p className="text-xs text-gray-600">Vues</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">12</p>
                          <p className="text-xs text-gray-600">Favoris</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">3</p>
                          <p className="text-xs text-gray-600">Visites</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Stats
                        </Button>
                        <Button 
                          size="sm" 
                          variant="primary" 
                          className="flex-1"
                          onClick={() => setShowBoostModal(true)}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Booster
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center",
                            activity.color
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {activity.user} • {activity.property}
                            </p>
                            <p className="text-xs text-gray-600">{activity.time}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Voir
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card className="p-6 bg-gradient-to-r from-primary-50 to-primary-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Performance globale</h2>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    Top 3 sur 45
                  </p>
                  <p className="text-gray-700">
                    Vos biens sont dans le top 7% des plus vus de votre secteur
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">+15%</span>
                  </div>
                  <p className="text-sm text-gray-600">vs mois dernier</p>
                </div>
              </div>
            </Card>

            {/* Analytics Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Views Chart */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des vues</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[45, 52, 48, 65, 72, 68, 85, 92, 78, 95, 110, 98, 115, 123].map((value, index) => (
                      <div key={index} className="flex-1 relative group">
                        <div 
                          className="rounded-t-lg bg-primary-400 hover:bg-primary-500 transition-all duration-300"
                          style={{ height: `${(value / 123) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Conversion Funnel */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Entonnoir de conversion</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Vues', value: 1846, percentage: 100 },
                      { label: 'Favoris', value: 75, percentage: 4.1 },
                      { label: 'Demandes', value: 28, percentage: 1.5 },
                      { label: 'Visites', value: 12, percentage: 0.65 },
                      { label: 'Offres', value: 3, percentage: 0.16 }
                    ].map((step, index) => (
                      <div key={step.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{step.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{step.value}</span>
                            <Badge size="sm" variant="outline">
                              {formatPercentage(step.percentage)}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={cn(
                              "h-3 rounded-full transition-all duration-500",
                              index === 0 && "bg-blue-500",
                              index === 1 && "bg-purple-500",
                              index === 2 && "bg-indigo-500",
                              index === 3 && "bg-green-500",
                              index === 4 && "bg-emerald-600"
                            )}
                            style={{ width: `${step.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Boost CTA */}
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Rocket className="w-12 h-12 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Boostez vos performances
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        Augmentez votre visibilité jusqu'à 500% avec nos options de boost
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" onClick={() => setShowBoostModal(true)}>
                    <Zap className="w-4 h-4 mr-2" />
                    Découvrir les boosts
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Document Status Overview */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    État de vos documents
                  </h3>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{documentStats.completion}%</p>
                      <p className="text-sm text-gray-600">Complété</p>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">
                          <span className="font-semibold">{documentStats.valid}</span> validés
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm">
                          <span className="font-semibold">{documentStats.pending}</span> en attente
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="text-sm">
                          <span className="font-semibold">{documentStats.expired}</span> expiré
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>
            </Card>

            {/* Documents by Property */}
            <div className="space-y-4">
              {userProperties.map((property) => (
                <Card key={property.id}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{property.title}</h4>
                        <p className="text-sm text-gray-600">
                          {property.location.address}, {property.location.city}
                        </p>
                      </div>
                      <Badge variant="info">{formatPrice(property.price)}</Badge>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      {/* Required Documents */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Documents obligatoires</h5>
                        <div className="space-y-2">
                          {[
                            { name: 'DPE', status: 'valid', date: '01/03/2024' },
                            { name: 'Diagnostic amiante', status: 'valid', date: '01/03/2024' },
                            { name: 'Loi Carrez', status: 'pending', date: null },
                            { name: 'Diagnostic électricité', status: 'expired', date: '01/02/2024' }
                          ].map((doc) => (
                            <div key={doc.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <FileCheck className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{doc.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {doc.status === 'valid' && (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-gray-600">{doc.date}</span>
                                  </>
                                )}
                                {doc.status === 'pending' && (
                                  <>
                                    <Clock className="w-4 h-4 text-yellow-600" />
                                    <Button size="sm" variant="primary">Ajouter</Button>
                                  </>
                                )}
                                {doc.status === 'expired' && (
                                  <>
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                    <Button size="sm" variant="primary">Mettre à jour</Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sale Timeline */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Progression de la vente</h5>
                        <div className="relative">
                          <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                          <div className="space-y-4">
                            {[
                              { step: 'Mandat signé', status: 'completed', date: '01/03/2024' },
                              { step: 'Documents complets', status: 'current', date: null },
                              { step: 'Premières visites', status: 'pending', date: null },
                              { step: 'Offre acceptée', status: 'pending', date: null },
                              { step: 'Compromis signé', status: 'pending', date: null }
                            ].map((step, index) => (
                              <div key={index} className="flex gap-3">
                                <div className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center relative z-10",
                                  step.status === 'completed' && "bg-green-500",
                                  step.status === 'current' && "bg-orange-500 ring-4 ring-orange-100",
                                  step.status === 'pending' && "bg-gray-300"
                                )}>
                                  {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                                  {step.status === 'current' && <div className="w-2 h-2 bg-white rounded-full" />}
                                  {step.status === 'pending' && <div className="w-2 h-2 bg-gray-500 rounded-full" />}
                                </div>
                                <div className={cn(
                                  "flex-1",
                                  step.status === 'pending' && "opacity-60"
                                )}>
                                  <p className="text-sm font-medium text-gray-900">{step.step}</p>
                                  {step.date && <p className="text-xs text-gray-600">{step.date}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Boost Modal */}
        {showBoostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Boostez votre visibilité</h2>
                  <button
                    onClick={() => setShowBoostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {boostOptions.map((option) => (
                    <Card 
                      key={option.id}
                      className={cn(
                        "relative overflow-hidden",
                        option.recommended && "ring-2 ring-primary-500"
                      )}
                    >
                      {option.recommended && (
                        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                          RECOMMANDÉ
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-gray-900">{option.price}€</span>
                          <span className="text-gray-600"> / {option.duration}</span>
                        </div>

                        <ul className="space-y-2 mb-6">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className="w-full" 
                          variant={option.recommended ? "primary" : "outline"}
                        >
                          Choisir cette option
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-blue-900">
                      <strong>Garantie satisfait ou remboursé :</strong> Si vous n'êtes pas satisfait des résultats après 7 jours, nous vous remboursons intégralement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
