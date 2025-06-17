import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Calendar, Clock, MapPin, User, Phone, Mail, 
  MessageSquare, CheckCircle, XCircle, AlertCircle,
  Home, ChevronRight, Filter, Download, Eye
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  type: 'physical' | 'virtual';
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export const VisitsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled' | 'pending'>('all');
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);

  // Mock visits data
  const visits: Visit[] = [
    {
      id: '1',
      propertyId: '1',
      propertyTitle: 'Appartement 4 pièces - Neuilly-sur-Seine',
      propertyImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 890000,
      visitorName: 'Marie Dubois',
      visitorEmail: 'marie.dubois@email.com',
      visitorPhone: '06 12 34 56 78',
      date: '2024-03-20',
      time: '14:00',
      status: 'scheduled',
      type: 'physical',
      notes: 'Intéressée par le quartier et les écoles à proximité'
    },
    {
      id: '2',
      propertyId: '2',
      propertyTitle: 'Maison 6 pièces - Boulogne-Billancourt',
      propertyImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 1250000,
      visitorName: 'Pierre Martin',
      visitorEmail: 'pierre.martin@email.com',
      visitorPhone: '06 98 76 54 32',
      date: '2024-03-18',
      time: '10:30',
      status: 'completed',
      type: 'physical',
      feedback: {
        rating: 4,
        comment: 'Très belle maison, mais le jardin est un peu petit'
      }
    },
    {
      id: '3',
      propertyId: '1',
      propertyTitle: 'Appartement 4 pièces - Neuilly-sur-Seine',
      propertyImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 890000,
      visitorName: 'Sophie Laurent',
      visitorEmail: 'sophie.laurent@email.com',
      visitorPhone: '06 45 67 89 01',
      date: '2024-03-19',
      time: '16:00',
      status: 'cancelled',
      type: 'virtual',
      notes: 'A trouvé un autre bien'
    },
    {
      id: '4',
      propertyId: '3',
      propertyTitle: 'Studio - Paris 16ème',
      propertyImage: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      propertyPrice: 320000,
      visitorName: 'Thomas Petit',
      visitorEmail: 'thomas.petit@email.com',
      visitorPhone: '06 23 45 67 89',
      date: '2024-03-21',
      time: '11:00',
      status: 'pending',
      type: 'physical'
    }
  ];

  const filteredVisits = filter === 'all' 
    ? visits 
    : visits.filter(v => v.status === filter);

  const stats = {
    total: visits.length,
    scheduled: visits.filter(v => v.status === 'scheduled').length,
    completed: visits.filter(v => v.status === 'completed').length,
    cancelled: visits.filter(v => v.status === 'cancelled').length,
    pending: visits.filter(v => v.status === 'pending').length,
    conversionRate: Math.round((visits.filter(v => v.status === 'completed' && v.feedback?.rating >= 4).length / visits.filter(v => v.status === 'completed').length) * 100)
  };

  const getStatusColor = (status: Visit['status']) => {
    switch (status) {
      case 'scheduled': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: Visit['status']) => {
    switch (status) {
      case 'scheduled': return Calendar;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      case 'pending': return AlertCircle;
      default: return Calendar;
    }
  };

  const getStatusText = (status: Visit['status']) => {
    switch (status) {
      case 'scheduled': return 'Planifiée';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visites</h1>
          <p className="text-gray-600">Gérez vos visites et suivez les retours</p>
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
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
          <p className="text-sm text-gray-600">Planifiées</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          <p className="text-sm text-gray-600">Terminées</p>
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
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
          <p className="text-sm text-gray-600">Annulées</p>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100">
          <p className="text-2xl font-bold text-green-700">{stats.conversionRate}%</p>
          <p className="text-sm text-green-600">Taux de satisfaction</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'scheduled', 'completed', 'pending', 'cancelled'] as const).map((status) => (
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
            {status === 'scheduled' && 'Planifiées'}
            {status === 'completed' && 'Terminées'}
            {status === 'pending' && 'En attente'}
            {status === 'cancelled' && 'Annulées'}
          </button>
        ))}
      </div>

      {/* Visits List */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => {
          const StatusIcon = getStatusIcon(visit.status);
          
          return (
            <Card 
              key={visit.id} 
              className={cn(
                "p-6 hover:shadow-lg transition-shadow cursor-pointer",
                selectedVisit === visit.id && "ring-2 ring-primary-500"
              )}
              onClick={() => setSelectedVisit(visit.id === selectedVisit ? null : visit.id)}
            >
              <div className="flex items-start gap-4">
                <img 
                  src={visit.propertyImage} 
                  alt={visit.propertyTitle}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{visit.propertyTitle}</h3>
                      <p className="text-sm text-gray-600">{formatPrice(visit.propertyPrice)}</p>
                    </div>
                    <Badge variant={getStatusColor(visit.status)} size="sm">
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {getStatusText(visit.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{visit.visitorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(visit.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{visit.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{visit.type === 'physical' ? 'Physique' : 'Virtuelle'}</span>
                    </div>
                  </div>

                  {visit.notes && (
                    <p className="mt-2 text-sm text-gray-600 italic">
                      Note: {visit.notes}
                    </p>
                  )}

                  {selectedVisit === visit.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${visit.visitorEmail}`} className="text-primary-600 hover:underline">
                            {visit.visitorEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${visit.visitorPhone}`} className="text-primary-600 hover:underline">
                            {visit.visitorPhone}
                          </a>
                        </div>
                      </div>

                      {visit.feedback && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">Retour client:</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={cn(
                                  "text-sm",
                                  i < visit.feedback.rating ? "text-yellow-500" : "text-gray-300"
                                )}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{visit.feedback.comment}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {visit.status === 'scheduled' && (
                          <>
                            <Button size="sm" variant="primary">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirmer
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="w-4 h-4 mr-1" />
                              Reprogrammer
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4 mr-1" />
                              Annuler
                            </Button>
                          </>
                        )}
                        {visit.status === 'completed' && !visit.feedback && (
                          <Button size="sm" variant="primary">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Demander un retour
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Envoyer un message
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <ChevronRight className={cn(
                  "w-5 h-5 text-gray-400 transition-transform",
                  selectedVisit === visit.id && "rotate-90"
                )} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredVisits.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune visite {filter !== 'all' && getStatusText(filter).toLowerCase()}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' && "Vous n'avez pas encore de visites programmées"}
            {filter === 'scheduled' && "Aucune visite n'est actuellement planifiée"}
            {filter === 'completed' && "Aucune visite n'a encore été effectuée"}
            {filter === 'pending' && "Aucune visite en attente de confirmation"}
            {filter === 'cancelled' && "Aucune visite annulée"}
          </p>
        </Card>
      )}
    </div>
  );
};
