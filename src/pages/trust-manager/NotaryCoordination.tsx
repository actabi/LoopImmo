import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  FileText, Calendar, Clock, CheckCircle, AlertCircle,
  Download, Upload, Send, User, Building, Euro,
  Phone, Mail, MapPin, Shield, TrendingUp
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';

interface NotaryFile {
  id: string;
  property: {
    title: string;
    price: number;
    reference: string;
  };
  buyer: string;
  seller: string;
  notary: {
    name: string;
    office: string;
    email: string;
    phone: string;
  };
  status: 'preparing' | 'sent' | 'received' | 'completed';
  dates: {
    compromis: Date;
    acteDefinitif: Date;
    created: Date;
    lastUpdate: Date;
  };
  documents: {
    name: string;
    status: 'pending' | 'received' | 'validated';
    required: boolean;
    uploadedAt?: Date;
  }[];
  fundingStatus: {
    totalAmount: number;
    received: number;
    distributed: boolean;
  };
}

export const NotaryCoordination: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('1');
  const [coordinationNotes, setCoordinationNotes] = useState('');

  // Mock data
  const notaryFiles: NotaryFile[] = [
    {
      id: '1',
      property: {
        title: 'Appartement T3 - Lyon 6ème',
        price: 450000,
        reference: 'REF-2024-001'
      },
      buyer: 'Jean Martin',
      seller: 'Marie Dubois',
      notary: {
        name: 'Me. Dupont',
        office: 'Étude Dupont & Associés',
        email: 'contact@dupont-notaires.fr',
        phone: '04 78 12 34 56'
      },
      status: 'sent',
      dates: {
        compromis: new Date('2024-01-20'),
        acteDefinitif: new Date('2024-03-20'),
        created: new Date('2024-01-15'),
        lastUpdate: new Date('2024-01-16')
      },
      documents: [
        { name: 'Compromis signé', status: 'validated', required: true, uploadedAt: new Date('2024-01-20') },
        { name: 'Pièces d\'identité', status: 'validated', required: true, uploadedAt: new Date('2024-01-18') },
        { name: 'Titre de propriété', status: 'received', required: true, uploadedAt: new Date('2024-01-19') },
        { name: 'Diagnostics techniques', status: 'validated', required: true, uploadedAt: new Date('2024-01-17') },
        { name: 'État hypothécaire', status: 'pending', required: true },
        { name: 'Certificat d\'urbanisme', status: 'pending', required: false }
      ],
      fundingStatus: {
        totalAmount: 450000,
        received: 90000,
        distributed: false
      }
    },
    {
      id: '2',
      property: {
        title: 'Maison 5 pièces - Écully',
        price: 680000,
        reference: 'REF-2024-003'
      },
      buyer: 'Sophie Bernard',
      seller: 'Pierre Leroy',
      notary: {
        name: 'Me. Martin',
        office: 'SCP Martin & Partners',
        email: 'etude@martin-notaires.fr',
        phone: '04 78 98 76 54'
      },
      status: 'preparing',
      dates: {
        compromis: new Date('2024-01-22'),
        acteDefinitif: new Date('2024-04-15'),
        created: new Date('2024-01-16'),
        lastUpdate: new Date('2024-01-16')
      },
      documents: [
        { name: 'Compromis signé', status: 'pending', required: true },
        { name: 'Pièces d\'identité', status: 'received', required: true, uploadedAt: new Date('2024-01-16') },
        { name: 'Titre de propriété', status: 'pending', required: true },
        { name: 'Diagnostics techniques', status: 'pending', required: true },
        { name: 'État hypothécaire', status: 'pending', required: true },
        { name: 'Certificat d\'urbanisme', status: 'pending', required: false }
      ],
      fundingStatus: {
        totalAmount: 680000,
        received: 0,
        distributed: false
      }
    }
  ];

  const currentFile = notaryFiles.find(f => f.id === selectedFile);

  const getStatusColor = (status: NotaryFile['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'received':
        return 'bg-blue-100 text-blue-700';
      case 'sent':
        return 'bg-yellow-100 text-yellow-700';
      case 'preparing':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: NotaryFile['status']) => {
    switch (status) {
      case 'completed':
        return 'Finalisé';
      case 'received':
        return 'Documents reçus';
      case 'sent':
        return 'Envoyé au notaire';
      case 'preparing':
        return 'En préparation';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'received':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const calculateProgress = (file: NotaryFile) => {
    const totalDocs = file.documents.length;
    const completedDocs = file.documents.filter(d => d.status === 'validated').length;
    return Math.round((completedDocs / totalDocs) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Coordination notariale</h1>
        <p className="text-gray-600">Gérez les dossiers et la communication avec les notaires</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Files List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-gray-900">Dossiers actifs ({notaryFiles.length})</h2>
          
          {notaryFiles.map((file) => {
            const progress = calculateProgress(file);
            return (
              <Card
                key={file.id}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  selectedFile === file.id ? "ring-2 ring-blue-500" : "hover:shadow-md"
                )}
                onClick={() => setSelectedFile(file.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{file.property.title}</h3>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    getStatusColor(file.status)
                  )}>
                    {getStatusLabel(file.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Réf: {file.property.reference}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progression</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Acte: {file.dates.acteDefinitif.toLocaleDateString('fr-FR')}</span>
                  <span>{file.notary.name}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* File Details */}
        {currentFile && (
          <div className="lg:col-span-2 space-y-6">
            {/* File Overview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Informations du dossier</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Créé le {currentFile.dates.created.toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bien</p>
                    <p className="font-medium">{currentFile.property.title}</p>
                    <p className="text-sm text-gray-500">{formatPrice(currentFile.property.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vendeur</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{currentFile.seller}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Acheteur</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{currentFile.buyer}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dates clés</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-gray-500">Compromis:</span>{' '}
                        <span className="font-medium">{currentFile.dates.compromis.toLocaleDateString('fr-FR')}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Acte définitif:</span>{' '}
                        <span className="font-medium">{currentFile.dates.acteDefinitif.toLocaleDateString('fr-FR')}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Délai restant</p>
                    <p className="font-medium text-orange-600">
                      {Math.ceil((currentFile.dates.acteDefinitif.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notary Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notaire en charge</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{currentFile.notary.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{currentFile.notary.office}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{currentFile.notary.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{currentFile.notary.phone}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Documents Status */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Documents du dossier</h3>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>

              <div className="space-y-3">
                {currentFile.documents.map((doc, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      doc.status === 'validated' ? "bg-green-50 border-green-200" :
                      doc.status === 'received' ? "bg-blue-50 border-blue-200" :
                      "bg-gray-50 border-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {doc.name}
                          {doc.required && (
                            <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                              Obligatoire
                            </span>
                          )}
                        </p>
                        {doc.uploadedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Reçu le {doc.uploadedAt.toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDocumentStatusIcon(doc.status)}
                      {doc.status === 'received' && (
                        <Button size="sm" variant="outline">
                          Valider
                        </Button>
                      )}
                      {doc.status === 'validated' && (
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {currentFile.documents.filter(d => d.status === 'pending' && d.required).length} document(s) obligatoire(s) en attente
                </p>
              </div>
            </Card>

            {/* Funding Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État du financement</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Montant total</span>
                    <span className="font-medium">{formatPrice(currentFile.fundingStatus.totalAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Montant reçu</span>
                    <span className="font-medium text-green-600">
                      {formatPrice(currentFile.fundingStatus.received)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reste à recevoir</span>
                    <span className="font-medium text-orange-600">
                      {formatPrice(currentFile.fundingStatus.totalAmount - currentFile.fundingStatus.received)}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progression du financement</span>
                    <span className="text-sm font-medium">
                      {Math.round((currentFile.fundingStatus.received / currentFile.fundingStatus.totalAmount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ 
                        width: `${(currentFile.fundingStatus.received / currentFile.fundingStatus.totalAmount) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {!currentFile.fundingStatus.distributed && currentFile.fundingStatus.received === currentFile.fundingStatus.totalAmount && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Financement complet reçu - Prêt pour distribution
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Coordination Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions de coordination</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes de coordination
                  </label>
                  <textarea
                    value={coordinationNotes}
                    onChange={(e) => setCoordinationNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajoutez des notes pour le suivi du dossier..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer au notaire
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Générer checklist
                  </Button>
                  <Button variant="outline">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Relancer documents
                  </Button>
                  <Button variant="success">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider le dossier
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
