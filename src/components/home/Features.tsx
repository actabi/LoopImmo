import React from 'react';
import { Zap, Shield, Users, TrendingUp, Heart, Eye } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Vente rapide",
      description: "Grâce à notre réseau d'ambassadeurs, votre bien gagne en visibilité instantanément",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Accompagnement juridique complet et signature électronique sécurisée",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Users,
      title: "Communauté active",
      description: "Des milliers d'ambassadeurs motivés pour faire connaître votre bien",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Économies maximales",
      description: "Jusqu'à 90% d'économies par rapport aux agences traditionnelles",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: Heart,
      title: "Approche humaine",
      description: "Nous comprenons que vendre est un moment de vie important",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Eye,
      title: "Transparence totale",
      description: "Suivez chaque étape de votre vente en temps réel sur notre plateforme",
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi choisir LoopImmo ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une nouvelle façon de vendre, pensée pour vous
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
