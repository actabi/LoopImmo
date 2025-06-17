import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Camera,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Maximize2,
  RotateCw,
  ZoomIn,
  Image,
  Calendar,
  Shield,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  qualityProperties,
  qualityItemsData,
  photoGuidelines as mockPhotoGuidelines,
  diagnosticRequirements as mockDiagnosticRequirements,
} from '../../mocks';

interface QualityCheckItem {
  id: string;
  type: 'photo' | 'diagnostic';
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  issues?: string[];
  url?: string;
  date?: Date;
}

export const QualityControl: React.FC = () => {
  const [activeProperty, setActiveProperty] = useState<string>('1');
  const [selectedItem, setSelectedItem] = useState<QualityCheckItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const properties = qualityProperties;
  const qualityItems: QualityCheckItem[] = qualityItemsData;

  const photoGuidelines = mockPhotoGuidelines;
  const diagnosticRequirements = mockDiagnosticRequirements;

  const photos = qualityItems.filter(item => item.type === 'photo');
  const diagnostics = qualityItems.filter(item => item.type === 'diagnostic');

  const getStatusIcon = (status: QualityCheckItem['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: QualityCheckItem['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contrôle qualité</h1>
        <p className="text-gray-600">Vérifiez la qualité des photos et la validité des diagnostics</p>
      </div>

      {/* Properties List */}
      <div className="grid lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <Card
            key={property.id}
            className={cn(
              "p-4 cursor-pointer transition-all",
              activeProperty === property.id ? "ring-2 ring-blue-500" : "hover:shadow-md"
            )}
            onClick={() => setActiveProperty(property.id)}
          >
            <h3 className="font-medium text-gray-900 mb-1">{property.title}</h3>
            <p className="text-sm text-gray-600 mb-3">Réf: {property.reference}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {property.pendingItems}/{property.totalItems} en attente
              </span>
              {property.pendingItems > 0 && (
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Photos Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Photos ({photos.length})
                </h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger tout
                </Button>
              </div>

              {/* Photo Gallery */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={cn(
                      "relative group cursor-pointer rounded-lg overflow-hidden border-2",
                      getStatusColor(photo.status)
                    )}
                    onClick={() => {
                      setSelectedItem(photo);
                      setCurrentPhotoIndex(index);
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute top-2 right-2">
                      {getStatusIcon(photo.status)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-xs text-white font-medium">{photo.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photo Viewer Modal */}
              {selectedItem && selectedItem.type === 'photo' && (
                <div className="mb-6 space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.name}
                      className="w-full h-96 object-contain"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="outline" className="bg-white">
                        <RotateCw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white">
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white"
                        onClick={() => setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1))}
                        disabled={currentPhotoIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="bg-white px-3 py-1 rounded text-sm">
                        {currentPhotoIndex + 1} / {photos.length}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white"
                        onClick={() => setCurrentPhotoIndex(Math.min(photos.length - 1, currentPhotoIndex + 1))}
                        disabled={currentPhotoIndex === photos.length - 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {selectedItem.issues && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-2">Problèmes identifiés:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedItem.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-red-700">{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button className="flex-1" variant="success">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approuver
                    </Button>
                    <Button className="flex-1" variant="danger">
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              )}

              {/* Guidelines */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  <Camera className="w-4 h-4 inline mr-2" />
                  Critères de qualité photo
                </h4>
                <ul className="space-y-1">
                  {photoGuidelines.map((guideline, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Diagnostics Section */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Diagnostics ({diagnostics.length})
              </h3>

              <div className="space-y-3">
                {diagnostics.map((diagnostic) => (
                  <div
                    key={diagnostic.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border",
                      getStatusColor(diagnostic.status)
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{diagnostic.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {diagnostic.date?.toLocaleDateString('fr-FR')}
                          </span>
                          {diagnostic.issues && (
                            <span className="text-sm text-red-600">
                              <AlertTriangle className="w-4 h-4 inline mr-1" />
                              {diagnostic.issues.length} problème(s)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(diagnostic.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <div className="bg-yellow-50 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-yellow-900 mb-2">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Exigences diagnostics
                </h4>
                <ul className="space-y-1">
                  {diagnosticRequirements.map((requirement, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé du contrôle</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Photos approuvées</span>
                  <span className="font-medium">
                    {photos.filter(p => p.status === 'approved').length}/{photos.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ 
                      width: `${(photos.filter(p => p.status === 'approved').length / photos.length) * 100}%` 
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Diagnostics validés</span>
                  <span className="font-medium">
                    {diagnostics.filter(d => d.status === 'approved').length}/{diagnostics.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ 
                      width: `${(diagnostics.filter(d => d.status === 'approved').length / diagnostics.length) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full" variant="success">
                <CheckCircle className="w-4 h-4 mr-2" />
                Valider le dossier complet
              </Button>
              <Button className="w-full" variant="outline">
                Demander des corrections
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Image className="w-4 h-4 mr-2" />
                Demander nouvelles photos
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Signaler diagnostic manquant
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                Contacter le vendeur
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
