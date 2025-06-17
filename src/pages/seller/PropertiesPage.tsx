import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Plus, Home, Eye, Heart, Calendar, Euro, Edit, 
  MoreVertical, TrendingUp, AlertCircle, CheckCircle,
  Camera, FileText, BarChart3, Trash2, Copy, Archive
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { getProperties } from '../../services/dataService';
import { cn } from '../../utils/cn';

export const PropertiesPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'draft' | 'sold'>('all');
  
  const properties = getProperties().filter(p => p.sellerId === '1');
  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.status === filter);

  const stats = {
    active: properties.filter(p => p.status === 'active').length,
    draft: properties.filter(p => p.status === 'draft').length,
    sold: properties.filter(p => p.status === 'sold').length,
    totalValue: properties.reduce((sum, p) => sum + p.price, 0),
    totalSavings: properties.reduce((sum, p) => sum + (p.price * 0.05 - p.tier.fee), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes biens</h1>
          <p className="text-gray-600">Gérez tous vos biens en un seul endroit</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un bien
        </Button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Home className="w-8 h-8 text-blue-500" />
            <Badge size="sm" variant="info">{stats.active} actifs</Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
          <p className="text-sm text-gray-600">Biens au total</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Euro className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalValue)}</p>
          <p className="text-sm text-gray-600">Valeur totale</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{formatPrice(stats.totalSavings)}</p>
          <p className="text-sm text-gray-600">Économies totales</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">1,846</p>
          <p className="text-sm text-gray-600">Vues totales</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">75</p>
          <p className="text-sm text-gray-600">Favoris totaux</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'active', 'draft', 'sold'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              filter === status 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {status === 'all' && 'Tous'}
            {status === 'active' && `Actifs (${stats.active})`}
            {status === 'draft' && `Brouillons (${stats.draft})`}
            {status === 'sold' && `Vendus (${stats.sold})`}
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48">
              <img 
                src={property.photos[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge 
                  variant={
                    property.status === 'active' ? 'success' : 
                    property.status === 'draft' ? 'warning' : 
                    'default'
                  }
                >
                  {property.status === 'active' && 'Actif'}
                  {property.status === 'draft' && 'Brouillon'}
                  {property.status === 'sold' && 'Vendu'}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <button className="w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              {property.status === 'active' && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-1">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">{property.views}</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-1">
                    <Heart className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">{property.favorites}</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">3 visites</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {property.location.address}, {property.location.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{formatPrice(property.price)}</p>
                  <p className="text-xs text-green-600 font-medium">
                    Économie: {formatPrice(property.price * 0.05 - property.tier.fee)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{property.surface}m²</span>
                <span>•</span>
                <span>{property.rooms} pièces</span>
                <span>•</span>
                <span>{property.bedrooms} chambres</span>
                <span>•</span>
                <span className={cn(
                  "font-medium",
                  property.tier.color.replace('bg-', 'text-')
                )}>
                  {property.tier.name}
                </span>
              </div>

              {property.status === 'active' && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-4">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-900">
                    2 actions requises • Prochaine visite demain à 14h
                  </p>
                </div>
              )}

              {property.status === 'draft' && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg mb-4">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm text-yellow-900">
                    Complétez votre annonce pour la publier
                  </p>
                </div>
              )}

              {property.status === 'sold' && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-900">
                    Vendu le 15/02/2024 • Net vendeur: {formatPrice(property.price - property.tier.fee)}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {property.status === 'active' && (
                  <>
                    <Button size="sm" variant="primary" className="flex-1">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Voir stats
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {property.status === 'draft' && (
                  <>
                    <Button size="sm" variant="primary" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Continuer
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Copy className="w-4 h-4 mr-1" />
                      Dupliquer
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {property.status === 'sold' && (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-1" />
                      Documents
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Rapport final
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <Card className="p-12 text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun bien {filter !== 'all' && filter}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all' && "Commencez par ajouter votre premier bien"}
            {filter === 'active' && "Aucun bien actif pour le moment"}
            {filter === 'draft' && "Aucun brouillon en cours"}
            {filter === 'sold' && "Aucun bien vendu pour le moment"}
          </p>
          {filter === 'all' && (
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter mon premier bien
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};
