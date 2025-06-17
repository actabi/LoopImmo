import React, { useState } from 'react';
import { Check, X, AlertCircle, TrendingDown, Euro } from 'lucide-react';
import { Button } from '../ui/Button';

export const PricingTable: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(400000);

  const calculateFees = (value: number) => {
    // LoopImmo forfait à paliers
    let loopImmoFee = 2500;
    if (value >= 150000 && value < 300000) loopImmoFee = 2500;
    if (value >= 300000 && value < 500000) loopImmoFee = 4000;
    if (value >= 500000 && value < 800000) loopImmoFee = 6000;
    if (value >= 800000 && value < 1000000) loopImmoFee = 8000;
    if (value >= 1000000) loopImmoFee = 10000;
    
    // Pour les valeurs intermédiaires, on interpole
    if (value < 150000) {
      loopImmoFee = 2500;
    } else if (value > 1000000) {
      // Au-delà d'1M€, on ajoute 1% sur le surplus
      loopImmoFee = 10000 + (value - 1000000) * 0.01;
    }

    // Agence traditionnelle (5%)
    const agencyFee = value * 0.05;

    // Néo-agence (forfait fixe entre 2490€ et 5900€)
    let neoAgencyFee = 6900;
    if (value > 300000) neoAgencyFee = 6900;
    if (value > 500000) neoAgencyFee = 6900;
    if (value > 800000) neoAgencyFee = 9500;

    // Réseau de mandataires (3% à 5%, on prend 4% en moyenne)
    const mandataireFee = value * 0.04;

    // Entre particuliers (gratuit à 69€)
    const particularFee = 69;

    return {
      loopImmo: loopImmoFee,
      agency: agencyFee,
      neoAgency: neoAgencyFee,
      mandataire: mandataireFee,
      particular: particularFee
    };
  };

  const fees = calculateFees(propertyValue);

  const options = [
    {
      name: "LoopImmo",
      fee: fees.loopImmo,
      color: "primary",
      gradient: "from-primary-500 to-primary-600",
      advantages: [
        "Forfait transparent et fixe",
        "Communauté d'ambassadeurs actifs",
        "Plateforme digitale complète",
        "Photos professionnelles incluses",
        "Diffusion multi-plateformes",
        "Accompagnement personnalisé",
        "Garantie satisfaction",
        "Suivi en temps réel"
      ],
      disadvantages: [
        "Modèle innovant à découvrir",
        "Participation active recommandée"
      ]
    },
    {
      name: "Agence traditionnelle",
      fee: fees.agency,
      color: "gray",
      gradient: "from-gray-500 to-gray-600",
      advantages: [
        "Prise en charge totale",
        "Réseau d'agences établi",
        "Expertise locale",
        "Négociation professionnelle"
      ],
      disadvantages: [
        "Commission très élevée (5%)",
        "Manque de transparence",
        "Délais parfois longs",
        "Peu de contrôle sur le processus",
        "Frais cachés possibles",
        "Exclusivité imposée"
      ]
    },
    {
      name: "Néo-agence",
      fee: fees.neoAgency,
      color: "secondary",
      gradient: "from-secondary-500 to-secondary-600",
      advantages: [
        "Forfait fixe",
        "Outils digitaux",
        "Photos incluses",
        "Diffusion en ligne"
      ],
      disadvantages: [
        "Service très limité",
        "Peu d'accompagnement",
        "Pas de visites accompagnées",
        "Support client minimal",
        "Pas de négociation",
        "Résultats variables"
      ]
    },
    {
      name: "Mandataires",
      fee: fees.mandataire,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      advantages: [
        "Commission réduite (3-5%)",
        "Agent dédié",
        "Flexibilité",
        "Réseau national"
      ],
      disadvantages: [
        "Commission reste élevée",
        "Qualité variable selon l'agent",
        "Moins de moyens marketing",
        "Pas toujours disponible",
        "Formation inégale"
      ]
    },
    {
      name: "Entre particuliers",
      fee: fees.particular,
      color: "accent",
      gradient: "from-accent-500 to-accent-600",
      advantages: [
        "Quasi gratuit (0-69€)",
        "Contrôle total",
        "Contact direct acheteur"
      ],
      disadvantages: [
        "Tout à gérer seul",
        "Aucune expertise",
        "Risques juridiques",
        "Très chronophage",
        "Pas de garantie",
        "Visibilité limitée",
        "Photos à faire soi-même",
        "Négociation difficile"
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getSavings = (fee: number) => {
    const savings = fees.agency - fee;
    const percentage = (savings / fees.agency) * 100;
    return { amount: savings, percentage };
  };

  const getEquivalentPercentage = (fee: number) => {
    return (fee / propertyValue) * 100;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comparez et économisez
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez combien vous pouvez économiser avec LoopImmo par rapport aux autres solutions
          </p>

          {/* Slider de prix */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Valeur de votre bien : {formatPrice(propertyValue)}
            </label>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>50 000€</span>
              <span>2 000 000€</span>
            </div>
          </div>
        </div>

        {/* Tableau comparatif */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {options.map((option, index) => {
            const savings = getSavings(option.fee);
            const isLoopImmo = option.name === "LoopImmo";
            const equivalentPercentage = getEquivalentPercentage(option.fee);
            
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
                  isLoopImmo ? 'ring-4 ring-primary-500 ring-opacity-50 xl:scale-110' : ''
                }`}
              >
                {isLoopImmo && (
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-sm font-bold">
                    ⭐ MEILLEUR CHOIX
                  </div>
                )}
                
                <div className={`bg-gradient-to-br ${option.gradient} text-white p-6`}>
                  <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                  <div className="text-2xl font-bold mb-1">
                    {formatPrice(option.fee)}
                  </div>
                  <div className="text-xs opacity-90">
                    ≈ {equivalentPercentage.toFixed(2)}% du prix
                  </div>
                  {savings.amount > 0 && (
                    <div className="flex items-center text-sm mt-2 font-semibold">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span>-{Math.round(savings.percentage)}% vs agence</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-700 mb-2 text-sm flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Avantages
                    </h4>
                    <ul className="space-y-1">
                      {option.advantages.slice(0, 4).map((advantage, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-700">
                          <Check className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 text-sm flex items-center">
                      <X className="w-4 h-4 mr-1" />
                      Inconvénients
                    </h4>
                    <ul className="space-y-1">
                      {option.disadvantages.slice(0, 3).map((disadvantage, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-700">
                          <X className="w-3 h-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {isLoopImmo && (
                  <div className="px-4 pb-4">
                    <Button className="w-full" size="sm">
                      Choisir LoopImmo
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Résumé des économies */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Avec LoopImmo, vous économisez {formatPrice(fees.agency - fees.loopImmo)}
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Soit <span className="font-bold text-primary-600">{Math.round((fees.agency - fees.loopImmo) / fees.agency * 100)}%</span> de moins qu'une agence traditionnelle, 
              tout en bénéficiant d'un service complet et d'une communauté d'ambassadeurs motivés.
            </p>
            
            {/* Tableau récapitulatif pour les montants clés */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-gray-600">150 000€</div>
                <div className="font-bold text-primary-600">2 500€</div>
                <div className="text-xs text-green-600">-44%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-gray-600">300 000€</div>
                <div className="font-bold text-primary-600">4 000€</div>
                <div className="text-xs text-green-600">-55%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-gray-600">500 000€</div>
                <div className="font-bold text-primary-600">6 000€</div>
                <div className="text-xs text-green-600">-60%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-gray-600">800 000€</div>
                <div className="font-bold text-primary-600">8 000€</div>
                <div className="text-xs text-green-600">-66%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-gray-600">1 000 000€</div>
                <div className="font-bold text-primary-600">10 000€</div>
                <div className="text-xs text-green-600">-72%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #2563eb;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #2563eb;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border: none;
        }
      `}</style>
    </section>
  );
};
