import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  MapPin, Euro, Eye, Heart, Calendar, Users,
  ChevronDown, ChevronUp, Camera, Edit, TrendingUp,
  Clock, Star, AlertCircle, CheckCircle, ArrowUp, ArrowDown
} from 'lucide-react';
import { Property, PropertyStats } from '../../types';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';
import { PhotoQualityScore } from './PhotoQualityScore';

interface PropertyCardProps {
  property: Property;
  stats: PropertyStats;
  onExpand: () => void;
  isExpanded: boolean;
  viewMode: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  stats,
  onExpand,
  isExpanded,
  viewMode
}) => {
  const daysOnline = Math.floor((new Date().getTime() - property.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  const performanceScore = Math.round((stats.views / 100) * 0.4 + (stats.favorites / 10) * 0.3 + (stats.visits / 5) * 0.3);
  
  // Determine property health status
  const getPropertyHealth = () => {
    if (performanceScore >= 80) return { status: 'excellent', color: 'green', icon: TrendingUp };
    if (performanceScore >= 60) return { status: 'good', color: 'blue', icon: CheckCircle };
    if (performanceScore >= 40) return { status: 'average', color: 'yellow', icon: AlertCircle };
    return { status: 'needs-attention', color: 'red', icon: AlertCircle };
  };

  const health = getPropertyHealth();

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      isExpanded && "ring-2 ring-primary-500"
    )}>
      <div className={cn(
        "flex",
        viewMode === 'list' ? "flex-row" : "flex-col"
      )}>
        {/* Property Image */}
        <div className={cn(
          "relative",
          viewMode === 'list' ? "w-48 h-full" : "w-full h-48"
        )}>
          <img 
            src={property.photos[0]} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <PhotoQualityScore score={85} className="absolute top-2 right-2" />
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant={property.status === 'active' ? 'success' : 'warning'}>
              {property.status === 'active' ? 'En ligne' : 'Brouillon'}
            </Badge>
          </div>

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {stats.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {stats.favorites}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {stats.visits}
              </span>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {property.location.address}, {property.location.city}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                health.color === 'green' && "bg-green-100",
                health.color === 'blue' && "bg-blue-100",
                health.color === 'yellow' && "bg-yellow-100",
                health.color === 'red' && "bg-red-100"
              )}>
                <health.icon className={cn(
                  "w-5 h-5",
                  health.color === 'green' && "text-green-600",
                  health.color === 'blue' && "text-blue-600",
                  health.color === 'yellow' && "text-yellow-600",
                  health.color === 'red' && "text-red-600"
                )} />
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div>
              <p className="text-xs text-gray-500">Prix</p>
              <p className="font-semibold text-gray-900">{formatPrice(property.price)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">En ligne depuis</p>
              <p className="font-semibold text-gray-900">{daysOnline} jours</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Performance</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900">{performanceScore}/100</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Leads actifs</p>
              <p className="font-semibold text-gray-900">{stats.offers}</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
            {stats.weeklyViewsChange > 0 ? (
              <span className="flex items-center gap-1 text-green-600">
                <ArrowUp className="w-3 h-3" />
                +{stats.weeklyViewsChange}% vues
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600">
                <ArrowDown className="w-3 h-3" />
                {stats.weeklyViewsChange}% vues
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Visite dans 2h
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {stats.newOffers} nouvelle offre
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="primary">
              <Edit className="w-3 h-3 mr-1" />
              Gérer
            </Button>
            <Button size="sm" variant="outline">
              <Camera className="w-3 h-3 mr-1" />
              Photos
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={onExpand}
              className="ml-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Réduire
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Détails
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
