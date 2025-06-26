import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  MapPin, Shield, Star, TrendingUp, Users, Home,
  Calendar, Lock, Unlock, ChevronRight, Info,
  Award, Target, BarChart3, Clock, AlertTriangle,
  CheckCircle, XCircle, Eye, Plus, Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

import { getZones } from "../../services/dataService";
// Types pour le territoire
interface Zone {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'premium';
  status: 'active' | 'locked' | 'available';
  exclusivity: boolean;
  performance: number;
  properties: number;
  leads: number;
  visits: number;
  conversions: number;
  validUntil?: Date;
  requirements?: string[];
}

interface TerritoryStats {
  totalZones: number;
  activeProperties: number;
  monthlyLeads: number;
  conversionRate: number;
  ranking: number;
  totalAmbassadors: number;
}

// Mock data

const territoryStats: TerritoryStats = {
  totalZones: 3,
  activeProperties: 35,
  monthlyLeads: 38,
  conversionRate: 21,
  ranking: 3,
  totalAmbassadors: 24
};

// Composant pour la carte du territoire
const TerritoryMap: React.FC = () => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Carte de votre territoire</h3>
      <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
        {/* Placeholder for map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Carte interactive du territoire</p>
            <p className="text-sm text-gray-500 mt-2">Visualisez vos zones et opportunités</p>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <p className="text-xs font-medium text-gray-700 mb-2">Légende</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full" />
              <span className="text-xs text-gray-600">Zone principale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs text-gray-600">Zone secondaire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-xs text-gray-600">Zone premium</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Composant pour une zone
const ZoneCard: React.FC<{ zone: Zone; onAction: () => void }> = ({ zone, onAction }) => {
  const getStatusIcon = () => {
    switch (zone.status) {
      case 'active': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'locked': return <Lock className="w-5 h-5 text-gray-400" />;
      case 'available': return <Unlock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTypeColor = () => {
    switch (zone.type) {
      case 'primary': return 'bg-primary-50 border-primary-200';
      case 'secondary': return 'bg-blue-50 border-blue-200';
      case 'premium': return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <Card className={cn("p-6 border-2", getTypeColor())}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{zone.name}</h3>
            {zone.exclusivity && (
              <Badge variant="primary" size="sm">
                <Shield className="w-3 h-3 mr-1" />
                Exclusif
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm text-gray-600">
              {zone.status === 'active' && 'Zone active'}
              {zone.status === 'locked' && 'Zone verrouillée'}
              {zone.status === 'available' && 'Zone disponible'}
            </span>
          </div>
        </div>
        
        {zone.performance > 0 && (
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{zone.performance}%</p>
            <p className="text-xs text-gray-600">Performance</p>
          </div>
        )}
      </div>

      {zone.status === 'active' && (
        <>
          <div className="grid grid-cols-4 gap-3 mb-4 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">{zone.properties}</p>
              <p className="text-xs text-gray-600">Biens</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{zone.leads}</p>
              <p className="text-xs text-gray-600">Leads</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{zone.visits}</p>
              <p className="text-xs text-gray-600">Visites</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-green-600">{zone.conversions}</p>
              <p className="text-xs text-gray-600">Ventes</p>
            </div>
          </div>

          {zone.validUntil && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Exclusivité jusqu'au {zone.validUntil.toLocaleDateString('fr-FR')}
              </span>
            </div>
          )}
        </>
      )}

      {zone.status === 'locked' && zone.requirements && (
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-gray-700">Conditions requises :</p>
          {zone.requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <XCircle className="w-4 h-4 text-red-400" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      )}

      {zone.status === 'available' && (
        <div className="p-3 bg-green-50 rounded-lg mb-4">
          <p className="text-sm text-green-800">
            Cette zone est disponible ! Activez-la pour commencer à recevoir des leads.
          </p>
        </div>
      )}

      <Button 
        variant={zone.status === 'available' ? 'primary' : 'outline'}
        size="sm"
        className="w-full"
        onClick={onAction}
      >
        {zone.status === 'active' && (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Voir détails
          </>
        )}
        {zone.status === 'locked' && (
          <>
            <Info className="w-4 h-4 mr-2" />
            Voir conditions
          </>
        )}
        {zone.status === 'available' && (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Activer la zone
          </>
        )}
      </Button>
    </Card>
  );
};

export const TerritoryPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'zones' | 'performance'>('overview');

  const zones = getZones();

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mon Territoire</h1>
            <p className="text-gray-600 mt-1">Gérez vos zones d'intervention et développez votre activité</p>
          </div>
          <Button variant="primary">
            <Sparkles className="w-4 h-4 mr-2" />
            Demander une zone
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{territoryStats.totalZones}</p>
            <p className="text-sm text-gray-600">Zones actives</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Home className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{territoryStats.activeProperties}</p>
            <p className="text-sm text-gray-600">Biens actifs</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{territoryStats.monthlyLeads}</p>
            <p className="text-sm text-gray-600">Leads/mois</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{territoryStats.conversionRate}%</p>
            <p className="text-sm text-gray-600">Conversion</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">#{territoryStats.ranking}</p>
            <p className="text-sm text-gray-600">Classement</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{territoryStats.totalAmbassadors}</p>
            <p className="text-sm text-gray-600">Loopers</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedTab('overview')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedTab === 'overview' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setSelectedTab('zones')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedTab === 'zones' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Mes zones
          </button>
          <button
            onClick={() => setSelectedTab('performance')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedTab === 'performance' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Performance
          </button>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <>
            <TerritoryMap />
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Zone principale */}
              <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Zone principale</h3>
                    <p className="text-sm text-gray-600 mt-1">Lyon 3ème - Montchat</p>
                  </div>
                  <Badge variant="primary">
                    <Shield className="w-3 h-3 mr-1" />
                    Exclusif
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                    <p className="text-xs text-gray-600">Performance</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-600">Biens actifs</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full bg-white">
                  Gérer ma zone principale
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              {/* Opportunités */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Opportunités à saisir</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Villeurbanne disponible</p>
                        <p className="text-sm text-gray-600">15 biens, forte demande</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Zone premium proche</p>
                        <p className="text-sm text-gray-600">Plus que 2 ventes requises</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {selectedTab === 'zones' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {zones.map(zone => (
              <ZoneCard 
                key={zone.id} 
                zone={zone}
                onAction={() => console.log('Action for zone:', zone.id)}
              />
            ))}
          </div>
        )}

        {selectedTab === 'performance' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Performance par zone */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Performance par zone</h3>
              <div className="space-y-4">
                {zones
                  .filter(z => z.status === 'active')
                  .map(zone => (
                    <div key={zone.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{zone.name}</span>
                        <span className="text-sm font-bold text-gray-900">{zone.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-primary-500 rounded-full transition-all"
                          style={{ width: `${zone.performance}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Comparaison avec autres loopers */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Votre position</h3>
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-12 h-12 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">#{territoryStats.ranking}</p>
                <p className="text-gray-600">sur {territoryStats.totalAmbassadors} loopers</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Leads convertis</span>
                  <span className="text-sm font-bold text-green-600">+15% vs moyenne</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Temps de réponse</span>
                  <span className="text-sm font-bold text-blue-600">2x plus rapide</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Satisfaction client</span>
                  <span className="text-sm font-bold text-purple-600">4.8/5 ⭐</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tips */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Conseil du jour</h3>
              <p className="text-sm text-gray-700 mb-3">
                Les zones avec exclusivité génèrent en moyenne 3x plus de commissions. 
                Maintenez une performance élevée pour conserver vos droits exclusifs !
              </p>
              <Button size="sm" variant="outline">
                Voir tous les conseils
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
