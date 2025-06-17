import React from 'react';
import { ServiceProvider } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Star, MapPin, Shield, Clock, Euro } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  onSelect: (provider: ServiceProvider) => void;
  selected?: boolean;
  compact?: boolean;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider,
  onSelect,
  selected = false,
  compact = false
}) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'text-green-600 bg-green-50';
      case 'within_24h':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'Disponible immédiatement';
      case 'within_24h':
        return 'Sous 24h';
      case 'within_week':
        return 'Sous 7 jours';
      default:
        return availability;
    }
  };

  const formatPrice = (price: number, unit: string) => {
    switch (unit) {
      case 'fixed':
        return `${price}€`;
      case 'hourly':
        return `${price}€/h`;
      case 'percentage':
        return `${price}%`;
      default:
        return `${price}€`;
    }
  };

  if (compact) {
    return (
      <div 
        className={cn(
          "p-4 border rounded-lg cursor-pointer transition-all",
          selected ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
        )}
        onClick={() => onSelect(provider)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-gray-900">{provider.name}</h4>
              {provider.verified && (
                <Shield className="w-4 h-4 text-green-500" />
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {provider.rating} ({provider.reviewCount})
              </span>
              {provider.distance && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {provider.distance}
                </span>
              )}
              <span className="font-medium text-primary-600">
                {formatPrice(provider.price, provider.priceUnit)}
              </span>
            </div>
          </div>
          <Badge size="sm" className={getAvailabilityColor(provider.availability)}>
            <Clock className="w-3 h-3 mr-1" />
            {getAvailabilityText(provider.availability)}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      "p-6 cursor-pointer transition-all",
      selected && "ring-2 ring-primary-500"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
            {provider.verified && (
              <div className="flex items-center gap-1 text-green-600">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Vérifié</span>
              </div>
            )}
          </div>
          <p className="text-gray-600">{provider.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            {formatPrice(provider.price, provider.priceUnit)}
          </p>
          <Badge className={getAvailabilityColor(provider.availability)}>
            {getAvailabilityText(provider.availability)}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{provider.rating}</span>
          <span className="text-gray-600">({provider.reviewCount} avis)</span>
        </div>
        {provider.distance && (
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{provider.distance}</span>
          </div>
        )}
      </div>

      {provider.specialties.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Spécialités :</p>
          <div className="flex flex-wrap gap-2">
            {provider.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {provider.certifications.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Certifications :</p>
          <div className="flex flex-wrap gap-2">
            {provider.certifications.map((cert, index) => (
              <Badge key={index} variant="info" size="sm">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {provider.portfolio && provider.portfolio.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Portfolio :</p>
          <div className="grid grid-cols-3 gap-2">
            {provider.portfolio.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}

      <Button 
        onClick={() => onSelect(provider)}
        variant={selected ? "primary" : "outline"}
        className="w-full"
      >
        {selected ? "Sélectionné" : "Choisir ce prestataire"}
      </Button>
    </Card>
  );
};
