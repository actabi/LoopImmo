import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Zap, TrendingUp, Eye, Heart, Calendar, Users, Target,
  Clock, Euro, CheckCircle, Star, Sparkles, Award, 
  BarChart3, ArrowRight, Info, Shield, Rocket, Crown
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface BoostOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  impact: {
    views: string;
    leads: string;
    speed: string;
  };
  recommended?: boolean;
  popular?: boolean;
}

const boostOptions: BoostOption[] = [
  {
    id: 'highlight',
    name: 'Mise en avant',
    description: 'Apparaissez en tête des résultats de recherche',
    price: 49,
    duration: '7 jours',
    features: [
      'Position prioritaire dans les résultats',
      'Badge "Coup de cœur" sur l\'annonce',
      'Notification push aux acheteurs intéressés',
      'Statistiques détaillées'
    ],
    impact: {
      views: '+150%',
      leads: '+80%',
      speed: '-15 jours'
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Maximisez votre visibilité sur tous les canaux',
    price: 99,
    duration: '14 jours',
    features: [
      'Tout de "Mise en avant"',
      'Diffusion sur nos partenaires immobiliers',
      'Visite virtuelle 360° offerte',
      'Shooting photo professionnel',
      'Accompagnement personnalisé'
    ],
    impact: {
      views: '+300%',
      leads: '+150%',
      speed: '-25 jours'
    },
    recommended: true,
    popular: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    description: 'L\'expérience complète pour vendre rapidement',
    price: 199,
    duration: '30 jours',
    features: [
      'Tout de "Premium"',
      'Home staging virtuel par IA',
      'Vidéo drone du quartier',
      'Campagne publicitaire ciblée',
      'Agent dédié pour les visites',
      'Garantie vente ou remboursé'
    ],
    impact: {
      views: '+500%',
      leads: '+250%',
      speed: '-40 jours'
    }
  }
];

export const BoostVisibilityPage: React.FC = () => {
  const [selectedBoost, setSelectedBoost] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const currentStats = {
    weeklyViews: 234,
    totalLeads: 8,
    estimatedDays: 75
  };

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Boostez votre visibilité</h1>
            <p className="text-gray-600 mt-1">Accélérez la vente de votre bien avec nos options de boost</p>
          </div>
          <Button variant="outline" onClick={() => setShowComparison(!showComparison)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Comparer les options
          </Button>
        </div>

        {/* Current Performance */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance actuelle de votre annonce</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Vues hebdomadaires</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentStats.weeklyViews}</p>
                <p className="text-sm text-gray-500">Moyenne du marché : 180</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Leads générés</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentStats.totalLeads}</p>
                <p className="text-sm text-gray-500">Dont 3 très intéressés</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Délai estimé</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentStats.estimatedDays} jours</p>
                <p className="text-sm text-gray-500">Pour vendre au prix actuel</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Boost Options */}
        <div className="grid lg:grid-cols-3 gap-6">
          {boostOptions.map((option) => (
            <Card 
              key={option.id}
              className={cn(
                "relative overflow-hidden transition-all cursor-pointer",
                selectedBoost === option.id && "ring-2 ring-primary-500",
                option.recommended && "border-primary-500"
              )}
              onClick={() => setSelectedBoost(option.id)}
            >
              {option.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAIRE
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{option.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  {option.recommended && (
                    <Crown className="w-6 h-6 text-yellow-500" />
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">{option.price}€</span>
                    <span className="text-gray-600">/ {option.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Impact estimé</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vues</span>
                      <span className="text-sm font-bold text-green-600">{option.impact.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Leads</span>
                      <span className="text-sm font-bold text-blue-600">{option.impact.leads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Délai de vente</span>
                      <span className="text-sm font-bold text-purple-600">{option.impact.speed}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6" 
                  variant={option.recommended ? "primary" : "outline"}
                >
                  {selectedBoost === option.id ? 'Sélectionné' : 'Choisir cette option'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparaison détaillée</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Fonctionnalité</th>
                      <th className="text-center py-3 px-4">Mise en avant</th>
                      <th className="text-center py-3 px-4">Premium</th>
                      <th className="text-center py-3 px-4">Ultimate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Position prioritaire</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Diffusion partenaires</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Visite virtuelle 360°</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Home staging virtuel</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Garantie vente</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Success Stories */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Témoignages de vendeurs boostés
            </h3>
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-2">
                  "Le boost Premium a fait toute la différence. J'ai vendu en 3 semaines au lieu des 2 mois prévus !"
                </p>
                <p className="text-sm font-medium text-gray-900">Sophie M.</p>
                <p className="text-xs text-gray-600">Appartement 3P - Paris 15e</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-2">
                  "Les visites virtuelles ont attiré des acheteurs sérieux. ROI excellent sur l'option Ultimate."
                </p>
                <p className="text-sm font-medium text-gray-900">Marc D.</p>
                <p className="text-xs text-gray-600">Maison - Levallois</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-2">
                  "J'ai eu 5x plus de vues dès la première semaine. Le boost vaut vraiment le coup !"
                </p>
                <p className="text-sm font-medium text-gray-900">Julie R.</p>
                <p className="text-xs text-gray-600">Studio - Paris 11e</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        {selectedBoost && (
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Prêt à booster votre annonce ?
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Option sélectionnée : {boostOptions.find(o => o.id === selectedBoost)?.name}
                  </p>
                </div>
                <Button variant="primary" size="lg">
                  <Rocket className="w-5 h-5 mr-2" />
                  Activer le boost maintenant
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
