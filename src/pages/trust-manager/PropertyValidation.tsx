import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  CheckCircle, XCircle, AlertCircle, FileText, Camera, 
  Home, Euro, Ruler, Calendar, Shield, ChevronRight,
  Download, Eye, MessageSquare
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import {
  pendingValidationProperties,
  validationChecklistData,
  validationPropertyDetails,
} from '../../mocks';

interface ValidationItem {
  id: string;
  label: string;
  status: 'valid' | 'invalid' | 'pending';
  required: boolean;
  details?: string;
}

export const PropertyValidation: React.FC = () => {
  const [activeProperty, setActiveProperty] = useState<string | null>('1');
  const [validationNotes, setValidationNotes] = useState('');

  const pendingProperties = pendingValidationProperties;
  const validationChecklist: ValidationItem[] = validationChecklistData;
  const propertyDetails = validationPropertyDetails;

  const getStatusIcon = (status: ValidationItem['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'invalid':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: ValidationItem['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-50 border-green-200';
      case 'invalid':
        return 'bg-red-50 border-red-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const validItems = validationChecklist.filter(item => item.status === 'valid').length;
  const totalItems = validationChecklist.length;
  const validationScore = Math.round((validItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Validation des annonces</h1>
        <p className="text-gray-600">Vérifiez la conformité légale et la qualité des annonces</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Properties List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-gray-900">Annonces en attente ({pendingProperties.length})</h2>
          
          {pendingProperties.map((property) => (
            <Card
              key={property.id}
              className={cn(
                "p-4 cursor-pointer transition-all",
                activeProperty === property.id ? "ring-2 ring-blue-500" : "hover:shadow-md"
              )}
              onClick={() => setActiveProperty(property.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{property.title}</h3>
                {property.priority === 'high' && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                    Prioritaire
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">Réf: {property.reference}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{formatPrice(property.price)}</span>
                <span className="text-gray-500">{property.surface} m²</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Soumis il y a {Math.floor((new Date().getTime() - property.submittedAt.getTime()) / (1000 * 60 * 60))}h
              </p>
            </Card>
          ))}
        </div>

        {/* Validation Details */}
        {activeProperty && (
          <div className="lg:col-span-2 space-y-6">
            {/* Validation Score */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Score de validation</h3>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-3xl font-bold",
                    validationScore >= 80 ? "text-green-600" :
                    validationScore >= 60 ? "text-yellow-600" : "text-red-600"
                  )}>
                    {validationScore}%
                  </span>
                  <span className="text-gray-500">({validItems}/{totalItems})</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className={cn(
                    "h-3 rounded-full transition-all",
                    validationScore >= 80 ? "bg-green-500" :
                    validationScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${validationScore}%` }}
                />
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {validationChecklist.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border",
                      getStatusColor(item.status)
                    )}
                  >
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        {item.required && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                            Obligatoire
                          </span>
                        )}
                      </div>
                      {item.details && (
                        <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Property Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du bien</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="text-sm font-medium">{propertyDetails.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Surface:</span>
                    <span className="text-sm font-medium">{propertyDetails.surface} m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Construction:</span>
                    <span className="text-sm font-medium">{propertyDetails.construction}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Charges:</span>
                    <span className="text-sm font-medium">{propertyDetails.charges}€/mois</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Copropriété:</span>
                    <span className="text-sm font-medium">{propertyDetails.copropriete.lots} lots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Taxe foncière:</span>
                    <span className="text-sm font-medium">{propertyDetails.taxeFonciere}€/an</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Syndic:</span>
                    <span className="text-sm font-medium">{propertyDetails.copropriete.syndicName}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir l'annonce
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Voir les photos
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger les documents
                </Button>
              </div>
            </Card>

            {/* Validation Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions de validation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes de validation
                  </label>
                  <textarea
                    value={validationNotes}
                    onChange={(e) => setValidationNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajoutez des notes ou des demandes de correction..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="success">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approuver l'annonce
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Demander des corrections
                  </Button>
                  <Button className="flex-1" variant="danger">
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter l'annonce
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
