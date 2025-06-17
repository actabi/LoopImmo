import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Building, Eye, Heart, Euro, Clock, TrendingUp,
  Award, Target
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface GlobalSellerStatsProps {
  stats: {
    totalProperties: number;
    activeProperties: number;
    totalViews: number;
    totalFavorites: number;
    totalValue: number;
    averageDaysOnline: number;
  };
}

export const GlobalSellerStats: React.FC<GlobalSellerStatsProps> = ({ stats }) => {
  const favoriteRate = stats.totalViews > 0 ? ((stats.totalFavorites / stats.totalViews) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
        <p className="text-sm text-gray-600">Biens totaux</p>
        <p className="text-xs text-green-600 font-medium mt-1">
          {stats.activeProperties} actifs
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Euro className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalValue)}</p>
        <p className="text-sm text-gray-600">Valeur totale</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
        <p className="text-sm text-gray-600">Vues totales</p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-xs text-green-600 font-medium">+12% ce mois</span>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totalFavorites}</p>
        <p className="text-sm text-gray-600">Favoris totaux</p>
        <p className="text-xs text-gray-500 mt-1">
          Taux: {favoriteRate}%
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.averageDaysOnline}j</p>
        <p className="text-sm text-gray-600">Durée moyenne</p>
        <p className="text-xs text-blue-600 font-medium mt-1">
          Marché: 45j
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">A+</p>
        <p className="text-sm text-gray-600">Score global</p>
        <div className="flex gap-1 mt-1">
          {[1,2,3,4,5].map((i) => (
            <div 
              key={i} 
              className={cn(
                "w-1 h-3 rounded-full",
                i <= 4 ? "bg-green-500" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
