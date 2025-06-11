import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Calendar, Clock, MapPin, User, Phone, MessageSquare,
  CheckCircle, XCircle, AlertCircle, ChevronRight,
  Filter, Download, Eye, Edit, Trash2, Plus,
  Navigation, Home, Star, FileText, Camera,
  TrendingUp, Users, Euro, Timer, Route
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/calculations';

import { mockVisits } from "../../mocks";
// Types pour les visites
interface AmbassadorVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyImage?: string;
  
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerScore?: number;
  
  date: Date;
  time: string;
  duration: number; // minutes
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
    interested: boolean;
  };
  
  commission?: number;
  distance?: number; // km
  travelTime?: number; // minutes
}

// Mock data enrichi

// Composant pour le calendrier de visites
const VisitCalendar: React.FC<{ visits: AmbassadorVisit[] }> = ({ visits }) => {
  const today = new Date();
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  // Grouper les visites par jour
  const visitsByDay = visits.reduce((acc, visit) => {
    const dateKey = visit.date.toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(visit);
    return acc;
  }, {} as Record<string, AmbassadorVisit[]>);

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - today.getDay() + i);
          const dateKey = date.toDateString();
          const dayVisits = visitsByDay[dateKey] || [];
          const isToday = date.toDateString() === today.toDateString();
          
          return (
            <div
              key={i}
              className={cn(
                "aspect-square p-2 rounded-lg border text-center relative",
                isToday ? "border-primary-500 bg-primary-50" : "border-gray-200",
                dayVisits.length > 0 && "bg-blue-50"
              )}
            >
              <span className={cn(
                "text-sm",
                isToday ? "font-bold text-primary-600" : "text-gray-700"
              )}>
                {date.getDate()}
              </span>
              {dayVisits.length > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-0.5">
                    {dayVisits.slice(0, 3).map((_, idx) => (
                      <div key={idx} className="w-1 h-1 bg-blue-500 rounded-full" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Composant pour l'itinéraire optimisé
const OptimizedRoute: React.FC<{ visits: AmbassadorVisit[] }> = ({ visits }) => {
  const totalDistance = visits.reduce((sum, v) => sum + (v.distance || 0), 0);
  const totalTime = visits.reduce((sum, v) => sum + (v.travelTime || 0) + v.duration, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Itinéraire optimisé du jour</h3>
        <Button size="sm" variant="outline">
          <Navigation className="w-4 h-4 mr-2" />
          Ouvrir GPS
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        {visits.map((visit, index) => (
          <div key={visit.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index === 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
              )}>
                {index + 1}
              </div>
              {index < visits.length - 1 && (
                <div className="w-0.5 h-16 bg-gray-300 mt-1" />
              )}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-gray-900">{visit.time} - {visit.propertyTitle}</p>
              <p className="text-sm text-gray-600">{visit.propertyAddress}</p>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Route className="w-3 h-3" />
                  {visit.distance} km
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  {visit.travelTime} min de trajet
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{visits.length}</p>
            <p className="text-xs text-gray-600">Visites</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalDistance.toFixed(1)} km</p>
            <p className="text-xs text-gray-600">Distance totale</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{Math.floor(totalTime / 60)}h{totalTime % 60}</p>
            <p className="text-xs text-gray-600">Temps total</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const AmbassadorVisitsManagementPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'list' | 'calendar' | 'map'>('list');
  const [selectedVisit, setSelectedVisit] = useState<AmbassadorVisit | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filtrer les visites
  const filteredVisits = filterStatus === 'all' 
    ? mockVisits 
    : mockVisits.filter(v => v.status === filterStatus);

  // Visites du jour
  const todayVisits = mockVisits.filter(v => 
    v.date.toDateString() === new Date().toDateString()
  ).sort((a, b) => a.time.localeCompare(b.time));

  // Stats
  const stats = {
    scheduled: mockVisits.filter(v => v.status === 'scheduled' || v.status === 'confirmed').length,
    completed: mockVisits.filter(v => v.status === 'completed').length,
    cancelled: mockVisits.filter(v => v.status === 'cancelled').length,
    totalCommission: mockVisits.filter(v => v.status === 'completed').reduce((sum, v) => sum + (v.commission || 0), 0),
    avgRating: 4.8,
    conversionRate: 65
  };

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des visites</h1>
            <p className="text-gray-600 mt-1">Organisez et suivez toutes vos visites</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Planifier visite
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
            <p className="text-sm text-gray-600">Planifiées</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-sm text-gray-600">Réalisées</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
            <p className="text-sm text-gray-600">Annulées</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Euro className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalCommission)}</p>
            <p className="text-sm text-gray-600">Commissions</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.avgRating}/5</p>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
            <p className="text-sm text-gray-600">Conversion</p>
          </Card>
        </div>

        {/* Today's Route */}
        {todayVisits.length > 0 && (
          <OptimizedRoute visits={todayVisits} />
        )}

        {/* View Selector */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedView('list')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedView === 'list' 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Liste
            </button>
            <button
              onClick={() => setSelectedView('calendar')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedView === 'calendar' 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Calendrier
            </button>
            <button
              onClick={() => setSelectedView('map')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedView === 'map' 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Carte
            </button>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Toutes les visites</option>
            <option value="scheduled">Planifiées</option>
            <option value="confirmed">Confirmées</option>
            <option value="completed">Terminées</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>

        {/* Content based on view */}
        {selectedView === 'calendar' ? (
          <Card className="p-6">
            <VisitCalendar visits={filteredVisits} />
          </Card>
        ) : selectedView === 'map' ? (
          <Card className="p-6">
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Carte interactive des visites</p>
                <p className="text-sm text-gray-500 mt-2">Visualisez vos visites sur la carte</p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredVisits.map(visit => (
              <Card key={visit.id} className="p-6">
                <div className="flex items-start gap-4">
                  {/* Property Image */}
                  <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {visit.propertyImage ? (
                      <img 
                        src={visit.propertyImage} 
                        alt={visit.propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Visit Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{visit.propertyTitle}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {visit.propertyAddress}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          visit.status === 'completed' ? 'success' :
                          visit.status === 'cancelled' ? 'error' :
                          visit.status === 'confirmed' ? 'info' :
                          'warning'
                        }
                      >
                        {visit.status === 'scheduled' && 'Planifiée'}
                        {visit.status === 'confirmed' && 'Confirmée'}
                        {visit.status === 'completed' && 'Terminée'}
                        {visit.status === 'cancelled' && 'Annulée'}
                        {visit.status === 'no_show' && 'Absent'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Date & Heure</p>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {visit.date.toLocaleDateString('fr-FR')} à {visit.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Acheteur</p>
                        <p className="font-medium flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {visit.buyerName}
                          {visit.buyerScore && (
                            <span className="text-xs text-green-600 ml-1">({visit.buyerScore}%)</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Prix du bien</p>
                        <p className="font-medium">{formatPrice(visit.propertyPrice)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Commission</p>
                        <p className="font-medium text-primary-600">{formatPrice(visit.commission || 0)}</p>
                      </div>
                    </div>

                    {/* Feedback if completed */}
                    {visit.feedback && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "w-4 h-4",
                                  i <= visit.feedback.rating 
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          {visit.feedback.interested && (
                            <Badge variant="success" size="sm">Intéressé</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{visit.feedback.comment}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Appeler
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      {visit.status === 'scheduled' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            Annuler
                          </Button>
                        </>
                      )}
                      {visit.status === 'completed' && !visit.feedback && (
                        <Button size="sm" variant="primary">
                          <FileText className="w-4 h-4 mr-1" />
                          Ajouter feedback
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
