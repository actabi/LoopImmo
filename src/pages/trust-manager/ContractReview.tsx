import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  FileText, CheckCircle, XCircle, AlertCircle, 
  Download, Eye, MessageSquare, Shield, Calendar,
  Euro, User, Home, AlertTriangle, Clock
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';

interface ContractClause {
  id: string;
  type: 'suspensive' | 'particular' | 'standard';
  title: string;
  content: string;
  mandatory: boolean;
  verified: boolean;
  issues?: string[];
}

interface Contract {
  id: string;
  type: 'compromis' | 'promesse';
  property: {
    title: string;
    price: number;
    reference: string;
  };
  buyer: {
    name: string;
    email: string;
  };
  seller: {
    name: string;
    email: string;
  };
  notary: {
    name: string;
    office: string;
  };
  dates: {
    signature: Date;
    completion: Date;
  };
  status: 'draft' | 'pending_review' | 'approved' | 'sent';
  clauses: ContractClause[];
}

export const ContractReview: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<string>('1');
  const [reviewNotes, setReviewNotes] = useState('');

  // Mock data
  const contracts: Contract[] = [
    {
      id: '1',
      type: 'compromis',
      property: {
        title: 'Appartement T3 - Lyon 6ème',
        price: 450000,
        reference: 'REF-2024-001'
      },
      buyer: {
        name: 'Jean Martin',
        email: 'jean.martin@email.com'
      },
      seller: {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com'
      },
      notary: {
        name: 'Me. Dupont',
        office: 'Étude Dupont & Associés'
      },
      dates: {
        signature: new Date('2024-01-20'),
        completion: new Date('2024-03-20')
      },
      status: 'pending_review',
      clauses: [
        {
          id: '1',
          type: 'suspensive',
          title: 'Condition suspensive d\'obtention de prêt',
          content: 'L\'acquéreur dispose d\'un délai de 45 jours pour obtenir un prêt de 360 000€ au taux maximum de 4.5%',
          mandatory: true,
          verified: true
        },
        {
          id: '2',
          type: 'suspensive',
          title: 'Condition suspensive de vente du bien actuel',
          content: 'La vente est conditionnée à la vente du bien situé au 123 rue Example, Lyon',
          mandatory: false,
          verified: true
        },
        {
          id: '3',
          type: 'particular',
          title: 'Clause de non-concurrence',
          content: 'Le vendeur s\'engage à ne pas exercer d\'activité commerciale similaire dans un rayon de 500m',
          mandatory: false,
          verified: false,
          issues: ['Clause inhabituelle pour un bien résidentiel', 'Durée non précisée']
        },
        {
          id: '4',
          type: 'standard',
          title: 'Garantie des vices cachés',
          content: 'Le vendeur garantit l\'acquéreur contre les vices cachés conformément aux articles 1641 et suivants du Code civil',
          mandatory: true,
          verified: true
        }
      ]
    },
    {
      id: '2',
      type: 'promesse',
      property: {
        title: 'Maison 5 pièces - Écully',
        price: 680000,
        reference: 'REF-2024-003'
      },
      buyer: {
        name: 'Sophie Bernard',
        email: 'sophie.bernard@email.com'
      },
      seller: {
        name: 'Pierre Leroy',
        email: 'pierre.leroy@email.com'
      },
      notary: {
        name: 'Me. Martin',
        office: 'SCP Martin & Partners'
      },
      dates: {
        signature: new Date('2024-01-22'),
        completion: new Date('2024-04-15')
      },
      status: 'draft',
      clauses: []
    }
  ];

  const currentContract = contracts.find(c => c.id === selectedContract);

  const mandatoryClauses = [
    'Condition suspensive d\'obtention de prêt',
    'Garantie des vices cachés',
    'Servitudes et charges',
    'État hypothécaire',
    'Diagnostics techniques obligatoires',
    'Surface Loi Carrez',
    'Délai de rétractation'
  ];

  const getClauseIcon = (type: ContractClause['type']) => {
    switch (type) {
      case 'suspensive':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'particular':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'standard':
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getClauseTypeLabel = (type: ContractClause['type']) => {
    switch (type) {
      case 'suspensive':
        return 'Condition suspensive';
      case 'particular':
        return 'Clause particulière';
      case 'standard':
        return 'Clause standard';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relecture de contrats</h1>
        <p className="text-gray-600">Vérifiez la conformité juridique des compromis et promesses de vente</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contracts List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-gray-900">Contrats en attente ({contracts.length})</h2>
          
          {contracts.map((contract) => (
            <Card
              key={contract.id}
              className={cn(
                "p-4 cursor-pointer transition-all",
                selectedContract === contract.id ? "ring-2 ring-blue-500" : "hover:shadow-md"
              )}
              onClick={() => setSelectedContract(contract.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className={cn(
                    "inline-block px-2 py-1 text-xs font-medium rounded-full mb-2",
                    contract.type === 'compromis' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                  )}>
                    {contract.type === 'compromis' ? 'Compromis' : 'Promesse'}
                  </span>
                  <h3 className="font-medium text-gray-900">{contract.property.title}</h3>
                </div>
                {contract.status === 'pending_review' && (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">Réf: {contract.property.reference}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{formatPrice(contract.property.price)}</span>
                <span className="text-gray-500">
                  Signature: {contract.dates.signature.toLocaleDateString('fr-FR')}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Contract Details */}
        {currentContract && (
          <div className="lg:col-span-2 space-y-6">
            {/* Contract Overview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Informations du contrat</h3>
                <span className={cn(
                  "px-3 py-1 text-sm font-medium rounded-full",
                  currentContract.status === 'approved' ? "bg-green-100 text-green-700" :
                  currentContract.status === 'pending_review' ? "bg-yellow-100 text-yellow-700" :
                  currentContract.status === 'sent' ? "bg-blue-100 text-blue-700" :
                  "bg-gray-100 text-gray-700"
                )}>
                  {currentContract.status === 'approved' ? 'Approuvé' :
                   currentContract.status === 'pending_review' ? 'En révision' :
                   currentContract.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vendeur</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{currentContract.seller.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">{currentContract.seller.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Acheteur</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{currentContract.buyer.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">{currentContract.buyer.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Notaire</p>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{currentContract.notary.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">{currentContract.notary.office}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dates importantes</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Signature: {currentContract.dates.signature.toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Acte définitif: {currentContract.dates.completion.toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir le contrat complet
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>
            </Card>

            {/* Clauses Review */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vérification des clauses</h3>

              {currentContract.clauses.length > 0 ? (
                <div className="space-y-4">
                  {currentContract.clauses.map((clause) => (
                    <div
                      key={clause.id}
                      className={cn(
                        "border rounded-lg p-4",
                        clause.verified ? "bg-green-50 border-green-200" : 
                        clause.issues ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          {getClauseIcon(clause.type)}
                          <div>
                            <h4 className="font-medium text-gray-900">{clause.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500">
                                {getClauseTypeLabel(clause.type)}
                              </span>
                              {clause.mandatory && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                  Obligatoire
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {clause.verified ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : clause.issues ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-2 ml-8">{clause.content}</p>

                      {clause.issues && (
                        <div className="mt-3 ml-8 p-3 bg-red-100 rounded">
                          <p className="text-sm font-medium text-red-900 mb-1">Problèmes identifiés:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {clause.issues.map((issue, index) => (
                              <li key={index} className="text-sm text-red-700">{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aucune clause n'a encore été ajoutée à ce contrat
                </p>
              )}

              {/* Mandatory Clauses Checklist */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-3">Clauses obligatoires</h4>
                <div className="space-y-2">
                  {mandatoryClauses.map((clause) => {
                    const isIncluded = currentContract.clauses.some(c => 
                      c.title.toLowerCase().includes(clause.toLowerCase())
                    );
                    return (
                      <div key={clause} className="flex items-center gap-2">
                        {isIncluded ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={cn(
                          "text-sm",
                          isIncluded ? "text-green-700" : "text-red-700"
                        )}>
                          {clause}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Review Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions de révision</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes de révision
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajoutez vos commentaires et recommandations..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="success">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approuver le contrat
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Demander des modifications
                  </Button>
                  <Button className="flex-1" variant="danger">
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter le contrat
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
