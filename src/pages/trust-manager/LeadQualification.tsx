import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  User, FileText, CreditCard, Shield, CheckCircle, 
  XCircle, AlertCircle, Phone, Mail, Calendar,
  TrendingUp, Euro, Building, MapPin, Clock
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';

interface BuyerLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: {
    id: string;
    title: string;
    price: number;
    location: string;
  };
  budget: {
    min: number;
    max: number;
  };
  financing: {
    type: 'cash' | 'loan' | 'mixed';
    loanAmount?: number;
    downPayment?: number;
    preApproved?: boolean;
    bank?: string;
  };
  documents: {
    identity: boolean;
    incomeProof: boolean;
    loanSimulation: boolean;
    downPaymentProof: boolean;
  };
  score: number;
  status: 'pending' | 'qualified' | 'rejected';
  createdAt: Date;
  notes?: string;
}

export const LeadQualification: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<string>('1');
  const [qualificationNotes, setQualificationNotes] = useState('');

  // Mock data
  const leads: BuyerLead[] = [
    {
      id: '1',
      name: 'Jean Martin',
      email: 'jean.martin@email.com',
      phone: '06 12 34 56 78',
      propertyInterest: {
        id: 'REF-2024-001',
        title: 'Appartement T3 - Lyon 6ème',
        price: 450000,
        location: 'Lyon 6ème'
      },
      budget: {
        min: 400000,
        max: 500000
      },
      financing: {
        type: 'loan',
        loanAmount: 360000,
        downPayment: 90000,
        preApproved: true,
        bank: 'Crédit Agricole'
      },
      documents: {
        identity: true,
        incomeProof: true,
        loanSimulation: true,
        downPaymentProof: false
      },
      score: 85,
      status: 'pending',
      createdAt: new Date('2024-01-15T10:00:00')
    },
    {
      id: '2',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      phone: '06 98 76 54 32',
      propertyInterest: {
        id: 'REF-2024-003',
        title: 'Maison 5 pièces - Écully',
        price: 680000,
        location: 'Écully'
      },
      budget: {
        min: 600000,
        max: 700000
      },
      financing: {
        type: 'mixed',
        loanAmount: 400000,
        downPayment: 280000,
        preApproved: false
      },
      documents: {
        identity: true,
        incomeProof: false,
        loanSimulation: false,
        downPaymentProof: true
      },
      score: 65,
      status: 'pending',
      createdAt: new Date('2024-01-15T11:00:00')
    }
  ];

  const currentLead = leads.find(l => l.id === selectedLead);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    return 'À risque';
  };

  const calculateFinancingCapacity = (lead: BuyerLead) => {
    if (lead.financing.type === 'cash') return 100;
    if (lead.financing.type === 'loan' && lead.financing.preApproved) return 90;
    if (lead.financing.type === 'mixed' && lead.financing.downPayment && lead.financing.downPayment >= lead.propertyInterest.price * 0.2) return 80;
    return 60;
  };

  const qualificationCriteria = [
    {
      label: 'Budget adapté au bien',
      met: currentLead ? currentLead.propertyInterest.price <= currentLead.budget.max : false,
      weight: 25
    },
    {
      label: 'Financement sécurisé',
      met: currentLead ? currentLead.financing.preApproved || currentLead.financing.type === 'cash' : false,
      weight: 30
    },
    {
      label: 'Documents complets',
      met: currentLead ? Object.values(currentLead.documents).filter(Boolean).length >= 3 : false,
      weight: 20
    },
    {
      label: 'Apport suffisant (20%)',
      met: currentLead ? (currentLead.financing.downPayment || 0) >= currentLead.propertyInterest.price * 0.2 : false,
      weight: 25
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Qualification des leads acheteurs</h1>
        <p className="text-gray-600">Évaluez la solidité financière et la motivation des acheteurs</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-gray-900">Leads en attente ({leads.length})</h2>
          
          {leads.map((lead) => (
            <Card
              key={lead.id}
              className={cn(
                "p-4 cursor-pointer transition-all",
                selectedLead === lead.id ? "ring-2 ring-blue-500" : "hover:shadow-md"
              )}
              onClick={() => setSelectedLead(lead.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.propertyInterest.title}</p>
                </div>
                <div className="text-right">
                  <span className={cn("text-2xl font-bold", getScoreColor(lead.score))}>
                    {lead.score}
                  </span>
                  <p className={cn("text-xs", getScoreColor(lead.score))}>
                    {getScoreLabel(lead.score)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Budget: {formatPrice(lead.budget.max)}
                </span>
                <span className="text-gray-500">
                  {lead.financing.type === 'cash' ? 'Cash' : 
                   lead.financing.type === 'loan' ? 'Crédit' : 'Mixte'}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Lead Details */}
        {currentLead && (
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Nom complet</p>
                      <p className="font-medium">{currentLead.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{currentLead.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-medium">{currentLead.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Date de contact</p>
                      <p className="font-medium">{currentLead.createdAt.toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Property Interest */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bien recherché</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{currentLead.propertyInterest.title}</h4>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {currentLead.propertyInterest.location}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(currentLead.propertyInterest.price)}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Budget acheteur: {formatPrice(currentLead.budget.min)} - {formatPrice(currentLead.budget.max)}
                  </span>
                  {currentLead.propertyInterest.price <= currentLead.budget.max ? (
                    <span className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Dans le budget
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Hors budget
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* Financing Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan de financement</h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type de financement</p>
                    <p className="font-medium">
                      {currentLead.financing.type === 'cash' ? 'Comptant' :
                       currentLead.financing.type === 'loan' ? 'Crédit immobilier' : 'Mixte'}
                    </p>
                  </div>
                  {currentLead.financing.bank && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Établissement bancaire</p>
                      <p className="font-medium">{currentLead.financing.bank}</p>
                    </div>
                  )}
                </div>

                {currentLead.financing.type !== 'cash' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Montant du crédit</p>
                        <p className="font-medium">{formatPrice(currentLead.financing.loanAmount || 0)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Apport personnel</p>
                        <p className="font-medium">
                          {formatPrice(currentLead.financing.downPayment || 0)}
                          <span className="text-sm text-gray-500 ml-2">
                            ({Math.round(((currentLead.financing.downPayment || 0) / currentLead.propertyInterest.price) * 100)}%)
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {currentLead.financing.preApproved ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-medium text-green-700">
                            Accord de principe obtenu
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-700">
                            En attente d'accord bancaire
                          </span>
                        </>
                      )}
                    </div>
                  </>
                )}

                {/* Financing Capacity Score */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Capacité de financement</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {calculateFinancingCapacity(currentLead)}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${calculateFinancingCapacity(currentLead)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Documents Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents fournis</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(currentLead.documents).map(([key, value]) => (
                  <div
                    key={key}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      value ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={cn(
                        "w-5 h-5",
                        value ? "text-green-500" : "text-gray-400"
                      )} />
                      <span className="text-sm font-medium text-gray-900">
                        {key === 'identity' ? 'Pièce d\'identité' :
                         key === 'incomeProof' ? 'Justificatifs de revenus' :
                         key === 'loanSimulation' ? 'Simulation de prêt' :
                         'Justificatif d\'apport'}
                      </span>
                    </div>
                    {value ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Qualification Score */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Score de qualification</h3>
              
              <div className="space-y-4">
                {qualificationCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {criterion.met ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900">{criterion.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">{criterion.weight}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Score global</span>
                  <span className={cn("text-3xl font-bold", getScoreColor(currentLead.score))}>
                    {currentLead.score}/100
                  </span>
                </div>
                <p className={cn("text-sm", getScoreColor(currentLead.score))}>
                  Profil {getScoreLabel(currentLead.score).toLowerCase()}
                </p>
              </div>
            </Card>

            {/* Qualification Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions de qualification</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes de qualification
                  </label>
                  <textarea
                    value={qualificationNotes}
                    onChange={(e) => setQualificationNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajoutez vos observations sur ce lead..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="success">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Qualifier le lead
                  </Button>
                  <Button className="flex-1" variant="outline">
                    Demander des documents
                  </Button>
                  <Button className="flex-1" variant="danger">
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter le lead
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
