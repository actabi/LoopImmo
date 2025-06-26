import React from 'react';
import { Camera, Share2, Calendar, Award, Smartphone, BarChart3, FileSignature, Rocket } from 'lucide-react';

export const ConceptSection: React.FC = () => {
  const ambassadorActions = [
    {
      icon: Camera,
      title: "Photos guidées",
      description: "Prendre des photos selon un tutoriel personnalisé, validées par l'IA"
    },
    {
      icon: Share2,
      title: "Partage social",
      description: "Partager un lien traqué sur les réseaux sociaux (prime de relais)"
    },
    {
      icon: Calendar,
      title: "Organisation visites",
      description: "Organiser ou accompagner des visites (prime de visite)"
    },
    {
      icon: Award,
      title: "Recommandation",
      description: "Recommander un acheteur potentiel (prime de signature)"
    }
  ];

  const platformFeatures = [
    {
      icon: Smartphone,
      title: "Estimation IA",
      description: "Automatique et instantanée"
    },
    {
      icon: FileSignature,
      title: "Assistance diagnostics",
      description: "Tutoriels et prise de RDV"
    },
    {
      icon: Rocket,
      title: "Publication multi-plateformes",
      description: "LeBonCoin, SeLoger, etc."
    },
    {
      icon: BarChart3,
      title: "Suivi en temps réel",
      description: "Leads, visites, offres"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Le Concept LoopImmo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un écosystème où chaque personne devient acteur de la vente
          </p>
        </div>

        {/* Loopers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            🚀 Loopers Actifs
          </h3>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-primary-600 mb-4">Vendeur-Sponsor</h4>
                <p className="text-gray-600 mb-4">
                  Le propriétaire devient looper en prenant des photos guidées, rédigeant sa description (assistée par IA) et accompagnant les visites.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-secondary-600 mb-4">Communauté Active</h4>
                <p className="text-gray-600 mb-4">
                  Ancien occupant, voisin ou tiers : toute personne proche du bien peut contribuer et être récompensée.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-8">
              {ambassadorActions.map((action, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <action.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm mb-1">{action.title}</h5>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plateforme */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            💻 Plateforme Collaborative & Intuitive
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
            <p className="text-center text-gray-700">
              <span className="font-semibold">Espace dédié aux loopers :</span> Suivez vos actions et visualisez vos primes en temps réel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
