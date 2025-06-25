import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Calendar, Clock, MapPin, User, Phone, ChevronLeft, 
  ChevronRight, Plus, Filter, Download, Bell, Video,
  TrendingUp, AlertCircle, CheckCircle, Navigation,
  MessageSquare, Camera, QrCode, Timer, Star,
  Zap, Target, Award, ArrowUp, ArrowDown, MoreVertical,
  Sun, Cloud, Navigation2, Euro, Users, BarChart3
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Mock data for visits
const visits = [
  {
    id: '1',
    date: new Date('2024-03-15T10:00:00'),
    property: 'T3 65m² - Lyon 7e',
    address: '23 rue de Marseille',
    buyer: 'Claire Dupont',
    phone: '06 12 34 56 78',
    status: 'confirmed',
    type: 'physical',
    revenue: 250,
    travelTime: 15,
    buyerScore: 85,
    weather: 'sunny',
    preparation: ['Clés récupérées', 'Documents prêts', 'Caution confirmée']
  },
  {
    id: '2',
    date: new Date('2024-03-15T14:00:00'),
    property: 'T2 48m² - Lyon 7e',
    address: '45 avenue Jean Jaurès',
    buyer: 'Marc Bernard',
    phone: '06 23 45 67 89',
    status: 'pending',
    type: 'virtual',
    revenue: 200,
    buyerScore: 72,
    preparation: ['Lien visio envoyé', 'Documents partagés']
  },
  {
    id: '3',
    date: new Date('2024-03-16T11:00:00'),
    property: 'T4 82m² - Lyon 3e',
    address: '12 cours Gambetta',
    buyer: 'Sophie Martin',
    phone: '06 34 56 78 90',
    status: 'confirmed',
    type: 'physical',
    revenue: 300,
    travelTime: 20,
    buyerScore: 90,
    weather: 'cloudy',
    preparation: ['Clés à récupérer', 'Vérifier chauffage']
  }
];

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export const PlanningPage: React.FC = () => {
  const [view, setView] = useState<'week' | 'day' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedVisit, setSelectedVisit] = useState<typeof visits[0] | null>(null);
  const [showMobileVisit, setShowMobileVisit] = useState(false);

  // KPIs calculations
  const weekVisits = 12;
  const lastWeekVisits = 10;
  const weekRevenue = 2850;
  const occupancyRate = 75;
  const responseScore = 92;
  const conversionTrend = 8;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getVisitsForDay = (date: Date) => {
    return visits.filter(visit => 
      visit.date.toDateString() === date.toDateString()
    );
  };

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Smart Header with KPIs */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mon Planning</h1>
              <p className="text-gray-600 mt-1">Optimisez vos visites et maximisez vos revenus</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white">
                <Bell className="w-4 h-4 mr-2" />
                Alertes
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="w-4 h-4 mr-2" />
                Disponibilités
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <Badge 
                  variant={weekVisits > lastWeekVisits ? 'success' : 'warning'} 
                  size="sm"
                >
                  {weekVisits > lastWeekVisits ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(weekVisits - lastWeekVisits)}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900">{weekVisits}</p>
              <p className="text-sm text-gray-600">Visites cette semaine</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Euro className="w-5 h-5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+12%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{weekRevenue}€</p>
              <p className="text-sm text-gray-600">Revenus potentiels</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{occupancyRate}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Taux d'occupation</p>
              <p className="text-xs text-gray-600">3 créneaux libres</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <Badge variant="success" size="sm">{responseScore}%</Badge>
              </div>
              <p className="text-sm font-medium text-gray-900">Score réactivité</p>
              <p className="text-xs text-gray-600">Réponse {' < '} 2h</p>
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">
                  Conversion: <span className="font-semibold text-green-600">+{conversionTrend}%</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">
                  Objectif mensuel: <span className="font-semibold">68%</span>
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics détaillés
            </Button>
          </div>
        </div>

        {/* View Selector and Controls */}
        <Card>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['week', 'day', 'month'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v as any)}
                      className={cn(
                        'px-3 py-1 rounded text-sm font-medium transition-colors',
                        view === v
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      )}
                    >
                      {v === 'week' ? 'Semaine' : v === 'day' ? 'Jour' : 'Mois'}
                    </button>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
                <Badge variant="info" size="sm">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  2 nouveaux leads
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-gray-900 min-w-[150px] text-center">
                  {selectedDate.toLocaleDateString('fr-FR', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          {view === 'week' && (
            <div className="p-6">
              <div className="grid grid-cols-8 gap-4">
                <div className="text-sm font-medium text-gray-500">
                  {/* Empty cell for time column */}
                </div>
                {weekDays.map((day, index) => {
                  const date = new Date(selectedDate);
                  date.setDate(date.getDate() - date.getDay() + index + 1);
                  const dayVisits = getVisitsForDay(date);
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <div key={day} className="text-center">
                      <p className="text-sm font-medium text-gray-700">{day}</p>
                      <p className={cn(
                        "text-lg font-semibold mt-1",
                        isToday ? "text-primary-600" : "text-gray-900"
                      )}>
                        {date.getDate()}
                      </p>
                      {dayVisits.length > 0 && (
                        <Badge variant="primary" size="sm" className="mt-1">
                          {dayVisits.length}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-8 gap-4">
                {timeSlots.map((time) => (
                  <React.Fragment key={time}>
                    <div className="text-sm text-gray-500 text-right pr-2">
                      {time}
                    </div>
                    {weekDays.map((_, dayIndex) => {
                      const date = new Date(selectedDate);
                      date.setDate(date.getDate() - date.getDay() + dayIndex + 1);
                      const [hours, minutes] = time.split(':');
                      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                      
                      const visit = visits.find(v => 
                        v.date.getTime() === date.getTime()
                      );

                      return (
                        <div 
                          key={dayIndex} 
                          className={cn(
                            "relative h-20 border rounded-lg transition-all cursor-pointer",
                            visit ? 'hover:shadow-md' : 'hover:bg-gray-50'
                          )}
                          onClick={() => visit && setSelectedVisit(visit)}
                        >
                          {visit && (
                            <div className={cn(
                              "absolute inset-1 rounded p-2",
                              visit.status === 'confirmed' 
                                ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200' 
                                : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200'
                            )}>
                              <div className="flex items-start justify-between mb-1">
                                <p className="font-medium text-xs truncate flex-1">{visit.buyer}</p>
                                {visit.type === 'virtual' && (
                                  <Video className="w-3 h-3 text-blue-600 ml-1" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600 truncate">{visit.property}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-semibold text-green-600">
                                  +{visit.revenue}€
                                </span>
                                {visit.buyerScore && visit.buyerScore > 80 && (
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Selected Visit Details */}
        {selectedVisit && (
          <Card>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedVisit.property}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedVisit.address}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedVisit(null)}>
                  Fermer
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Visit Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Informations visite</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-sm">{selectedVisit.buyer}</p>
                            <p className="text-xs text-gray-600">{selectedVisit.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="info" size="sm">
                            Score: {selectedVisit.buyerScore}%
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-sm">
                              {selectedVisit.date.toLocaleDateString('fr-FR')} à {formatTime(selectedVisit.date)}
                            </p>
                            {selectedVisit.travelTime && (
                              <p className="text-xs text-gray-600">
                                <Navigation2 className="w-3 h-3 inline mr-1" />
                                {selectedVisit.travelTime} min de trajet
                              </p>
                            )}
                          </div>
                        </div>
                        {selectedVisit.weather && (
                          <div className="flex items-center space-x-1 text-sm">
                            {selectedVisit.weather === 'sunny' ? (
                              <Sun className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <Cloud className="w-4 h-4 text-gray-500" />
                            )}
                            <span className="text-xs text-gray-600">
                              {selectedVisit.weather === 'sunny' ? 'Ensoleillé' : 'Nuageux'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {selectedVisit.status === 'pending' ? (
                      <>
                        <Button className="flex-1" size="sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirmer
                        </Button>
                        <Button variant="outline" className="flex-1" size="sm">
                          Reporter
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="flex-1" size="sm" onClick={() => setShowMobileVisit(true)}>
                          <Navigation className="w-4 h-4 mr-2" />
                          Démarrer visite
                        </Button>
                        <Button variant="outline" className="flex-1" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Preparation Checklist */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Préparation visite</h4>
                  <div className="space-y-2">
                    {selectedVisit.preparation?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900 font-medium">Commission estimée</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{selectedVisit.revenue}€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Mobile Visit Experience Modal */}
        {showMobileVisit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visite en cours</h3>
                
                <div className="space-y-4">
                  {/* Check-in */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-green-900">Check-in</h4>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button size="sm" variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="w-4 h-4 mr-2" />
                        QR Code
                      </Button>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="text-center py-4">
                    <Timer className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-900">12:34</p>
                    <p className="text-sm text-gray-600">Durée de la visite</p>
                  </div>

                  {/* Quick Notes */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Notes rapides
                    </label>
                    <textarea 
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={3}
                      placeholder="Intérêt acheteur, points d'attention..."
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowMobileVisit(false)}>
                      Annuler
                    </Button>
                    <Button className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Terminer visite
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="error" size="sm">2 nouveaux</Badge>
              </div>
              <h3 className="font-semibold text-gray-900">Leads en attente</h3>
              <p className="text-sm text-gray-600 mt-1">Répondez rapidement pour maximiser vos chances</p>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">Optimisé</span>
              </div>
              <h3 className="font-semibold text-gray-900">Créneaux disponibles</h3>
              <p className="text-sm text-gray-600 mt-1">Votre planning est bien optimisé cette semaine</p>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-purple-600 font-medium">68%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Objectif mensuel</h3>
              <p className="text-sm text-gray-600 mt-1">Plus que 8 visites pour atteindre votre bonus</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
