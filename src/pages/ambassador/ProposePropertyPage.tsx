import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Plus, Home, Camera, MapPin, Euro, Users, 
  CheckCircle, Clock, AlertCircle, X, Upload,
  FileText, Shield, Sparkles, TrendingUp, Award,
  ChevronRight, Info, Phone, Mail, Building,
  Ruler, Bed, Bath, Calendar, Edit, Eye,
  Send, UserCheck, ShieldCheck, ArrowRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/calculations';

// Types pour les propositions
interface PropertyProposal {
  id: string;
  // Infos du bien
  title: string;
  type: 'apartment' | 'house';
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  postalCode: string;
  description: string;
  features: string[];
  photos: string[];
  
  // Infos propriétaire
  owner: {
    name: string;
    phone: string;
    email: string;
    isRegistered: boolean;
    userId?: string;
  };
  
  // Statut de validation
  status: 'draft' | 'pending_owner' | 'pending_staff' | 'approved' | 'rejected';
  ownerValidation?: {
    status: 'pending' | 'approved' | 'rejected';
    date?: Date;
    comment?: string;
  };
  staffValidation?: {
    status: 'pending' | 'approved' | 'rejected';
    date?: Date;
    comment?: string;
    validatedBy?: string;
  };
  
  // Méta
  createdAt: Date;
  updatedAt: Date;
  ambassadorId: string;
  estimatedCommission: number;
  marketAnalysis?: {
    averagePrice: number;
    pricePosition: 'below' | 'average' | 'above';
    demandLevel: 'low' | 'medium' | 'high';
    estimatedDaysToSell: number;
  };
}

// Mock data
const mockProposals: PropertyProposal[] = [
  {
    id: 'P001',
    title: 'Appartement T3 avec terrasse',
    type: 'apartment',
    price: 285000,
    surface: 72,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    address: '45 rue de la République',
    city: 'Lyon',
    postalCode: '69003',
    description: 'Bel appartement lumineux avec grande terrasse...',
    features: ['Terrasse', 'Parking', 'Cave'],
    photos: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400'],
    owner: {
      name: 'Marie Dubois',
      phone: '06 12 34 56 78',
      email: 'marie.dubois@email.com',
      isRegistered: true,
      userId: 'U123'
    },
    status: 'pending_owner',
    ownerValidation: {
      status: 'pending'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    ambassadorId: 'A001',
    estimatedCommission: 600,
    marketAnalysis: {
      averagePrice: 290000,
      pricePosition: 'below',
      demandLevel: 'high',
      estimatedDaysToSell: 35
    }
  },
  {
    id: 'P002',
    title: 'Maison familiale avec jardin',
    type: 'house',
    price: 420000,
    surface: 120,
    rooms: 5,
    bedrooms: 4,
    bathrooms: 2,
    address: '12 chemin des Lilas',
    city: 'Caluire',
    postalCode: '69300',
    description: 'Grande maison familiale avec jardin arboré...',
    features: ['Jardin', 'Garage', 'Piscine'],
    photos: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=400'],
    owner: {
      name: 'Jean Martin',
      phone: '06 23 45 67 89',
      email: 'jean.martin@email.com',
      isRegistered: false
    },
    status: 'pending_staff',
    ownerValidation: {
      status: 'approved',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      comment: 'OK pour la mise en vente'
    },
    staffValidation: {
      status: 'pending'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    ambassadorId: 'A001',
    estimatedCommission: 800,
    marketAnalysis: {
      averagePrice: 410000,
      pricePosition: 'above',
      demandLevel: 'medium',
      estimatedDaysToSell: 60
    }
  }
];

// Composant pour le statut de validation
const ValidationStatus: React.FC<{ proposal: PropertyProposal }> = ({ proposal }) => {
  const getStatusConfig = () => {
    switch (proposal.status) {
      case 'draft':
        return { label: 'Brouillon', color: 'default', icon: Edit };
      case 'pending_owner':
        return { label: 'En attente propriétaire', color: 'warning', icon: UserCheck };
      case 'pending_staff':
        return { label: 'En attente validation', color: 'info', icon: ShieldCheck };
      case 'approved':
        return { label: 'Approuvé', color: 'success', icon: CheckCircle };
      case 'rejected':
        return { label: 'Refusé', color: 'error', icon: X };
      default:
        return { label: 'Inconnu', color: 'default', icon: AlertCircle };
    }
  };

  const { label, color, icon: Icon } = getStatusConfig();

  return (
    <Badge variant={color as any} size="sm">
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};

// Composant pour le workflow de validation
const ValidationWorkflow: React.FC<{ proposal: PropertyProposal }> = ({ proposal }) => {
  const steps = [
    {
      id: 'creation',
      label: 'Création',
      status: 'completed',
      icon: Plus,
      date: proposal.createdAt
    },
    {
      id: 'owner',
      label: 'Validation propriétaire',
      status: proposal.ownerValidation?.status || 'pending',
      icon: UserCheck,
      date: proposal.ownerValidation?.date
    },
    {
      id: 'staff',
      label: 'Validation LoopImmo',
      status: proposal.staffValidation?.status || 'pending',
      icon: ShieldCheck,
      date: proposal.staffValidation?.date
    },
    {
      id: 'published',
      label: 'Publié',
      status: proposal.status === 'approved' ? 'completed' : 'pending',
      icon: CheckCircle,
      date: proposal.status === 'approved' ? proposal.updatedAt : undefined
    }
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed' || step.status === 'approved';
          const isRejected = step.status === 'rejected';
          const isPending = step.status === 'pending';
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                  isCompleted && "bg-green-100 text-green-600",
                  isRejected && "bg-red-100 text-red-600",
                  isPending && "bg-gray-100 text-gray-400"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-gray-900">{step.label}</p>
                {step.date && (
                  <p className="text-xs text-gray-500 mt-1">
                    {step.date.toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mb-8",
                  isCompleted && steps[index + 1].status !== 'pending' ? "bg-green-500" : "bg-gray-200"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const ProposePropertyPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<PropertyProposal | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');

  // Filtrer les propositions
  const getFilteredProposals = () => {
    switch (activeTab) {
      case 'pending':
        return mockProposals.filter(p => p.status === 'pending_owner' || p.status === 'pending_staff');
      case 'approved':
        return mockProposals.filter(p => p.status === 'approved');
      default:
        return mockProposals;
    }
  };

  const filteredProposals = getFilteredProposals();

  // Stats
  const stats = {
    total: mockProposals.length,
    pending: mockProposals.filter(p => p.status === 'pending_owner' || p.status === 'pending_staff').length,
    approved: mockProposals.filter(p => p.status === 'approved').length,
    potentialCommission: mockProposals.reduce((sum, p) => sum + p.estimatedCommission, 0)
  };

  if (showForm) {
    return (
      <DashboardLayout role="ambassador">
        <PropertyProposalForm 
          onCancel={() => setShowForm(false)}
          onSave={(data) => {
            console.log('Saving proposal:', data);
            setShowForm(false);
          }}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Propositions de biens</h1>
            <p className="text-gray-600 mt-1">Proposez des biens de votre réseau et suivez leur validation</p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Proposer un bien
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Home className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-green-600 font-medium">+2 ce mois</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Biens proposés</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            <p className="text-sm text-gray-600">Approuvés</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Euro className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.potentialCommission)}</p>
            <p className="text-sm text-gray-600">Commission potentielle</p>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Comment ça marche ?</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Proposez un bien</p>
                      <p className="text-sm text-gray-600">Remplissez le formulaire avec les infos du propriétaire</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Validation propriétaire</p>
                      <p className="text-sm text-gray-600">Le propriétaire valide la mise en vente</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Validation LoopImmo</p>
                      <p className="text-sm text-gray-600">Notre équipe vérifie et publie l'annonce</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'all' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Toutes ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'pending' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            En attente ({stats.pending})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'approved' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Approuvées ({stats.approved})
          </button>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map(proposal => (
            <Card key={proposal.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Photo */}
                  <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {proposal.photos.length > 0 ? (
                      <img 
                        src={proposal.photos[0]} 
                        alt={proposal.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{proposal.title}</h3>
                        <p className="text-sm text-gray-600">
                          {proposal.address}, {proposal.city} {proposal.postalCode}
                        </p>
                      </div>
                      <ValidationStatus proposal={proposal} />
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        {formatPrice(proposal.price)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        {proposal.surface}m²
                      </span>
                      <span className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        {proposal.rooms} pièces
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {proposal.bedrooms} ch.
                      </span>
                    </div>

                    {/* Owner info */}
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg mb-3">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{proposal.owner.name}</p>
                        <p className="text-xs text-gray-600">
                          {proposal.owner.isRegistered ? 'Client LoopImmo' : 'Non inscrit'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Market Analysis */}
                    {proposal.marketAnalysis && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className={cn(
                            "w-4 h-4",
                            proposal.marketAnalysis.pricePosition === 'below' ? "text-green-500" :
                            proposal.marketAnalysis.pricePosition === 'above' ? "text-red-500" :
                            "text-gray-500"
                          )} />
                          <span className="text-gray-600">
                            Prix {
                              proposal.marketAnalysis.pricePosition === 'below' ? 'attractif' :
                              proposal.marketAnalysis.pricePosition === 'above' ? 'élevé' :
                              'dans la moyenne'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600">
                            Demande {
                              proposal.marketAnalysis.demandLevel === 'high' ? 'forte' :
                              proposal.marketAnalysis.demandLevel === 'medium' ? 'moyenne' :
                              'faible'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">
                            ~{proposal.marketAnalysis.estimatedDaysToSell}j pour vendre
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Commission */}
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Commission estimée</p>
                    <p className="text-lg font-bold text-primary-600">{formatPrice(proposal.estimatedCommission)}</p>
                  </div>
                </div>

                {/* Validation Workflow */}
                <div className="mt-6 pt-6 border-t">
                  <ValidationWorkflow proposal={proposal} />
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir détails
                  </Button>
                  {proposal.status === 'draft' && (
                    <Button variant="primary" size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer au propriétaire
                    </Button>
                  )}
                  {proposal.status === 'pending_owner' && (
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Relancer propriétaire
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProposals.length === 0 && (
          <Card className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune proposition dans cette catégorie
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par proposer un bien de votre réseau
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Proposer un bien
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

// Formulaire de proposition
const PropertyProposalForm: React.FC<{
  onCancel: () => void;
  onSave: (data: any) => void;
}> = ({ onCancel, onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Owner info
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerRegistered: false,
    
    // Property info
    title: '',
    type: 'apartment',
    price: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    city: '',
    postalCode: '',
    description: '',
    features: [] as string[],
    
    // Additional info
    sellingReason: '',
    availableFrom: '',
    exclusivity: false,
    commission: '5'
  });

  const steps = [
    { id: 1, title: 'Propriétaire', icon: Users },
    { id: 2, title: 'Bien', icon: Home },
    { id: 3, title: 'Détails', icon: FileText },
    { id: 4, title: 'Validation', icon: CheckCircle }
  ];

  const commonFeatures = [
    'Ascenseur', 'Balcon', 'Terrasse', 'Parking', 'Cave',
    'Gardien', 'Interphone', 'Digicode', 'Fibre optique',
    'Double vitrage', 'Parquet', 'Cheminée', 'Climatisation'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors",
                    isActive ? "bg-primary-500 text-white" :
                    isCompleted ? "bg-green-500 text-white" :
                    "bg-gray-200 text-gray-500"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary-600" : "text-gray-500"
                  )}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-4 mt-6",
                    s.id < step ? "bg-green-500" : "bg-gray-200"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Card>
        <div className="p-6">
          {/* Step 1: Owner Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informations du propriétaire</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Marie Dubois"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="marie.dubois@email.com"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ownerRegistered}
                    onChange={(e) => setFormData({...formData, ownerRegistered: e.target.checked})}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Le propriétaire est déjà client LoopImmo</p>
                    <p className="text-sm text-gray-600">Cochez si le propriétaire a déjà un compte</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Raison de la vente
                </label>
                <textarea
                  value={formData.sellingReason}
                  onChange={(e) => setFormData({...formData, sellingReason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Déménagement, achat d'un autre bien, etc."
                />
              </div>
            </div>
          )}

          {/* Step 2: Property Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informations du bien</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de l'annonce *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Appartement T3 lumineux avec terrasse"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de bien *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix de vente *
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="320000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surface (m²) *
                  </label>
                  <input
                    type="number"
                    value={formData.surface}
                    onChange={(e) => setFormData({...formData, surface: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="75"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pièces *
                  </label>
                  <input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chambres
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SdB
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="15 rue de la République"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Lyon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="69003"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Détails et caractéristiques</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={6}
                  placeholder="Décrivez le bien, ses atouts, son environnement..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Équipements et caractéristiques
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {commonFeatures.map((feature) => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, features: [...formData.features, feature]});
                          } else {
                            setFormData({...formData, features: formData.features.filter(f => f !== feature)});
                          }
                        }}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponible à partir de
                  </label>
                  <input
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => setFormData({...formData, availableFrom: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commission (%)
                  </label>
                  <select
                    value={formData.commission}
                    onChange={(e) => setFormData({...formData, commission: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="5">5% (Standard)</option>
                    <option value="4">4% (Réduit)</option>
                    <option value="6">6% (Premium)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.exclusivity}
                    onChange={(e) => setFormData({...formData, exclusivity: e.target.checked})}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Mandat exclusif</p>
                    <p className="text-sm text-gray-600">Le propriétaire s'engage à vendre uniquement via LoopImmo</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Validation */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Récapitulatif et validation</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Propriétaire</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Nom</p>
                      <p className="font-medium">{formData.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Téléphone</p>
                      <p className="font-medium">{formData.ownerPhone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">{formData.ownerEmail}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Statut</p>
                      <p className="font-medium">{formData.ownerRegistered ? 'Client existant' : 'Nouveau client'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Bien immobilier</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-medium">{formData.type === 'apartment' ? 'Appartement' : 'Maison'} {formData.rooms} pièces</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Prix</p>
                      <p className="font-medium">{formatPrice(Number(formData.price))}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Surface</p>
                      <p className="font-medium">{formData.surface}m²</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Localisation</p>
                      <p className="font-medium">{formData.city} {formData.postalCode}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Commission estimée</h4>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatPrice(Number(formData.price) * Number(formData.commission) / 100 * 0.1)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Basé sur {formData.commission}% de commission, vous toucherez 10% à la signature
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Prochaines étapes</p>
                    <ol className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>1. Le propriétaire recevra un email pour valider la proposition</li>
                      <li>2. Une fois validée, notre équipe vérifiera les informations</li>
                      <li>3. L'annonce sera publiée sous 48h après validation</li>
                      <li>4. Vous serez notifié à chaque étape</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>

            <div className="flex gap-3">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Précédent
                </Button>
              )}
              
              {step < 4 ? (
                <Button variant="primary" onClick={() => setStep(step + 1)}>
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button variant="primary" onClick={() => onSave(formData)}>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer la proposition
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
