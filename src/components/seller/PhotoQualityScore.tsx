import React from 'react';
import { Camera } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PhotoQualityScoreProps {
  score: number;
  className?: string;
}

export const PhotoQualityScore: React.FC<PhotoQualityScoreProps> = ({ score, className }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    return 'À améliorer';
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-3", className)}>
      <div className="flex items-center gap-2">
        <Camera className="w-5 h-5 text-gray-600" />
        <div>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-500", getScoreColor())}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-sm font-bold">{score}/100</span>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">{getScoreLabel()}</p>
        </div>
      </div>
    </div>
  );
};
