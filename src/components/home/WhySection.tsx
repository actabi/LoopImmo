import React from 'react';
import { Heart, TrendingDown, Users, Shield } from 'lucide-react';

export const WhySection: React.FC = () => {
  const reasons = [
    {
      icon: Heart,
      title: "Un moment de vie, pas une transaction",
      description: "Nous croyons que vendre un bien immobilier est avant tout un moment de vie à valeur humaine, et non une simple transaction.",
      color: "from-red-100 to-red-200",
      iconColor: "text-red-600"
    },
    {
      icon: TrendingDown,
      title: "Des frais justes et transparents",
      description: "Les frais de vente doivent servir réellement le vendeur, et non enrichir des intermédiaires dont le service n'est pas toujours à la hauteur.",
      color: "from-primary-100 to-primary-200",
      iconColor: "text-primary-600"
    },
    {
      icon: Users,
      title: "La force de la communauté",
      description: "La connaissance de la communauté locale est un atout inestimable pour donner de la visibilité à un logement.",
      color: "from-secondary-100 to-secondary-200",
      iconColor: "text-secondary-600"
    },
    {
      icon: Shield,
      title: "Confiance et simplicité",
      description: "L'immobilier doit se réconcilier avec la confiance, la transparence et la simplicité, pour que chacun se sente acteur et non victime.",
      color: "from-accent-100 to-accent-200",
      iconColor: "text-accent-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi LoopImmo ?
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-lg">
              <p className="text-xl text-gray-800 font-medium italic">
                💡 Nous croyons que vendre un bien immobilier est avant tout un moment de vie à valeur humaine, et non une simple transaction.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="group hover:shadow-xl transition-all duration-300 rounded-2xl p-8 bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <reason.icon className={`w-7 h-7 ${reason.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
