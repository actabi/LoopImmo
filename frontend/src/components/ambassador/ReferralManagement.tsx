import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Users, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, 
  XCircle, Euro, MessageSquare, Phone, Mail, Calendar,
  TrendingUp, AlertCircle, ChevronRight, Filter
} from 'lucide-react';
import { getReferrals } from '../../services/dataService';
import { AmbassadorReferral } from '../../types';
import { cn } from '../../utils/cn';

export const ReferralManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const referrals = getReferrals();
  const sentReferrals = referrals.filter(r => r.referringAmbassadorId === '3');
  const receivedReferrals = referrals.filter(r => r.receivingAmbassadorId === '3');

  const getStatusBadge = (status: AmbassadorReferral['status']) => {
    const config = {
      pending: { variant: 'warning' as const, label: 'En attente' },
      accepted: { variant: 'info' as const, label: 'Acceptée' },
      rejected: { variant: 'error' as const, label: 'Refusée' },
      converted: { variant: 'success' as const, label: 'Convertie' }
    };
    return config[status];
  };

  const filteredReferrals = (activeTab === 'sent' ? sentReferrals : receivedReferrals)
    .filter(r => selectedStatus === 'all' || r.status === selectedStatus);

  const stats = {
    sent: {
      total: sentReferrals.length,
      pending: sentReferrals.filter(r => r.status === 'pending').length,
      converted: sentReferrals.filter(r => r.status === 'converted').length,
      earnings: sentReferrals
        .filter(r => r.status === 'converted')
        .reduce((acc, r) => acc + r.potentialCommission, 0)
    },
    received: {
      total: receivedReferrals.length,
      pending: receivedReferrals.filter(r => r.status === 'pending').length,
      converted: receivedReferrals.filter(r => r.status === 'converted').length,
      earnings: receivedReferrals
        .filter(r => r.status === 'converted')
        .reduce((acc, r) => acc + r.potentialCommission, 0)
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Gestion des références</h2>
        <p className="text-gray-600 mt-1">
          Suivez vos références envoyées et reçues
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <ArrowUpRight className="w-5 h-5 text-blue-500" />
            <Badge variant="info">{stats.sent.total}</Badge>
          </div>
          <p className="text-sm text-gray-600">Références envoyées</p>
          <p className="text-lg font-semibold text-gray-900">
            {stats.sent.pending} en attente
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <ArrowDownLeft className="w-5 h-5 text-purple-500" />
            <Badge variant="secondary">{stats.received.total}</Badge>
          </div>
          <p className="text-sm text-gray-600">Références reçues</p>
          <p className="text-lg font-semibold text-gray-900">
            {stats.received.pending} à traiter
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-xs text-green-600 font-medium">
              {Math.round((stats.sent.converted + stats.received.converted) / 
                (stats.sent.total + stats.received.total) * 100)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Taux de conversion</p>
          <p className="text-lg font-semibold text-gray-900">
            {stats.sent.converted + stats.received.converted} ventes
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Euro className="w-5 h-5 text-yellow-500" />
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-sm text-gray-600">Commissions référence</p>
          <p className="text-lg font-semibold text-gray-900">
            {(stats.sent.earnings + stats.received.earnings).toLocaleString('fr-FR')}€
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('sent')}
          className={cn(
            "px-4 py-2 font-medium transition-colors border-b-2",
            activeTab === 'sent' 
              ? "text-primary-600 border-primary-600" 
              : "text-gray-600 border-transparent hover:text-gray-900"
          )}
        >
          <ArrowUpRight className="w-4 h-4 inline mr-2" />
          Envoyées ({stats.sent.total})
        </button>
        <button
          onClick={() => setActiveTab('received')}
          className={cn(
            "px-4 py-2 font-medium transition-colors border-b-2",
            activeTab === 'received' 
              ? "text-primary-600 border-primary-600" 
              : "text-gray-600 border-transparent hover:text-gray-900"
          )}
        >
          <ArrowDownLeft className="w-4 h-4 inline mr-2" />
          Reçues ({stats.received.total})
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Filtrer par statut :</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={selectedStatus === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedStatus('all')}
          >
            Toutes
          </Button>
          <Button
            size="sm"
            variant={selectedStatus === 'pending' ? 'primary' : 'outline'}
            onClick={() => setSelectedStatus('pending')}
          >
            En attente
          </Button>
          <Button
            size="sm"
            variant={selectedStatus === 'accepted' ? 'primary' : 'outline'}
            onClick={() => setSelectedStatus('accepted')}
          >
            Acceptées
          </Button>
          <Button
            size="sm"
            variant={selectedStatus === 'converted' ? 'primary' : 'outline'}
            onClick={() => setSelectedStatus('converted')}
          >
            Converties
          </Button>
        </div>
      </div>

      {/* Referrals List */}
      <div className="space-y-4">
        {filteredReferrals.map((referral) => {
          const statusConfig = getStatusBadge(referral.status);
          const isSent = activeTab === 'sent';
          
          return (
            <Card key={referral.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {referral.propertyTitle}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Acheteur : {referral.buyerName}</span>
                    <span>•</span>
                    <span>
                      {isSent ? 'Envoyée à' : 'Reçue de'} : {' '}
                      {isSent ? referral.receivingAmbassadorId || 'Vendeur direct' : referral.referringAmbassadorName}
                    </span>
                  </div>
                </div>
                <Badge variant={statusConfig.variant}>
                  {statusConfig.label}
                </Badge>
              </div>

              {/* Message */}
              {referral.message && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">{referral.message}</p>
                </div>
              )}

              {/* Commission Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-gray-600">Commission potentielle</p>
                    <p className="font-semibold text-gray-900">
                      {referral.potentialCommission}€ ({referral.commissionSplit.referring}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {referral.createdAt.toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  {referral.acceptedAt && (
                    <div>
                      <p className="text-gray-600">Acceptée le</p>
                      <p className="font-medium text-gray-900">
                        {referral.acceptedAt.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-1" />
                    {referral.buyerContact}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>

                {/* Status-specific actions */}
                {referral.status === 'pending' && !isSent && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600">
                      <XCircle className="w-4 h-4 mr-1" />
                      Refuser
                    </Button>
                    <Button size="sm" variant="primary">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accepter
                    </Button>
                  </div>
                )}

                {referral.status === 'accepted' && (
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4 mr-1" />
                    Planifier visite
                  </Button>
                )}

                {referral.status === 'converted' && (
                  <Badge variant="success" size="lg">
                    <Euro className="w-4 h-4 mr-1" />
                    Commission gagnée : {referral.potentialCommission}€
                  </Badge>
                )}
              </div>

              {/* Notes */}
              {referral.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes :</span> {referral.notes}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredReferrals.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune référence {activeTab === 'sent' ? 'envoyée' : 'reçue'}
          </h3>
          <p className="text-gray-600">
            {activeTab === 'sent' 
              ? "Commencez à référer des acheteurs sur les biens de votre territoire"
              : "Vous recevrez ici les références d'autres ambassadeurs"
            }
          </p>
        </Card>
      )}

      {/* Info Box */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Système de référencement équitable</p>
            <p>
              Chaque référence acceptée et convertie génère une commission partagée 50/50 entre 
              l'ambassadeur référent et le gestionnaire du bien. Un système gagnant-gagnant qui 
              favorise la collaboration au sein du réseau LoopImmo.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
