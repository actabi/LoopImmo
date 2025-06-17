import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { SaleProgress } from '../../types';
import { cn } from '../../utils/cn';

interface SaleProgressBarProps {
  progress: SaleProgress;
}

export const SaleProgressBar: React.FC<SaleProgressBarProps> = ({ progress }) => {
  const steps = [
    { id: 'listing', label: 'Mise en ligne', status: progress.listing },
    { id: 'photos', label: 'Photos validées', status: progress.photos },
    { id: 'firstVisit', label: 'Première visite', status: progress.firstVisit },
    { id: 'offers', label: 'Offres reçues', status: progress.offers },
    { id: 'negotiation', label: 'Négociation', status: progress.negotiation },
    { id: 'signing', label: 'Signature', status: progress.signing }
  ];

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Progression de votre vente</h3>
          <p className="text-sm text-gray-600">
            {completedSteps} étapes sur {steps.length} complétées
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">{Math.round(progressPercentage)}%</p>
          <p className="text-xs text-gray-600">de progression</p>
        </div>
      </div>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />
        
        {/* Progress bar fill */}
        <div 
          className="absolute top-5 left-0 h-1 bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                step.status === 'completed' && "bg-green-500 text-white",
                step.status === 'current' && "bg-primary-500 text-white animate-pulse",
                step.status === 'pending' && "bg-gray-200 text-gray-400"
              )}>
                {step.status === 'completed' && <CheckCircle className="w-6 h-6" />}
                {step.status === 'current' && <Clock className="w-6 h-6" />}
                {step.status === 'pending' && <Circle className="w-6 h-6" />}
              </div>
              <span className={cn(
                "text-xs mt-2 text-center max-w-[80px]",
                step.status === 'completed' && "text-green-600 font-medium",
                step.status === 'current' && "text-primary-600 font-medium",
                step.status === 'pending' && "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current step details */}
      {progress.currentStepDetails && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary-900">{progress.currentStepDetails.title}</p>
              <p className="text-sm text-primary-700 mt-1">{progress.currentStepDetails.description}</p>
              {progress.currentStepDetails.action && (
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-2">
                  {progress.currentStepDetails.action} →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
