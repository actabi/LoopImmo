import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  FileText, Download, Eye, CheckCircle, Clock, AlertCircle,
  Shield, Calendar, User, Stamp, FileCheck, Info, Lock,
  ChevronRight, Upload, Edit, Send, Building, Home,
  Search, Filter, TrendingUp, AlertTriangle, Users,
  Briefcase, FileSignature, ScrollText, Scale, X, RefreshCw
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';
import { mockProperties } from '../../data/mockData';

interface Contract {
  id: string;
  type: 'mandate' | 'promise' | 'sale' | 'amendment';
  title: string;
  propertyId: string;
  status: 'draft' | 'pending_signature' | 'signed' | 'completed' | 'expired';
  parties: Array<{
    name: string;
    role: string;
    signed: boolean;
    signedAt?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  documents: Array<{
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  keyInfo?: {
    price?: number;
    commission?: number;
    notary?: string;
    completionDate?: Date;
    exclusivityEnd?: Date;
  };
}

interface ContractTimeline {
  propertyId: string;
  steps: Array<{
    id: string;
    type: 'mandate' | 'visit' | 'offer' | 'promise' | 'sale';
    title: string;
    date: Date;
    status: 'completed' | 'current' | 'pending';
    description?: string;
  }>;
}

const mockContracts: Contract[] = [
  // Contrats pour le bien 1
  {
    id: '1',
    type: 'mandate',
    title: 'Mandat de vente exclusif LoopImmo',
    propertyId: '1',
    status: 'signed',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) },
      { name: 'LoopImmo', role: 'Mandataire', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 31),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    documents: [
      { name: 'Mandat_vente_signe.pdf', type: 'pdf', size: '2.3 MB', url: '#' }
    ],
    keyInfo: {
      commission: 4990,
      exclusivityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    }
  },
  {
    id: '2',
    type: 'promise',
    title: 'Promesse de vente - Marie Dubois',
    propertyId: '1',
    status: 'pending_signature',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: false },
      { name: 'Marie Dubois', role: 'Acheteur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { name: 'Me. Martin', role: 'Notaire', signed: false }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    documents: [
      { name: 'Promesse_vente_v2.pdf', type: 'pdf', size: '3.1 MB', url: '#' },
      { name: 'Annexes_diagnostics.pdf', type: 'pdf', size: '5.4 MB', url: '#' }
    ],
    keyInfo: {
      price: 315000,
      notary: 'Me. Martin - Paris 11',
      completionDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    }
  },
  // Contrats pour le bien 2
  {
    id: '3',
    type: 'mandate',
    title: 'Mandat de vente exclusif LoopImmo',
    propertyId: '2',
    status: 'signed',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45) },
      { name: 'LoopImmo', role: 'Mandataire', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 46),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    documents: [
      { name: 'Mandat_vente_signe.pdf', type: 'pdf', size: '2.3 MB', url: '#' }
    ],
    keyInfo: {
      commission: 6000,
      exclusivityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45)
    }
  },
  // Contrat pour le bien 3
  {
    id: '4',
    type: 'mandate',
    title: 'Mandat de vente exclusif LoopImmo',
    propertyId: '3',
    status: 'expired',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100) },
      { name: 'LoopImmo', role: 'Mandataire', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 101),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    documents: [
      { name: 'Mandat_vente_signe.pdf', type: 'pdf', size: '2.3 MB', url: '#' }
    ],
    keyInfo: {
      commission: 2500,
      exclusivityEnd: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
    }
  }
];

const mockTimelines: ContractTimeline[] = [
  {
    propertyId: '1',
    steps: [
      {
        id: '1',
        type: 'mandate',
        title: 'Mandat de vente signé',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        status: 'completed',
        description: 'Mandat exclusif LoopImmo signé pour 3 mois'
      },
      {
        id: '2',
        type: 'visit',
        title: 'Premières visites',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
        status: 'completed',
        description: '12 visites organisées'
      },
      {
        id: '3',
        type: 'offer',
        title: 'Offre reçue',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        status: 'completed',
        description: 'Offre de Marie Dubois à 315 000€'
      },
      {
        id: '4',
        type: 'promise',
        title: 'Promesse de vente',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: 'current',
        description: 'En attente de votre signature'
      },
      {
        id: '5',
        type: 'sale',
        title: 'Acte de vente',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
        status: 'pending',
        description: 'Signature prévue chez le notaire'
      }
    ]
  },
  {
    propertyId: '2',
    steps: [
      {
        id: '6',
        type: 'mandate',
        title: 'Mandat de vente signé',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        status: 'completed',
        description: 'Mandat exclusif LoopImmo signé pour 3 mois'
      },
      {
        id: '7',
        type: 'visit',
        title: 'Visites en cours',
        date: new Date(Date.now()),
        status: 'current',
        description: '8 visites organisées, 3 à venir'
      }
    ]
  }
];

export const ContractsPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'mandate' | 'promise' | 'sale'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  // Filtrer les contrats
  const filteredContracts = mockContracts.filter(contract => {
    const matchesProperty = selectedProperty === 'all' || contract.propertyId === selectedProperty;
    const matchesType = selectedType === 'all' || contract.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.parties.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesProperty && matchesType && matchesSearch;
  });

  // Statistiques par bien
  const getPropertyContractStats = (propertyId: string) => {
    const propertyContracts = mockContracts.filter(c => c.propertyId === propertyId);
    const timeline = mockTimelines.find(t => t.propertyId === propertyId);
    
    return {
      total: propertyContracts.length,
      signed: propertyContracts.filter(c => c.status === 'signed' || c.status === 'completed').length,
      pending: propertyContracts.filter(c => c.status === 'pending_signature').length,
      hasMandate: propertyContracts.some(c => c.type === 'mandate' && c.status === 'signed'),
      hasPromise: propertyContracts.some(c => c.type === 'promise'),
      hasSale: propertyContracts.some(c => c.type === 'sale'),
      currentStep: timeline?.steps.find(s => s.status === 'current')?.type || 'mandate'
    };
  };

  // Statistiques globales
  const globalStats = {
    totalProperties: mockProperties.length,
    propertiesWithMandate: mockProperties.filter(p => getPropertyContractStats(p.id).hasMandate).length,
    totalContracts: mockContracts.length,
    pendingSignatures: mockContracts.filter(c => c.status === 'pending_signature').length,
    activePromises: mockContracts.filter(c => c.type === 'promise' && c.status !== 'completed').length,
    completedSales: mockContracts.filter(c => c.type === 'sale' && c.status === 'completed').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'pending_signature': return 'warning';
      case 'signed': return 'success';
      case 'completed': return 'info';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'pending_signature': return 'En attente de signature';
      case 'signed': return 'Signé';
      case 'completed': return 'Finalisé';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'mandate': return 'Mandat de vente';
      case 'promise': return 'Promesse de vente';
      case 'sale': return 'Acte de vente';
      case 'amendment': return 'Avenant';
      default: return type;
    }
  };

  const getContractIcon = (type: string) => {
    switch (type) {
      case 'mandate': return FileCheck;
      case 'promise': return FileSignature;
      case 'sale': return Stamp;
      case 'amendment': return Edit;
      default: return FileText;
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'mandate': return FileCheck;
      case 'visit': return Users;
      case 'offer': return TrendingUp;
      case 'promise': return FileSignature;
      case 'sale': return Stamp;
      default: return FileText;
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contrats et documents légaux</h1>
            <p className="text-gray-600 mt-1">Gérez et signez vos documents contractuels par bien</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Info className="w-4 h-4 mr-2" />
              Guide juridique
            </Button>
            <Button variant="primary">
              <FileText className="w-4 h-4 mr-2" />
              Nouveau contrat
            </Button>
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">
                {globalStats.propertiesWithMandate}/{globalStats.totalProperties}
              </span>
            </div>
            <p className="text-sm text-gray-600">Biens avec mandat</p>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(globalStats.propertiesWithMandate / globalStats.totalProperties) * 100}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              {globalStats.pendingSignatures > 0 && (
                <Badge size="sm" variant="warning">{globalStats.pendingSignatures}</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{globalStats.pendingSignatures}</p>
            <p className="text-sm text-gray-600">À signer</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <FileSignature className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">{globalStats.activePromises}</span>
            </div>
            <p className="text-sm text-gray-600">Promesses actives</p>
            <p className="text-xs text-gray-500 mt-1">En cours de finalisation</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Scale className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{globalStats.completedSales}</span>
            </div>
            <p className="text-sm text-gray-600">Ventes finalisées</p>
            <p className="text-xs text-gray-500 mt-1">Félicitations !</p>
          </Card>
        </div>

        {/* Security Notice */}
        <Card className="bg-green-50 border-green-200">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  Signature électronique sécurisée
                </p>
                <p className="text-sm text-green-700">
                  Tous vos documents sont signés électroniquement avec une valeur légale équivalente à une signature manuscrite
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Filtres */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sélection du bien */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrer par bien
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedProperty('all')}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    selectedProperty === 'all' 
                      ? "bg-primary-100 text-primary-700" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Tous les biens
                </button>
                {mockProperties.map((property) => {
                  const stats = getPropertyContractStats(property.id);
                  return (
                    <button
                      key={property.id}
                      onClick={() => setSelectedProperty(property.id)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                        selectedProperty === property.id 
                          ? "bg-primary-100 text-primary-700" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      <Building className="w-4 h-4" />
                      <span>{property.title.split(' ').slice(0, 2).join(' ')}</span>
                      {stats.pending > 0 && (
                        <Badge size="sm" variant="warning">{stats.pending}</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type de contrat */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de contrat
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tous les contrats</option>
                <option value="mandate">Mandats de vente</option>
                <option value="promise">Promesses de vente</option>
                <option value="sale">Actes de vente</option>
              </select>
            </div>

            {/* Recherche */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nom, partie..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Chronologie par bien (si un bien est sélectionné) */}
        {selectedProperty !== 'all' && (() => {
          const property = mockProperties.find(p => p.id === selectedProperty);
          const timeline = mockTimelines.find(t => t.propertyId === selectedProperty);
          
          if (!timeline) return null;

          return (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Chronologie de vente - {property?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {property?.location.address}, {property?.location.city}
                  </p>
                </div>
                <Badge variant="info">
                  {formatPrice(property?.price || 0)}
                </Badge>
              </div>

              <div className="relative">
                <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {timeline.steps.map((step, index) => {
                    const Icon = getStepIcon(step.type);
                    return (
                      <div key={step.id} className="flex gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center relative z-10",
                          step.status === 'completed' && "bg-green-500",
                          step.status === 'current' && "bg-orange-500 ring-4 ring-orange-100",
                          step.status === 'pending' && "bg-gray-300"
                        )}>
                          <Icon className={cn(
                            "w-6 h-6",
                            step.status === 'pending' ? "text-gray-600" : "text-white"
                          )} />
                        </div>
                        <div className={cn(
                          "flex-1 pb-6",
                          step.status === 'pending' && "opacity-60"
                        )}>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{step.title}</h4>
                            <span className="text-sm text-gray-600">
                              {step.date.toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          {step.description && (
                            <p className="text-sm text-gray-600">{step.description}</p>
                          )}
                          {step.status === 'current' && (
                            <Button size="sm" variant="primary" className="mt-2">
                              <ChevronRight className="w-3 h-3 mr-1" />
                              Action requise
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })()}

        {/* Liste des contrats */}
        <div className="space-y-4">
          {filteredContracts.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun contrat trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Essayez avec d\'autres termes de recherche' : 'Commencez par créer un mandat de vente'}
              </p>
              <Button variant="primary">
                <FileText className="w-4 h-4 mr-2" />
                Créer un mandat
              </Button>
            </Card>
          ) : (
            filteredContracts.map((contract) => {
              const Icon = getContractIcon(contract.type);
              const property = mockProperties.find(p => p.id === contract.propertyId);
              const allSigned = contract.parties.every(p => p.signed);
              const pendingSignatures = contract.parties.filter(p => !p.signed).length;
              
              return (
                <Card key={contract.id} className={cn(
                  "overflow-hidden",
                  contract.status === 'pending_signature' && "ring-2 ring-orange-500",
                  contract.status === 'expired' && "opacity-75"
                )}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          contract.status === 'signed' ? "bg-green-100" : 
                          contract.status === 'expired' ? "bg-red-100" : "bg-gray-100"
                        )}>
                          <Icon className={cn(
                            "w-6 h-6",
                            contract.status === 'signed' ? "text-green-600" : 
                            contract.status === 'expired' ? "text-red-600" : "text-gray-600"
                          )} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-gray-600">{getContractTypeLabel(contract.type)}</p>
                            <span className="text-gray-400">•</span>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {property?.title}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(contract.status)}>
                          {getStatusLabel(contract.status)}
                        </Badge>
                        {contract.expiresAt && contract.status === 'pending_signature' && (
                          <p className="text-sm text-orange-600 mt-1">
                            Expire dans {Math.ceil((contract.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} jours
                          </p>
                        )}
                        {contract.status === 'expired' && (
                          <p className="text-sm text-red-600 mt-1">
                            Expiré depuis {Math.ceil((Date.now() - (contract.expiresAt?.getTime() || 0)) / (1000 * 60 * 60 * 24))} jours
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Key Information */}
                    {contract.keyInfo && (
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        {contract.keyInfo.price && (
                          <div>
                            <p className="text-xs text-gray-600">Prix de vente</p>
                            <p className="font-semibold">{formatPrice(contract.keyInfo.price)}</p>
                          </div>
                        )}
                        {contract.keyInfo.commission !== undefined && (
                          <div>
                            <p className="text-xs text-gray-600">Commission</p>
                            <p className="font-semibold">{formatPrice(contract.keyInfo.commission)}</p>
                          </div>
                        )}
                        {contract.keyInfo.notary && (
                          <div>
                            <p className="text-xs text-gray-600">Notaire</p>
                            <p className="font-semibold">{contract.keyInfo.notary}</p>
                          </div>
                        )}
                        {contract.keyInfo.completionDate && (
                          <div>
                            <p className="text-xs text-gray-600">Date de signature</p>
                            <p className="font-semibold">
                              {contract.keyInfo.completionDate.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        )}
                        {contract.keyInfo.exclusivityEnd && (
                          <div>
                            <p className="text-xs text-gray-600">Fin d'exclusivité</p>
                            <p className="font-semibold">
                              {contract.keyInfo.exclusivityEnd.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Parties */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Parties prenantes</p>
                      <div className="space-y-2">
                        {contract.parties.map((party, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <User className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="font-medium text-gray-900">{party.name}</p>
                                <p className="text-sm text-gray-600">{party.role}</p>
                              </div>
                            </div>
                            {party.signed ? (
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">
                                  Signé le {party.signedAt?.toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-orange-600">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">En attente</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Documents attachés</p>
                      <div className="space-y-2">
                        {contract.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{doc.name}</span>
                              <span className="text-xs text-gray-500">({doc.size})</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {contract.status === 'pending_signature' && !contract.parties.find(p => p.name === 'Jean Dupont')?.signed && (
                        <Button variant="primary" onClick={() => setShowSignatureModal(true)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Signer maintenant
                        </Button>
                      )}
                      {contract.status === 'expired' && (
                        <Button variant="primary">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Renouveler
                        </Button>
                      )}
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir le contrat
                      </Button>
                      <Button variant="ghost">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                      {contract.status === 'pending_signature' && (
                        <Button variant="ghost">
                          <Send className="w-4 h-4 mr-2" />
                          Relancer
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Vue globale de progression (si tous les biens sont sélectionnés) */}
        {selectedProperty === 'all' && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Progression des ventes par bien
            </h2>
            <div className="grid gap-4">
              {mockProperties.map((property) => {
                const timeline = mockTimelines.find(t => t.propertyId === property.id);
                const stats = getPropertyContractStats(property.id);
                const currentStep = timeline?.steps.find(s => s.status === 'current');
                const completedSteps = timeline?.steps.filter(s => s.status === 'completed').length || 0;
                const totalSteps = timeline?.steps.length || 5;
                const progress = (completedSteps / totalSteps) * 100;

                return (
                  <Card key={property.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <p className="text-sm text-gray-600">
                          {property.location.address}, {property.location.city}
                        </p>
                      </div>
                      <Badge variant="info">{formatPrice(property.price)}</Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Étape actuelle : {currentStep ? getContractTypeLabel(currentStep.type) : 'En attente'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {completedSteps}/{totalSteps} étapes
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {stats.hasMandate ? (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Mandat signé
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          Mandat requis
                        </div>
                      )}
                      {stats.pending > 0 && (
                        <Badge size="sm" variant="warning">
                          {stats.pending} document{stats.pending > 1 ? 's' : ''} à signer
                        </Badge>
                      )}
                      {currentStep?.status === 'current' && (
                        <Button size="sm" variant="primary">
                          <ChevronRight className="w-3 h-3 mr-1" />
                          Continuer
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
