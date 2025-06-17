import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Camera, Upload, Download, Trash2, Eye, Star, AlertCircle,
  Image, Grid, List, Filter, Search, Home, CheckCircle,
  Info, ChevronLeft
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { getPropertyPhotos } from "../../services/dataService";

interface PropertyPhotos {
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  photos: Array<{
    id: string;
    url: string;
    title: string;
    isCover: boolean;
    uploadedAt: Date;
  }>;
}


export const AmbassadorPhotosPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const propertyPhotos = getPropertyPhotos();

  const handlePhotoSelect = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const handleSetCover = (photoId: string) => {
    console.log('Setting cover photo:', photoId);
  };

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" className="mb-2">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Retour aux biens
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Photos du bien</h1>
            <p className="text-gray-600 mt-1">{propertyPhotos.propertyTitle}</p>
          </div>
          <Button variant="primary">
            <Upload className="w-4 h-4 mr-2" />
            Ajouter des photos
          </Button>
        </div>

        {/* Property Info */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Home className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">{propertyPhotos.propertyTitle}</p>
              <p className="text-sm text-gray-600">{propertyPhotos.propertyAddress}</p>
            </div>
            <Badge variant="info" className="ml-auto">
              {propertyPhotos.photos.length} photos
            </Badge>
          </div>
        </Card>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Conseils pour de bonnes photos
                </p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Prenez les photos en journée avec un maximum de lumière naturelle</li>
                  <li>• Rangez et dépersonnalisez les espaces avant de photographier</li>
                  <li>• Utilisez des angles larges pour montrer l'espace dans son ensemble</li>
                  <li>• Minimum 10-15 photos recommandées pour une annonce attractive</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'grid' ? "bg-white shadow-sm" : "hover:bg-gray-200"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'list' ? "bg-white shadow-sm" : "hover:bg-gray-200"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {selectedPhotos.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedPhotos.length} sélectionnée(s)
                </span>
                <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Photos Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {propertyPhotos.photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  {photo.isCover && (
                    <Badge className="absolute top-2 left-2" variant="primary">
                      <Star className="w-3 h-3 mr-1" />
                      Photo principale
                    </Badge>
                  )}
                  
                  {/* Selection checkbox */}
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.includes(photo.id)}
                      onChange={() => handlePhotoSelect(photo.id)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {!photo.isCover && (
                        <Button size="sm" variant="white" onClick={() => handleSetCover(photo.id)}>
                          <Star className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="white">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-medium text-gray-900 text-sm">{photo.title}</p>
                  <p className="text-xs text-gray-500">
                    Ajoutée le {photo.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {propertyPhotos.photos.map((photo) => (
              <Card key={photo.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedPhotos.includes(photo.id)}
                    onChange={() => handlePhotoSelect(photo.id)}
                    className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{photo.title}</h3>
                      {photo.isCover && (
                        <Badge size="sm" variant="primary">
                          <Star className="w-3 h-3 mr-1" />
                          Photo principale
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Ajoutée le {photo.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {!photo.isCover && (
                      <Button size="sm" variant="outline" onClick={() => handleSetCover(photo.id)}>
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {propertyPhotos.photos.length === 0 && (
          <Card className="p-12 text-center">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune photo pour ce bien
            </h3>
            <p className="text-gray-600 mb-6">
              Ajoutez des photos pour rendre l'annonce plus attractive
            </p>
            <Button variant="primary">
              <Upload className="w-4 h-4 mr-2" />
              Ajouter les premières photos
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
