import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Euro, TrendingUp, Info, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { formatPrice, calculateSavings } from '../../utils/calculations';
import { Property } from '../../types';
import { cn } from '../../utils/cn';

interface SavingsCalculatorProps {
  property: Property;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ property }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [simulatedPrice, setSimulatedPrice] = useState(property.price);
  
  const savings = calculateSavings(simulatedPrice);
  const currentSavings = calculateSavings(property.price);

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Euro className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Vos économies avec LoopImmo</h3>
              <p className="text-green-100">vs agence traditionnelle à 5% de commission</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Détails
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-green-100 text-sm mb-1">Commission agence</p>
            <p className="text-2xl font-bold">{formatPrice(currentSavings.traditionalFee)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-green-100 text-sm mb-1">Forfait LoopImmo</p>
            <p className="text-2xl font-bold">{formatPrice(currentSavings.loopImmoFee)}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 border-2 border-white/30">
            <p className="text-white text-sm mb-1 font-medium">Vos économies</p>
            <p className="text-3xl font-bold">{formatPrice(currentSavings.savings)}</p>
            <p className="text-green-100 text-xs mt-1">
              Soit {Math.round(currentSavings.savingsPercentage)}% de réduction !
            </p>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-gray-600" />
              Simulateur de prix
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Prix de vente simulé</label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="range"
                    min={property.price * 0.8}
                    max={property.price * 1.2}
                    value={simulatedPrice}
                    onChange={(e) => setSimulatedPrice(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold w-32 text-right">
                    {formatPrice(simulatedPrice)}
                  </span>
                </div>
              </div>
              
              {simulatedPrice !== property.price && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Avec ce prix:</strong> Vous économiseriez {formatPrice(savings.savings)} 
                    ({Math.round(savings.savingsPercentage)}% de réduction)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Détail du calcul</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Prix de vente</span>
                <span className="font-medium">{formatPrice(property.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission agence (5%)</span>
                <span className="font-medium text-red-600">- {formatPrice(currentSavings.traditionalFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Forfait LoopImmo</span>
                <span className="font-medium text-primary-600">- {formatPrice(currentSavings.loopImmoFee)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Économies réalisées</span>
                <span className="text-green-600">+ {formatPrice(currentSavings.savings)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Pourquoi LoopImmo est moins cher ?</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Pas de local commercial coûteux</li>
                  <li>• Technologie qui automatise les tâches répétitives</li>
                  <li>• Réseau d'ambassadeurs indépendants</li>
                  <li>• Forfait fixe transparent, pas de % sur le prix</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
