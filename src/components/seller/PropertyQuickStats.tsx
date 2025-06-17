import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Eye, Heart, Calendar, Users, Euro, TrendingUp,
  ArrowUp, ArrowDown, Clock, Target
} from 'lucide-react';
import { Property, PropertyStats, Lead } from '../../types';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface PropertyQuickStatsProps {
  property: Property;
  stats: PropertyStats;
  leads: Lead[];
}

export const PropertyQuickStats: React.FC<PropertyQuickStatsProps> = ({
  property,
  stats,
  leads
}) => {
  const qualifiedLeads = leads.filter(l => l.score && l.score >= 7).length;
  const conversionRate = stats.visits > 0 ? Math.round((stats.offers / stats.visits) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Eye className="w-6 h-6 text-blue-500" />
          <div className="flex items-center gap-1 text-xs">
            {stats.weeklyViewsChange > 0 ? (
              <>
                <ArrowUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600 font-medium">+{stats.weeklyViewsChange}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="w-3 h-3 text-red-600" />
                <span className="text-red-600 font-medium">{stats.weeklyViewsChange}%</span>
              </>
            )}
          </div>
        </div>
        <p className="text-xl font-bold text-gray-900">{stats.views}</p>
        <p className="text-xs text-gray-600">Vues totales</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Heart className="w-6 h-6 text-red-500" />
          {stats.newFavorites > 0 && (
            <Badge size="sm" variant="success">+{stats.newFavorites}</Badge>
          )}
        </div>
        <p className="text-xl font-bold text-gray-900">{stats.favorites}</p>
        <p className="text-xs text-gray-600">Favoris</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="w-6 h-6 text-purple-500" />
          {stats.upcomingVisits > 0 && (
            <Badge size="sm" variant="info">{stats.upcomingVisits} à venir</Badge>
          )}
        </div>
        <p className="text-xl font-bold text-gray-900">{stats.visits}</p>
        <p className="text-xs text-gray-600">Visites</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Users className="w-6 h-6 text-indigo-500" />
          {qualifiedLeads > 0 && (
            <Badge size="sm" variant="warning">{qualifiedLeads} qualifiés</Badge>
          )}
        </div>
        <p className="text-xl font-bold text-gray-900">{leads.length}</p>
        <p className="text-xs text-gray-600">Leads</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Target className="w-6 h-6 text-green-500" />
          <TrendingUp className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-xl font-bold text-gray-900">{conversionRate}%</p>
        <p className="text-xs text-gray-600">Conversion</p>
      </Card>
    </div>
  );
};
