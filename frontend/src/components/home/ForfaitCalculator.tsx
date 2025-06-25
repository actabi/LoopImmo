import React, { useState } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';
import { Button } from '../ui/Button';

export const ForfaitCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState('');
  const [result, setResult] = useState<{
    fee: number;
    savings: number;
    percentage: number;
  } | null>(null);

  const calculateForfait = () => {
    const value = parseFloat(propertyValue);
    if (isNaN(value) || value <= 0) return;

    let fee = 2500;
    if (value > 150000) fee = 4000;
    if (value > 300000) fee = 6000;
    if (value > 500000) fee = 8000;
    if (value > 800000) fee = 10000;
    if (value > 1200000) fee = 12000 + (value - 1200000) * 0.01;

    const traditionalFee = value * 0.055; // 5.5% moyenne agence
    const savings = traditionalFee - fee;
    const percentage = (savings / traditionalFee) * 100;

    setResult({ fee, savings, percentage });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Calculez votre forfait
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez instantanément combien vous allez économiser
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <label htmlFor="propertyValue" className="block text-lg font-semibold text-gray-900 mb-3">
              Valeur estimée de votre bien
            </label>
            <div className="relative">
              <input
                type="number"
                id="propertyValue"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="Ex: 350000"
                className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
              />
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            </div>
          </div>

          <Button 
            onClick={calculateForfait}
            size="lg"
            className="w-full mb-8"
          >
            Calculer mon forfait
          </Button>

          {result && (
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 animate-fadeIn">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Votre forfait LoopImmo</p>
                  <p className="text-3xl font-bold text-primary-600">{formatPrice(result.fee)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Vos économies</p>
                  <p className="text-3xl font-bold text-secondary-600">{formatPrice(result.savings)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Réduction</p>
                  <p className="text-3xl font-bold text-accent-600 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 mr-2" />
                    {Math.round(result.percentage)}%
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-700 mb-4">
                  Par rapport à une agence traditionnelle qui vous facturerait environ {formatPrice(parseFloat(propertyValue) * 0.055)}
                </p>
                <Button variant="secondary" size="lg">
                  Commencer ma vente maintenant
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
