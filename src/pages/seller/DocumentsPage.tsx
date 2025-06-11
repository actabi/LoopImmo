import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  FileText, Upload, Download, Eye, Trash2, CheckCircle, 
  AlertCircle, Clock, Shield, Lock, FolderOpen,
  File, Image, FileCheck, AlertTriangle, Info, Plus,
  Home, Building, Filter, Search, Calendar, X,
  ChevronRight, Paperclip, FileX, RefreshCw
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { getProperties } from '../../services/dataService';

interface Document {
  id: string;
  name: string;
  type: 'diagnostic' | 'legal' | 'photo' | 'plan' | 'other';
  category: 'property' | 'general';
  propertyId?: string;
  size: string;
  uploadedAt: Date;
  status: 'valid' | 'pending' | 'rejected' | 'expired';
  required: boolean;
  expiryDate?: Date;
  comments?: string;
  sharedWith?: string[];
}

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'property' | 'general';
  type: 'diagnostic' | 'legal' | 'other';
  validityPeriod?: string;
  propertyTypes?: ('apartment' | 'house')[];
}

export const DocumentsPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'property' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);

  const properties = getProperties();

  // Documents requis
  const documentRequirements: DocumentRequirement[] = [
    // Documents spécifiques au bien
    {
      id: 'dpe',
      name: 'DPE - Diagnostic de performance énergétique',
      description: 'Obligatoire pour tous les biens en vente',
      required: true,
      category: 'property',
      type: 'diagnostic',
      validityPeriod: '10 ans'
    },
    {
      id: 'amiante',
      name: 'Diagnostic amiante',
      description: 'Obligatoire pour les biens construits avant 1997',
      required: true,
      category: 'property',
      type: 'diagnostic'
    },
    {
      id: 'plomb',
      name: 'Diagnostic plomb',
      description: 'Obligatoire pour les biens construits avant 1949',
      required: true,
      category: 'property',
      type: 'diagnostic'
    },
    {
      id: 'electricite',
      name: 'Diagnostic électricité',
      description: 'Obligatoire si installation > 15 ans',
      required: true,
      category: 'property',
      type: 'diagnostic',
      validityPeriod: '3 ans'
    },
    {
      id: 'gaz',
      name: 'Diagnostic gaz',
      description: 'Obligatoire si installation > 15 ans',
      required: true,
      category: 'property',
      type: 'diagnostic',
      validityPeriod: '3 ans'
    },
    {
      id: 'erp',
      name: 'État des risques et pollutions',
      description: 'Obligatoire pour tous les biens',
      required: true,
      category: 'property',
      type: 'diagnostic',
      validityPeriod: '6 mois'
    },
    {
      id: 'carrez',
      name: 'Loi Carrez',
      description: 'Obligatoire pour les appartements',
      required: true,
      category: 'property',
      type: 'diagnostic',
      propertyTypes: ['apartment']
    },
    {
      id: 'termites',
      name: 'Diagnostic termites',
      description: 'Selon zones géographiques',
      required: false,
      category: 'property',
      type: 'diagnostic',
      validityPeriod: '6 mois'
    },
    // Documents généraux
    {
      id: 'identite',
      name: 'Pièce d\'identité',
      description: 'CNI ou passeport en cours de validité',
      required: true,
      category: 'general',
      type: 'legal'
    },
    {
      id: 'rib',
      name: 'RIB',
      description: 'Pour le versement du prix de vente',
      required: true,
      category: 'general',
      type: 'legal'
    },
    {
      id: 'justif-domicile',
      name: 'Justificatif de domicile',
      description: 'Facture de moins de 3 mois',
      required: true,
      category: 'general',
      type: 'legal'
    }
  ];

  // Mock documents avec association aux biens
  const documents: Document[] = [
    // Documents du bien 1
    {
      id: '1',
      name: 'DPE - Appartement République',
      type: 'diagnostic',
      category: 'property',
      propertyId: '1',
      size: '2.4 MB',
      uploadedAt: new Date('2024-03-01'),
      status: 'valid',
      required: true,
      expiryDate: new Date('2034-03-01')
    },
    {
      id: '2',
      name: 'Diagnostic amiante - Appartement République',
      type: 'diagnostic',
      category: 'property',
      propertyId: '1',
      size: '1.8 MB',
      uploadedAt: new Date('2024-03-01'),
      status: 'valid',
      required: true
    },
    {
      id: '3',
      name: 'Loi Carrez - Appartement République',
      type: 'diagnostic',
      category: 'property',
      propertyId: '1',
      size: '0.8 MB',
      uploadedAt: new Date('2024-03-01'),
      status: 'pending',
      required: true,
      comments: 'En cours de validation'
    },
    // Documents du bien 2
    {
      id: '4',
      name: 'DPE - Maison Lyon',
      type: 'diagnostic',
      category: 'property',
      propertyId: '2',
      size: '2.1 MB',
      uploadedAt: new Date('2024-02-15'),
      status: 'expired',
      required: true,
      expiryDate: new Date('2024-02-01'),
      comments: 'Document expiré, merci de fournir une version à jour'
    },
    {
      id: '5',
      name: 'Diagnostic électricité - Maison Lyon',
      type: 'diagnostic',
      category: 'property',
      propertyId: '2',
      size: '1.5 MB',
      uploadedAt: new Date('2024-02-15'),
      status: 'valid',
      required: true,
      expiryDate: new Date('2027-02-15')
    },
    // Documents généraux
    {
      id: '6',
      name: 'Carte d\'identité',
      type: 'legal',
      category: 'general',
      size: '0.5 MB',
      uploadedAt: new Date('2024-01-15'),
      status: 'valid',
      required: true,
      sharedWith: ['notaire']
    },
    {
      id: '7',
      name: 'RIB',
      type: 'legal',
      category: 'general',
      size: '0.2 MB',
      uploadedAt: new Date('2024-01-15'),
      status: 'valid',
      required: true,
      sharedWith: ['notaire']
    },
    {
      id: '8',
      name: 'Justificatif de domicile',
      type: 'legal',
      category: 'general',
      size: '0.8 MB',
      uploadedAt: new Date('2024-03-05'),
      status: 'valid',
      required: true
    }
  ];

  // Filtrer les documents
  const filteredDocuments = documents.filter(doc => {
    const matchesProperty = selectedProperty === 'all' || doc.propertyId === selectedProperty;
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesProperty && matchesCategory && matchesSearch;
  });

  // Calculer les statistiques par bien
  const getPropertyStats = (propertyId: string) => {
    const propertyDocs = documents.filter(d => d.propertyId === propertyId);
    const property = properties.find(p => p.id === propertyId);
    const requiredDocs = documentRequirements.filter(req => 
      req.category === 'property' && 
      req.required &&
      (!req.propertyTypes || req.propertyTypes.includes(property?.type || 'apartment'))
    );
    
    const validDocs = propertyDocs.filter(d => d.status === 'valid' && d.required);
    const completion = requiredDocs.length > 0 
      ? Math.round((validDocs.length / requiredDocs.length) * 100)
      : 0;

    return {
      total: propertyDocs.length,
      valid: propertyDocs.filter(d => d.status === 'valid').length,
      pending: propertyDocs.filter(d => d.status === 'pending').length,
      issues: propertyDocs.filter(d => d.status === 'rejected' || d.status === 'expired').length,
      required: requiredDocs.length,
      completion
    };
  };

  // Statistiques globales
  const globalStats = {
    totalProperties: properties.length,
    completeProperties: properties.filter(p => getPropertyStats(p.id).completion === 100).length,
    totalDocuments: documents.length,
    validDocuments: documents.filter(d => d.status === 'valid').length,
    pendingDocuments: documents.filter(d => d.status === 'pending').length,
    issueDocuments: documents.filter(d => d.status === 'rejected' || d.status === 'expired').length
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusLabel = (status: Document['status']) => {
    switch (status) {
      case 'valid': return 'Validé';
      case 'pending': return 'En cours';
      case 'rejected': return 'Rejeté';
      case 'expired': return 'Expiré';
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600">Gérez tous vos documents de vente</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowRequirementsModal(true)}>
              <Info className="w-4 h-4 mr-2" />
              Documents requis
            </Button>
            <Button variant="primary" onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Ajouter un document
            </Button>
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Building className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">
                {globalStats.completeProperties}/{globalStats.totalProperties}
              </span>
            </div>
            <p className="text-sm text-gray-600">Biens complets</p>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(globalStats.completeProperties / globalStats.totalProperties) * 100}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{globalStats.validDocuments}</span>
            </div>
            <p className="text-sm text-gray-600">Documents validés</p>
            <p className="text-xs text-gray-500 mt-1">Sur {globalStats.totalDocuments} au total</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              {globalStats.pendingDocuments > 0 && (
                <Badge size="sm" variant="warning">{globalStats.pendingDocuments}</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{globalStats.pendingDocuments}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-500" />
              {globalStats.issueDocuments > 0 && (
                <Badge size="sm" variant="error">{globalStats.issueDocuments}</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{globalStats.issueDocuments}</p>
            <p className="text-sm text-gray-600">À corriger</p>
          </Card>
        </div>

        {/* Filtres et recherche */}
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
                {properties.map((property) => {
                  const stats = getPropertyStats(property.id);
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
                      <Badge 
                        size="sm" 
                        variant={stats.completion === 100 ? 'success' : stats.issues > 0 ? 'error' : 'warning'}
                      >
                        {stats.completion}%
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type de documents */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de documents
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tous les documents</option>
                <option value="property">Documents du bien</option>
                <option value="general">Documents généraux</option>
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
                  placeholder="Nom du document..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Statut par bien (si un bien est sélectionné) */}
        {selectedProperty !== 'all' && (
          <Card className="p-6 bg-gradient-to-r from-primary-50 to-primary-100">
            {(() => {
              const property = properties.find(p => p.id === selectedProperty);
              const stats = getPropertyStats(selectedProperty);
              const requiredDocs = documentRequirements.filter(req => 
                req.category === 'property' && 
                req.required &&
                (!req.propertyTypes || req.propertyTypes.includes(property?.type || 'apartment'))
              );
              const propertyDocs = documents.filter(d => d.propertyId === selectedProperty);
              const missingDocs = requiredDocs.filter(req => 
                !propertyDocs.some(doc => 
                  doc.name.toLowerCase().includes(req.name.toLowerCase()) && 
                  doc.status === 'valid'
                )
              );

              return (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {property?.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property?.location.address}, {property?.location.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary-700">{stats.completion}%</p>
                      <p className="text-sm text-gray-600">Complété</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Documents requis</p>
                      <p className="text-lg font-semibold">{stats.required}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Validés</p>
                      <p className="text-lg font-semibold text-green-600">{stats.valid}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">En attente</p>
                      <p className="text-lg font-semibold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">À corriger</p>
                      <p className="text-lg font-semibold text-red-600">{stats.issues}</p>
                    </div>
                  </div>

                  {missingDocs.length > 0 && (
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <FileX className="w-4 h-4 text-red-500" />
                        Documents manquants
                      </h4>
                      <div className="space-y-1">
                        {missingDocs.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{doc.name}</span>
                            <Button size="sm" variant="primary">
                              <Upload className="w-3 h-3 mr-1" />
                              Ajouter
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </Card>
        )}

        {/* Liste des documents */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun document trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Essayez avec d\'autres termes de recherche' : 'Commencez par ajouter vos documents'}
              </p>
              <Button variant="primary" onClick={() => setShowUploadModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un document
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredDocuments.map((doc) => {
                const property = doc.propertyId ? properties.find(p => p.id === doc.propertyId) : null;
                
                return (
                  <Card key={doc.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          doc.type === 'diagnostic' && "bg-blue-100",
                          doc.type === 'legal' && "bg-purple-100",
                          doc.type === 'photo' && "bg-green-100",
                          doc.type === 'plan' && "bg-indigo-100",
                          doc.type === 'other' && "bg-gray-100"
                        )}>
                          <FileText className={cn(
                            "w-6 h-6",
                            doc.type === 'diagnostic' && "text-blue-600",
                            doc.type === 'legal' && "text-purple-600",
                            doc.type === 'photo' && "text-green-600",
                            doc.type === 'plan' && "text-indigo-600",
                            doc.type === 'other' && "text-gray-600"
                          )} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                              {property && (
                                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                  <Building className="w-3 h-3" />
                                  {property.title}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {doc.required && (
                                <Badge size="sm" variant="outline">Obligatoire</Badge>
                              )}
                              <Badge size="sm" variant={doc.category === 'property' ? 'default' : 'secondary'}>
                                {doc.category === 'property' ? 'Document du bien' : 'Document général'}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(doc.status)}
                                <span className={cn(
                                  "text-sm font-medium",
                                  doc.status === 'valid' && "text-green-600",
                                  doc.status === 'pending' && "text-yellow-600",
                                  doc.status === 'rejected' && "text-red-600",
                                  doc.status === 'expired' && "text-orange-600"
                                )}>
                                  {getStatusLabel(doc.status)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Ajouté le {doc.uploadedAt.toLocaleDateString('fr-FR')}
                            </span>
                            {doc.expiryDate && (
                              <>
                                <span>•</span>
                                <span className={cn(
                                  "flex items-center gap-1",
                                  doc.expiryDate < new Date() && "text-red-600 font-medium"
                                )}>
                                  <Clock className="w-3 h-3" />
                                  Expire le {doc.expiryDate.toLocaleDateString('fr-FR')}
                                </span>
                              </>
                            )}
                          </div>

                          {doc.comments && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-2">
                              <p className="text-sm text-gray-700">{doc.comments}</p>
                            </div>
                          )}

                          {doc.sharedWith && doc.sharedWith.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Partagé avec : {doc.sharedWith.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" title="Voir">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" title="Télécharger">
                          <Download className="w-4 h-4" />
                        </Button>
                        {doc.status === 'rejected' || doc.status === 'expired' ? (
                          <Button size="sm" variant="primary" title="Remplacer">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" title="Supprimer">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Section Documents généraux */}
        {selectedProperty === 'all' && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Documents généraux obligatoires
            </h2>
            <div className="grid lg:grid-cols-2 gap-4">
              {documentRequirements.filter(req => req.category === 'general' && req.required).map((req) => {
                const doc = documents.find(d => 
                  d.category === 'general' && 
                  d.name.toLowerCase().includes(req.name.toLowerCase())
                );
                
                return (
                  <Card key={req.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{req.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                      </div>
                      {doc ? (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <span className="text-sm font-medium text-green-600">
                            {getStatusLabel(doc.status)}
                          </span>
                        </div>
                      ) : (
                        <Button size="sm" variant="primary">
                          <Upload className="w-3 h-3 mr-1" />
                          Ajouter
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
