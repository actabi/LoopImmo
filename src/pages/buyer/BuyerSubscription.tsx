import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Star, Check, X, Zap, Shield, Heart, 
  TrendingUp, Users, Clock, Gift, CreditCard,
  ChevronRight, Info
} from 'lucide-react';

export const BuyerSubscription: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Gratuit',
      price: 0,
      period: '',
      description: 'Pour découvrir LoopImmo',
      features: [
        { text: 'Recherche de biens illimitée', included: true },
        { text: '5 biens en favoris', included: true },
        { text: '1 alerte personnalisée', included: true },
        { text: 'Visite virtuelle 360°', included: true },
        { text: 'Accès prioritaire aux nouveaux biens', included: false },
        { text: 'Dossier numérique complet', included: false },
        { text: 'Accompagnement personnalisé', included: false },
        { text: 'Négociation assistée', included: false }
      ],
      cta: 'Plan actuel',
      current: true,
      popular: false
    },
    {
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 19 : 190,
      period: billingPeriod === 'monthly' ? '/mois' : '/an',
      description: 'Pour les acheteurs sérieux',
      features: [
        { text: 'Recherche de biens illimitée', included: true },
        { text: 'Favoris illimités', included: true },
        { text: 'Alertes personnalisées illimitées', included: true },
        { text: 'Visite virtuelle 360°', included: true },
        { text: 'Accès prioritaire aux nouveaux biens', included: true },
        { text: 'Dossier numérique complet', included: true },
        { text: 'Accompagnement personnalisé', included: false },
        { text: 'Négociation assistée', included: false }
      ],
      cta: 'Passer Premium',
      current: false,
      popular: true,
      savings: billingPeriod === 'yearly' ? '2 mois offerts' : null
    },
    {
      name: 'VIP',
      price: billingPeriod === 'monthly' ? 49 : 490,
      period: billingPeriod === 'monthly' ? '/mois' : '/an',
      description: 'Service tout compris',
      features: [
        { text: 'Recherche de biens illimitée', included: true },
        { text: 'Favoris illimités', included: true },
        { text: 'Alertes personnalisées illimitées', included: true },
        { text: 'Visite virtuelle 360°', included: true },
        { text: 'Accès prioritaire aux nouveaux biens', included: true },
        { text: 'Dossier numérique complet', included: true },
        { text: 'Accompagnement personnalisé', included: true },
        { text: 'Négociation assistée', included: true }
      ],
      cta: 'Devenir VIP',
      current: false,
      popular: false,
      savings: billingPeriod === 'yearly' ? '2 mois offerts' : null
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Accès prioritaire',
      description: 'Soyez le premier informé des nouveaux biens'
    },
    {
      icon: Shield,
      title: 'Dossier sécurisé',
      description: 'Vos documents protégés et toujours accessibles'
    },
    {
      icon: Users,
      title: 'Expert dédié',
      description: 'Un conseiller LoopImmo rien que pour vous'
    },
    {
      icon: TrendingUp,
      title: 'Négociation pro',
      description: 'Maximisez vos chances d\'obtenir le meilleur prix'
    }
  ];

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choisissez votre formule
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accélérez votre recherche et maximisez vos chances de trouver le bien idéal
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annuel
              <Badge variant="success" className="ml-2 text-xs">-15%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Populaire
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
                  <span className="text-gray-600">{plan.period}</span>
                  {plan.savings && (
                    <Badge variant="success" className="ml-2 text-xs">
                      {plan.savings}
                    </Badge>
                  )}
                </div>
                <Button 
                  variant={plan.current ? 'outline' : plan.popular ? 'primary' : 'outline'}
                  className="w-full mb-6"
                  disabled={plan.current}
                >
                  {plan.cta}
                  {!plan.current && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mt-0.5" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Pourquoi passer Premium ?
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Testimonial */}
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg text-gray-800 mb-4 max-w-2xl mx-auto">
              "Grâce à l'abonnement Premium, j'ai été alertée en premier d'un bien qui 
              correspondait parfaitement à mes critères. L'accompagnement de mon conseiller 
              a fait toute la différence dans la négociation."
            </blockquote>
            <cite className="text-sm text-gray-600">
              Sophie L., acheteuse Premium depuis 3 mois
            </cite>
          </div>
        </Card>

        {/* FAQ */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Questions fréquentes</h2>
          </div>
          <div className="divide-y">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Puis-je changer de formule à tout moment ?
              </h3>
              <p className="text-sm text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Y a-t-il un engagement ?
              </h3>
              <p className="text-sm text-gray-600">
                Non, tous nos abonnements sont sans engagement. Vous pouvez résilier 
                à tout moment depuis votre espace personnel.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Comment fonctionne l'accompagnement personnalisé ?
              </h3>
              <p className="text-sm text-gray-600">
                Un conseiller LoopImmo vous est attribué dès votre souscription VIP. 
                Il vous accompagne dans toutes vos démarches : recherche, visites, 
                négociation et finalisation.
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <CreditCard className="w-5 h-5" />
          <span>Paiement sécurisé par carte bancaire</span>
          <span className="text-gray-400">•</span>
          <span>Annulation à tout moment</span>
        </div>
      </div>
    </DashboardLayout>
  );
};
