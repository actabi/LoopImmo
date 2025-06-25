import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Filter, X, ChevronDown, Grid, List, 
  Heart, Eye, Calendar, TrendingUp, Home, Euro, Square
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getProperties } from '../services/dataService';
import { Property } from '../types';
import { cn } from '../utils/cn';

type ViewMode = 'grid' | 'list' | 'map';
type SortOption = 'price-asc' | 'price-desc' | 'date' | 'surface' | 'popular';

export const SearchResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [surfaceRange, setSurfaceRange] = useState({ min: 0, max: 500 });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [rooms, setRooms] = useState<number | null>(null);

  const properties = getProperties();

  // Get search parameters
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';
  const budget = searchParams.get('budget') || '';

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    let matches = true;
    
    if (location && !property.location.city.toLowerCase().includes(location.toLowerCase())) {
      matches = false;
    }
    
    if (type && property.type !== type) {
      matches = false;
    }
    
    if (budget) {
      const maxBudget = parseInt(budget);
      if (property.price > maxBudget) {
        matches = false;
      }
    }
    
    if (property.price < priceRange.min || property.price > priceRange.max) {
      matches = false;
    }
    
    if (property.surface < surfaceRange.min || property.surface > surfaceRange.max) {
      matches = false;
    }
    
    if (selectedTypes.length > 0 && !selectedTypes.includes(property.type)) {
      matches = false;
    }
    
    if (rooms && property.rooms !== rooms) {
      matches = false;
    }
    
    return matches;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'surface':
        return b.surface - a.surface;
      case 'popular':
        return b.views - a.views;
      case 'date':
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const PropertyCard = ({ property }: { property: Property }) => {
    const isFavorite = favorites.has(property.id);
    const daysAgo = Math.floor((new Date().getTime() - property.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (viewMode === 'list') {
      return (
        <Card 
          className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate(`/bien/${property.id}`)}
        >
          <div className="flex">
            <div className="relative w-64 h-48">
              <img 
                src={property.photos[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart className={cn(
                  "w-5 h-5 transition-colors",
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                )} />
              </button>
              {daysAgo < 7 && (
                <Badge className="absolute top-3 left-3" variant="success">
                  Nouveau
                </Badge>
              )}
            </div>
            
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {property.location.address}, {property.location.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    {property.price.toLocaleString('fr-FR')}€
                  </p>
                  <p className="text-sm text-gray-600">
                    {Math.round(property.price / property.surface).toLocaleString('fr-FR')}€/m²
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{property.surface}m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{property.rooms} pièces</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{property.views} vues</span>
                </div>
              </div>
              
              <p className="text-gray-600 line-clamp-2 mb-4">{property.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Il y a {daysAgo} jours
                  </span>
                  {property.views > 100 && (
                    <span className="flex items-center gap-1 text-orange-600">
                      <TrendingUp className="w-4 h-4" />
                      Très demandé
                    </span>
                  )}
                </div>
                <Button size="sm" variant="outline">
                  Voir le bien
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }
    
    return (
      <Card 
        className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={() => navigate(`/bien/${property.id}`)}
      >
        <div className="relative h-56">
          <img 
            src={property.photos[0]} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={cn(
              "w-5 h-5 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )} />
          </button>
          {daysAgo < 7 && (
            <Badge className="absolute top-3 left-3" variant="success">
              Nouveau
            </Badge>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white font-bold text-xl">
              {property.price.toLocaleString('fr-FR')}€
            </p>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {property.location.city}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
            <span className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              {property.surface}m²
            </span>
            <span className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              {property.rooms} pièces
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {property.views}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Il y a {daysAgo} jours
            </span>
            {property.views > 100 && (
              <Badge variant="warning" size="sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                Très demandé
              </Badge>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ville, quartier, code postal..."
                    defaultValue={location}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  {(selectedTypes.length > 0 || rooms) && (
                    <Badge size="sm" variant="primary">
                      {selectedTypes.length + (rooms ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {/* View Controls */}
              <div className="flex items-center gap-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === 'grid' ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === 'list' ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === 'map' ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    )}
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                >
                  <option value="date">Plus récents</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="surface">Surface</option>
                  <option value="popular">Populaires</option>
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-3 text-sm text-gray-600">
              {sortedProperties.length} bien{sortedProperties.length > 1 ? 's' : ''} trouvé{sortedProperties.length > 1 ? 's' : ''}
              {location && ` à ${location}`}
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max || ''}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 1000000 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Surface Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface (m²)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={surfaceRange.min || ''}
                      onChange={(e) => setSurfaceRange({ ...surfaceRange, min: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={surfaceRange.max || ''}
                      onChange={(e) => setSurfaceRange({ ...surfaceRange, max: parseInt(e.target.value) || 500 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de bien
                  </label>
                  <div className="space-y-2">
                    {['apartment', 'house'].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{type === 'apartment' ? 'Appartement' : 'Maison'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de pièces
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setRooms(rooms === num ? null : num)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          rooms === num
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {num}{num === 5 && '+'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setPriceRange({ min: 0, max: 1000000 });
                    setSurfaceRange({ min: 0, max: 500 });
                    setSelectedTypes([]);
                    setRooms(null);
                  }}
                >
                  Réinitialiser
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {viewMode === 'map' ? (
            <div className="bg-gray-200 rounded-lg h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Carte interactive</p>
                <p className="text-sm text-gray-500 mt-1">Bientôt disponible</p>
              </div>
            </div>
          ) : (
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {sortedProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bien trouvé</h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange({ min: 0, max: 1000000 });
                  setSurfaceRange({ min: 0, max: 500 });
                  setSelectedTypes([]);
                  setRooms(null);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
