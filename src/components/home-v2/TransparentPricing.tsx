import React, { useState } from 'react';
import { Calculator, Eye, TrendingDown, Info, Check, X, Shield, Users, Clock, Handshake } from 'lucide-react';
import { Card } from '../ui/Card';

export const TransparentPricing: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(350000);

  // Calcul du forfait LoopImmo selon les paliers
  const calculateLoopimmoFee = (value: number) => {
    if (value <= 150000) return 2500;
    if (value <= 300000) return 4000;
    if (value <= 500000) return 6000;
    if (value <= 800000) return 8000;
    if (value <= 1200000) return 10000;
    return 12000 + (value - 1200000) * 0.01;
  };

  const loopimmoFee = calculateLoopimmoFee(propertyValue);
  const neoAgencyFee = propertyValue * 0.03; // 3% commission néo-agence
  const traditionalFee = propertyValue * 0.05; // 5% commission agence traditionnelle
  const p2pFee = 0; // Particulier à particulier
  const ambassadorCommission = loopimmoFee * 0.3; // 30% pour l'ambassadeur

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2 mb-4">
            <Eye className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Transparence totale</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comparez en toute <span className="text-primary-500">transparence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez la solution qui correspond vraiment à vos besoins. Chaque option a ses avantages.
          </p>
        </div>

        {/* Calculateur interactif */}
        <Card className="max-w-6xl mx-auto p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculez et comparez toutes les options</h3>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valeur de votre bien
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="100000"
                max="1500000"
                step="10000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="flex-1"
              />
              <div className="text-2xl font-bold text-gray-900 min-w-[150px] text-right">
                {propertyValue.toLocaleString('fr-FR')}€
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* LoopImmo */}
            <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary-900">LoopImmo</h3>
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">Recommandé</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Forfait vendeur</p>
                  <p className="text-2xl font-bold text-primary-600">{loopimmoFee.toLocaleString('fr-FR')}€</p>
                </div>
                
                <div className="pt-3 border-t border-primary-200">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-sm text-gray-600">Commission ambassadeur</p>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        30% du forfait pour récompenser l'ambassadeur
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-secondary-600">
                    {ambassadorCommission.toLocaleString('fr-FR')}€
                  </p>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Avantages uniques</h4>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Accompagnement juridique complet</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Réseau d'ambassadeurs motivés</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Handshake className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Acheteurs pré-qualifiés</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Vente 2x plus rapide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Néo-agence */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Néo-agence (3%)</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Commission</p>
                  <p className="text-2xl font-bold text-gray-700">{neoAgencyFee.toLocaleString('fr-FR')}€</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Pour l'agence</p>
                  <p className="text-lg font-semibold text-gray-600">100% de la commission</p>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Avantages</h4>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Processus 100% digital</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Tarifs réduits vs traditionnel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Visites virtuelles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Peu d'accompagnement terrain</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agence traditionnelle */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Agence traditionnelle (5%)</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Commission</p>
                  <p className="text-2xl font-bold text-gray-700">{traditionalFee.toLocaleString('fr-FR')}€</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Pour l'agence</p>
                  <p className="text-lg font-semibold text-gray-600">100% de la commission</p>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Avantages</h4>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Expertise locale reconnue</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Accompagnement personnalisé</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Réseau d'acheteurs établi</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Commission la plus élevée</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Particulier à particulier */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Particulier à particulier</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Frais de vente</p>
                  <p className="text-2xl font-bold text-gray-700">0€</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Économie maximale</p>
                  <p className="text-lg font-semibold text-green-600">100%</p>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Avantages et limites</h4>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Aucune commission</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Tout à gérer seul</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Risques juridiques</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Temps et stress importants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">🔒 Pourquoi les acheteurs font confiance à LoopImmo ?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Transparence totale :</strong> Les ambassadeurs sont des voisins qui connaissent vraiment le quartier et n'ont aucun intérêt à cacher des défauts.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Sécurité juridique :</strong> Chaque transaction est supervisée par nos experts pour protéger vendeurs ET acheteurs.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Prix justes :</strong> Les vendeurs économisent sur les frais, ce qui permet souvent plus de marge de négociation.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Communauté vérifiée :</strong> Tous nos ambassadeurs sont identifiés et formés pour un accompagnement de qualité.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
