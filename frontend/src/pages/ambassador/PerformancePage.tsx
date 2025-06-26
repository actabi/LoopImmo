import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  TrendingUp, Award, Target, Users, Calendar, Euro,
  Star, BarChart3, Clock, CheckCircle, AlertTriangle,
  Trophy, Zap, ArrowUpRight, ArrowDownRight, Info,
  Medal, Flame, ChevronRight, Download
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/calculations';

// Types pour la performance
interface PerformanceMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress: number;
  reward?: string;
}

interface Ranking {
  position: number;
  total: number;
  category: string;
  evolution: 'up' | 'down' | 'stable';
  evolutionValue: number;
}

// Mock data
const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'visits',
    label: 'Visites réalisées',
    value: 23,
    target: 25,
    unit: 'visites',
    trend: 'up',
    trendValue: 15
  },
  {
    id: 'conversion',
    label: 'Taux de conversion',
    value: 68,
    target: 65,
    unit: '%',
    trend: 'up',
    trendValue: 8
  },
  {
    id: 'response',
    label: 'Temps de réponse',
    value: 2.5,
    target: 4,
    unit: 'heures',
    trend: 'down',
    trendValue: -30
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction client',
    value: 4.8,
    target: 4.5,
    unit: '/5',
    trend: 'stable',
    trendValue: 0
  }
];

const achievements: Achievement[] = [
  {
    id: 'first_sale',
    title: 'Première vente',
    description: 'Réalisez votre première vente',
    icon: Trophy,
    unlocked: true,
    progress: 100,
    reward: '100€ bonus'
  },
  {
    id: 'speed_demon',
    title: 'Rapide comme l\'éclair',
    description: 'Répondez à 10 leads en moins d\'1h',
    icon: Zap,
    unlocked: true,
    progress: 100,
    reward: 'Badge vitesse'
  },
  {
    id: 'perfect_month',
    title: 'Mois parfait',
    description: 'Atteignez tous vos objectifs mensuels',
    icon: Star,
    unlocked: false,
    progress: 85,
    reward: '500€ bonus'
  },
  {
    id: 'top_performer',
    title: 'Top performer',
    description: 'Finissez dans le top 3 du classement',
    icon: Medal,
    unlocked: false,
    progress: 60,
    reward: 'Zone premium'
  }
];

const rankings: Ranking[] = [
  {
    position: 3,
    total: 24,
    category: 'Général',
    evolution: 'up',
    evolutionValue: 2
  },
  {
    position: 2,
    total: 8,
    category: 'Lyon 3ème',
    evolution: 'stable',
    evolutionValue: 0
  },
  {
    position: 5,
    total: 24,
    category: 'Nouveaux loopers',
    evolution: 'up',
    evolutionValue: 3
  }
];

// Composant pour le score global
const PerformanceScore: React.FC = () => {
  const score = 847;
  const level = 'Or';
  const nextLevel = 'Platine';
  const progress = 80;

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Score de performance</h3>
          <p className="text-sm text-gray-600 mt-1">Niveau actuel : {level}</p>
        </div>
        <Badge variant="warning" size="lg">
          <Award className="w-4 h-4 mr-1" />
          {level}
        </Badge>
      </div>

      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-yellow-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">{score}</p>
              <p className="text-xs text-gray-600">points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progression vers {nextLevel}</span>
          <span className="font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-yellow-200 rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 text-center mt-2">
          Plus que 153 points pour atteindre le niveau {nextLevel}
        </p>
      </div>
    </Card>
  );
};

// Composant pour une métrique
const MetricCard: React.FC<{ metric: PerformanceMetric }> = ({ metric }) => {
  const progress = (metric.value / metric.target) * 100;
  const isExceeding = metric.value >= metric.target;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">{metric.label}</p>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          metric.trend === 'up' ? "text-green-600" : 
          metric.trend === 'down' ? "text-red-600" : 
          "text-gray-600"
        )}>
          {metric.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
          {metric.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
          {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
        <p className="text-sm text-gray-600">{metric.unit}</p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Objectif : {metric.target}</span>
          <span className={cn(
            "font-medium",
            isExceeding ? "text-green-600" : "text-gray-600"
          )}>
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={cn(
              "h-1.5 rounded-full transition-all",
              isExceeding ? "bg-green-500" : "bg-primary-500"
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

// Composant pour un achievement
const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const Icon = achievement.icon;

  return (
    <div className={cn(
      "p-4 rounded-lg border-2 transition-all",
      achievement.unlocked 
        ? "bg-white border-green-200" 
        : "bg-gray-50 border-gray-200"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          achievement.unlocked
            ? "bg-green-100"
            : "bg-gray-100"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            achievement.unlocked
              ? "text-green-600"
              : "text-gray-400"
          )} />
        </div>

        <div className="flex-1">
          <h4 className={cn(
            "font-medium",
            achievement.unlocked ? "text-gray-900" : "text-gray-600"
          )}>
            {achievement.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
          
          {!achievement.unlocked && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Progression</span>
                <span className="font-medium">{achievement.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="h-1.5 bg-primary-500 rounded-full"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          )}

          {achievement.reward && (
            <div className="mt-2">
              <Badge 
                variant={achievement.unlocked ? "success" : "default"} 
                size="sm"
              >
                {achievement.reward}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PerformancePage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance & Objectifs</h1>
            <p className="text-gray-600 mt-1">Suivez vos progrès et débloquez des récompenses</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapport détaillé
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedPeriod === 'week' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Semaine
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedPeriod === 'month' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Mois
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              selectedPeriod === 'year' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Année
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance Score */}
          <PerformanceScore />

          {/* Rankings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Classements</h3>
            <div className="space-y-4">
              {rankings.map((ranking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{ranking.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary-600">#{ranking.position}</span>
                      <span className="text-sm text-gray-600">sur {ranking.total}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    ranking.evolution === 'up' ? "text-green-600" :
                    ranking.evolution === 'down' ? "text-red-600" :
                    "text-gray-600"
                  )}>
                    {ranking.evolution === 'up' && <ArrowUpRight className="w-4 h-4" />}
                    {ranking.evolution === 'down' && <ArrowDownRight className="w-4 h-4" />}
                    {ranking.evolutionValue !== 0 && (
                      <span>{ranking.evolutionValue > 0 ? '+' : ''}{ranking.evolutionValue}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              Voir tous les classements
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé du mois</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Commissions gagnées</span>
                <span className="font-bold text-gray-900">{formatPrice(3650)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Leads traités</span>
                <span className="font-bold text-gray-900">38</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Visites réalisées</span>
                <span className="font-bold text-gray-900">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ventes conclues</span>
                <span className="font-bold text-gray-900">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Note moyenne</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">4.8</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">Série en cours : <strong>12 jours</strong></span>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métriques de performance</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Succès & Récompenses</h3>
            <Badge variant="primary">
              {achievements.filter(a => a.unlocked).length}/{achievements.length} débloqués
            </Badge>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Performance Tips */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Conseils pour améliorer votre performance</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Répondez aux leads dans l'heure pour augmenter vos chances de conversion de 70%</p>
                <p>• Préparez vos visites en amont pour obtenir de meilleures évaluations</p>
                <p>• Utilisez les outils de suivi pour ne manquer aucune opportunité</p>
                <p>• Participez aux formations pour débloquer de nouvelles compétences</p>
              </div>
              <Button size="sm" variant="outline" className="mt-4">
                Accéder aux formations
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
