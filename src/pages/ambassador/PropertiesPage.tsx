import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { PropertyForm } from '../../components/shared/PropertyForm';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Plus, Home, Eye, Edit, Camera, Calendar,
  MapPin, Euro, Users, AlertCircle, CheckCircle
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

import { getManagedProperties } from "../../services/dataService";
interface ManagedProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  surface: number;
  rooms: number;
  status: 'draft' | 'active' | 'sold';
  owner: {
    name: string;
    phone: string;
    email: string;
    connected: boolean;
  };
  photos: number;
  visits: {
    scheduled: number;
    completed: number;
  };
  createdAt: Date;
  lastUpdate: Date;
}


export const AmbassadorPropertiesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<ManagedProperty | null>(null);

  const managedProperties = getManagedProperties();

  const handleSaveProperty = (data: any) => {
    console.log('Saving property:', data);
    setShowForm(false);
    setSelectedProperty(null);
  };

  if (showForm) {
    return (
      <DashboardLayout role="ambassador">
        <PropertyForm
          property={selectedProperty}
          onSave={handleSaveProperty}
          onCancel={() => {
            setShowForm(false);
            setSelectedProperty(null);
          }}
          userRole="ambassador"
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
            <h1 className="text-2xl font-bold text-gray-900">Biens gérés</h1>
            <p className="text-gray-600 mt-1">Gérez les annonces de vos vendeurs</p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle annonce
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Gestion partagée des annonces
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Vous pouvez créer et modifier les annonces. Les vendeurs connectés peuvent également 
                  les éditer et suivre leur progression.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Properties List */}
        <div className="space-y-4">
          {managedProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        {property.photos > 0 ? (
                          <img 
                            src={`https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=200`}
                            alt={property.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Camera className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                          <Badge variant={
                            property.status === 'active' ? 'success' :
                            property.status === 'draft' ? 'warning' : 'default'
                          }>
                            {property.status === 'active' ? 'Publiée' :
                             property.status === 'draft' ? 'Brouillon' : 'Vendue'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {property.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Euro className="w-4 h-4" />
                            {formatPrice(property.price)}
                          </span>
                          <span>{property.surface}m² • {property.rooms} pièces</span>
                        </div>

                        <div className="flex items-center gap-6 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Propriétaire</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{property.owner.name}</p>
                              {property.owner.connected ? (
                                <Badge size="sm" variant="success">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Connecté
                                </Badge>
                              ) : (
                                <Badge size="sm" variant="default">
                                  Non connecté
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Photos</p>
                            <p className="text-sm font-medium text-gray-900">
                              {property.photos > 0 ? `${property.photos} photos` : 'Aucune photo'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Visites</p>
                            <p className="text-sm font-medium text-gray-900">
                              {property.visits.scheduled} prévues • {property.visits.completed} effectuées
                            </p>
                          </div>
                        </div>

                        {property.status === 'draft' && (
                          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <p className="text-sm text-yellow-900">
                              Cette annonce doit être complétée avant publication
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t">
                  <Button 
                    variant="primary"
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier l'annonce
                  </Button>
                  
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Gérer les photos
                  </Button>
                  
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Planifier une visite
                  </Button>
                  
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir l'annonce
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {managedProperties.length === 0 && (
          <Card className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune annonce pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer une annonce pour un de vos vendeurs
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Créer ma première annonce
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
