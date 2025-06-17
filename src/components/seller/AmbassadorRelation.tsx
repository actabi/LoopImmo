import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  User, Star, MessageSquare, Calendar, TrendingUp, 
  Award, Clock, ChevronRight, Phone, Mail
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface AmbassadorRelationProps {
  ambassador: any;
  property: any;
}

export const AmbassadorRelation: React.FC<AmbassadorRelationProps> = ({ ambassador, property }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Votre ambassadeur</h3>
          <Button size="sm" variant="outline" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Masquer' : 'Détails'}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-primary-600">{ambassador.avatar}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{ambassador.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(ambassador.rating || 4.5) 
                            ? "text-yellow-500 fill-current" 
                            : "text-gray-300"
                        )} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{ambassador.rating || 4.5}/5</span>
                  <Badge size="sm" variant="success">
                    <Award className="w-3 h-3 mr-1" />
                    Top performer
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="primary">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{ambassador.visits}</p>
                <p className="text-xs text-gray-600">Visites réalisées</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{ambassador.leads}</p>
                <p className="text-xs text-gray-600">Leads générés</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{ambassador.conversion}%</p>
                <p className="text-xs text-gray-600">Taux conversion</p>
              </div>
            </div>

            {showDetails && (
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">Spécialités</p>
                  <p className="text-sm text-blue-700">
                    Expert en appartements • Secteur {property.location.city} • 
                    5 ans d'expérience
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-1">Derniers succès</p>
                  <p className="text-sm text-green-700">
                    3 ventes réussies ce mois • Délai moyen: 35 jours
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Commission estimée</p>
                  <p className="text-sm text-gray-700">
                    {formatPrice(property.tier.fee * 0.1)} à la signature
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <p className="text-sm text-primary-900">
              <strong>Performance:</strong> Votre ambassadeur génère 40% plus de visites que la moyenne
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
