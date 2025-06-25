import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  CreditCard, Euro, Download, Calendar, CheckCircle,
  Clock, AlertCircle, TrendingUp, FileText, Shield,
  Info, ChevronRight, Banknote, Receipt, PiggyBank,
  Plus, ArrowRight, Zap, Gift, Calculator, Building,
  Sparkles, Lock, RefreshCw, HelpCircle, ExternalLink,
  BarChart3, Percent, Timer, Award, Target, Wallet
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';
import { getProperties, getPayments } from "../../services/dataService";

interface Payment {
  id: string;
  propertyId: string;
  type: 'fee' | 'boost' | 'service' | 'refund';
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'scheduled';
  date: Date;
  method?: string;
  invoice?: string;
}

interface PaymentSchedule {
  propertyId: string;
  stage: string;
  amount: number;
  date: Date;
  status: 'paid' | 'pending' | 'upcoming';
  description?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'sepa' | 'bank';
  label: string;
  details: string;
  isDefault: boolean;
  icon: React.ElementType;
}

interface Savings {
  propertyId: string;
  traditionalFee: number;
  loopImmoFee: number;
  saved: number;
  percentage: number;
}


const paymentSchedules: PaymentSchedule[] = [
  // Bien 1
  {
    propertyId: '1',
    stage: 'Signature du mandat',
    amount: 2495,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    status: 'paid',
    description: '50% à la signature'
  },
  {
    propertyId: '1',
    stage: 'Promesse de vente',
    amount: 0,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
    status: 'pending',
    description: 'Aucun paiement'
  },
  {
    propertyId: '1',
    stage: 'Acte de vente',
    amount: 2495,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
    status: 'upcoming',
    description: '50% restants'
  },
  // Bien 2
  {
    propertyId: '2',
    stage: 'Signature du mandat',
    amount: 2495,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    status: 'paid',
    description: '50% à la signature'
  },
  {
    propertyId: '2',
    stage: 'Promesse de vente',
    amount: 0,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    status: 'upcoming',
    description: 'Aucun paiement'
  },
  {
    propertyId: '2',
    stage: 'Acte de vente',
    amount: 2495,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    status: 'upcoming',
    description: '50% restants'
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    label: 'Carte •••• 4242',
    details: 'Expire 12/25',
    isDefault: true,
    icon: CreditCard
  },
  {
    id: '2',
    type: 'sepa',
    label: 'Prélèvement SEPA',
    details: 'IBAN •••• 1234',
    isDefault: false,
    icon: Banknote
  }
];

const boostOptions = [
  {
    id: 'premium',
    name: 'Boost Premium',
    price: 99,
    duration: '14 jours',
    features: [
      'Mise en avant sur la page d\'accueil',
      'Badge "Coup de cœur"',
      '+300% de visibilité',
      'Priorité dans les résultats'
    ],
    popular: true
  },
  {
    id: 'standard',
    name: 'Boost Standard',
    price: 49,
    duration: '7 jours',
    features: [
      'Mise en avant modérée',
      '+150% de visibilité',
      'Meilleur classement'
    ],
    popular: false
  }
];

export const PaymentsPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showSavingsCalculator, setShowSavingsCalculator] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'schedule' | 'history' | 'boost'>('overview');

  const properties = getProperties();
  const payments = getPayments();

  // Calculer les économies par bien
  const calculateSavings = (propertyId: string): Savings => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return { propertyId, traditionalFee: 0, loopImmoFee: 0, saved: 0, percentage: 0 };

    const traditionalFee = property.price * 0.05; // 5% en moyenne
    const loopImmoFee = 4990;
    const saved = traditionalFee - loopImmoFee;
    const percentage = Math.round((saved / traditionalFee) * 100);

    return { propertyId, traditionalFee, loopImmoFee, saved, percentage };
  };

  // Statistiques globales
  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === 'scheduled' || p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalSavings = properties.reduce((sum, property) => {
    const savings = calculateSavings(property.id);
    return sum + savings.saved;
  }, 0);

  // Filtrer les paiements
  const filteredPayments = selectedProperty === 'all'
    ? payments
    : payments.filter(p => p.propertyId === selectedProperty);

  const filteredSchedules = selectedProperty === 'all'
    ? paymentSchedules
    : paymentSchedules.filter(s => s.propertyId === selectedProperty);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paiements et factures</h1>
          <p className="text-gray-600 mt-1">Gérez vos paiements et suivez vos économies</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowSavingsCalculator(!showSavingsCalculator)}>
            <Calculator className="w-4 h-4 mr-2" />
            Calculateur d'économies
          </Button>
          <Button variant="outline">
            <CreditCard className="w-4 h-4 mr-2" />
            Moyens de paiement
          </Button>
        </div>
      </div>

      {/* Économies totales */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <PiggyBank className="w-8 h-8 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Vos économies totales avec LoopImmo</h3>
              </div>
              <p className="text-sm text-gray-700">
                Par rapport aux agences traditionnelles (5% de commission en moyenne)
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{formatPrice(totalSavings)}</p>
              <p className="text-sm text-gray-600 mt-1">économisés sur {properties.length} biens</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Calculateur d'économies */}
      {showSavingsCalculator && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Simulateur d'économies détaillé
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {properties.map((property) => {
              const savings = calculateSavings(property.id);
              return (
                <div key={property.id} className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{property.title}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Prix de vente</span>
                      <span className="font-medium">{formatPrice(property.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Commission traditionnelle (5%)</span>
                      <span className="text-red-600 line-through">{formatPrice(savings.traditionalFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Forfait LoopImmo</span>
                      <span className="font-medium">{formatPrice(savings.loopImmoFee)}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="font-medium text-green-700">Économie réalisée</span>
                        <span className="font-bold text-green-700">{formatPrice(savings.saved)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {(['overview', 'schedule', 'history', 'boost'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              selectedTab === tab 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {tab === 'overview' && 'Vue d\'ensemble'}
            {tab === 'schedule' && 'Échéancier'}
            {tab === 'history' && 'Historique'}
            {tab === 'boost' && 'Boosts & Services'}
          </button>
        ))}
      </div>

      {/* Vue d'ensemble */}
      {selectedTab === 'overview' && (
        <>
          {/* Statistiques de paiement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Déjà payé</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalPaid)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">À venir</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalPending)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Percent className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Économie moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(totalSavings / properties.length / 1000)}k€
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Prochains paiements */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochains paiements</h3>
              <div className="space-y-3">
                {payments
                  .filter(p => p.status === 'scheduled' || p.status === 'pending')
                  .map((payment) => {
                    const property = properties.find(p => p.id === payment.propertyId);
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{payment.description}</p>
                          <p className="text-sm text-gray-600">
                            {property?.title} • {payment.date.toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(payment.amount)}</p>
                          <Badge 
                            size="sm" 
                            variant={payment.status === 'pending' ? 'warning' : 'info'}
                          >
                            {payment.status === 'pending' ? 'En attente' : 'Programmé'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Échéancier */}
      {selectedTab === 'schedule' && (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Échéancier de paiement</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPaymentDetails(!showPaymentDetails)}>
                <Info className="w-4 h-4 mr-1" />
                Comment ça marche ?
              </Button>
            </div>

            {showPaymentDetails && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Le forfait LoopImmo en 2 temps</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <span><strong>50% à la signature du mandat</strong> - Pour démarrer la commercialisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <span><strong>50% à la vente</strong> - Uniquement si votre bien est vendu</span>
                  </li>
                </ul>
                <p className="text-xs text-blue-700 mt-3 font-medium">
                  💡 Si votre bien n'est pas vendu, vous ne payez pas le solde !
                </p>
              </div>
            )}

            <div className="space-y-4">
              {properties.map((property) => {
                const propertySchedules = filteredSchedules.filter(s => s.propertyId === property.id);
                return (
                  <div key={property.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{property.title}</h4>
                    <div className="space-y-3">
                      {propertySchedules.map((schedule, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            schedule.status === 'paid' ? "bg-green-100" :
                            schedule.status === 'pending' ? "bg-orange-100" : "bg-gray-100"
                          )}>
                            {schedule.status === 'paid' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : schedule.status === 'pending' ? (
                              <Clock className="w-5 h-5 text-orange-600" />
                            ) : (
                              <Calendar className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{schedule.stage}</p>
                            <p className="text-sm text-gray-600">
                              {schedule.date.toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                              {schedule.description && ` - ${schedule.description}`}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            {schedule.amount > 0 ? (
                              <>
                                <p className="font-semibold text-gray-900">{formatPrice(schedule.amount)}</p>
                                <Badge 
                                  size="sm" 
                                  variant={
                                    schedule.status === 'paid' ? 'success' :
                                    schedule.status === 'pending' ? 'warning' : 'default'
                                  }
                                >
                                  {schedule.status === 'paid' ? 'Payé' :
                                   schedule.status === 'pending' ? 'En attente' : 'À venir'}
                                </Badge>
                              </>
                            ) : (
                              <p className="text-sm text-gray-500">Aucun paiement</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Historique */}
      {selectedTab === 'history' && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des transactions</h3>
            <div className="space-y-3">
              {filteredPayments.map((payment) => {
                const property = properties.find(p => p.id === payment.propertyId);
                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        payment.type === 'fee' ? "bg-blue-100" :
                        payment.type === 'boost' ? "bg-purple-100" :
                        payment.type === 'service' ? "bg-orange-100" : "bg-green-100"
                      )}>
                        {payment.type === 'fee' ? <Banknote className="w-5 h-5 text-blue-600" /> :
                         payment.type === 'boost' ? <TrendingUp className="w-5 h-5 text-purple-600" /> :
                         payment.type === 'service' ? <Shield className="w-5 h-5 text-orange-600" /> :
                         <Euro className="w-5 h-5 text-green-600" />}
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">{payment.description}</p>
                        <p className="text-sm text-gray-600">
                          {property?.title} • {payment.date.toLocaleDateString()}
                          {payment.method && ` • ${payment.method}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(payment.amount)}</p>
                        <Badge 
                          size="sm" 
                          variant={
                            payment.status === 'completed' ? 'success' :
                            payment.status === 'pending' ? 'warning' :
                            payment.status === 'scheduled' ? 'info' : 'error'
                          }
                        >
                          {payment.status === 'completed' ? 'Payé' :
                           payment.status === 'pending' ? 'En cours' :
                           payment.status === 'scheduled' ? 'Programmé' : 'Échec'}
                        </Badge>
                      </div>
                      
                      {payment.invoice && (
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Boosts et services */}
      {selectedTab === 'boost' && (
        <>
          {/* Options de boost */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Boostez vos annonces</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              {boostOptions.map((option) => (
                <Card key={option.id} className={cn(
                  "p-6 relative",
                  option.popular && "border-2 border-purple-500"
                )}>
                  {option.popular && (
                    <Badge variant="primary" className="absolute -top-3 right-4">
                      <Zap className="w-3 h-3 mr-1" />
                      Plus populaire
                    </Badge>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{option.name}</h4>
                      <p className="text-sm text-gray-600">{option.duration}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{option.price}€</p>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={option.popular ? "primary" : "outline"} className="w-full">
                    Activer le boost
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Services additionnels */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services additionnels</h3>
            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Photos professionnelles</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Photographe professionnel + retouches</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-gray-900">149€</p>
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <Button variant="outline" size="sm" className="w-full">Commander</Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Visite virtuelle 360°</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Visite immersive complète</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-gray-900">299€</p>
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <Button variant="outline" size="sm" className="w-full">Commander</Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Home staging virtuel</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Mise en valeur par IA</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-gray-900">199€</p>
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <Button variant="outline" size="sm" className="w-full">Commander</Button>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Moyens de paiement */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Moyens de paiement</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{method.label}</p>
                      <p className="text-sm text-gray-600">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="success" size="sm">Par défaut</Badge>
                    )}
                    <Button size="sm" variant="ghost">Modifier</Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un moyen de paiement
          </Button>
        </div>
      </Card>

      {/* FAQ Paiements */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Questions fréquentes sur les paiements
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Que se passe-t-il si mon bien n'est pas vendu ?</h4>
              <p className="text-sm text-gray-600">
                Vous ne payez que 50% du forfait. Le solde n'est dû qu'à la vente effective de votre bien.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Les services additionnels sont-ils obligatoires ?</h4>
              <p className="text-sm text-gray-600">
                Non, tous les services additionnels sont optionnels. Le forfait de base inclut déjà tout le nécessaire pour vendre.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Puis-je payer en plusieurs fois ?</h4>
              <p className="text-sm text-gray-600">
                Le forfait est déjà divisé en 2 paiements. Pour les services additionnels, contactez-nous pour des facilités de paiement.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4">
            <ExternalLink className="w-4 h-4 mr-2" />
            Voir toutes les FAQ
          </Button>
        </div>
      </Card>
    </div>
  );
};
