import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MapPin, Settings, BarChart3, Crown, Users, Home, Trophy } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TerritoryMapProps {
  primaryZone: {
    name: string;
    address: string;
    exclusive: boolean;
    validUntil: Date;
    performance: number;
  };
  secondaryZones: string[];
  premiumZones: string[];
  hasGoldAccess: boolean;
}

export const TerritoryMap: React.FC<TerritoryMapProps> = ({
  primaryZone,
  secondaryZones,
  premiumZones,
  hasGoldAccess
}) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <Card>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Mon Territoire</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowMap(!showMap)}>
              <MapPin className="w-4 h-4 mr-2" />
              {showMap ? 'Masquer' : 'Voir'} carte
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Gérer zones
            </Button>
            <Button size="sm" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Primary Zone */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Zone Primaire</h4>
                <p className="text-sm text-gray-600">{primaryZone.name} - {primaryZone.address}</p>
              </div>
            </div>
            {primaryZone.exclusive && (
              <Badge variant="success" size="sm">Exclusive</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
            <div>
              <span className="text-gray-600">Valide jusqu'au:</span>
              <p className="font-medium">
                {primaryZone.validUntil.toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Performance:</span>
              <p className="font-medium text-green-600">{primaryZone.performance}% ✅</p>
            </div>
          </div>
        </div>

        {/* Secondary Zones */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Zones Secondaires</h4>
              <p className="text-sm text-gray-600">{secondaryZones.length} zones partagées</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {secondaryZones.map((zone, index) => (
              <Badge key={index} variant="info" size="sm">{zone}</Badge>
            ))}
          </div>
        </div>

        {/* Premium Zones */}
        <div className={cn(
          "rounded-lg p-4 border",
          hasGoldAccess 
            ? "bg-yellow-50 border-yellow-200" 
            : "bg-gray-50 border-gray-200 opacity-75"
        )}>
          <div className="flex items-center space-x-2 mb-2">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              hasGoldAccess ? "bg-yellow-500" : "bg-gray-400"
            )}>
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Zones Premium</h4>
              <p className="text-sm text-gray-600">
                {hasGoldAccess ? `${premiumZones.length} zones accessibles` : 'Accès niveau Or requis'}
              </p>
            </div>
          </div>
          
          {hasGoldAccess && (
            <div className="flex flex-wrap gap-2 mt-3">
              {premiumZones.map((zone, index) => (
                <Badge key={index} variant="warning" size="sm">{zone}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Map Placeholder */}
        {showMap && (
          <div className="mt-4 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Carte interactive du territoire</p>
              <p className="text-sm text-gray-400">Zones primaires, secondaires et biens disponibles</p>
            </div>
          </div>
        )}

        {/* Territory Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-2">
              <Home className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Biens actifs</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Leads en cours</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">#3</p>
            <p className="text-sm text-gray-600">Rang zone</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
