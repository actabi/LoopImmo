import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Euro, User, Calendar, Clock, FileText, MessageSquare,
  CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown,
  Home, Phone, Mail, ChevronRight, Download, Filter
} from 'lucide-react';
import { formatPrice, formatPercentage } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface Offer {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  offerAmount: number;
  date: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered' | 'expired';
  conditions?: string;
  message?: string;
  financingType: 'cash' | 'loan' | 'mixed';
  financingApproved: boolean;
  expiryDate: string;
}

export const OffersPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'countered'>('all');
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  // Mock offers data
  const offers: Offer[] = [
    {
      id: '1',
      propertyId: '1',
      propertyTitle: 'Appartement 4 pièces - Neuilly-sur-Seine',
      propertyImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 890000,
      buyerName: 'Jean Dupont',
      buyerEmail: 'jean.dupont@email.com',
      buyerPhone: '06 12 34 56 78',
      offerAmount: 850000,
      date: '2024-03-15',
      status: 'pending',
      financingType: 'loan',
      financingApproved: true,
      expiryDate: '2024-03-22',
      message: 'Nous sommes très intéressés par ce bien. Prêt accordé par notre banque.'
    },
    {
      id: '2',
      propertyId: '2',
      propertyTitle: 'Maison 6 pièces - Boulogne-Billancourt',
      propertyImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 1250000,
      buyerName: 'Marie Martin',
      buyerEmail: 'marie.martin@email.com',
      buyerPhone: '06 98 76 54 32',
      offerAmount: 1200000,
      date: '2024-03-10',
      status: 'countered',
      financingType: 'cash',
      financingApproved: true,
      expiryDate: '2024-03-20',
      conditions: 'Sous réserve de la vente de notre bien actuel'
    },
    {
      id: '3',
      propertyId: '1',
      propertyTitle: 'Appartement 4 pièces - Neuilly-sur-Seine',
      propertyImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 890000,
      buyerName: 'Pierre Laurent',
      buyerEmail: 'pierre.laurent@email.com',
      buyerPhone: '06 45 67 89 01',
      offerAmount: 820000,
      date: '2024-03-08',
      status: 'rejected',
      financingType: 'loan',
      financingApproved: false,
      expiryDate: '2024-03-15'
    },
    {
      id: '4',
      propertyId: '3',
      propertyTitle: 'Studio - Paris 16ème',
      propertyImage: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 320000,
      buyerName: 'Sophie Petit',
      buyerEmail: 'sophie.petit@email.com',
      buyerPhone: '06 23 45 67 89',
      offerAmount: 315000,
      date: '2024-03-12',
      status: 'accepted',
      financingType: 'mixed',
      financingApproved: true,
      expiryDate: '2024-03-19'
    }
  ];

  const filteredOffers = filter === 'all' 
    ? offers 
    : offers.filter(o => o.status === filter);

  const stats = {
    total: offers.length,
    pending: offers.filter(o => o.status === 'pending').length,
    accepted: offers.filter(o => o.status === 'accepted').length,
    rejected: offers.filter(o => o.status === 'rejected').length,
    countered: offers.filter(o => o.status === 'countered').length,
    averageOffer: offers.reduce((sum, o) => sum + (o.offerAmount / o.propertyPrice), 0) / offers.length * 100
  };

  const getStatusColor = (status: Offer['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'countered': return 'info';
      case 'expired': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: Offer['status']) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'accepted': return CheckCircle;
      case 'rejected': return XCircle;
      case 'countered': return MessageSquare;
      case 'expired': return Clock;
      default: return AlertCircle;
    }
  };

  const getStatusText = (status: Offer['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      case 'countered': return 'Contre-offre';
      case 'expired': return 'Expirée';
      default: return status;
    }
  };

  const getFinancingText = (type: Offer['financingType']) => {
    switch (type) {
      case 'cash': return 'Comptant';
      case 'loan': return 'Crédit';
      case 'mixed': return 'Mixte';
      default: return type;
    }
  };

  const getDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offres reçues</h1>
          <p className="text-gray-600">Gérez les offres sur vos biens</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Euro className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          <p className="text-sm text-gray-600">En attente</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
          <p className="text-sm text-gray-600">Acceptées</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.countered}</p>
          <p className="text-sm text-gray-600">Contre-offres</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
          <p className="text-sm text-gray-600">Refusées</p>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
          <p className="text-2xl font-bold text-purple-700">{formatPercentage(stats.averageOffer)}</p>
          <p className="text-sm text-purple-600">Offre moyenne</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'pending', 'accepted', 'countered', 'rejected'] as const).map((status) => (
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
            {status === 'all' && 'Toutes'}
            {status === 'pending' && 'En attente'}
            {status === 'accepted' && 'Acceptées'}
            {status === 'countered' && 'Contre-offres'}
            {status === 'rejected' && 'Refusées'}
          </button>
        ))}
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {filteredOffers.map((offer) => {
          const StatusIcon = getStatusIcon(offer.status);
          const offerPercentage = (offer.offerAmount / offer.propertyPrice) * 100;
          const daysRemaining = getDaysRemaining(offer.expiryDate);
          
          return (
            <Card 
              key={offer.id} 
              className={cn(
                "p-6 hover:shadow-lg transition-shadow cursor-pointer",
                selectedOffer === offer.id && "ring-2 ring-primary-500"
              )}
              onClick={() => setSelectedOffer(offer.id === selectedOffer ? null : offer.id)}
            >
              <div className="flex items-start gap-4">
                <img 
                  src={offer.propertyImage} 
                  alt={offer.propertyTitle}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{offer.propertyTitle}</h3>
                      <p className="text-sm text-gray-600">Prix demandé: {formatPrice(offer.propertyPrice)}</p>
                    </div>
                    <Badge variant={getStatusColor(offer.status)} size="sm">
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {getStatusText(offer.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 mb-3">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(offer.offerAmount)}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={cn(
                          "font-medium",
                          offerPercentage >= 95 ? "text-green-600" : 
                          offerPercentage >= 90 ? "text-yellow-600" : 
                          "text-red-600"
                        )}>
                          {formatPercentage(offerPercentage)} du prix
                        </span>
                        {offerPercentage < 100 && (
                          <span className="text-gray-600">
                            ({formatPrice(offer.propertyPrice - offer.offerAmount)} de moins)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{offer.buyerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(offer.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{getFinancingText(offer.financingType)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className={cn(
                        "text-sm font-medium",
                        daysRemaining <= 2 ? "text-red-600" : 
                        daysRemaining <= 5 ? "text-yellow-600" : 
                        "text-gray-600"
                      )}>
                        {daysRemaining > 0 ? `${daysRemaining}j restants` : 'Expirée'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {offer.financingApproved ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 text-sm font-medium">Financement OK</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-red-600 text-sm font-medium">Financement KO</span>
                        </>
                      )}
                    </div>
                  </div>

                  {offer.message && (
                    <p className="mt-2 text-sm text-gray-600 italic">
                      "{offer.message}"
                    </p>
                  )}

                  {offer.conditions && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-900">
                      <strong>Conditions:</strong> {offer.conditions}
                    </div>
                  )}

                  {selectedOffer === offer.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${offer.buyerEmail}`} className="text-primary-600 hover:underline">
                            {offer.buyerEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${offer.buyerPhone}`} className="text-primary-600 hover:underline">
                            {offer.buyerPhone}
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {offer.status === 'pending' && (
                          <>
                            <Button size="sm" variant="primary">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accepter
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Contre-offre
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4 mr-1" />
                              Refuser
                            </Button>
                          </>
                        )}
                        {offer.status === 'countered' && (
                          <Button size="sm" variant="primary">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Voir la discussion
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-1" />
                          Voir le dossier
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <ChevronRight className={cn(
                  "w-5 h-5 text-gray-400 transition-transform",
                  selectedOffer === offer.id && "rotate-90"
                )} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <Card className="p-12 text-center">
          <Euro className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune offre {filter !== 'all' && getStatusText(filter).toLowerCase()}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' && "Vous n'avez pas encore reçu d'offres"}
            {filter === 'pending' && "Aucune offre en attente de réponse"}
            {filter === 'accepted' && "Aucune offre acceptée"}
            {filter === 'countered' && "Aucune contre-offre en cours"}
            {filter === 'rejected' && "Aucune offre refusée"}
          </p>
        </Card>
      )}
    </div>
  );
};
