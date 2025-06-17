import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check, Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  onSelect: (planId: string) => void;
  currentPlan?: string;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  onSelect,
  currentPlan
}) => {
  const isCurrentPlan = currentPlan === plan.id;
  
  return (
    <Card className={cn(
      "relative p-6 h-full flex flex-col",
      plan.highlighted && "ring-2 ring-primary-500",
      isCurrentPlan && "bg-primary-50"
    )}>
      {plan.badge && (
        <Badge 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2"
          variant="primary"
        >
          <Star className="w-3 h-3 mr-1" />
          {plan.badge}
        </Badge>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
          <span className="text-gray-600 ml-2">
            {plan.billingCycle === 'monthly' ? '/mois' : 
             plan.billingCycle === 'yearly' ? '/an' : ''}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.highlighted ? "primary" : "outline"}
        className="w-full"
        onClick={() => onSelect(plan.id)}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Plan actuel' : 'Choisir ce plan'}
      </Button>
    </Card>
  );
};
