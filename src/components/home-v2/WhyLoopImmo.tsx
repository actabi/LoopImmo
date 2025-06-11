import React from 'react';
import { Heart, Shield, Zap, Users, TrendingUp, Eye } from 'lucide-react';

const reasons = [
  {
    icon: Heart,
    title: "Valeur humaine avant tout",
    description: "Nous croyons que vendre un bien immobilier est avant tout un moment de vie à valeur humaine, et non une simple transaction.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: Shield,
    title: "Frais justes et transparents",
    description: "Les frais de vente doivent servir réellement le vendeur, et non enrichir des intermédiaires dont le service n'est pas toujours à la hauteur.",
    color: "text-primary-500",
    bgColor: "bg-primary-50"
  },
  {
    icon: Users,
    title: "La force de la communauté",
    description: "La connaissance de la communauté locale est un atout inestimable pour donner de la visibilité à un logement.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50"
  },
  {
    icon: TrendingUp,
    title: "Récompenses équitables",
    description: "Chaque personne impactée par la vente mérite d'être reconnue et récompensée lorsqu'elle contribue à la réussite d'une transaction.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Eye,
    title: "Confiance et transparence",
    description: "L'immobilier doit se réconcilier avec la confiance, la transparence et la simplicité.",
    color: "text-accent-500",
    bgColor: "bg-accent-50"
  },
  {
    icon: Zap,
    title: "Innovation et digitalisation",
    description: "Nous utilisons la technologie pour simplifier et accélérer le processus de vente, tout en gardant l'humain au centre.",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  }
];

export const WhyLoopImmo: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi <span className="text-primary-500">LoopImmo</span> ?
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl text-gray-700 font-medium">
              Notre vision : réinventer la vente immobilière en France
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              En plaçant la <span className="font-semibold text-primary-600">communauté</span>, 
              la <span className="font-semibold text-secondary-600">transparence</span> et 
              la <span className="font-semibold text-accent-600">digitalisation</span> au cœur du processus.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${reason.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${reason.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent via-transparent to-gray-50 rounded-bl-full opacity-50"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
              "Nous croyons que chacun se sente acteur et non victime d'un système coûteux et opaque"
            </blockquote>
            <p className="text-lg opacity-90">
              C'est notre engagement envers vous et toute la communauté LoopImmo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
