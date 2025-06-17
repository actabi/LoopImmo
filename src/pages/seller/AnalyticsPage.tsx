import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  BarChart3, TrendingUp, TrendingDown, Eye, Heart, 
  Calendar, Users, Euro, Clock, MapPin, Download,
  ArrowUp, ArrowDown, Info, Filter, ChevronDown
} from 'lucide-react';
import { formatPrice, formatPercentage } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface AnalyticsData {
  views: {
    total: number;
    change: number;
    daily: Array<{ date: string; count: number }>;
    sources: Array<{ name: string; count: number; percentage: number }>;
  };
  engagement: {
    favorites: number;
    shares: number;
    inquiries: number;
    visits: number;
    offers: number;
  };
  audience: {
    demographics: Array<{ type: string; percentage: number }>;
    locations: Array<{ city: string; count: number }>;
    devices: { mobile: number; desktop: number; tablet: number };
  };
  performance: {
    viewsRank: number;
    totalProperties: number;
    conversionRate: number;
    averageTimeOnPage: string;
  };
}

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'engagement' | 'audience'>('views');

  // Mock analytics data
  const analytics: AnalyticsData = {
    views: {
      total: 1846,
      change: 12.5,
      daily: [
        { date: '01/03', count: 45 },
        { date: '02/03', count: 52 },
        { date: '03/03', count: 48 },
        { date: '04/03', count: 65 },
        { date: '05/03', count: 72 },
        { date: '06/03', count: 68 },
        { date: '07/03', count: 85 },
        { date: '08/03', count: 92 },
        { date: '09/03', count: 78 },
        { date: '10/03', count: 95 },
        { date: '11/03', count: 110 },
        { date: '12/03', count: 98 },
        { date: '13/03', count: 115 },
        { date: '14/03', count: 123 }
      ],
      sources: [
        { name: 'LoopImmo', count: 923, percentage: 50 },
        { name: 'Google', count: 461, percentage: 25 },
        { name: 'Réseaux sociaux', count: 277, percentage: 15 },
        { name: 'Direct', count: 185, percentage: 10 }
      ]
    },
    engagement: {
      favorites: 75,
      shares: 34,
      inquiries: 28,
      visits: 12,
      offers: 3
    },
    audience: {
      demographics: [
        { type: 'Primo-accédants', percentage: 35 },
        { type: 'Investisseurs', percentage: 25 },
        { type: 'Familles', percentage: 30 },
        { type: 'Retraités', percentage: 10 }
      ],
      locations: [
        { city: 'Paris', count: 554 },
        { city: 'Boulogne', count: 277 },
        { city: 'Neuilly', count: 185 },
        { city: 'Levallois', count: 138 },
        { city: 'Autres', count: 692 }
      ],
      devices: {
        mobile: 55,
        desktop: 35,
        tablet: 10
      }
    },
    performance: {
      viewsRank: 3,
      totalProperties: 45,
      conversionRate: 6.5,
      averageTimeOnPage: '3:45'
    }
  };

  const maxViews = Math.max(...analytics.views.daily.map(d => d.count));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analyses</h1>
          <p className="text-gray-600">Suivez la performance de vos annonces</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Performance globale</h2>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              Top {analytics.performance.viewsRank} sur {analytics.performance.totalProperties}
            </p>
            <p className="text-gray-700">
              Votre bien est dans le top {formatPercentage((analytics.performance.viewsRank / analytics.performance.totalProperties) * 100)} 
              des biens les plus vus de votre secteur
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">+{analytics.views.change}%</span>
            </div>
            <p className="text-sm text-gray-600">vs période précédente</p>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-blue-500" />
            <div className="flex items-center gap-1 text-xs">
              <ArrowUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600 font-medium">+{analytics.views.change}%</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.views.total}</p>
          <p className="text-sm text-gray-600">Vues totales</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.engagement.favorites}</p>
          <p className="text-sm text-gray-600">Favoris</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatPercentage((analytics.engagement.favorites / analytics.views.total) * 100)} taux
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.engagement.inquiries}</p>
          <p className="text-sm text-gray-600">Demandes</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.engagement.visits}</p>
          <p className="text-sm text-gray-600">Visites</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Euro className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.engagement.offers}</p>
          <p className="text-sm text-gray-600">Offres</p>
          <p className="text-xs text-green-600 font-medium mt-1">
            {formatPercentage(analytics.performance.conversionRate)} conversion
          </p>
        </Card>
      </div>

      {/* Metric Selector */}
      <div className="flex gap-2">
        {(['views', 'engagement', 'audience'] as const).map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              selectedMetric === metric 
                ? "bg-primary-100 text-primary-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {metric === 'views' && 'Vues'}
            {metric === 'engagement' && 'Engagement'}
            {metric === 'audience' && 'Audience'}
          </button>
        ))}
      </div>

      {/* Views Analytics */}
      {selectedMetric === 'views' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des vues</h3>
              
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics.views.daily.map((data, index) => {
                  const heightPercent = (data.count / maxViews) * 100;
                  const isHighDay = data.count > 100;
                  
                  return (
                    <div key={index} className="flex-1 relative group">
                      <div 
                        className={cn(
                          "rounded-t-lg transition-all duration-300",
                          isHighDay ? "bg-primary-500 hover:bg-primary-600" : "bg-primary-300 hover:bg-primary-400"
                        )}
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.count} vues
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                {analytics.views.daily.filter((_, i) => i % 2 === 0).map((data) => (
                  <span key={data.date}>{data.date}</span>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-blue-900">
                    <strong>Insight:</strong> Vos vues augmentent de 15% en moyenne le jeudi, 
                    correspondant à l'envoi de notre newsletter hebdomadaire.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources de trafic</h3>
              
              <div className="space-y-3">
                {analytics.views.sources.map((source) => (
                  <div key={source.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{source.name}</span>
                      <span className="text-sm text-gray-600">{source.count} vues</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Temps moyen sur page</span>
                  <span className="font-medium text-gray-900">{analytics.performance.averageTimeOnPage}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Engagement Analytics */}
      {selectedMetric === 'engagement' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Entonnoir de conversion</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Vues', value: analytics.views.total, percentage: 100 },
                  { label: 'Favoris', value: analytics.engagement.favorites, percentage: (analytics.engagement.favorites / analytics.views.total) * 100 },
                  { label: 'Demandes', value: analytics.engagement.inquiries, percentage: (analytics.engagement.inquiries / analytics.views.total) * 100 },
                  { label: 'Visites', value: analytics.engagement.visits, percentage: (analytics.engagement.visits / analytics.views.total) * 100 },
                  { label: 'Offres', value: analytics.engagement.offers, percentage: (analytics.engagement.offers / analytics.views.total) * 100 }
                ].map((step, index) => (
                  <div key={step.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{step.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{step.value}</span>
                        <Badge size="sm" variant={index === 0 ? 'info' : 'outline'}>
                          {formatPercentage(step.percentage)}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={cn(
                          "h-3 rounded-full transition-all duration-500",
                          index === 0 && "bg-blue-500",
                          index === 1 && "bg-purple-500",
                          index === 2 && "bg-indigo-500",
                          index === 3 && "bg-green-500",
                          index === 4 && "bg-emerald-600"
                        )}
                        style={{ width: `${step.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions des visiteurs</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">{analytics.engagement.shares}</p>
                  <p className="text-sm text-gray-600">Partages</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">18</p>
                  <p className="text-sm text-gray-600">Téléchargements</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">42</p>
                  <p className="text-sm text-gray-600">Clics téléphone</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600">Visites virtuelles</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-900">
                  <strong>Performance:</strong> Votre taux de conversion visite → offre est 2x supérieur à la moyenne !
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Audience Analytics */}
      {selectedMetric === 'audience' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profils des visiteurs</h3>
              
              <div className="space-y-3">
                {analytics.audience.demographics.map((demo) => (
                  <div key={demo.type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{demo.type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${demo.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {demo.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Localisation</h3>
              
              <div className="space-y-2">
                {analytics.audience.locations.map((location) => (
                  <div key={location.city} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{location.city}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{location.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appareils utilisés</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Mobile</span>
                    <span className="text-sm font-medium">{analytics.audience.devices.mobile}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${analytics.audience.devices.mobile}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Desktop</span>
                    <span className="text-sm font-medium">{analytics.audience.devices.desktop}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${analytics.audience.devices.desktop}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Tablette</span>
                    <span className="text-sm font-medium">{analytics.audience.devices.tablet}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${analytics.audience.devices.tablet}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-900">
                  💡 55% de vos visiteurs sont sur mobile. Assurez-vous que vos photos sont optimisées !
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
