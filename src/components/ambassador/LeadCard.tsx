import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Phone, MessageSquare, Calendar, X, Clock, 
  Euro, Home, CheckCircle, AlertCircle, User
} from 'lucide-react';
import { Lead } from '../../types';
import { cn } from '../../utils/cn';

interface ExtendedLead extends Lead {
  budget: string;
  propertyType: string;
  kycValidated: boolean;
  downPayment: number;
  attributedAt: Date;
  urgency: 'high' | 'medium' | 'low';
}

interface LeadCardProps {
  lead: ExtendedLead;
  onCall: () => void;
  onSMS: () => void;
  onSchedule: () => void;
  onReject: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onCall,
  onSMS,
  onSchedule,
  onReject
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-gray-300 bg-gray-50';
      default: return 'border-gray-300';
    }
  };

  const timeSinceAttribution = () => {
    const hours = Math.floor((Date.now() - lead.attributedAt.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'À l\'instant';
    if (hours < 24) return `il y a ${hours}h`;
    return `il y a ${Math.floor(hours / 24)}j`;
  };

  const timeRemaining = () => {
    const hoursElapsed = Math.floor((Date.now() - lead.attributedAt.getTime()) / (1000 * 60 * 60));
    const hoursRemaining = 24 - hoursElapsed;
    if (hoursRemaining <= 0) return 'Expiré';
    return `${hoursRemaining}h restantes`;
  };

  return (
    <Card className={cn(
      "border-2 transition-all hover:shadow-lg",
      getUrgencyColor(lead.urgency)
    )}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            {lead.urgency === 'high' && (
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-700">
                  URGENT - Répondre sous 24h
                </span>
              </div>
            )}
            <h4 className="text-lg font-semibold text-gray-900">Lead #{lead.id}</h4>
            <p className="text-sm text-gray-600">
              Attribué {timeSinceAttribution()} • {timeRemaining()}
            </p>
          </div>
          <Badge variant={lead.status === 'new' ? 'warning' : 'info'}>
            {lead.status === 'new' ? 'Nouveau' : 'En cours'}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-900">{lead.name}</span>
            {lead.kycValidated && (
              <Badge variant="success" size="sm">
                <CheckCircle className="w-3 h-3 mr-1" />
                KYC validé
              </Badge>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Euro className="w-4 h-4" />
              <span>Budget: {lead.budget}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Home className="w-4 h-4" />
              <span>{lead.propertyType} souhaité</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{lead.contact}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Euro className="w-4 h-4" />
              <span>Apport: {lead.downPayment}k€</span>
            </div>
          </div>
        </div>

        {/* Property Match */}
        <div className="bg-white rounded-lg p-3 mb-4 border">
          <p className="text-sm font-medium text-gray-700 mb-1">Bien correspondant:</p>
          <p className="text-sm text-gray-900">{lead.propertyTitle}</p>
          <p className="text-sm text-gray-600">📍 {lead.propertyTitle.split(',')[1]}</p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button size="sm" onClick={onCall} className="bg-green-600 hover:bg-green-700">
            <Phone className="w-4 h-4 mr-1" />
            Appeler
          </Button>
          <Button size="sm" variant="outline" onClick={onSMS}>
            <MessageSquare className="w-4 h-4 mr-1" />
            SMS
          </Button>
          <Button size="sm" variant="outline" onClick={onSchedule}>
            <Calendar className="w-4 h-4 mr-1" />
            Planifier
          </Button>
          <Button size="sm" variant="outline" onClick={onReject} className="text-red-600 hover:text-red-700">
            <X className="w-4 h-4 mr-1" />
            Refuser
          </Button>
        </div>
      </div>
    </Card>
  );
};
