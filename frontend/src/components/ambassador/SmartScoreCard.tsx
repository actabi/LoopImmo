import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Trophy, TrendingUp, MapPin, Clock, Target, History } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ScoreDetail {
  label: string;
  value: number;
  max: number;
  icon: React.ElementType;
  color: string;
}

interface SmartScoreCardProps {
  score: number;
  level: string;
  rank: number;
  nextLevel: {
    name: string;
    progress: number;
    requirements: string[];
  };
}

export const SmartScoreCard: React.FC<SmartScoreCardProps> = ({
  score,
  level,
  rank,
  nextLevel
}) => {
  const scoreDetails: ScoreDetail[] = [
    { label: 'Zone', value: 254, max: 300, icon: MapPin, color: 'text-green-600' },
    { label: 'Perf', value: 212, max: 250, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Dispo', value: 180, max: 200, icon: Clock, color: 'text-purple-600' },
    { label: 'Spé', value: 128, max: 150, icon: Target, color: 'text-orange-600' },
    { label: 'Hist', value: 73, max: 100, icon: History, color: 'text-gray-600' },
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'bronze': return 'bg-orange-500';
      case 'argent': return 'bg-gray-400';
      case 'or': return 'bg-yellow-500';
      case 'platine': return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Mon Profil Ambassadeur</h2>
            <p className="text-primary-100">Score SMART: {score}/1000</p>
          </div>
          <div className="text-center">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mb-2",
              getLevelColor(level)
            )}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <Badge className="bg-white/20 text-white">Niveau {level}</Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-100">Rang local</span>
          <span className="font-semibold">#{rank}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Détail Score</h3>
          <div className="grid grid-cols-5 gap-2">
            {scoreDetails.map((detail) => (
              <div key={detail.label} className="text-center">
                <div className="relative mb-2">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <detail.icon className={cn("w-6 h-6", detail.color)} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-1.5 py-0.5 text-xs font-semibold border border-gray-200">
                    {detail.value}
                  </div>
                </div>
                <p className="text-xs text-gray-600">{detail.label}</p>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div 
                    className={cn("h-1 rounded-full", detail.color.replace('text', 'bg'))}
                    style={{ width: `${(detail.value / detail.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progression */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Progression</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Vers {nextLevel.name}</span>
                <span className="font-medium">{nextLevel.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  style={{ width: `${nextLevel.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {nextLevel.requirements[0]}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Prochains objectifs</h3>
            <ul className="space-y-1">
              {nextLevel.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
