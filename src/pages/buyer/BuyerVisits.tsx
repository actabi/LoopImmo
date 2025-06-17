import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Calendar, Clock, MapPin, User, Phone, Mail, 
  MessageSquare, CheckCircle, XCircle, AlertCircle,
  ChevronLeft, ChevronRight, Video, Car, Home
} from 'lucide-react';

export const BuyerVisits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  
  const visits = {
    upcoming: [
      {
        id: '1',
        property: 'Appartement 3 pièces lumineux',
        address: '45 rue de la République, Paris 11ème',
        date: '15 Mars 2024',
        time: '14h30',
        type: 'physical',
        agent: {
          name: 'Marie Dubois',
          phone: '06 12 34 56 78',
          email: 'marie.dubois@loopimmo.fr'
        },
        status: 'confirmed',
        notes: 'Prévoir 45 minutes. Parking disponible dans la rue.'
      },
      {
        id: '2',
        property: 'Maison avec jardin',
        address: '12 avenue des Fleurs, Levallois-Perret',
        date: '16 Mars 2024',
        time: '10h00',
        type: 'virtual',
        agent: {
          name: 'Pierre Martin',
          phone: '06 98 76 54 32',
          email: 'pierre.martin@loopimmo.fr'
        },
        status: 'pending',
        notes: 'Visite virtuelle via Zoom. Lien envoyé 30 min avant.'
      },
      {
        id: '3',
        property: 'Studio rénové proche métro',
        address: '78 boulevard Voltaire, Paris 15ème',
        date: '18 Mars 2024',
        time: '16h00',
        type: 'physical',
        agent: {
          name: 'Sophie Laurent',
          phone: '06 45 67 89 01',
          email: 'sophie.laurent@loopimmo.fr'
        },
        status: 'confirmed',
        notes: 'Visite groupée avec 2 autres acheteurs potentiels.'
      }
    ],
    past: [
      {
        id: '4',
        property: 'Loft moderne',
        address: '23 rue du Commerce, Paris 15ème',
        date: '10 Mars 2024',
        time: '11h00',
        type: 'physical',
        agent: {
          name: 'Marie Dubois',
          phone: '06 12 34 56 78',
          email: 'marie.dubois@loopimmo.fr'
        },
        status: 'completed',
        feedback: 'Très beau bien mais trop cher pour notre budget.',
        rating: 4
      }
    ],
    cancelled: [
      {
        id: '5',
        property: 'Appartement vue sur parc',
        address: '56 avenue du Parc, Neuilly-sur-Seine',
        date: '12 Mars 2024',
        time: '15h00',
        type: 'physical',
        agent: {
          name: 'Pierre Martin',
          phone: '06 98 76 54 32',
          email: 'pierre.martin@loopimmo.fr'
        },
        status: 'cancelled',
        reason: 'Bien déjà sous offre'
      }
    ]
  };

  const currentVisits = visits[activeTab];

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mes visites</h1>
            <p className="text-gray-600">Gérez vos visites de biens immobiliers</p>
          </div>
          <Button variant="primary">
            <Calendar className="w-4 h-4 mr-2" />
            Planifier une visite
          </Button>
        </div>

        {/* Calendar Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Mars 2024</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 3; // Ajuster pour commencer le mois correctement
              const hasVisit = [15, 16, 18].includes(day);
              return (
                <div
                  key={i}
                  className={`
                    py-2 rounded-lg cursor-pointer transition-colors
                    ${day > 0 && day <= 31 ? 'hover:bg-gray-100' : 'text-gray-300'}
                    ${hasVisit ? 'bg-primary-100 text-primary-700 font-semibold' : ''}
                  `}
                >
                  {day > 0 && day <= 31 ? day : ''}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          {[
            { key: 'upcoming', label: 'À venir', count: visits.upcoming.length },
            { key: 'past', label: 'Passées', count: visits.past.length },
            { key: 'cancelled', label: 'Annulées', count: visits.cancelled.length }
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

        {/* Visits List */}
        <div className="space-y-4">
          {currentVisits.map((visit) => (
            <Card key={visit.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{visit.property}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {visit.address}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {visit.type === 'virtual' ? (
                    <Badge variant="info">
                      <Video className="w-3 h-3 mr-1" />
                      Virtuelle
                    </Badge>
                  ) : (
                    <Badge variant="default">
                      <Home className="w-3 h-3 mr-1" />
                      Physique
                    </Badge>
                  )}
                  {visit.status === 'confirmed' && (
                    <Badge variant="success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmée
                    </Badge>
                  )}
                  {visit.status === 'pending' && (
                    <Badge variant="warning">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      En attente
                    </Badge>
                  )}
                  {visit.status === 'cancelled' && (
                    <Badge variant="danger">
                      <XCircle className="w-3 h-3 mr-1" />
                      Annulée
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {visit.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {visit.time}
                    </span>
                  </div>
                  
                  {visit.notes && (
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-900">
                      <p className="font-medium mb-1">Notes:</p>
                      <p>{visit.notes}</p>
                    </div>
                  )}

                  {visit.reason && (
                    <div className="bg-red-50 p-3 rounded-lg text-sm text-red-900">
                      <p className="font-medium mb-1">Raison de l'annulation:</p>
                      <p>{visit.reason}</p>
                    </div>
                  )}

                  {visit.feedback && (
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-medium mb-1">Votre retour:</p>
                      <p className="text-gray-700">{visit.feedback}</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900 mb-3">Agent LoopImmo</p>
                    <div className="space-y-2">
                      <p className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        {visit.agent.name}
                      </p>
                      <p className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {visit.agent.phone}
                      </p>
                      <p className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {visit.agent.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {activeTab === 'upcoming' && (
                <div className="flex gap-2 mt-4">
                  <Button variant="primary" size="sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Confirmer présence
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Reprogrammer
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contacter l'agent
                  </Button>
                  <Button variant="outline" size="sm">
                    <XCircle className="w-4 h-4 mr-1" />
                    Annuler
                  </Button>
                </div>
              )}

              {activeTab === 'past' && !visit.feedback && (
                <div className="mt-4">
                  <Button variant="primary" size="sm">
                    Laisser un retour
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {currentVisits.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune visite {activeTab === 'upcoming' ? 'prévue' : activeTab === 'past' ? 'passée' : 'annulée'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' && "Planifiez des visites pour découvrir vos futurs biens"}
              {activeTab === 'past' && "Vos visites passées apparaîtront ici"}
              {activeTab === 'cancelled' && "Les visites annulées sont listées ici"}
            </p>
            {activeTab === 'upcoming' && (
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
