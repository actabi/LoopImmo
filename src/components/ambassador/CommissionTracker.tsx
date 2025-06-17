import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Euro, TrendingUp, Calendar, Download, 
  Mail, Target, Award, CreditCard 
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface CommissionData {
  currentMonth: {
    signatures: number;
    bonuses: number;
    total: number;
  };
  yearToDate: {
    total: number;
    signatures: number;
    bonuses: number;
    objective: number;
  };
  upcomingPayments: {
    date: Date;
    amount: number;
    description: string;
  }[];
}

interface CommissionTrackerProps {
  data: CommissionData;
}

export const CommissionTracker: React.FC<CommissionTrackerProps> = ({ data }) => {
  const progressPercentage = (data.yearToDate.total / data.yearToDate.objective) * 100;

  return (
    <Card>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Mes Revenus</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Relevé
            </Button>
            <Button size="sm" variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              RIB
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Month */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Ce mois-ci</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Signatures</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(data.currentMonth.signatures)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Bonus performance</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(data.currentMonth.bonuses)}
                </span>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(data.currentMonth.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Cumul 2024</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(data.yearToDate.total)}
                </span>
                <Badge variant="success" size="sm">
                  {Math.round(progressPercentage)}%
                </Badge>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Signatures</span>
                  <span className="font-medium">{formatPrice(data.yearToDate.signatures)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bonus</span>
                  <span className="font-medium">{formatPrice(data.yearToDate.bonuses)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Objectif annuel</span>
                  <span className="font-medium">{formatPrice(data.yearToDate.objective)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Payments */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Prochains paiements</h4>
          <div className="space-y-2">
            {data.upcomingPayments.map((payment, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.date.toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                    <p className="text-sm text-gray-600">{payment.description}</p>
                  </div>
                </div>
                <span className="font-semibold text-green-700">
                  {formatPrice(payment.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button className="flex-1">
            <Euro className="w-4 h-4 mr-2" />
            Détail transactions
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Recevoir factures
          </Button>
        </div>
      </div>
    </Card>
  );
};
