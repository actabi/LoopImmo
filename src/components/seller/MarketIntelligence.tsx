import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  TrendingUp, TrendingDown, Home, MapPin, BarChart3, 
  Clock, Info, ChevronRight, Target
} from 'lucide-react';
import { MarketInsight, Property } from '../../types';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface MarketIntelligenceProps {
  insights: MarketInsight;
  property: Property;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ insights, property }) => {
  const [activeTab, setActiveTab] = useState<'competition' | 'trends' | 'recommendations'>('competition');

  const pricePosition = ((property.price - insights.averagePrice) / insights.averagePrice) * 100;
  const isOverpriced = pricePosition > 10;
  const isUnderpriced = pricePosition < -10;

  return (
    <Card>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Intelligence marché</h3>
            <p className="text-sm text-gray-600">
              Analyse en temps réel de votre secteur
            </p>
          </div>
          <Badge variant="info">
            <MapPin className="w-3 h-3 mr-1" />
            {property.location.city}
          </Badge>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('competition')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === 'competition' 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Concurrence
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === 'trends' 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Tendances
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === 'recommendations' 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Recommandations
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'competition' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Prix moyen du quartier</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(insights.averagePrice)}</p>
                <p className="text-xs text-gray-500 mt-1">Pour {property.rooms} pièces</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Votre positionnement</p>
                <p className={cn(
                  "text-xl font-bold",
                  isOverpriced && "text-red-600",
                  isUnderpriced && "text-green-600",
                  !isOverpriced && !isUnderpriced && "text-blue-600"
                )}>
                  {pricePosition > 0 ? '+' : ''}{pricePosition.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isOverpriced && "Au-dessus du marché"}
                  {isUnderpriced && "En-dessous du marché"}
                  {!isOverpriced && !isUnderpriced && "Dans la moyenne"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Biens similaires en vente</h4>
              {insights.similarProperties.map((similar) => (
                <div key={similar.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{similar.title}</p>
                      <p className="text-sm text-gray-600">
                        {similar.surface}m² • {similar.rooms} pièces • {similar.distance}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(similar.price)}</p>
                    <p className="text-xs text-gray-500">{similar.daysOnMarket} jours</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Évolution des prix</p>
                  {insights.priceEvolution > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className={cn(
                  "text-xl font-bold",
                  insights.priceEvolution > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {insights.priceEvolution > 0 ? '+' : ''}{insights.priceEvolution}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Sur 6 mois</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Délai moyen de vente</p>
                <p className="text-xl font-bold text-gray-900">{insights.averageDaysToSell} jours</p>
                <p className="text-xs text-gray-500 mt-1">Dans votre quartier</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Analyse du marché</p>
                  <p className="text-sm text-blue-800">
                    Le marché est actuellement {insights.marketTrend}. 
                    Les biens comme le vôtre se vendent en moyenne {insights.averageDaysToSell} jours 
                    avec une marge de négociation de {insights.averageNegotiation}%.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Profils d'acheteurs actifs</h4>
              <div className="space-y-2">
                {insights.buyerProfiles.map((profile, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{profile.type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${profile.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {profile.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {insights.recommendations.map((rec, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg border",
                rec.priority === 'high' && "bg-red-50 border-red-200",
                rec.priority === 'medium' && "bg-yellow-50 border-yellow-200",
                rec.priority === 'low' && "bg-green-50 border-green-200"
              )}>
                <div className="flex items-start gap-3">
                  <Target className={cn(
                    "w-5 h-5 flex-shrink-0 mt-0.5",
                    rec.priority === 'high' && "text-red-600",
                    rec.priority === 'medium' && "text-yellow-600",
                    rec.priority === 'low' && "text-green-600"
                  )} />
                  <div className="flex-1">
                    <p className={cn(
                      "font-medium mb-1",
                      rec.priority === 'high' && "text-red-900",
                      rec.priority === 'medium' && "text-yellow-900",
                      rec.priority === 'low' && "text-green-900"
                    )}>
                      {rec.title}
                    </p>
                    <p className={cn(
                      "text-sm",
                      rec.priority === 'high' && "text-red-700",
                      rec.priority === 'medium' && "text-yellow-700",
                      rec.priority === 'low' && "text-green-700"
                    )}>
                      {rec.description}
                    </p>
                    {rec.impact && (
                      <p className="text-xs mt-2 font-medium">
                        Impact estimé: {rec.impact}
                      </p>
                    )}
                  </div>
                  {rec.action && (
                    <Button size="sm" variant={rec.priority === 'high' ? 'primary' : 'outline'}>
                      {rec.action}
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-700">
                  Ces recommandations sont basées sur l'analyse de {insights.dataPoints} points de données 
                  du marché local et sont mises à jour quotidiennement.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
