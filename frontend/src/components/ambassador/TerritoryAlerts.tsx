import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ReferralModal } from './ReferralModal';
import { 
  Bell, MapPin, Euro, Home, Square, Users, 
  ChevronRight, Eye, Heart, Share2, UserPlus,
  TrendingUp, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { getTerritoryProperties } from '../../services/dataService';
import { cn } from '../../utils/cn';

export const TerritoryAlerts: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'referral_enabled' | 'my_zone'>('all');

  const properties = getTerritoryProperties().filter(p => {
    if (filter === 'referral_enabled') return p.allowsReferrals;
    if (filter === 'my_zone') return true; // Filter by ambassador's territory
    return true;
  });

  const handleReferBuyer = (property: any) => {
    setSelectedProperty(property);
    setShowReferralModal(true);
  };

  const handleReferralSubmit = (data: any) => {
    console.log('Referral submitted:', data);
    setShowReferralModal(false);
    // Show success message
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Alertes de mon territoire</h2>
            <p className="text-gray-600 mt-1">
              Nouveaux biens dans vos zones d'intervention
            </p>
          </div>
          <Badge variant="info" size="lg">
            <Bell className="w-4 h-4 mr-1" />
            {properties.length} biens disponibles
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Tous les biens
          </Button>
          <Button
            size="sm"
            variant={filter === 'referral_enabled' ? 'primary' : 'outline'}
            onClick={() => setFilter('referral_enabled')}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Acceptent les références
          </Button>
          <Button
            size="sm"
            variant={filter === 'my_zone' ? 'primary' : 'outline'}
            onClick={() => setFilter('my_zone')}
          >
            <MapPin className="w-4 h-4 mr-1" />
            Ma zone exclusive
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Euro className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Gagnez 50% de commission en référant des acheteurs
              </p>
              <p className="text-sm text-gray-600">
                Partagez équitablement avec l'ambassadeur ou le vendeur en charge
              </p>
            </div>
          </div>
        </Card>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden group">
              {/* Image */}
              <div className="relative h-48">
                <img 
                  src={property.photo} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.allowsReferrals && (
                    <Badge variant="success" size="sm">
                      <Share2 className="w-3 h-3 mr-1" />
                      Référence OK
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.surface}m²
                  </span>
                  <span className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    {property.rooms} pièces
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-xl font-bold text-primary-600">
                    {property.price.toLocaleString('fr-FR')}€
                  </p>
                  <p className="text-sm text-gray-600">
                    Commission: {Math.round(property.price * 0.002)}€
                  </p>
                </div>

                {/* Manager Info */}
                <div className="p-3 bg-gray-50 rounded-lg mb-3">
                  <p className="text-xs text-gray-600 mb-1">Géré par</p>
                  <p className="font-medium text-sm text-gray-900">
                    {property.managedBy}
                  </p>
                  {property.ambassadorId && (
                    <Badge variant="secondary" size="sm" className="mt-1">
                      Ambassadeur
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Voir détails
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  {property.allowsReferrals && (
                    <Button 
                      size="sm" 
                      variant="primary" 
                      className="flex-1"
                      onClick={() => handleReferBuyer(property)}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Référer
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <Card className="p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun bien disponible
            </h3>
            <p className="text-gray-600">
              Revenez régulièrement pour découvrir les nouvelles opportunités
            </p>
          </Card>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+15%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-600">Références envoyées</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-600">Acceptées</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Converties</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Euro className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1 500€</p>
            <p className="text-sm text-gray-600">Commissions référence</p>
          </Card>
        </div>
      </div>

      {/* Referral Modal */}
      {showReferralModal && selectedProperty && (
        <ReferralModal
          property={selectedProperty}
          onClose={() => setShowReferralModal(false)}
          onSubmit={handleReferralSubmit}
        />
      )}
    </>
  );
};
