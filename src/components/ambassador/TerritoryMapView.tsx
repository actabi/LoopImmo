import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Polygon, Popup, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Home, MapPin, Users, Crown, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Territory {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'premium';
  center: [number, number];
  radius?: number;
  polygon?: [number, number][];
  properties: number;
  leads: number;
  ambassadors?: number;
  performance?: number;
  locked?: boolean;
}

interface Property {
  id: string;
  position: [number, number];
  title: string;
  price: number;
  type: 'apartment' | 'house';
  urgency: 'high' | 'medium' | 'low';
}

const territories: Territory[] = [
  {
    id: '1',
    name: 'Lyon 7e - Guillotière',
    type: 'primary',
    center: [45.7484, 4.8467],
    radius: 300,
    properties: 8,
    leads: 12,
    performance: 87
  },
  {
    id: '2',
    name: 'Lyon 3e Nord',
    type: 'secondary',
    center: [45.7640, 4.8523],
    radius: 500,
    properties: 5,
    leads: 8,
    ambassadors: 3
  },
  {
    id: '3',
    name: 'Lyon 8e Est',
    type: 'secondary',
    center: [45.7333, 4.8693],
    radius: 500,
    properties: 3,
    leads: 4,
    ambassadors: 2
  },
  {
    id: '4',
    name: 'Presqu\'île',
    type: 'premium',
    center: [45.7578, 4.8320],
    polygon: [
      [45.7650, 4.8280],
      [45.7650, 4.8360],
      [45.7500, 4.8360],
      [45.7500, 4.8280]
    ],
    properties: 12,
    leads: 18,
    locked: false
  },
  {
    id: '5',
    name: 'Croix-Rousse',
    type: 'premium',
    center: [45.7749, 4.8325],
    polygon: [
      [45.7800, 4.8250],
      [45.7800, 4.8400],
      [45.7700, 4.8400],
      [45.7700, 4.8250]
    ],
    properties: 9,
    leads: 15,
    locked: false
  }
];

const properties: Property[] = [
  { id: '1', position: [45.7490, 4.8470], title: 'T3 65m²', price: 285000, type: 'apartment', urgency: 'high' },
  { id: '2', position: [45.7480, 4.8460], title: 'T2 48m²', price: 220000, type: 'apartment', urgency: 'medium' },
  { id: '3', position: [45.7645, 4.8525], title: 'T4 82m²', price: 380000, type: 'apartment', urgency: 'low' },
  { id: '4', position: [45.7580, 4.8330], title: 'T5 120m²', price: 650000, type: 'apartment', urgency: 'high' },
];

export const TerritoryMapView: React.FC = () => {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [showProperties, setShowProperties] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Ensure map is ready after component mount
    setMapReady(true);
  }, []);

  const getZoneColor = (type: Territory['type'], locked?: boolean) => {
    if (locked) return '#9CA3AF'; // gray for locked
    switch (type) {
      case 'primary':
        return '#10B981'; // green
      case 'secondary':
        return '#3B82F6'; // blue
      case 'premium':
        return '#F59E0B'; // yellow
      default:
        return '#6B7280';
    }
  };

  const getZoneOpacity = (type: Territory['type']) => {
    switch (type) {
      case 'primary':
        return 0.3;
      case 'secondary':
        return 0.2;
      case 'premium':
        return 0.25;
      default:
        return 0.2;
    }
  };

  const createCustomIcon = (urgency: Property['urgency']) => {
    const color = urgency === 'high' ? '#EF4444' : urgency === 'medium' ? '#F59E0B' : '#10B981';
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 21.875 12.5 41 12.5 41C12.5 41 25 21.875 25 12.5C25 5.59644 19.4036 0 12.5 0Z" fill="${color}"/>
          <circle cx="12.5" cy="12.5" r="8" fill="white"/>
          <circle cx="12.5" cy="12.5" r="5" fill="${color}"/>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -41],
    });
  };

  if (!mapReady) {
    return (
      <Card>
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de la carte...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">Carte des Territoires</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="success" size="sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Primaire
                </Badge>
                <Badge variant="info" size="sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  Secondaire
                </Badge>
                <Badge variant="warning" size="sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                  Premium
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={showProperties ? 'primary' : 'outline'}
                onClick={() => setShowProperties(!showProperties)}
              >
                <Home className="w-4 h-4 mr-2" />
                Biens ({properties.length})
              </Button>
              <Button size="sm" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Centrer
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Map */}
      <Card>
        <div className="h-[600px] relative">
          <MapContainer
            center={[45.7578, 4.8520]}
            zoom={13}
            className="h-full w-full rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render territories */}
            {territories.map((territory) => (
              <React.Fragment key={territory.id}>
                {territory.radius ? (
                  <Circle
                    center={territory.center}
                    radius={territory.radius}
                    pathOptions={{
                      fillColor: getZoneColor(territory.type, territory.locked),
                      fillOpacity: getZoneOpacity(territory.type),
                      color: getZoneColor(territory.type, territory.locked),
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () => setSelectedTerritory(territory),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-900">{territory.name}</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="flex items-center justify-between">
                            <span className="text-gray-600">Biens actifs:</span>
                            <span className="font-medium">{territory.properties}</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span className="text-gray-600">Leads:</span>
                            <span className="font-medium">{territory.leads}</span>
                          </p>
                          {territory.performance && (
                            <p className="flex items-center justify-between">
                              <span className="text-gray-600">Performance:</span>
                              <span className="font-medium text-green-600">{territory.performance}%</span>
                            </p>
                          )}
                          {territory.ambassadors && (
                            <p className="flex items-center justify-between">
                              <span className="text-gray-600">Ambassadeurs:</span>
                              <span className="font-medium">{territory.ambassadors}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                ) : territory.polygon ? (
                  <Polygon
                    positions={territory.polygon}
                    pathOptions={{
                      fillColor: getZoneColor(territory.type, territory.locked),
                      fillOpacity: getZoneOpacity(territory.type),
                      color: getZoneColor(territory.type, territory.locked),
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () => setSelectedTerritory(territory),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-900">{territory.name}</h4>
                        <Badge variant="warning" size="sm" className="mt-1">Zone Premium</Badge>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="flex items-center justify-between">
                            <span className="text-gray-600">Biens actifs:</span>
                            <span className="font-medium">{territory.properties}</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span className="text-gray-600">Leads:</span>
                            <span className="font-medium">{territory.leads}</span>
                          </p>
                          {territory.locked && (
                            <p className="text-xs text-gray-500 mt-2">
                              Niveau Platine requis
                            </p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Polygon>
                ) : null}
              </React.Fragment>
            ))}

            {/* Render properties */}
            {showProperties && properties.map((property) => (
              <Marker
                key={property.id}
                position={property.position}
                icon={createCustomIcon(property.urgency)}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold text-gray-900">{property.title}</h4>
                    <p className="text-lg font-bold text-primary-600 mt-1">
                      {property.price.toLocaleString('fr-FR')}€
                    </p>
                    <div className="mt-2">
                      <Badge 
                        variant={
                          property.urgency === 'high' ? 'error' : 
                          property.urgency === 'medium' ? 'warning' : 
                          'success'
                        } 
                        size="sm"
                      >
                        {property.urgency === 'high' ? 'Urgent' : 
                         property.urgency === 'medium' ? 'Prioritaire' : 
                         'Normal'}
                      </Badge>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      Voir détails
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Légende</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full opacity-50"></div>
                <span>Zone primaire (exclusive)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full opacity-50"></div>
                <span>Zone secondaire (partagée)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-50"></div>
                <span>Zone premium (niveau Or)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full opacity-50"></div>
                <span>Zone verrouillée</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Territory Details */}
      {selectedTerritory && (
        <Card>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedTerritory.name}</h3>
                <Badge 
                  variant={
                    selectedTerritory.type === 'primary' ? 'success' : 
                    selectedTerritory.type === 'secondary' ? 'info' : 
                    'warning'
                  }
                  size="sm"
                  className="mt-1"
                >
                  Zone {selectedTerritory.type === 'primary' ? 'Primaire' : 
                        selectedTerritory.type === 'secondary' ? 'Secondaire' : 
                        'Premium'}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedTerritory(null)}>
                Fermer
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="text-xs text-blue-600 font-medium">Biens</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedTerritory.properties}</p>
                <p className="text-xs text-gray-600 mt-1">Disponibles</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-xs text-purple-600 font-medium">Leads</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedTerritory.leads}</p>
                <p className="text-xs text-gray-600 mt-1">En cours</p>
              </div>

              {selectedTerritory.performance && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Performance</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedTerritory.performance}%</p>
                  <p className="text-xs text-gray-600 mt-1">Conversion</p>
                </div>
              )}

              {selectedTerritory.ambassadors && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <span className="text-xs text-yellow-600 font-medium">Équipe</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedTerritory.ambassadors}</p>
                  <p className="text-xs text-gray-600 mt-1">Ambassadeurs</p>
                </div>
              )}
            </div>

            {selectedTerritory.type === 'primary' && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-900">Zone exclusive</p>
                    <p className="text-green-700">Vous êtes le seul ambassadeur sur cette zone de 300m de rayon.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button className="flex-1">
                Voir les biens disponibles
              </Button>
              <Button variant="outline" className="flex-1">
                Statistiques détaillées
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
