import React, { useState } from 'react';
import { Property, ServiceProvider, ServiceProposal } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ServiceProviderCard } from './ServiceProviderCard';
import { 
  Camera, FileSearch, Home, Euro, Gavel, Briefcase, Hammer,
  ChevronDown, ChevronUp, Plus, Check, X, Clock, MessageSquare,
  Filter, Search
} from 'lucide-react';
import { getServiceProviders, getServiceProposals } from '../../services/dataService';
import { cn } from '../../utils/cn';

interface PropertyServiceProposalsProps {
  property: Property;
  userRole: 'buyer' | 'seller';
}

export const PropertyServiceProposals: React.FC<PropertyServiceProposalsProps> = ({
  property,
  userRole
}) => {
  const serviceProviders = getServiceProviders();
  const [activeProposals] = useState<ServiceProposal[]>(
    getServiceProposals().filter(p => p.propertyId === property.id)
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<{[key: string]: ServiceProvider}>({});
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories = {
    photographer: {
      icon: Camera,
      title: 'Photographes',
      description: 'Photos professionnelles et visites virtuelles',
      color: 'text-blue-600 bg-blue-50',
      relevantFor: ['seller']
    },
    diagnostician: {
      icon: FileSearch,
      title: 'Diagnostiqueurs',
      description: 'Diagnostics obligatoires (DPE, amiante, plomb...)',
      color: 'text-green-600 bg-green-50',
      relevantFor: ['seller']
    },
    home_stager: {
      icon: Home,
      title: 'Home Staging',
      description: 'Valorisation et mise en scène du bien',
      color: 'text-purple-600 bg-purple-50',
      relevantFor: ['seller']
    },
    financial_advisor: {
      icon: Euro,
      title: 'Conseillers financiers',
      description: 'Courtiers en prêt immobilier',
      color: 'text-yellow-600 bg-yellow-50',
      relevantFor: ['buyer']
    },
    notary: {
      icon: Gavel,
      title: 'Notaires',
      description: 'Actes authentiques et conseils juridiques',
      color: 'text-red-600 bg-red-50',
      relevantFor: ['buyer', 'seller']
    },
    lawyer: {
      icon: Briefcase,
      title: 'Avocats',
      description: 'Assistance juridique spécialisée',
      color: 'text-indigo-600 bg-indigo-50',
      relevantFor: ['buyer', 'seller']
    },
    contractor: {
      icon: Hammer,
      title: 'Artisans',
      description: 'Travaux et rénovations',
      color: 'text-orange-600 bg-orange-50',
      relevantFor: ['seller', 'buyer']
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectProvider = (category: string, provider: ServiceProvider) => {
    setSelectedProviders(prev => ({
      ...prev,
      [category]: provider
    }));
  };

  const getProvidersForCategory = (category: string) => {
    return serviceProviders
      .filter(p => p.type === category)
      .filter(p => 
        searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const relevantCategories = Object.entries(serviceCategories)
    .filter(([_, config]) => config.relevantFor.includes(userRole))
    .filter(([key, _]) => filterType === 'all' || key === filterType);

  const getProposalStatus = (providerId: string) => {
    const proposal = activeProposals.find(p => p.providerId === providerId);
    return proposal?.status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Services recommandés pour ce bien
        </h3>
        <p className="text-gray-600">
          {userRole === 'seller' 
            ? "Optimisez la vente de votre bien avec nos prestataires vérifiés"
            : "Facilitez votre achat avec l'aide de professionnels qualifiés"
          }
        </p>
      </div>

      {/* Active Proposals Summary */}
      {activeProposals.length > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {activeProposals.length} proposition{activeProposals.length > 1 ? 's' : ''} en cours
                </p>
                <p className="text-sm text-gray-600">
                  {activeProposals.filter(p => p.status === 'pending').length} en attente de validation
                </p>
              </div>
            </div>
            <Button size="sm" variant="primary">
              Voir les propositions
            </Button>
          </div>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un prestataire..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">Tous les services</option>
          {Object.entries(serviceCategories)
            .filter(([_, config]) => config.relevantFor.includes(userRole))
            .map(([key, config]) => (
              <option key={key} value={key}>{config.title}</option>
            ))}
        </select>
      </div>

      {/* Service Categories */}
      <div className="space-y-4">
        {relevantCategories.map(([category, config]) => {
          const Icon = config.icon;
          const providers = getProvidersForCategory(category);
          const isExpanded = expandedCategories.includes(category);
          const selectedProvider = selectedProviders[category];
          
          return (
            <Card key={category} className="overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{config.title}</h4>
                      <p className="text-sm text-gray-600">{config.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedProvider && (
                      <Badge variant="success">
                        <Check className="w-3 h-3 mr-1" />
                        Sélectionné
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {providers.length} disponible{providers.length > 1 ? 's' : ''}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t p-4">
                  {providers.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Aucun prestataire disponible pour le moment
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {providers.map(provider => {
                        const proposalStatus = getProposalStatus(provider.id);
                        const isSelected = selectedProvider?.id === provider.id;
                        
                        return (
                          <div key={provider.id} className="relative">
                            <ServiceProviderCard
                              provider={provider}
                              onSelect={() => selectProvider(category, provider)}
                              selected={isSelected}
                              compact
                            />
                            {proposalStatus && (
                              <Badge 
                                className="absolute top-2 right-2"
                                variant={proposalStatus === 'accepted' ? 'success' : 'warning'}
                              >
                                {proposalStatus === 'accepted' ? 'Accepté' : 'En attente'}
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Selected Providers Summary */}
      {Object.keys(selectedProviders).length > 0 && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h4 className="font-semibold text-gray-900 mb-4">
            Prestataires sélectionnés ({Object.keys(selectedProviders).length})
          </h4>
          <div className="space-y-3 mb-4">
            {Object.entries(selectedProviders).map(([category, provider]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded flex items-center justify-center",
                    serviceCategories[category as keyof typeof serviceCategories].color
                  )}>
                    {React.createElement(
                      serviceCategories[category as keyof typeof serviceCategories].icon,
                      { className: "w-4 h-4" }
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-600">
                      {provider.priceUnit === 'fixed' 
                        ? `${provider.price}€`
                        : provider.priceUnit === 'hourly'
                        ? `${provider.price}€/h`
                        : `${provider.price}%`
                      }
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProviders(prev => {
                    const newProviders = { ...prev };
                    delete newProviders[category];
                    return newProviders;
                  })}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full">
            Demander des devis ({Object.keys(selectedProviders).length})
          </Button>
        </Card>
      )}
    </div>
  );
};
