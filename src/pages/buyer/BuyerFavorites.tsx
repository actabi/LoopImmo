import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Heart, MapPin, Square, Home, Bed, Calendar, Share2, 
  Trash2, Bell, TrendingDown, Clock, Filter, SortDesc
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { getProperties } from '../../services/dataService';

export const BuyerFavorites: React.FC = () => {
  const [sortBy, setSortBy] = useState<'recent' | 'price' | 'surface'>('recent');

  const properties = getProperties();
  
  // Simuler des favoris avec des métadonnées supplémentaires
  const favorites = properties.slice(0, 5).map((property, index) => ({
    ...property,
    savedDate: new Date(Date.now() - index * 86400000).toLocaleDateString('fr-FR'),
    priceChange: index === 1 ? -15000 : index === 3 ? -8000 : 0,
    hasAlert: index === 0 || index === 2
  }));

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mes favoris</h1>
            <p className="text-gray-600">
              {favorites.length} biens sauvegardés • Suivez l'évolution de vos coups de cœur
            </p>
          </div>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Partager ma liste
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prix moyen</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(favorites.reduce((sum, f) => sum + f.price, 0) / favorites.length)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Baisses de prix</p>
                <p className="text-xl font-bold text-green-600">
                  {favorites.filter(f => f.priceChange < 0).length} biens
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertes actives</p>
                <p className="text-xl font-bold text-gray-900">
                  {favorites.filter(f => f.hasAlert).length} biens
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Trier par:</span>
            <select 
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="recent">Plus récents</option>
              <option value="price">Prix croissant</option>
              <option value="surface">Surface</option>
            </select>
          </div>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Filtrer
          </button>
        </div>

        {/* Favorites Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {favorites.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="relative w-1/3">
                  <img 
                    src={property.photos[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.priceChange < 0 && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Baisse de prix!
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{property.title}</h3>
                      <p className="text-gray-600 text-sm flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location.city}
                      </p>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(property.price)}
                      </span>
                      {property.priceChange < 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          {formatPrice(property.priceChange)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.surface}m²
                      </span>
                      <span className="flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        {property.rooms} pièces
                      </span>
                      <span className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms} ch.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Ajouté le {property.savedDate}
                    </span>
                    {property.hasAlert && (
                      <span className="flex items-center text-purple-600">
                        <Bell className="w-3 h-3 mr-1" />
                        Alertes actives
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Visiter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className={`w-4 h-4 ${property.hasAlert ? 'text-purple-600' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun favori pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez à sauvegarder les biens qui vous intéressent pour les retrouver facilement
            </p>
            <Button variant="primary">
              Rechercher des biens
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
