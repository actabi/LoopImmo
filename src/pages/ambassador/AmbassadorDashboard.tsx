import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Users, TrendingUp, MapPin, Award, Calendar, Euro, 
  Home, MessageSquare, FileText, Settings, ChevronRight,
  Target, Clock, CheckCircle, AlertCircle, Star, Gift,
  Briefcase, Heart, BarChart3, ArrowUp, ArrowDown,
  Phone, Mail, Building, Sparkles, Trophy, Zap
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';
import { mockStats, mockLeads, mockDashboardCommissions } from "../../mocks";

// Import des pages existantes
import { AmbassadorPropertiesPage } from './PropertiesPage';
import { LeadsPage } from './LeadsPage';
import { AmbassadorVisitsManagementPage } from './VisitsManagementPage';
import { SettingsPage } from './SettingsPage';
import { CommissionsPage } from './CommissionsPage';
import { TrainingPage } from './TrainingPage';

interface AmbassadorStats {
  totalSales: number;
  totalEarnings: number;
  activeProperties: number;
  conversionRate: number;
  averageCommission: number;
  monthlyGrowth: number;
  pendingCommissions: number;
  nextPayout: Date;
}

interface Lead {
  id: string;
  name: string;
  type: 'seller' | 'buyer';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  value: number;
  date: Date;
  property?: string;
  phone: string;
  email: string;
  notes?: string;
}

interface Commission {
  id: string;
  propertyTitle: string;
  sellerName: string;
  salePrice: number;
  commission: number;
  status: 'pending' | 'validated' | 'paid';
  saleDate: Date;
  paymentDate?: Date;
}



const AmbassadorHome: React.FC = () => {
  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'info';
      case 'contacted': return 'warning';
      case 'qualified': return 'primary';
      case 'converted': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'contacted': return 'Contacté';
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Euro className="w-6 h-6 text-green-600" />
            </div>
            <Badge variant="success" size="sm">
              <ArrowUp className="w-3 h-3 mr-1" />
              +{mockStats.monthlyGrowth}%
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-1">Gains totaux</p>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(mockStats.totalEarnings)}</p>
          <p className="text-xs text-gray-500 mt-1">Commission moyenne: {formatPrice(mockStats.averageCommission)}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{mockStats.totalSales}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Ventes réalisées</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-xs text-gray-600">Objectif: 16</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{mockStats.activeProperties}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Biens actifs</p>
          <p className="text-xs text-gray-500 mt-1">3 nouvelles opportunités cette semaine</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{mockStats.conversionRate}%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Taux de conversion</p>
          <p className="text-xs text-gray-500 mt-1">Moyenne réseau: 18%</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-secondary-200">
          <Link to="/ambassador/properties" className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Gérer les annonces</p>
                <p className="text-sm text-gray-600">5 biens actifs</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-200">
          <Link to="/ambassador/leads" className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Mes clients</p>
                <p className="text-sm text-gray-600">Gérer vos leads</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200">
          <Link to="/ambassador/visits" className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Visites</p>
                <p className="text-sm text-gray-600">Planning et suivi</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leads Section */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Leads récents</h2>
                <Link to="/ambassador/leads">
                  <Button size="sm" variant="outline">
                    Voir tous les leads
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {mockLeads.map((lead) => (
                  <div key={lead.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-gray-900">{lead.name}</h3>
                          <Badge variant={getStatusColor(lead.status)} size="sm">
                            {getStatusLabel(lead.status)}
                          </Badge>
                          <Badge variant={lead.type === 'seller' ? 'primary' : 'secondary'} size="sm">
                            {lead.type === 'seller' ? 'Vendeur' : 'Acheteur'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {lead.property} • {formatPrice(lead.value)}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(lead.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <Button size="sm" variant="primary">
                        <Phone className="w-3 h-3 mr-1" />
                        Appeler
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      {lead.notes && (
                        <p className="text-xs text-gray-500 flex-1">
                          Note: {lead.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Commissions Section */}
        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Commissions récentes</h2>
              
              <div className="space-y-3">
                {mockDashboardCommissions.slice(0, 3).map((commission) => (
                  <div key={commission.id} className="pb-3 border-b last:border-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{commission.propertyTitle}</p>
                      <Badge 
                        size="sm"
                        variant={
                          commission.status === 'paid' ? 'success' :
                          commission.status === 'validated' ? 'primary' : 'warning'
                        }
                      >
                        {commission.status === 'paid' ? 'Payée' :
                         commission.status === 'validated' ? 'Validée' : 'En attente'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{commission.sellerName}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(commission.commission)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {commission.saleDate.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/ambassador/commissions">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Voir toutes les commissions
                </Button>
              </Link>
            </div>
          </Card>

          {/* Performance Card */}
          <Card className="mt-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Votre performance</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Objectif mensuel</span>
                    <span className="text-sm font-medium text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-gray-900">Top 5 ambassadeurs</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Continuez comme ça pour débloquer des bonus !
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                💡 Astuce du jour
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Les vendeurs qui ajoutent des photos professionnelles vendent 32% plus vite. 
                Proposez ce service à vos clients pour augmenter vos chances de vente rapide !
              </p>
              <Button size="sm" variant="primary">
                Découvrir nos services
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const AmbassadorDashboard: React.FC = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ambassador/dashboard" replace />} />
      <Route path="/dashboard" element={
        <DashboardLayout role="ambassador">
          <AmbassadorHome />
        </DashboardLayout>
      } />
      <Route path="/properties" element={<AmbassadorPropertiesPage />} />
      <Route path="/leads" element={<LeadsPage />} />
      <Route path="/visits" element={<AmbassadorVisitsManagementPage />} />
      <Route path="/commissions" element={<CommissionsPage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};
