import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Search, MapPin, Home, Euro, Bed, Square, Filter,
  Heart, Calendar, ChevronDown, Map, List, Grid3x3
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { getProperties } from '../../services/dataService';

export const BuyerSearch: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    surfaceMin: '',
    rooms: '',
    location: ''
  });

  const properties = getProperties();

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rechercher un bien</h1>
          <p className="text-gray-600">Trouvez le bien qui correspond à vos rêves</p>
        </div>

        {/* Search Bar */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ville, code postal, quartier..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            <Button variant="primary" size="lg">
              <Search className="w-5 h-5 mr-2" />
              Rechercher
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Prix min</label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="0"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Prix max</label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="∞"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Surface min</label>
              <div className="relative">
                <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="0"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={filters.surfaceMin}
                  onChange={(e) => setFilters({...filters, surfaceMin: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Pièces</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                value={filters.rooms}
                onChange={(e) => setFilters({...filters, rooms: e.target.value})}
              >
                <option value="">Tous</option>
                <option value="1">1 pièce</option>
                <option value="2">2 pièces</option>
                <option value="3">3 pièces</option>
                <option value="4">4 pièces</option>
                <option value="5+">5+ pièces</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              Plus de filtres
            </button>
            <button className="text-gray-600 hover:text-gray-700 text-sm">
              Réinitialiser les filtres
            </button>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {properties.length} biens trouvés
            </h2>
            <p className="text-sm text-gray-600">
              Correspondant à vos critères de recherche
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Map className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={property.photos[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <Badge className="absolute top-4 left-4" variant="default">
                    {property.type === 'apartment' ? 'Appartement' : 'Maison'}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location.city}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      -{property.tier.discount}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Visiter
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1">
                      Voir détails
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-4">
            {properties.map((property) => (
              <Card key={property.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  <img 
                    src={property.photos[0]} 
                    alt={property.title}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{property.title}</h3>
                        <p className="text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location.address}, {property.location.city}
                        </p>
                      </div>
                      <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-6 mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(property.price)}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{property.surface}m²</span>
                        <span>•</span>
                        <span>{property.rooms} pièces</span>
                        <span>•</span>
                        <span>{property.bedrooms} chambres</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="success">
                        Économie: {formatPrice(property.price * 0.05 - property.tier.fee)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Planifier visite
                        </Button>
                        <Button variant="primary" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {viewMode === 'map' && (
          <Card className="h-[600px] flex items-center justify-center">
            <div className="text-center">
              <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Carte interactive
              </h3>
              <p className="text-gray-600">
                La vue carte sera bientôt disponible
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
