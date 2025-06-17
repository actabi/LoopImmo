import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Euro, TrendingUp, Calendar, Download, Filter,
  CheckCircle, Clock, AlertCircle, ChevronRight,
  CreditCard, FileText, Info, Award, Target,
  BarChart3, PiggyBank, ArrowUpRight, ArrowDownRight,
  Users, Building, Handshake, Gift, Calculator,
  Receipt, Banknote, Sparkles, Trophy, Zap
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/calculations';
import { getCommissions } from "../../services/dataService";

// Types pour les commissions
interface Commission {
  id: string;
  type: 'direct_sale' | 'referral' | 'bonus';
  propertyTitle: string;
  propertyAddress: string;
  salePrice: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'validated' | 'paid';
  date: Date;
  paymentDate?: Date;
  description: string;
  clientName?: string;
  referredBy?: string;
  referredTo?: string;
}

interface CommissionStats {
  currentMonth: {
    directSales: number;
    referrals: number;
    bonuses: number;
    total: number;
  };
  lastMonth: number;
  yearToDate: number;
  pending: number;
  nextPayment: Date;
  nextPaymentAmount: number;
  averagePerMonth: number;
  projectedAnnual: number;
  totalReferralsGiven: number;
  totalReferralsReceived: number;
}

// Mock data

const commissionStats: CommissionStats = {
  currentMonth: {
    directSales: 5320,
    referrals: 2790,
    bonuses: 500,
    total: 8610
  },
  lastMonth: 6800,
  yearToDate: 48500,
  pending: 3120,
  nextPayment: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
  nextPaymentAmount: 5270,
  averagePerMonth: 4041,
  projectedAnnual: 52000,
  totalReferralsGiven: 12,
  totalReferralsReceived: 8
};

// Composant pour le graphique des commissions
const CommissionChart: React.FC = () => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  const directSales = [3200, 3800, 4200, 3900, 4500, 5320];
  const referrals = [800, 1200, 1500, 1800, 2200, 2790];
  const maxValue = Math.max(...directSales.map((v, i) => v + referrals[i]));

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Évolution des commissions</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {months.map((month, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
              <div className="relative">
                <div 
                  className="w-full bg-primary-500 rounded-t"
                  style={{ height: `${(directSales[index] / maxValue) * 180}px` }}
                />
                <div 
                  className="w-full bg-secondary-500"
                  style={{ height: `${(referrals[index] / maxValue) * 180}px` }}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                  {formatPrice(directSales[index] + referrals[index])}
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-2">{month}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded" />
          <span className="text-sm text-gray-600">Ventes directes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary-500 rounded" />
          <span className="text-sm text-gray-600">Parrainages</span>
        </div>
      </div>
    </Card>
  );
};

// Composant pour une commission
const CommissionItem: React.FC<{ commission: Commission }> = ({ commission }) => {
  const getTypeConfig = () => {
    switch (commission.type) {
      case 'direct_sale':
        return { label: 'Vente directe', color: 'primary', icon: Building };
      case 'referral':
        return { label: 'Parrainage', color: 'secondary', icon: Users };
      case 'bonus':
        return { label: 'Bonus', color: 'yellow', icon: Award };
    }
  };

  const getStatusConfig = () => {
    switch (commission.status) {
      case 'pending':
        return { label: 'En attente', color: 'warning', icon: Clock };
      case 'validated':
        return { label: 'Validée', color: 'info', icon: CheckCircle };
      case 'paid':
        return { label: 'Payée', color: 'success', icon: CreditCard };
    }
  };

  const typeConfig = getTypeConfig();
  const statusConfig = getStatusConfig();
  const TypeIcon = typeConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          typeConfig.color === 'primary' && "bg-primary-100",
          typeConfig.color === 'secondary' && "bg-secondary-100",
          typeConfig.color === 'yellow' && "bg-yellow-100"
        )}>
          <TypeIcon className={cn(
            "w-5 h-5",
            typeConfig.color === 'primary' && "text-primary-600",
            typeConfig.color === 'secondary' && "text-secondary-600",
            typeConfig.color === 'yellow' && "text-yellow-600"
          )} />
        </div>
        
        <div className="flex-1">
          <p className="font-medium text-gray-900">{commission.propertyTitle}</p>
          {commission.propertyAddress && (
            <p className="text-sm text-gray-600">{commission.propertyAddress}</p>
          )}
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
            <span>{commission.description}</span>
            {commission.clientName && (
              <>
                <span>•</span>
                <span>Client: {commission.clientName}</span>
              </>
            )}
            {commission.referredTo && (
              <>
                <span>•</span>
                <span>Ambassadeur: {commission.referredTo}</span>
              </>
            )}
            <span>•</span>
            <span>{commission.date.toLocaleDateString('fr-FR')}</span>
          </div>
          {commission.salePrice > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                Prix de vente: {formatPrice(commission.salePrice)}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                Taux: {(commission.commissionRate * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-lg text-gray-900">{formatPrice(commission.commissionAmount)}</p>
          <Badge variant={statusConfig.color as any} size="sm">
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

// Composant pour les statistiques de parrainage
const ReferralStats: React.FC = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary-50 to-secondary-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Réseau de parrainage</h3>
        <Handshake className="w-6 h-6 text-secondary-600" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Clients référés</span>
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{commissionStats.totalReferralsGiven}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatPrice(commissionStats.totalReferralsGiven * 650)} de commissions
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Clients reçus</span>
            <ArrowDownRight className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{commissionStats.totalReferralsReceived}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatPrice(commissionStats.totalReferralsReceived * 840)} de commissions
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-secondary-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Taux de conversion</span>
          <span className="text-sm font-bold text-secondary-700">68%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2 mt-2">
          <div className="h-2 bg-secondary-600 rounded-full" style={{ width: '68%' }} />
        </div>
      </div>
    </Card>
  );
};

export const CommissionsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const commissions = getCommissions();

  // Filtrer les commissions
  const filteredCommissions = commissions.filter(commission => {
    if (filterType !== 'all' && commission.type !== filterType) return false;
    if (filterStatus !== 'all' && commission.status !== filterStatus) return false;
    return true;
  });

  // Calculer les variations
  const monthVariation = ((commissionStats.currentMonth.total - commissionStats.lastMonth) / commissionStats.lastMonth * 100).toFixed(0);
  const isPositiveVariation = Number(monthVariation) > 0;

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mes Commissions</h1>
            <p className="text-gray-600 mt-1">Suivez vos revenus de ventes directes et parrainages</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calculator className="w-4 h-4 mr-2" />
              Simulateur
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Euro className="w-8 h-8 text-primary-500" />
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositiveVariation ? "text-green-600" : "text-red-600"
              )}>
                {isPositiveVariation ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(Number(monthVariation))}%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatPrice(commissionStats.currentMonth.total)}</p>
            <p className="text-sm text-gray-600 mt-1">Ce mois-ci</p>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Ventes directes</span>
                <span className="font-medium">{formatPrice(commissionStats.currentMonth.directSales)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Parrainages</span>
                <span className="font-medium">{formatPrice(commissionStats.currentMonth.referrals)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatPrice(commissionStats.pending)}</p>
            <p className="text-sm text-gray-600 mt-1">En attente</p>
            <p className="text-xs text-gray-500 mt-3">3 transactions en cours</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatPrice(commissionStats.yearToDate)}</p>
            <p className="text-sm text-gray-600 mt-1">Année en cours</p>
            <p className="text-xs text-gray-500 mt-3">Moyenne: {formatPrice(commissionStats.averagePerMonth)}/mois</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="flex items-center justify-between mb-4">
              <PiggyBank className="w-8 h-8 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-primary-900">{formatPrice(commissionStats.projectedAnnual)}</p>
            <p className="text-sm text-primary-700 mt-1">Projection annuelle</p>
            <p className="text-xs text-primary-600 mt-3">Basé sur vos 6 derniers mois</p>
          </Card>
        </div>

        {/* Next Payment Alert */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Prochain versement</p>
                <p className="text-sm text-gray-600">
                  {formatPrice(commissionStats.nextPaymentAmount)} le {commissionStats.nextPayment.toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Receipt className="w-4 h-4 mr-2" />
              Voir détails
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Commission Chart */}
          <div className="lg:col-span-2">
            <CommissionChart />
          </div>

          {/* Referral Stats */}
          <ReferralStats />
        </div>

        {/* Commission Breakdown */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Répartition par type</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-gray-600">Ventes directes</span>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(commissionStats.currentMonth.directSales)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-primary-500 rounded-full" style={{ width: '62%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary-600" />
                    <span className="text-sm text-gray-600">Parrainages</span>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(commissionStats.currentMonth.referrals)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-secondary-500 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Bonus</span>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(commissionStats.currentMonth.bonuses)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '6%' }} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total mensuel</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(commissionStats.currentMonth.total)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Taux de commission</h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Ventes directes</span>
                  <Badge variant="primary" size="sm">0.8% - 1.2%</Badge>
                </div>
                <p className="text-xs text-gray-600">Selon le prix du bien</p>
              </div>
              <div className="p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Parrainages</span>
                  <Badge variant="secondary" size="sm">0.3%</Badge>
                </div>
                <p className="text-xs text-gray-600">Sur le prix de vente</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Bonus performance</span>
                  <Badge variant="warning" size="sm">Variable</Badge>
                </div>
                <p className="text-xs text-gray-600">Selon objectifs</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Objectifs & Bonus</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Objectif mensuel</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">Bonus 100% objectif: €500</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-700">Bonus 150% objectif: €1,500</span>
                </div>
              </div>
              
              <Button size="sm" variant="outline" className="w-full">
                Voir tous les bonus
              </Button>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tous les types</option>
            <option value="direct_sale">Ventes directes</option>
            <option value="referral">Parrainages</option>
            <option value="bonus">Bonus</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="validated">Validées</option>
            <option value="paid">Payées</option>
          </select>

          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg ml-auto">
            <button
              onClick={() => setSelectedPeriod('month')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedPeriod === 'month' 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Mois
            </button>
            <button
              onClick={() => setSelectedPeriod('quarter')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedPeriod === 'quarter' 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Trimestre
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedPeriod === 'year' 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Année
            </button>
          </div>
        </div>

        {/* Commission List */}
        <Card>
          <div className="divide-y">
            {filteredCommissions.map(commission => (
              <CommissionItem key={commission.id} commission={commission} />
            ))}
          </div>
        </Card>

        {/* Info Boxes */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Comment sont calculées vos commissions ?</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• <strong>Ventes directes :</strong> 0.8% à 1.2% du prix de vente selon le montant</p>
                  <p>• <strong>Parrainages :</strong> 0.3% quand vous amenez un acheteur à un autre ambassadeur</p>
                  <p>• <strong>Bonus :</strong> Primes de performance selon vos objectifs mensuels et trimestriels</p>
                  <p>• <strong>Paiement :</strong> Versement automatique le 15 de chaque mois</p>
                </div>
                <Button size="sm" variant="outline" className="mt-4">
                  Guide complet des commissions
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-secondary-50 to-purple-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximisez vos revenus</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Développez votre réseau pour augmenter les parrainages</p>
                  <p>• Proposez des services premium (photos pro, home staging)</p>
                  <p>• Participez aux formations pour améliorer votre taux de conversion</p>
                  <p>• Utilisez les outils marketing LoopImmo</p>
                </div>
                <Button size="sm" variant="primary" className="mt-4">
                  Accéder aux formations
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
