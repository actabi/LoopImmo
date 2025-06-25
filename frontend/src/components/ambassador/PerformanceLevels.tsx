import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Trophy, TrendingUp, Target, Award, 
  ChevronRight, Lock, Check, Star 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface Level {
  name: string;
  icon: string;
  achieved: boolean;
  current: boolean;
  requirements: string[];
  benefits: string[];
}

interface PerformanceLevelsProps {
  currentLevel: string;
  achievedDate: Date;
  transactions: number;
  nextLevelProgress: number;
  nextLevelRequirements: string[];
}

export const PerformanceLevels: React.FC<PerformanceLevelsProps> = ({
  currentLevel,
  achievedDate,
  transactions,
  nextLevelProgress,
  nextLevelRequirements
}) => {
  const levels: Level[] = [
    {
      name: 'Bronze',
      icon: '🥉',
      achieved: true,
      current: false,
      requirements: ['10 visites', 'Score 500+'],
      benefits: ['Commission 5%', 'Support standard']
    },
    {
      name: 'Argent',
      icon: '🥈',
      achieved: true,
      current: false,
      requirements: ['25 visites', 'Score 700+', '5 signatures'],
      benefits: ['Commission 6%', 'Support prioritaire']
    },
    {
      name: 'Or',
      icon: '🏆',
      achieved: true,
      current: currentLevel === 'Or',
      requirements: ['50 visites', 'Score 800+', '10 signatures'],
      benefits: ['Commission 8%', 'Zones premium', 'Formation avancée']
    },
    {
      name: 'Platine',
      icon: '💎',
      achieved: false,
      current: false,
      requirements: ['100 visites', 'Score 900+', '20 signatures', '6 mois d\'ancienneté'],
      benefits: ['Commission 10%', 'Toutes zones', 'Mentorat', 'Events VIP']
    }
  ];

  const currentLevelData = levels.find(l => l.name === currentLevel);

  return (
    <div className="space-y-6">
      {/* Current Level Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Mon Niveau</h3>
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{currentLevelData?.icon}</span>
                <div>
                  <p className="text-3xl font-bold">{currentLevel}</p>
                  <p className="text-yellow-100">
                    Atteint le {achievedDate.toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold">{transactions}</p>
              <p className="text-yellow-100">Transactions</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Avantages niveau {currentLevel}</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {currentLevelData?.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Levels Progression */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progression des niveaux</h3>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200" />
            
            <div className="space-y-6">
              {levels.map((level, index) => (
                <div key={level.name} className="relative flex items-start space-x-4">
                  {/* Level Icon */}
                  <div className={cn(
                    "relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl",
                    level.achieved ? "bg-primary-100" : "bg-gray-100",
                    level.current && "ring-4 ring-primary-500 ring-offset-2"
                  )}>
                    {level.achieved ? level.icon : <Lock className="w-6 h-6 text-gray-400" />}
                  </div>

                  {/* Level Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={cn(
                        "text-lg font-semibold",
                        level.achieved ? "text-gray-900" : "text-gray-400"
                      )}>
                        {level.name}
                        {level.current && (
                          <Badge className="ml-2" variant="primary" size="sm">Actuel</Badge>
                        )}
                      </h4>
                      {!level.achieved && index === levels.findIndex(l => l.current) + 1 && (
                        <span className="text-sm font-medium text-primary-600">
                          {nextLevelProgress}% complété
                        </span>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Prérequis</p>
                        <ul className="space-y-1">
                          {level.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Avantages</p>
                        <ul className="space-y-1">
                          {level.benefits.slice(0, 2).map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Level Progress */}
          {nextLevelProgress < 100 && (
            <div className="mt-8 p-4 bg-primary-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Progression vers Platine</h4>
              <div className="space-y-3">
                <div className="w-full bg-primary-200 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    style={{ width: `${nextLevelProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Il vous reste:</span>
                  <div className="flex gap-3">
                    {nextLevelRequirements.map((req, index) => (
                      <Badge key={index} variant="outline" size="sm">{req}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button className="flex-1">
              <Target className="w-4 h-4 mr-2" />
              Voir critères détaillés
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Plan d'action
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
