import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Target, Euro, Calendar, Clock, FileText, MessageSquare,
  CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown,
  Home, MapPin, User, Phone, Mail, ArrowRight, Edit
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';

export const BuyerOffers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'accepted' | 'rejected'>('active');
  
  const offers = {
    active: [
      {
        id: '1',
        property: {
          title: 'Appartement 3 pièces lumineux',
          address: '45 rue de la République, Paris 11ème',
          price: 450000,
          image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        offer: {
          amount: 435000,
          date: '10 Mars 2024',
          validUntil: '17 Mars 2024',
          conditions: ['Sous réserve d\'obtention du prêt', 'Visite de contrôle avant signature'],
          status: 'pending',
          counterOffer: null
        },
        agent: {
          name: 'Marie Dubois',
          phone: '06 12 34 56 78',
          email: 'marie.dubois@loopimmo.fr'
        }
      },
      {
        id: '2',
        property: {
          title: 'Maison avec jardin',
          address: '12 avenue des Fleurs, Levallois-Perret',
          price: 890000,
          image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        offer: {
          amount: 850000,
          date: '8 Mars 2024',
          validUntil: '15 Mars 2024',
          conditions: ['Sous réserve d\'obtention du prêt'],
          status: 'countered',
          counterOffer: {
            amount: 870000,
            message: 'Le vendeur est prêt à accepter 870 000€'
          }
        },
        agent: {
          name: 'Pierre Martin',
          phone: '06 98 76 54 32',
          email: 'pierre.martin@loopimmo.fr'
        }
      }
    ],
    accepted: [
      {
        id: '3',
        property: {
          title: 'Studio rénové',
          address: '78 boulevard Voltaire, Paris 15ème',
          price: 320000,
          image: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        offer: {
          amount: 310000,
          date: '1 Mars 2024',
          acceptedDate: '3 Mars 2024',
          status: 'accepted',
          nextSteps: ['Signature du compromis prévue le 20 Mars', 'RDV notaire le 25 Mars']
        },
        agent: {
          name: 'Sophie Laurent',
          phone: '06 45 67 89 01',
          email: 'sophie.laurent@loopimmo.fr'
        }
      }
    ],
    rejected: [
      {
        id: '4',
        property: {
          title: 'Loft moderne',
          address: '23 rue du Commerce, Paris 15ème',
          price: 650000,
          image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        offer: {
          amount: 600000,
          date: '25 Février 2024',
          rejectedDate: '27 Février 2024',
          status: 'rejected',
          reason: 'Une offre supérieure a été acceptée'
        },
        agent: {
          name: 'Marie Dubois',
          phone: '06 12 34 56 78',
          email: 'marie.dubois@loopimmo.fr'
        }
      }
    ]
  };

  const currentOffers = offers[activeTab];

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes offres</h1>
          <p className="text-gray-600">Suivez l'évolution de vos offres d'achat</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offres actives</p>
                <p className="text-2xl font-bold text-gray-900">{offers.active.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Acceptées</p>
                <p className="text-2xl font-bold text-green-600">{offers.accepted.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Refusées</p>
                <p className="text-2xl font-bold text-red-600">{offers.rejected.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de succès</p>
                <p className="text-2xl font-bold text-gray-900">33%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          {[
            { key: 'active', label: 'En cours', count: offers.active.length },
            { key: 'accepted', label: 'Acceptées', count: offers.accepted.length },
            { key: 'rejected', label: 'Refusées', count: offers.rejected.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`
                pb-3 px-1 text-sm font-medium transition-colors relative
                ${activeTab === tab.key 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {currentOffers.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex gap-6">
                  <img 
                    src={item.property.image} 
                    alt={item.property.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{item.property.title}</h3>
                        <p className="text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.property.address}
                        </p>
                      </div>
                      <div className="text-right">
                        {item.offer.status === 'pending' && (
                          <Badge variant="warning">En attente</Badge>
                        )}
                        {item.offer.status === 'countered' && (
                          <Badge variant="info">Contre-offre</Badge>
                        )}
                        {item.offer.status === 'accepted' && (
                          <Badge variant="success">Acceptée</Badge>
                        )}
                        {item.offer.status === 'rejected' && (
                          <Badge variant="danger">Refusée</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Prix demandé</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatPrice(item.property.price)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Votre offre</p>
                            <p className="text-lg font-semibold text-primary-600">
                              {formatPrice(item.offer.amount)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {((item.offer.amount / item.property.price - 1) * 100).toFixed(1)}% du prix
                            </p>
                          </div>
                          {item.offer.counterOffer && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-blue-900">Contre-offre du vendeur</p>
                              <p className="text-lg font-semibold text-blue-700">
                                {formatPrice(item.offer.counterOffer.amount)}
                              </p>
                              <p className="text-sm text-blue-700 mt-1">
                                {item.offer.counterOffer.message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Offre du {item.offer.date}
                          </p>
                          {item.offer.validUntil && (
                            <p className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              Valide jusqu'au {item.offer.validUntil}
                            </p>
                          )}
                          {item.offer.acceptedDate && (
                            <p className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Acceptée le {item.offer.acceptedDate}
                            </p>
                          )}
                          {item.offer.rejectedDate && (
                            <p className="flex items-center text-red-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              Refusée le {item.offer.rejectedDate}
                            </p>
                          )}
                        </div>

                        {item.offer.conditions && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Conditions:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {item.offer.conditions.map((condition, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-gray-400 mr-2">•</span>
                                  {condition}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.offer.reason && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-900">{item.offer.reason}</p>
                          </div>
                        )}

                        {item.offer.nextSteps && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Prochaines étapes:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {item.offer.nextSteps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                  <ArrowRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {item.agent.name}
                    </span>
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {item.agent.phone}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {item.offer.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm">
                          <XCircle className="w-4 h-4 mr-1" />
                          Retirer
                        </Button>
                      </>
                    )}
                    {item.offer.status === 'countered' && (
                      <>
                        <Button variant="primary" size="sm">
                          Accepter la contre-offre
                        </Button>
                        <Button variant="outline" size="sm">
                          Faire une nouvelle offre
                        </Button>
                      </>
                    )}
                    {item.offer.status === 'accepted' && (
                      <Button variant="primary" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Voir les documents
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Contacter l'agent
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {currentOffers.length === 0 && (
          <Card className="p-12 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune offre {activeTab === 'active' ? 'en cours' : activeTab === 'accepted' ? 'acceptée' : 'refusée'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' && "Faites des offres sur les biens qui vous intéressent"}
              {activeTab === 'accepted' && "Vos offres acceptées apparaîtront ici"}
              {activeTab === 'rejected' && "Les offres refusées sont listées ici pour référence"}
            </p>
            {activeTab === 'active' && (
              <Button variant="primary">
                Rechercher des biens
              </Button>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
