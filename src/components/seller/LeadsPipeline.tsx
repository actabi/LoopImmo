import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Users, Star, Clock, Euro, MessageSquare, Calendar,
  ChevronRight, Filter, TrendingUp, AlertCircle
} from 'lucide-react';
import { Lead, Property } from '../../types';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface LeadsPipelineProps {
  leads: Lead[];
  property: Property;
}

export const LeadsPipeline: React.FC<LeadsPipelineProps> = ({ leads, property }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statusConfig = {
    new: { label: 'Nouveau', color: 'blue', icon: Clock },
    contacted: { label: 'Contacté', color: 'yellow', icon: MessageSquare },
    visit_scheduled: { label: 'Visite prévue', color: 'purple', icon: Calendar },
    visit_completed: { label: 'Visite effectuée', color: 'green', icon: Users },
    lost: { label: 'Perdu', color: 'gray', icon: AlertCircle }
  };

  const filteredLeads = selectedStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === selectedStatus);

  const qualifiedLeads = leads.filter(lead => lead.score && lead.score >= 7);

  return (
    <Card>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pipeline des acheteurs</h3>
            <p className="text-sm text-gray-600">
              {qualifiedLeads.length} prospects sérieux sur {leads.length}
            </p>
          </div>
          <Button size="sm" variant="outline">
            <Filter className="w-4 h-4 mr-1" />
            Filtrer
          </Button>
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedStatus('all')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
              selectedStatus === 'all' 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Tous ({leads.length})
          </button>
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = leads.filter(l => l.status === status).length;
            if (count === 0) return null;
            
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                  selectedStatus === status 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {filteredLeads.map((lead) => {
          const config = statusConfig[lead.status];
          const Icon = config.icon;
          
          return (
            <div key={lead.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                `bg-${config.color}-100`
              )}>
                <Icon className={cn("w-5 h-5", `text-${config.color}-600`)} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.contact}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.score && lead.score >= 7 && (
                      <Badge size="sm" variant="success">
                        <Star className="w-3 h-3 mr-1" />
                        Score {lead.score}/10
                      </Badge>
                    )}
                    <Badge size="sm" variant={config.color as any}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <span>Budget: {formatPrice(lead.budget || property.price * 0.95)}</span>
                  <span>•</span>
                  <span>Délai: {lead.timeline || '2-3 mois'}</span>
                  {lead.financing && (
                    <>
                      <span>•</span>
                      <Badge size="sm" variant="outline">
                        {lead.financing}
                      </Badge>
                    </>
                  )}
                </div>
                
                <p className="text-sm text-gray-700 mt-2">{lead.lastAction}</p>
              </div>

              <Button size="sm" variant="outline">
                Voir
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-blue-50 border-t">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-900">
            <strong>Conseil:</strong> Les acheteurs avec un score ≥7 ont 3x plus de chances de faire une offre. 
            Priorisez les visites avec eux !
          </p>
        </div>
      </div>
    </Card>
  );
};
