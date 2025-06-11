import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Phone, MessageSquare, Calendar, Clock, CheckCircle,
  AlertTriangle, TrendingUp, Target, Users, Euro,
  ChevronRight, Filter, Star, Zap, Trophy, Timer,
  MapPin, Home, CreditCard, FileCheck, ArrowRight,
  PhoneCall, Mail, CalendarCheck, X, Info, Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

import { mockEnrichedLeads } from "../../mocks";
// Types étendus pour les leads
interface ExtendedLead {
  id: string;
  // Infos client
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  
  // Infos recherche
  propertyType: 'apartment' | 'house';
  budget: number;
  budgetMax: number;
  surface: number;
  rooms: number;
  location: string;
  
  // Matching
  matchedProperty: {
    id: string;
    title: string;
    price: number;
    address: string;
    matchScore: number; // 0-100
  };
  
  // Statut et timing
  status: 'new' | 'contacted' | 'qualified' | 'visit_scheduled' | 'visit_done' | 'offer' | 'lost';
  urgency: 'immediate' | 'high' | 'medium' | 'low';
  timeline: string;
  
  // Tracking
  assignedAt: Date;
  lastContact?: Date;
  nextAction?: {
    type: 'call' | 'visit' | 'follow_up';
    date: Date;
  };
  
  // Qualification
  financing: 'cash' | 'loan_approved' | 'loan_pending' | 'not_started';
  motivation: 'very_high' | 'high' | 'medium' | 'low';
  responseTime: number; // heures depuis attribution
  
  // Notes et historique
  notes?: string;
  history: {
    date: Date;
    action: string;
    result?: string;
  }[];
}

// Mock data enrichi

// Composant pour l'affichage du score de matching
const MatchScore: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className={cn("px-3 py-1 rounded-full border text-sm font-medium", getColor())}>
      {score}% match
    </div>
  );
};

// Composant pour le statut de financement
const FinancingBadge: React.FC<{ financing: ExtendedLead['financing'] }> = ({ financing }) => {
  const config = {
    cash: { label: 'Cash', icon: CreditCard, color: 'success' },
    loan_approved: { label: 'Prêt accordé', icon: CheckCircle, color: 'success' },
    loan_pending: { label: 'Prêt en cours', icon: Clock, color: 'warning' },
    not_started: { label: 'Non démarré', icon: X, color: 'error' }
  };

  const { label, icon: Icon, color } = config[financing];

  return (
    <Badge variant={color as any} size="sm">
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};

export const LeadsPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'priority' | 'all' | 'scheduled'>('priority');
  const [selectedLead, setSelectedLead] = useState<ExtendedLead | null>(null);

  // Calculs des métriques
  const metrics = {
    totalLeads: mockEnrichedLeads.length,
    newLeads: mockEnrichedLeads.filter(l => l.status === 'new').length,
    urgentLeads: mockEnrichedLeads.filter(l => l.urgency === 'immediate' || l.urgency === 'high').length,
    scheduledVisits: mockEnrichedLeads.filter(l => l.status === 'visit_scheduled').length,
    conversionRate: 35,
    avgResponseTime: 4.5
  };

  // Filtrer les leads selon la vue
  const getFilteredLeads = () => {
    switch (selectedView) {
      case 'priority':
        return mockEnrichedLeads
          .filter(l => l.status === 'new' || l.urgency === 'immediate' || l.urgency === 'high')
          .sort((a, b) => {
            const urgencyOrder = { immediate: 0, high: 1, medium: 2, low: 3 };
            return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
          });
      case 'scheduled':
        return mockEnrichedLeads.filter(l => l.nextAction);
      default:
        return mockEnrichedLeads;
    }
  };

  const filteredLeads = getFilteredLeads();

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header avec actions rapides */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Centre de Gestion des Leads</h1>
              <p className="text-gray-600 mt-1">Optimisez vos conversions et gérez vos prospects efficacement</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Coaching IA
              </Button>
            </div>
          </div>

          {/* Métriques clés */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-green-600 font-medium">+12%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
              <p className="text-xs text-gray-600">Leads actifs</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <Badge variant="warning" size="sm">{metrics.newLeads}</Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metrics.urgentLeads}</p>
              <p className="text-xs text-gray-600">À traiter</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <CalendarCheck className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{metrics.scheduledVisits}</p>
              <p className="text-xs text-gray-600">Visites prévues</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
              <p className="text-xs text-gray-600">Taux conversion</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Timer className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{metrics.avgResponseTime}h</p>
              <p className="text-xs text-gray-600">Temps réponse</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">Gold</p>
              <p className="text-xs text-gray-600">Votre niveau</p>
            </div>
          </div>
        </div>

        {/* Navigation par vues */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedView('priority')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedView === 'priority' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Prioritaires ({metrics.urgentLeads})
          </button>
          <button
            onClick={() => setSelectedView('all')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedView === 'all' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Tous les leads ({metrics.totalLeads})
          </button>
          <button
            onClick={() => setSelectedView('scheduled')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedView === 'scheduled' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Planifiés ({metrics.scheduledVisits})
          </button>
        </div>

        {/* Liste des leads ou détail */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Liste des leads */}
          <div className="lg:col-span-2 space-y-4">
            {filteredLeads.length === 0 ? (
              <Card className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucun lead dans cette catégorie</p>
              </Card>
            ) : (
              filteredLeads.map(lead => (
                <Card 
                  key={lead.id}
                  className={cn(
                    "p-6 cursor-pointer transition-all hover:shadow-lg",
                    selectedLead?.id === lead.id && "ring-2 ring-primary-500",
                    lead.urgency === 'immediate' && "border-l-4 border-l-red-500",
                    lead.urgency === 'high' && "border-l-4 border-l-orange-500"
                  )}
                  onClick={() => setSelectedLead(lead)}
                >
                  {/* En-tête du lead */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{lead.clientName}</h3>
                        <FinancingBadge financing={lead.financing} />
                        {lead.urgency === 'immediate' && (
                          <Badge variant="error" size="sm">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Attribué il y a {Math.floor((Date.now() - lead.assignedAt.getTime()) / (1000 * 60 * 60))}h
                      </p>
                    </div>
                    <MatchScore score={lead.matchedProperty.matchScore} />
                  </div>

                  {/* Infos recherche */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-medium">{(lead.budget / 1000).toFixed(0)}k - {(lead.budgetMax / 1000).toFixed(0)}k€</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Recherche</p>
                      <p className="font-medium">{lead.propertyType === 'apartment' ? 'Appartement' : 'Maison'} {lead.rooms}P</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Secteur</p>
                      <p className="font-medium">{lead.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Délai</p>
                      <p className="font-medium">{lead.timeline}</p>
                    </div>
                  </div>

                  {/* Bien matché */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Bien recommandé</p>
                    <p className="font-medium text-sm">{lead.matchedProperty.title}</p>
                    <p className="text-sm text-gray-600">{lead.matchedProperty.address}</p>
                  </div>

                  {/* Actions rapides */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Call', lead.id);
                      }}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Appeler
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Schedule', lead.id);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Planifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('More', lead.id);
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Panneau de détail */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <Card className="p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Détails du lead</h3>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setSelectedLead(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Contact */}
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contact</p>
                    <p className="font-medium">{selectedLead.clientName}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-3 h-3 mr-1" />
                        {selectedLead.clientPhone}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Niveau de motivation</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-5 h-5",
                            i <= (selectedLead.motivation === 'very_high' ? 5 : 
                                  selectedLead.motivation === 'high' ? 4 : 
                                  selectedLead.motivation === 'medium' ? 3 : 2)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedLead.notes && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Notes</p>
                      <p className="text-sm bg-yellow-50 p-3 rounded-lg">{selectedLead.notes}</p>
                    </div>
                  )}
                </div>

                {/* Historique */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Historique des actions</h4>
                  {selectedLead.history.length === 0 ? (
                    <p className="text-sm text-gray-500">Aucune action enregistrée</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedLead.history.map((item, index) => (
                        <div key={index} className="flex gap-3 text-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium">{item.action}</p>
                            {item.result && (
                              <p className="text-gray-600">{item.result}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {item.date.toLocaleDateString('fr-FR')} à {item.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions suggérées */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Action recommandée
                  </h4>
                  <p className="text-sm text-blue-800 mb-3">
                    {selectedLead.status === 'new' 
                      ? "Appelez dans les 30 prochaines minutes pour maximiser vos chances"
                      : selectedLead.status === 'contacted'
                      ? "Proposez une visite dans les 48h"
                      : "Relancez pour confirmer la visite"}
                  </p>
                  <Button size="sm" className="w-full">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Exécuter l'action
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Sélectionnez un lead pour voir les détails</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Conseils et formation */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Conseil du jour</h3>
              <p className="text-sm text-gray-700 mb-3">
                Les leads contactés dans la première heure ont 7x plus de chances de convertir. 
                Priorisez les nouveaux leads marqués "Urgent" pour maximiser vos commissions.
              </p>
              <Button size="sm" variant="outline">
                Voir plus de conseils
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
